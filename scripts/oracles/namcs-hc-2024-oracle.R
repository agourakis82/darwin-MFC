args <- commandArgs(trailingOnly=TRUE)
if (length(args) != 4) {
  stop("usage: namcs-hc-2024-oracle.R <source.rds> <raw.tsv> <oracle.tsv> <library>")
}

source_path <- normalizePath(args[[1]], mustWork=TRUE)
raw_output_path <- args[[2]]
oracle_output_path <- args[[3]]
library_path <- normalizePath(args[[4]], mustWork=TRUE)
.libPaths(c(library_path, .libPaths()))

if (!requireNamespace("survey", quietly=TRUE)) stop("survey-package-missing")
survey_version <- as.character(utils::packageVersion("survey"))
if (!identical(survey_version, "4.5")) stop(sprintf("survey-version-mismatch:%s", survey_version))
survey_path <- normalizePath(find.package("survey"), mustWork=TRUE)
if (!startsWith(survey_path, paste0(library_path, .Platform$file.sep))) {
  stop(sprintf("survey-package-outside-pinned-library:%s", survey_path))
}

data <- readRDS(source_path)
diagnosis_columns <- paste0("DX", seq_len(30))
required <- c("AGE", "HCID_S", "STRATUM_S", "VISWT", diagnosis_columns)
missing <- setdiff(required, names(data))
if (length(missing) > 0) stop(sprintf("missing-columns:%s", paste(missing, collapse=",")))
if (nrow(data) != 503799) stop(sprintf("source-row-count-mismatch:%s", nrow(data)))
if (any(!is.finite(data$VISWT)) || any(data$VISWT <= 0)) stop("invalid-weights")

options(digits=17)
raw <- data.frame(
  age=data$AGE,
  stratum=data$STRATUM_S,
  cluster=data$HCID_S,
  weight=data$VISWT,
  stringsAsFactors=FALSE
)
for (column in diagnosis_columns) raw[[tolower(column)]] <- data[[column]]
utils::write.table(
  raw,
  file=raw_output_path,
  sep="\t",
  quote=FALSE,
  row.names=FALSE,
  col.names=TRUE,
  na=""
)

normalize_diagnosis <- function(value) {
  value <- toupper(ifelse(is.na(value), "", as.character(value)))
  value[value %in% c("-9", "-7")] <- ""
  gsub("[^A-Z0-9]", "", value)
}
matches_any <- function(pattern) {
  matched <- rep(FALSE, nrow(data))
  for (column in diagnosis_columns) {
    matched <- matched | grepl(pattern, normalize_diagnosis(data[[column]]), perl=TRUE)
  }
  matched
}

age <- suppressWarnings(as.integer(data$AGE))
valid_age <- !is.na(age) & age >= 0 & age <= 89
pediatric <- valid_age & age < 18
age_rules <- list(
  under_2=pediatric & age < 2,
  "2_4"=pediatric & age >= 2 & age < 5,
  "5_11"=pediatric & age >= 5 & age < 12,
  "12_17"=pediatric & age >= 12
)
condition_rules <- list(
  ivas="^(J00|J06)",
  pneumonia="^J1[2-8]",
  bronchiolitis="^J21",
  asthma="^J45",
  croup="^J05",
  pertussis="^A37",
  influenza_covid="^(J09|J10|J11|U071)",
  pharyngitis="^(J02|J03)"
)

derived <- data.frame(
  stratum=as.character(data$STRATUM_S),
  cluster=as.character(data$HCID_S),
  weight=as.numeric(data$VISWT),
  all_visits=rep(1L, nrow(data)),
  pediatric=as.integer(pediatric),
  stringsAsFactors=FALSE
)
for (age_name in names(age_rules)) derived[[paste0("age_", age_name)]] <- as.integer(age_rules[[age_name]])
for (condition_name in names(condition_rules)) {
  condition <- pediatric & matches_any(condition_rules[[condition_name]])
  condition_variable <- paste0("condition_", condition_name)
  derived[[condition_variable]] <- as.integer(condition)
  for (age_name in names(age_rules)) {
    derived[[paste0(condition_variable, "_", age_name)]] <- as.integer(condition & age_rules[[age_name]])
  }
}

metric_spec <- data.frame(
  metric_id=c("all_visits_total", "pediatric_total"),
  type=c("total", "total"),
  numerator=c("all_visits", "pediatric"),
  denominator=c("", ""),
  stringsAsFactors=FALSE
)
for (age_name in names(age_rules)) {
  metric_spec <- rbind(metric_spec, data.frame(
    metric_id=paste0("age_", age_name, "_total"),
    type="total",
    numerator=paste0("age_", age_name),
    denominator="",
    stringsAsFactors=FALSE
  ))
}
for (condition_name in names(condition_rules)) {
  condition_variable <- paste0("condition_", condition_name)
  metric_spec <- rbind(metric_spec, data.frame(
    metric_id=c(paste0(condition_name, "_total"), paste0(condition_name, "_share")),
    type=c("total", "ratio"),
    numerator=c(condition_variable, condition_variable),
    denominator=c("", "pediatric"),
    stringsAsFactors=FALSE
  ))
  for (age_name in names(age_rules)) {
    metric_spec <- rbind(metric_spec, data.frame(
      metric_id=paste0(condition_name, "_", age_name, "_share"),
      type="ratio",
      numerator=paste0(condition_variable, "_", age_name),
      denominator=paste0("age_", age_name),
      stringsAsFactors=FALSE
    ))
  }
}

options(survey.lonely.psu="fail")
design <- survey::svydesign(
  ids=~cluster,
  strata=~stratum,
  weights=~weight,
  data=derived,
  nest=TRUE
)

rows <- lapply(seq_len(nrow(metric_spec)), function(index) {
  metric <- metric_spec[index,]
  numerator_formula <- stats::reformulate(metric$numerator)
  if (metric$type == "total") {
    estimate <- survey::svytotal(numerator_formula, design)
  } else {
    denominator_formula <- stats::reformulate(metric$denominator)
    estimate <- survey::svyratio(numerator_formula, denominator_formula, design)
  }
  data.frame(
    metric_id=metric$metric_id,
    type=metric$type,
    numerator=metric$numerator,
    denominator=metric$denominator,
    sample_numerator=sum(derived[[metric$numerator]]),
    sample_denominator=if (nzchar(metric$denominator)) sum(derived[[metric$denominator]]) else NA,
    estimate=as.numeric(stats::coef(estimate)[[1]]),
    standard_error=as.numeric(survey::SE(estimate)[[1]]),
    degrees_freedom=survey::degf(design),
    r_version=R.version.string,
    survey_version=survey_version,
    stringsAsFactors=FALSE
  )
})

result <- do.call(rbind, rows)
utils::write.table(
  result,
  file=oracle_output_path,
  sep="\t",
  quote=FALSE,
  row.names=FALSE,
  col.names=TRUE,
  na=""
)
cat("NAMCS_HC_2024_R_SURVEY_ORACLE_VALID\n")

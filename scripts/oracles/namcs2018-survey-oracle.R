args <- commandArgs(trailingOnly=TRUE)
if (length(args) != 3) {
  stop("usage: namcs2018-survey-oracle.R <input.tsv> <output.tsv> <library>")
}

input_path <- normalizePath(args[[1]], mustWork=TRUE)
output_path <- args[[2]]
library_path <- normalizePath(args[[3]], mustWork=TRUE)
.libPaths(c(library_path, .libPaths()))

if (!requireNamespace("survey", quietly=TRUE)) stop("survey-package-missing")
survey_version <- as.character(utils::packageVersion("survey"))
if (!identical(survey_version, "4.5")) stop(sprintf("survey-version-mismatch:%s", survey_version))
survey_path <- normalizePath(find.package("survey"), mustWork=TRUE)
if (!startsWith(survey_path, paste0(library_path, .Platform$file.sep))) {
  stop(sprintf("survey-package-outside-pinned-library:%s", survey_path))
}

data <- utils::read.delim(input_path, check.names=FALSE, stringsAsFactors=FALSE)
metric_spec <- data.frame(
  metric_id=c(
    "pediatric_total", "respiratory_total",
    "measured_fever_share", "cough_share", "coryza_share", "sore_throat_share",
    "dyspnea_share", "wheeze_share", "rapid_breathing_proxy_share", "stridor_proxy_share",
    "ivas_share", "pneumonia_share", "bronchiolitis_share", "asthma_share",
    "croup_share", "pertussis_share", "influenza_share", "pharyngitis_share",
    "amoxicillin_respiratory_share", "albuterol_respiratory_share",
    "acetaminophen_respiratory_share"
  ),
  type=c(rep("total", 2), rep("ratio", 19)),
  numerator=c(
    "pediatric", "respiratory",
    "feature_measured_fever", "feature_cough", "feature_coryza", "feature_sore_throat",
    "feature_dyspnea", "feature_wheeze", "proxy_rapid_breathing", "proxy_stridor",
    "condition_ivas", "condition_pneumonia", "condition_bronchiolitis", "condition_asthma",
    "condition_croup", "condition_pertussis", "condition_influenza", "condition_pharyngitis",
    "medication_amoxicillin", "medication_albuterol", "medication_acetaminophen"
  ),
  denominator=c(rep("", 2), rep("pediatric", 16), rep("respiratory", 3)),
  stringsAsFactors=FALSE
)

required <- unique(c("stratum", "cluster", "weight", metric_spec$numerator, metric_spec$denominator))
required <- required[nzchar(required)]
missing <- setdiff(required, names(data))
if (length(missing) > 0) stop(sprintf("missing-columns:%s", paste(missing, collapse=",")))
if (any(!is.finite(data$weight)) || any(data$weight <= 0)) stop("invalid-weights")

options(survey.lonely.psu="fail")
options(digits=17)
design <- survey::svydesign(
  ids=~cluster,
  strata=~stratum,
  weights=~weight,
  data=data,
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
  file=output_path,
  sep="\t",
  quote=FALSE,
  row.names=FALSE,
  col.names=TRUE,
  na=""
)
cat("NAMCS2018_R_SURVEY_ORACLE_VALID\n")

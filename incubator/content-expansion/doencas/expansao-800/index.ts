/**
 * EXPANSÃO 800 - CONSOLIDAÇÃO DE DOENÇAS
 * ======================================
 * Índice de todas as doenças da expansão para 800+ entries
 */

// Import all disease modules
import { infecciosasTropicais } from './infecciosas-tropicais';
import { neurologicasAvancadas } from './neurologicas-avancadas';
import { metabolicasRaras } from './metabolicas-raras';

// Mental health subdirectory
import { transtornosSubstancia } from './saude-mental/dsm5-substance-use';
import { transtornosPersonalidade } from './saude-mental/dsm5-personality';
import { transtornosInfancia } from './saude-mental/dsm5-childhood';
import { transtornosSono } from './saude-mental/dsm5-sleep-disorders';

// Cardiovascular and pediatric
import { cardiovascularesAvancadas } from './cardiovasculares-avancadas';
import { pediatricasAvancadas } from './pediatricas-avancadas';
import { pediatricasExtras } from './pediatricas-extras';

// Urological
import { urologicasAvancadas } from './urologicas-avancadas';

// Respiratory
import { respiratoriasAvancadas } from './respiratorias-avancadas';

// Hematological
import { hematologicasAvancadas } from './hematologicas-avancadas';

// Dermatological
import { dermatologicasAvancadas } from './dermatologicas-avancadas';

// Endocrine
import { endocrinasAvancadas } from './endocrinas-avancadas';

// Nephrological
import { nefrologicasAvancadas } from './nefrologicas-avancadas';

// Gastrointestinal
import { gastrointestinaisAvancadas } from './gastrointestinais-avancadas';

// Musculoskeletal
import { musculoesqueleticasAvancadas } from './musculoesqueleticas-avancadas';

// Geriatric
import { geriatricasAvancadas } from './geriatricas-avancadas';

// Ophthalmological
import { oftalmologicasAvancadas } from './oftalmologicas-avancadas';
import { oftalmologicasExtras } from './oftalmologicas-extras';

// Otorhinolaryngological (ENT)
import { otorrinolaringologicasAvancadas } from './otorrinolaringologicas-avancadas';

// Autoimmune
import { autoimunesAvancadas } from './autoimunes-avancadas';

// Genetic and Congenital
import { geneticasCongenitas } from './geneticas-congenitas';

// Hepatic
import { hepaticasAvancadas } from './hepaticas-avancadas';

// Nosocomial Infections (HAIs)
import { infecciosasNosocomiais } from './infecciosas-nosocomiais';

// Toxicological
import { toxicologicasAvancadas } from './toxicologicas-avancadas';

// Oncological
import { oncologicasAvancadas } from './oncologicas-avancadas';

// Gynecological
import { ginecologicasAvancadas } from './ginecologicas-avancadas';

// Tropical/Infectious Extras
import { infecciosasTropicaisExtras } from './infecciosas-tropicais-extras';

// STIs (ISTs)
import { istAvancadas } from './ist-avancadas';

// Advanced Emergencies
import { emergenciasAvancadas } from './emergencias-avancadas';

// Consolidate all diseases
export const doencasExpansao800 = [
  ...infecciosasTropicais,
  ...neurologicasAvancadas,
  ...metabolicasRaras,
  ...transtornosSubstancia,
  ...transtornosPersonalidade,
  ...transtornosInfancia,
  ...transtornosSono,
  ...cardiovascularesAvancadas,
  ...pediatricasAvancadas,
  ...pediatricasExtras,
  ...urologicasAvancadas,
  ...respiratoriasAvancadas,
  ...hematologicasAvancadas,
  ...dermatologicasAvancadas,
  ...endocrinasAvancadas,
  ...nefrologicasAvancadas,
  ...gastrointestinaisAvancadas,
  ...musculoesqueleticasAvancadas,
  ...geriatricasAvancadas,
  ...oftalmologicasAvancadas,
  ...oftalmologicasExtras,
  ...otorrinolaringologicasAvancadas,
  ...autoimunesAvancadas,
  ...geneticasCongenitas,
  ...hepaticasAvancadas,
  ...infecciosasNosocomiais,
  ...toxicologicasAvancadas,
  ...oncologicasAvancadas,
  ...ginecologicasAvancadas,
  ...infecciosasTropicaisExtras,
  ...istAvancadas,
  ...emergenciasAvancadas,
];

// Re-export individual modules
export { infecciosasTropicais } from './infecciosas-tropicais';
export { neurologicasAvancadas } from './neurologicas-avancadas';
export { metabolicasRaras } from './metabolicas-raras';
export { transtornosSubstancia } from './saude-mental/dsm5-substance-use';
export { transtornosPersonalidade } from './saude-mental/dsm5-personality';
export { transtornosInfancia } from './saude-mental/dsm5-childhood';
export { transtornosSono } from './saude-mental/dsm5-sleep-disorders';
export { cardiovascularesAvancadas } from './cardiovasculares-avancadas';
export { pediatricasAvancadas } from './pediatricas-avancadas';
export { pediatricasExtras } from './pediatricas-extras';
export { urologicasAvancadas } from './urologicas-avancadas';
export { respiratoriasAvancadas } from './respiratorias-avancadas';
export { hematologicasAvancadas } from './hematologicas-avancadas';
export { dermatologicasAvancadas } from './dermatologicas-avancadas';
export { endocrinasAvancadas } from './endocrinas-avancadas';
export { nefrologicasAvancadas } from './nefrologicas-avancadas';
export { gastrointestinaisAvancadas } from './gastrointestinais-avancadas';
export { musculoesqueleticasAvancadas } from './musculoesqueleticas-avancadas';
export { geriatricasAvancadas } from './geriatricas-avancadas';
export { oftalmologicasAvancadas } from './oftalmologicas-avancadas';
export { oftalmologicasExtras } from './oftalmologicas-extras';
export { otorrinolaringologicasAvancadas } from './otorrinolaringologicas-avancadas';
export { autoimunesAvancadas } from './autoimunes-avancadas';
export { geneticasCongenitas } from './geneticas-congenitas';
export { hepaticasAvancadas } from './hepaticas-avancadas';
export { infecciosasNosocomiais } from './infecciosas-nosocomiais';
export { toxicologicasAvancadas } from './toxicologicas-avancadas';
export { oncologicasAvancadas } from './oncologicas-avancadas';
export { ginecologicasAvancadas } from './ginecologicas-avancadas';
export { infecciosasTropicaisExtras } from './infecciosas-tropicais-extras';
export { istAvancadas } from './ist-avancadas';
export { emergenciasAvancadas } from './emergencias-avancadas';

// Statistics
export const expansao800Stats = {
  totalDoencas: doencasExpansao800.length,
  porCategoria: {
    infecciosasTropicais: infecciosasTropicais.length,
    neurologicas: neurologicasAvancadas.length,
    metabolicas: metabolicasRaras.length,
    substancia: transtornosSubstancia.length,
    personalidade: transtornosPersonalidade.length,
    infancia: transtornosInfancia.length,
    sono: transtornosSono.length,
    cardiovasculares: cardiovascularesAvancadas.length,
    pediatricas: pediatricasAvancadas.length,
    pediatricasExtras: pediatricasExtras.length,
    urologicas: urologicasAvancadas.length,
    respiratorias: respiratoriasAvancadas.length,
    hematologicas: hematologicasAvancadas.length,
    dermatologicas: dermatologicasAvancadas.length,
    endocrinas: endocrinasAvancadas.length,
    nefrologicas: nefrologicasAvancadas.length,
    gastrointestinais: gastrointestinaisAvancadas.length,
    musculoesqueleticas: musculoesqueleticasAvancadas.length,
    geriatricas: geriatricasAvancadas.length,
    oftalmologicas: oftalmologicasAvancadas.length,
    oftalmologicasExtras: oftalmologicasExtras.length,
    otorrinolaringologicas: otorrinolaringologicasAvancadas.length,
    autoimunes: autoimunesAvancadas.length,
    geneticasCongenitas: geneticasCongenitas.length,
    hepaticas: hepaticasAvancadas.length,
    nosocomiais: infecciosasNosocomiais.length,
    toxicologicas: toxicologicasAvancadas.length,
    oncologicas: oncologicasAvancadas.length,
    ginecologicas: ginecologicasAvancadas.length,
    infecciosasTropicaisExtras: infecciosasTropicaisExtras.length,
    istAvancadas: istAvancadas.length,
    emergenciasAvancadas: emergenciasAvancadas.length,
  },
  versao: '1.0.0',
  dataAtualizacao: '2026-01',
};

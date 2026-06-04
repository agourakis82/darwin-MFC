/**
 * EXPANSÃO 1000 - CONSOLIDAÇÃO DE MEDICAMENTOS
 * =============================================
 * Índice de todos os medicamentos da expansão para 1000+ entries
 */

import { analgesicosNovos } from './analgesicos-novos';
import { anestesiaNovos } from './anestesia-novos';
import { anticoagulantesNovos } from './anticoagulantes-novos';
import { antiHistaminicosNovos } from './anti-histaminicos-novos';
import { antibioticosAvancados } from './antibioticos-avancados';
import { antidiabeticosNovos } from './antidiabeticos-novos';
import { antifungicosNovos } from './antifungicos-novos';
import { antiparasitariosNovos } from './antiparasitarios-novos';
import { antiviraisNovos } from './antivirais-novos';
import { cardiovascularNovos } from './cardiovascular-novos';
import { dermatologiaNovos } from './dermatologia-novos';
import { emergenciaNovos } from './emergencia-novos';
import { endocrinologiaNovos } from './endocrinologia-novos';
import { gastrointestinalNovos } from './gastrointestinal-novos';
import { ginecologiaNovos } from './ginecologia-novos';
import { hematologiaNovos } from './hematologia-novos';
import { hepatologiaNovos } from './hepatologia-novos';
import { imunobiologicos } from './imunobiologicos';
import { infectologiaNovos } from './infectologia-novos';
import { nefrologiaNovos } from './nefrologia-novos';
import { neurologicosNovos } from './neurologicos-novos';
import { oftalmologiaNovos } from './oftalmologia-novos';
import { oncologiaSuporte } from './oncologia-suporte';
import { oncologiaQuimioterapia } from './oncologia-quimioterapia';
import { pediatriaNovos } from './pediatria-novos';
import { pneumologiaNovos } from './pneumologia-novos';
import { psiquiatriaNovos } from './psiquiatria-novos';
import { reumatologiaNovos } from './reumatologia-novos';
import { vitaminasSuplementos } from './vitaminas-suplementos';
import { urologiaNovos } from './urologia-novos';
import { antidotosNovos } from './antidotos-novos';

// Consolidar todos os medicamentos da expansão
export const medicamentosExpansao1000 = [
  ...analgesicosNovos,
  ...anestesiaNovos,
  ...anticoagulantesNovos,
  ...antiHistaminicosNovos,
  ...antibioticosAvancados,
  ...antidiabeticosNovos,
  ...antifungicosNovos,
  ...antiparasitariosNovos,
  ...antiviraisNovos,
  ...cardiovascularNovos,
  ...dermatologiaNovos,
  ...emergenciaNovos,
  ...endocrinologiaNovos,
  ...gastrointestinalNovos,
  ...ginecologiaNovos,
  ...hematologiaNovos,
  ...hepatologiaNovos,
  ...imunobiologicos,
  ...infectologiaNovos,
  ...nefrologiaNovos,
  ...neurologicosNovos,
  ...oftalmologiaNovos,
  ...oncologiaSuporte,
  ...oncologiaQuimioterapia,
  ...pediatriaNovos,
  ...pneumologiaNovos,
  ...psiquiatriaNovos,
  ...reumatologiaNovos,
  ...vitaminasSuplementos,
  ...urologiaNovos,
  ...antidotosNovos,
];

// Re-exportar módulos individuais
export { analgesicosNovos } from './analgesicos-novos';
export { anestesiaNovos } from './anestesia-novos';
export { anticoagulantesNovos } from './anticoagulantes-novos';
export { antiHistaminicosNovos } from './anti-histaminicos-novos';
export { antibioticosAvancados } from './antibioticos-avancados';
export { antidiabeticosNovos } from './antidiabeticos-novos';
export { antifungicosNovos } from './antifungicos-novos';
export { antiparasitariosNovos } from './antiparasitarios-novos';
export { antiviraisNovos } from './antivirais-novos';
export { cardiovascularNovos } from './cardiovascular-novos';
export { dermatologiaNovos } from './dermatologia-novos';
export { emergenciaNovos } from './emergencia-novos';
export { endocrinologiaNovos } from './endocrinologia-novos';
export { gastrointestinalNovos } from './gastrointestinal-novos';
export { ginecologiaNovos } from './ginecologia-novos';
export { hematologiaNovos } from './hematologia-novos';
export { hepatologiaNovos } from './hepatologia-novos';
export { imunobiologicos } from './imunobiologicos';
export { infectologiaNovos } from './infectologia-novos';
export { nefrologiaNovos } from './nefrologia-novos';
export { neurologicosNovos } from './neurologicos-novos';
export { oftalmologiaNovos } from './oftalmologia-novos';
export { oncologiaSuporte } from './oncologia-suporte';
export { oncologiaQuimioterapia } from './oncologia-quimioterapia';
export { pediatriaNovos } from './pediatria-novos';
export { pneumologiaNovos } from './pneumologia-novos';
export { psiquiatriaNovos } from './psiquiatria-novos';
export { reumatologiaNovos } from './reumatologia-novos';
export { vitaminasSuplementos } from './vitaminas-suplementos';
export { urologiaNovos } from './urologia-novos';
export { antidotosNovos } from './antidotos-novos';

// Estatísticas
export const expansao1000Stats = {
  totalMedicamentos: medicamentosExpansao1000.length,
  porCategoria: {
    analgesicos: analgesicosNovos.length,
    anestesia: anestesiaNovos.length,
    anticoagulantes: anticoagulantesNovos.length,
    antiHistaminicos: antiHistaminicosNovos.length,
    antibioticos: antibioticosAvancados.length,
    antidiabeticos: antidiabeticosNovos.length,
    antifungicos: antifungicosNovos.length,
    antiparasitarios: antiparasitariosNovos.length,
    antivirais: antiviraisNovos.length,
    cardiovascular: cardiovascularNovos.length,
    dermatologia: dermatologiaNovos.length,
    emergencia: emergenciaNovos.length,
    endocrinologia: endocrinologiaNovos.length,
    gastrointestinal: gastrointestinalNovos.length,
    ginecologia: ginecologiaNovos.length,
    hematologia: hematologiaNovos.length,
    hepatologia: hepatologiaNovos.length,
    imunobiologicos: imunobiologicos.length,
    infectologia: infectologiaNovos.length,
    nefrologia: nefrologiaNovos.length,
    neurologicos: neurologicosNovos.length,
    oftalmologia: oftalmologiaNovos.length,
    oncologiaSuporte: oncologiaSuporte.length,
    oncologiaQuimioterapia: oncologiaQuimioterapia.length,
    pediatria: pediatriaNovos.length,
    pneumologia: pneumologiaNovos.length,
    psiquiatria: psiquiatriaNovos.length,
    reumatologia: reumatologiaNovos.length,
    vitaminasSuplementos: vitaminasSuplementos.length,
    urologia: urologiaNovos.length,
    antidotos: antidotosNovos.length,
  },
  versao: '1.13.0',
  dataAtualizacao: '2026-01',
};

import { EmergencyDrug } from '../types';
import { drogasAntidotos } from './drogas-antidotos';
import { drogasEmergenciaGeral } from './drogas-emergencia-geral';
import { drogasCompatibilidade } from './drogas-compatibilidade';
import { drogasRSI } from './drogas-rsi';
import { drogasVasoativas } from './drogas-vasoativas';
import { drogasRespiratorioMetabolico } from './drogas-respiratorio-metabolico';

export const allEmergencyDrugs: EmergencyDrug[] = [
  ...drogasVasoativas,
  ...drogasRSI,
  ...drogasAntidotos,
  ...drogasEmergenciaGeral,
  ...drogasCompatibilidade,
  ...drogasRespiratorioMetabolico,
];

export function getDrugById(id: string): EmergencyDrug | undefined {
  return allEmergencyDrugs.find((drug) => drug.id === id);
}

export const emergencyDrugCategories = ['vasoativa', 'rsi', 'antidoto', 'antiarritmico', 'sedacao', 'analgesico', 'trombolitico', 'anticoagulante', 'anticonvulsivante', 'eletrolitico', 'outro'] as const;

export type EmergencyDrugCategoryKey = (typeof emergencyDrugCategories)[number];

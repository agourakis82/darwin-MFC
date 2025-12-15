/**
 * DATABASE DE INTERAÇÕES MEDICAMENTOSAS - DARWIN-MFC
 * ===================================================
 * Interações medicamentosas clinicamente significativas
 * Baseado em referências: UpToDate, Micromedex, Lexicomp
 */

export type GravidadeInteracao = 'leve' | 'moderada' | 'grave' | 'contraindicada';
export type MecanismoInteracao = 
  | 'farmacocinetico_absorcao'
  | 'farmacocinetico_metabolismo' 
  | 'farmacocinetico_excrecao'
  | 'farmacodinamico_sinergismo'
  | 'farmacodinamico_antagonismo'
  | 'desconhecido';

export interface InteracaoMedicamentosa {
  id: string;
  medicamento1: string;
  medicamento2: string;
  gravidade: GravidadeInteracao;
  mecanismo: MecanismoInteracao;
  efeito: string;
  conduta: string;
  evidencia: 'alta' | 'moderada' | 'baixa';
  fontes: string[];
}

export const interacoesMedicamentosas: InteracaoMedicamentosa[] = [
  // === ANTICOAGULANTES ===
  {
    id: 'varfarina-aas',
    medicamento1: 'varfarina',
    medicamento2: 'aas',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento significativo do risco de sangramento, incluindo hemorragia intracraniana',
    conduta: 'Monitorar INR rigorosamente. Se dupla antiagregação necessária, considerar proteção gástrica',
    evidencia: 'alta',
    fontes: ['UpToDate', 'CHEST Guidelines'],
  },
  {
    id: 'varfarina-aines',
    medicamento1: 'varfarina',
    medicamento2: 'ibuprofeno',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento do risco de sangramento GI e alteração do INR',
    conduta: 'Evitar AINEs. Se necessário, usar por tempo mínimo com IBP. Monitorar INR',
    evidencia: 'alta',
    fontes: ['Micromedex', 'Lexicomp'],
  },
  {
    id: 'varfarina-smxtmp',
    medicamento1: 'varfarina',
    medicamento2: 'sulfametoxazol-trimetoprima',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento do INR por inibição do metabolismo da varfarina (CYP2C9)',
    conduta: 'Monitorar INR a cada 2-3 dias. Considerar reduzir dose de varfarina em 25-50%',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'enoxaparina-aines',
    medicamento1: 'enoxaparina',
    medicamento2: 'ibuprofeno',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento do risco de sangramento',
    conduta: 'Evitar se possível. Monitorar sinais de sangramento',
    evidencia: 'alta',
    fontes: ['Micromedex'],
  },

  // === ANTIDIABÉTICOS ===
  {
    id: 'metformina-contraste',
    medicamento1: 'metformina',
    medicamento2: 'contraste-iodado',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco de acidose lática por nefrotoxicidade do contraste',
    conduta: 'Suspender metformina 48h antes e após uso de contraste. Hidratar o paciente',
    evidencia: 'alta',
    fontes: ['ACR Guidelines', 'UpToDate'],
  },
  {
    id: 'metformina-alcool',
    medicamento1: 'metformina',
    medicamento2: 'alcool',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento do risco de acidose lática e hipoglicemia',
    conduta: 'Orientar moderação no consumo de álcool',
    evidencia: 'moderada',
    fontes: ['UpToDate'],
  },
  {
    id: 'insulina-betabloqueador',
    medicamento1: 'insulina-nph',
    medicamento2: 'propranolol',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_antagonismo',
    efeito: 'Mascara sintomas de hipoglicemia (tremor, taquicardia)',
    conduta: 'Orientar paciente sobre sintomas de hipoglicemia que persistem (sudorese, fome)',
    evidencia: 'alta',
    fontes: ['UpToDate', 'ADA Guidelines'],
  },

  // === CARDIOVASCULAR ===
  {
    id: 'ieca-potassio',
    medicamento1: 'enalapril',
    medicamento2: 'cloreto-potassio',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Hipercalemia potencialmente fatal',
    conduta: 'Evitar suplementação de potássio. Se necessário, monitorar potássio sérico frequentemente',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Micromedex'],
  },
  {
    id: 'ieca-espironolactona',
    medicamento1: 'enalapril',
    medicamento2: 'espironolactona',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco de hipercalemia, especialmente em DRC',
    conduta: 'Monitorar potássio e creatinina. Considerar doses baixas de espironolactona (25mg)',
    evidencia: 'alta',
    fontes: ['ACC/AHA IC Guidelines'],
  },
  {
    id: 'ieca-aines',
    medicamento1: 'enalapril',
    medicamento2: 'ibuprofeno',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_excrecao',
    efeito: 'Redução do efeito anti-hipertensivo e risco de IRA',
    conduta: 'Evitar uso prolongado de AINEs. Monitorar PA e função renal',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'digoxina-amiodarona',
    medicamento1: 'digoxina',
    medicamento2: 'amiodarona',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_excrecao',
    efeito: 'Aumento dos níveis de digoxina (até 100%), risco de toxicidade',
    conduta: 'Reduzir dose de digoxina em 50%. Monitorar digoxinemia e sinais de toxicidade',
    evidencia: 'alta',
    fontes: ['Micromedex', 'UpToDate'],
  },
  {
    id: 'sinvastatina-amiodarona',
    medicamento1: 'sinvastatina',
    medicamento2: 'amiodarona',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento do risco de miopatia/rabdomiólise',
    conduta: 'Limitar sinvastatina a 20mg/dia ou trocar para outra estatina (atorvastatina, rosuvastatina)',
    evidencia: 'alta',
    fontes: ['FDA Safety Communication', 'UpToDate'],
  },
  {
    id: 'clopidogrel-omeprazol',
    medicamento1: 'clopidogrel',
    medicamento2: 'omeprazol',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Redução da ativação do clopidogrel por inibição de CYP2C19',
    conduta: 'Preferir pantoprazol ou esomeprazol se IBP necessário',
    evidencia: 'moderada',
    fontes: ['FDA Warning', 'UpToDate'],
  },

  // === PSICOFÁRMACOS ===
  {
    id: 'fluoxetina-imao',
    medicamento1: 'fluoxetina',
    medicamento2: 'selegilina',
    gravidade: 'contraindicada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Síndrome serotoninérgica potencialmente fatal',
    conduta: 'NUNCA usar concomitante. Aguardar 5 semanas após suspensão de fluoxetina para iniciar IMAO',
    evidencia: 'alta',
    fontes: ['UpToDate', 'CANMAT Guidelines'],
  },
  {
    id: 'fluoxetina-tramadol',
    medicamento1: 'fluoxetina',
    medicamento2: 'tramadol',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco de síndrome serotoninérgica e convulsões',
    conduta: 'Evitar associação. Se necessário, usar dose baixa de tramadol com monitoramento',
    evidencia: 'alta',
    fontes: ['Micromedex', 'UpToDate'],
  },
  {
    id: 'litio-aines',
    medicamento1: 'litio',
    medicamento2: 'ibuprofeno',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_excrecao',
    efeito: 'Aumento dos níveis de lítio, risco de toxicidade',
    conduta: 'Evitar AINEs. Se necessário, monitorar litemia. Preferir paracetamol',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'litio-ieca',
    medicamento1: 'litio',
    medicamento2: 'enalapril',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_excrecao',
    efeito: 'Aumento dos níveis de lítio, risco de toxicidade',
    conduta: 'Monitorar litemia com frequência. Considerar alternativa anti-hipertensiva',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Micromedex'],
  },
  {
    id: 'litio-diuretico',
    medicamento1: 'litio',
    medicamento2: 'hidroclorotiazida',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_excrecao',
    efeito: 'Aumento dos níveis de lítio por redução da excreção renal',
    conduta: 'Evitar tiazídicos com lítio. Se necessário, reduzir dose de lítio e monitorar',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'benzodiazepino-opioides',
    medicamento1: 'diazepam',
    medicamento2: 'tramadol',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Depressão respiratória, sedação profunda, risco de morte',
    conduta: 'Evitar combinação. Se inevitável, usar doses mínimas com monitoramento',
    evidencia: 'alta',
    fontes: ['FDA Boxed Warning', 'CDC Guidelines'],
  },

  // === ANTIBIÓTICOS ===
  {
    id: 'azitromicina-qt',
    medicamento1: 'azitromicina',
    medicamento2: 'amiodarona',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Prolongamento QT aditivo, risco de Torsades de Pointes',
    conduta: 'Evitar combinação. Se necessário, monitorar ECG',
    evidencia: 'alta',
    fontes: ['FDA Safety Communication', 'UpToDate'],
  },
  {
    id: 'fluoroquinolona-anticoagulante',
    medicamento1: 'ciprofloxacino',
    medicamento2: 'varfarina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento do INR',
    conduta: 'Monitorar INR durante tratamento com fluoroquinolona',
    evidencia: 'alta',
    fontes: ['Micromedex', 'Lexicomp'],
  },
  {
    id: 'metronidazol-alcool',
    medicamento1: 'metronidazol',
    medicamento2: 'alcool',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Reação dissulfiram-like: náusea, vômito, cefaleia, rubor',
    conduta: 'Orientar abstinência de álcool durante tratamento e até 48h após',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'quinolona-ferro',
    medicamento1: 'ciprofloxacino',
    medicamento2: 'sulfato-ferroso',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_absorcao',
    efeito: 'Redução significativa da absorção do antibiótico',
    conduta: 'Separar administração em pelo menos 2h (antibiótico primeiro)',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Micromedex'],
  },

  // === INTERAÇÕES COM ALIMENTOS/SUPLEMENTOS ===
  {
    id: 'levotiroxina-calcio',
    medicamento1: 'levotiroxina',
    medicamento2: 'carbonato-calcio',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_absorcao',
    efeito: 'Redução da absorção de levotiroxina',
    conduta: 'Separar administração em pelo menos 4h',
    evidencia: 'alta',
    fontes: ['ATA Guidelines', 'UpToDate'],
  },
  {
    id: 'levotiroxina-ferro',
    medicamento1: 'levotiroxina',
    medicamento2: 'sulfato-ferroso',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_absorcao',
    efeito: 'Redução da absorção de levotiroxina',
    conduta: 'Separar administração em pelo menos 4h',
    evidencia: 'alta',
    fontes: ['ATA Guidelines', 'UpToDate'],
  },
  {
    id: 'bifosfonato-calcio',
    medicamento1: 'alendronato',
    medicamento2: 'carbonato-calcio',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_absorcao',
    efeito: 'Redução quase completa da absorção do bifosfonato',
    conduta: 'Tomar bifosfonato em jejum. Cálcio apenas após 30-60min',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },

  // === OUTRAS INTERAÇÕES IMPORTANTES ===
  {
    id: 'fenitoina-acido-folico',
    medicamento1: 'fenitoina',
    medicamento2: 'acido-folico',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_antagonismo',
    efeito: 'Ácido fólico pode reduzir níveis de fenitoína; fenitoína reduz folato',
    conduta: 'Suplementar folato, mas monitorar níveis de fenitoína',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'carbamazepina-contraceptivos',
    medicamento1: 'carbamazepina',
    medicamento2: 'etinilestradiol',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Indução enzimática reduz eficácia contraceptiva',
    conduta: 'Usar método contraceptivo adicional ou alternativo (DIU, injetável)',
    evidencia: 'alta',
    fontes: ['WHO MEC', 'FSRH Guidelines'],
  },
  {
    id: 'corticoide-aines',
    medicamento1: 'prednisona',
    medicamento2: 'ibuprofeno',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento do risco de úlcera péptica e sangramento GI',
    conduta: 'Usar proteção gástrica (IBP). Evitar combinação prolongada',
    evidencia: 'alta',
    fontes: ['UpToDate', 'ACG Guidelines'],
  },
  {
    id: 'alopurinol-azatioprina',
    medicamento1: 'alopurinol',
    medicamento2: 'azatioprina',
    gravidade: 'contraindicada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Alopurinol inibe metabolismo de azatioprina, causando mielossupressão grave',
    conduta: 'Reduzir dose de azatioprina em 75% se alopurinol necessário',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Micromedex'],
  },
  {
    id: 'potassio-trimetoprima',
    medicamento1: 'cloreto-potassio',
    medicamento2: 'sulfametoxazol-trimetoprima',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Hipercalemia (trimetoprima bloqueia canais ENaC)',
    conduta: 'Evitar suplementação de potássio. Monitorar potássio sérico',
    evidencia: 'alta',
    fontes: ['NEJM', 'UpToDate'],
  },

  // === ESTATINAS ===
  {
    id: 'sinvastatina-claritromicina',
    medicamento1: 'sinvastatina',
    medicamento2: 'claritromicina',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento de 10x nos níveis de sinvastatina, risco de rabdomiólise',
    conduta: 'CONTRAINDICADO. Usar pravastatina ou rosuvastatina durante antibioticoterapia',
    evidencia: 'alta',
    fontes: ['FDA', 'UpToDate'],
  },
  {
    id: 'sinvastatina-diltiazem',
    medicamento1: 'sinvastatina',
    medicamento2: 'diltiazem',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento dos níveis de sinvastatina, risco de miopatia',
    conduta: 'Limitar sinvastatina a 10mg/dia ou trocar estatina',
    evidencia: 'alta',
    fontes: ['FDA', 'Micromedex'],
  },
  {
    id: 'atorvastatina-colchicina',
    medicamento1: 'atorvastatina',
    medicamento2: 'colchicina',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco aumentado de miopatia e rabdomiólise',
    conduta: 'Monitorar sintomas musculares. Considerar estatina de menor risco',
    evidencia: 'moderada',
    fontes: ['UpToDate', 'Lexicomp'],
  },

  // === HIPOGLICEMIANTES ===
  {
    id: 'glibenclamida-claritromicina',
    medicamento1: 'glibenclamida',
    medicamento2: 'claritromicina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento do efeito hipoglicemiante',
    conduta: 'Monitorar glicemia. Considerar redução temporária de sulfoniluréia',
    evidencia: 'moderada',
    fontes: ['Micromedex'],
  },
  {
    id: 'metformina-ieca',
    medicamento1: 'metformina',
    medicamento2: 'enalapril',
    gravidade: 'leve',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Possível aumento leve do risco de acidose lática em DRC avançada',
    conduta: 'Monitorar função renal. Combinação geralmente segura',
    evidencia: 'baixa',
    fontes: ['UpToDate'],
  },

  // === ANTIDEPRESSIVOS ===
  {
    id: 'sertralina-tramadol',
    medicamento1: 'sertralina',
    medicamento2: 'tramadol',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco de síndrome serotoninérgica',
    conduta: 'Evitar combinação. Se necessário, monitorar de perto',
    evidencia: 'alta',
    fontes: ['UpToDate', 'CANMAT'],
  },
  {
    id: 'amitriptilina-haloperidol',
    medicamento1: 'amitriptilina',
    medicamento2: 'haloperidol',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento de efeitos anticolinérgicos e sedação',
    conduta: 'Usar doses mais baixas. Monitorar efeitos anticolinérgicos',
    evidencia: 'alta',
    fontes: ['Lexicomp'],
  },
  {
    id: 'fluoxetina-carbamazepina',
    medicamento1: 'fluoxetina',
    medicamento2: 'carbamazepina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Carbamazepina reduz níveis de fluoxetina; fluoxetina pode aumentar carbamazepina',
    conduta: 'Monitorar resposta clínica e níveis de carbamazepina',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Micromedex'],
  },

  // === ANTICONVULSIVANTES ===
  {
    id: 'valproato-carbamazepina',
    medicamento1: 'valproato',
    medicamento2: 'carbamazepina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Carbamazepina reduz níveis de valproato por indução enzimática',
    conduta: 'Pode ser necessário aumentar dose de valproato. Monitorar níveis',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Epilepsy Foundation'],
  },
  {
    id: 'fenitoina-carbamazepina',
    medicamento1: 'fenitoina',
    medicamento2: 'carbamazepina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Indução enzimática mútua, redução dos níveis de ambos',
    conduta: 'Monitorar níveis séricos de ambos os fármacos',
    evidencia: 'alta',
    fontes: ['UpToDate', 'Lexicomp'],
  },
  {
    id: 'fenobarbital-contraceptivo',
    medicamento1: 'fenobarbital',
    medicamento2: 'etinilestradiol',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Redução significativa da eficácia contraceptiva',
    conduta: 'Usar método não-hormonal ou alta dose de estrogênio',
    evidencia: 'alta',
    fontes: ['WHO MEC', 'FSRH'],
  },

  // === ANTI-HIPERTENSIVOS ===
  {
    id: 'losartana-espironolactona',
    medicamento1: 'losartana',
    medicamento2: 'espironolactona',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Risco aumentado de hipercalemia',
    conduta: 'Monitorar potássio sérico regularmente, especialmente em idosos e DRC',
    evidencia: 'alta',
    fontes: ['ESC Guidelines', 'UpToDate'],
  },
  {
    id: 'anlodipino-sinvastatina',
    medicamento1: 'anlodipino',
    medicamento2: 'sinvastatina',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento dos níveis de sinvastatina',
    conduta: 'Limitar sinvastatina a 20mg/dia quando usado com anlodipino',
    evidencia: 'alta',
    fontes: ['FDA', 'Micromedex'],
  },
  {
    id: 'propranolol-verapamil',
    medicamento1: 'propranolol',
    medicamento2: 'verapamil',
    gravidade: 'grave',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Bloqueio AV, bradicardia grave, hipotensão, ICC',
    conduta: 'Evitar combinação. Monitorar ECG se absolutamente necessário',
    evidencia: 'alta',
    fontes: ['UpToDate', 'ACC Guidelines'],
  },

  // === GOTA E ARTRITE ===
  {
    id: 'alopurinol-ampicilina',
    medicamento1: 'alopurinol',
    medicamento2: 'ampicilina',
    gravidade: 'moderada',
    mecanismo: 'desconhecido',
    efeito: 'Aumento do risco de rash cutâneo',
    conduta: 'Usar amoxicilina preferencialmente. Monitorar pele',
    evidencia: 'moderada',
    fontes: ['Lexicomp'],
  },
  {
    id: 'colchicina-claritromicina',
    medicamento1: 'colchicina',
    medicamento2: 'claritromicina',
    gravidade: 'contraindicada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento tóxico dos níveis de colchicina, risco de morte',
    conduta: 'CONTRAINDICADO em pacientes com DRC ou DH. Evitar em todos',
    evidencia: 'alta',
    fontes: ['FDA Warning', 'UpToDate'],
  },

  // === ANTICOAGULANTES ADICIONAIS ===
  {
    id: 'aas-clopidogrel',
    medicamento1: 'aas',
    medicamento2: 'clopidogrel',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_sinergismo',
    efeito: 'Aumento do risco de sangramento (combinação intencional em SCA)',
    conduta: 'Uso terapêutico em SCA/AVC. Proteção gástrica com IBP',
    evidencia: 'alta',
    fontes: ['ACC/AHA SCA Guidelines'],
  },
  {
    id: 'rivaroxabana-amiodarona',
    medicamento1: 'rivaroxabana',
    medicamento2: 'amiodarona',
    gravidade: 'moderada',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento moderado dos níveis de rivaroxabana',
    conduta: 'Monitorar sinais de sangramento. Geralmente não requer ajuste',
    evidencia: 'moderada',
    fontes: ['EMA', 'UpToDate'],
  },

  // === RESPIRATÓRIO ===
  {
    id: 'teofilina-claritromicina',
    medicamento1: 'teofilina',
    medicamento2: 'claritromicina',
    gravidade: 'grave',
    mecanismo: 'farmacocinetico_metabolismo',
    efeito: 'Aumento dos níveis de teofilina, risco de toxicidade',
    conduta: 'Monitorar níveis de teofilina. Considerar azitromicina como alternativa',
    evidencia: 'alta',
    fontes: ['Micromedex', 'UpToDate'],
  },
  {
    id: 'salbutamol-propranolol',
    medicamento1: 'salbutamol',
    medicamento2: 'propranolol',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_antagonismo',
    efeito: 'Betabloqueadores reduzem efeito broncodilatador',
    conduta: 'Usar betabloqueador cardiosseletivo (bisoprolol, metoprolol) em baixa dose',
    evidencia: 'alta',
    fontes: ['GINA Guidelines', 'UpToDate'],
  },

  // === TIREÓIDE ===
  {
    id: 'levotiroxina-omeprazol',
    medicamento1: 'levotiroxina',
    medicamento2: 'omeprazol',
    gravidade: 'leve',
    mecanismo: 'farmacocinetico_absorcao',
    efeito: 'Redução modesta da absorção de levotiroxina',
    conduta: 'Tomar levotiroxina em jejum, 30-60min antes do IBP',
    evidencia: 'moderada',
    fontes: ['ATA Guidelines', 'Lexicomp'],
  },
  {
    id: 'amiodarona-levotiroxina',
    medicamento1: 'amiodarona',
    medicamento2: 'levotiroxina',
    gravidade: 'moderada',
    mecanismo: 'farmacodinamico_antagonismo',
    efeito: 'Amiodarona causa hipo ou hipertireoidismo, interfere com hormônios',
    conduta: 'Monitorar função tireoidiana a cada 3-6 meses',
    evidencia: 'alta',
    fontes: ['ATA Guidelines', 'UpToDate'],
  },
];

// Funções auxiliares
export function buscarInteracoes(medicamentoId: string): InteracaoMedicamentosa[] {
  return interacoesMedicamentosas.filter(
    i => i.medicamento1 === medicamentoId || i.medicamento2 === medicamentoId
  );
}

export function verificarInteracaoPar(med1: string, med2: string): InteracaoMedicamentosa | undefined {
  return interacoesMedicamentosas.find(
    i => (i.medicamento1 === med1 && i.medicamento2 === med2) ||
         (i.medicamento1 === med2 && i.medicamento2 === med1)
  );
}

export function verificarInteracoesMultiplas(medicamentos: string[]): InteracaoMedicamentosa[] {
  const interacoesEncontradas: InteracaoMedicamentosa[] = [];
  
  for (let i = 0; i < medicamentos.length; i++) {
    for (let j = i + 1; j < medicamentos.length; j++) {
      const interacao = verificarInteracaoPar(medicamentos[i], medicamentos[j]);
      if (interacao) {
        interacoesEncontradas.push(interacao);
      }
    }
  }
  
  return interacoesEncontradas;
}

export function getInteracoesPorGravidade(gravidade: GravidadeInteracao): InteracaoMedicamentosa[] {
  return interacoesMedicamentosas.filter(i => i.gravidade === gravidade);
}

export function getEstatisticasInteracoes() {
  return {
    total: interacoesMedicamentosas.length,
    porGravidade: {
      contraindicada: interacoesMedicamentosas.filter(i => i.gravidade === 'contraindicada').length,
      grave: interacoesMedicamentosas.filter(i => i.gravidade === 'grave').length,
      moderada: interacoesMedicamentosas.filter(i => i.gravidade === 'moderada').length,
      leve: interacoesMedicamentosas.filter(i => i.gravidade === 'leve').length,
    },
    porEvidencia: {
      alta: interacoesMedicamentosas.filter(i => i.evidencia === 'alta').length,
      moderada: interacoesMedicamentosas.filter(i => i.evidencia === 'moderada').length,
      baixa: interacoesMedicamentosas.filter(i => i.evidencia === 'baixa').length,
    },
  };
}


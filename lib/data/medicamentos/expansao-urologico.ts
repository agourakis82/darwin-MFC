/**
 * EXPANSÃO UROLÓGICA/RENAL - DARWIN-MFC
 * ======================================
 *
 * Medicamentos urológicos e nefrológicos para APS.
 * Inclui alfa-bloqueadores, anticolinérgicos vesicais, inibidores 5α-redutase.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosUrologicos: Partial<Medicamento>[] = [
  // ============================================================================
  // HIPERPLASIA PROSTÁTICA BENIGNA
  // ============================================================================
  {
    id: 'tansulosina',
    nomeGenerico: 'Tansulosina',
    nomesComerciais: ['Secotex', 'Flomax', 'Omnic'],
    atcCode: 'G04CA02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'alfabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,4mg', disponivelSUS: false }
    ],
    indicacoes: ['HPB sintomática', 'STUI por HPB', 'Litíase ureteral distal (off-label)'],
    mecanismoAcao: 'Bloqueador alfa-1A seletivo que relaxa músculo liso prostático e colo vesical.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: { dose: '0,4mg', frequencia: '1x/dia após refeição' }
      }
    ],
    contraindicacoes: ['Hipotensão ortostática grave', 'Cirurgia catarata (síndrome íris flácida)'],
    precaucoes: ['Hipotensão ortostática inicial', 'Síndrome íris flácida intraoperatória'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Ejaculação retrógrada', 'Rinite'],
      graves: ['Hipotensão', 'Síncope', 'Priapismo (raro)']
    },
    interacoes: [
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensão aditiva', conduta: 'Iniciar dose baixa' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumento níveis tansulosina', conduta: 'Monitorar' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Não aplicável - medicamento masculino' }
  },

  {
    id: 'doxazosina',
    nomeGenerico: 'Doxazosina',
    nomesComerciais: ['Carduran', 'Cartura'],
    atcCode: 'G04CA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'alfabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true }
    ],
    indicacoes: ['HPB', 'HAS (uso secundário)', 'STUI'],
    mecanismoAcao: 'Bloqueador alfa-1 que relaxa músculo liso vascular e prostático.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: { dose: '1mg inicial, titular até 4-8mg', frequencia: '1x/dia ao deitar' }
      }
    ],
    contraindicacoes: ['Hipotensão ortostática grave'],
    precaucoes: ['Iniciar com dose baixa', 'Primeira dose ao deitar'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia', 'Fadiga', 'Edema periférico'],
      graves: ['Hipotensão postural', 'Síncope', 'Priapismo']
    },
    interacoes: [
      { medicamento: 'IPDE5', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Iniciar IPDE5 dose baixa' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  {
    id: 'finasterida',
    nomeGenerico: 'Finasterida',
    nomesComerciais: ['Proscar', 'Propecia', 'Finalop'],
    atcCode: 'G04CB01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false }
    ],
    indicacoes: ['HPB', 'Alopecia androgenética (1mg)', 'Prevenção retenção urinária'],
    mecanismoAcao: 'Inibidor 5α-redutase tipo 2 que reduz DHT e volume prostático.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: { dose: '5mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Alopecia',
        adultos: { dose: '1mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Mulheres (teratogênico)', 'Crianças', 'Hipersensibilidade'],
    precaucoes: ['Reduz PSA em 50%', 'Efeito máximo 6-12 meses', 'Mulheres não devem manipular'],
    efeitosAdversos: {
      comuns: ['Disfunção erétil', 'Diminuição libido', 'Ginecomastia'],
      graves: ['Depressão', 'Ideação suicida (raro)', 'Síndrome pós-finasterida']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado em mulheres' }
  },

  {
    id: 'dutasterida',
    nomeGenerico: 'Dutasterida',
    nomesComerciais: ['Avodart', 'Dutas'],
    atcCode: 'G04CB02',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,5mg', disponivelSUS: false }
    ],
    indicacoes: ['HPB', 'Alopecia androgenética (off-label)'],
    mecanismoAcao: 'Inibidor 5α-redutase tipo 1 e 2, redução mais potente de DHT.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: { dose: '0,5mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Mulheres', 'Crianças', 'IH grave'],
    precaucoes: ['Meia-vida longa (5 semanas)', 'Doar sangue 6 meses após'],
    efeitosAdversos: {
      comuns: ['Disfunção sexual', 'Ginecomastia'],
      graves: ['Similar finasterida', 'Possível aumento câncer mama masculino']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 fortes', gravidade: 'moderada', efeito: 'Aumento níveis', conduta: 'Monitorar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ============================================================================
  // BEXIGA HIPERATIVA
  // ============================================================================
  {
    id: 'oxibutinina',
    nomeGenerico: 'Oxibutinina',
    nomesComerciais: ['Retemic', 'Incontinol'],
    atcCode: 'G04BD04',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Bexiga hiperativa', 'Incontinência urinária urgência', 'Enurese noturna'],
    mecanismoAcao: 'Antimuscarínico que relaxa músculo detrusor e aumenta capacidade vesical.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: { dose: '5mg', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' },
        pediatrico: { dose: '0,1mg/kg/dose', frequencia: '2-3x/dia', idadeMinima: '5 anos' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Retenção urinária', 'Obstrução GI', 'Miastenia gravis'],
    precaucoes: ['Efeitos anticolinérgicos', 'Evitar em idosos (Beers)', 'Calor extremo'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'Visão borrada', 'Sonolência'],
      graves: ['Retenção urinária', 'Confusão mental', 'Taquicardia']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Potencialização', conduta: 'Evitar' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'leve', efeito: 'Aumento níveis', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Supressão lactação' }
  },

  {
    id: 'tolterodina',
    nomeGenerico: 'Tolterodina',
    nomesComerciais: ['Detrusitol', 'Toltrax'],
    atcCode: 'G04BD07',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: ['Bexiga hiperativa', 'Incontinência urgência'],
    mecanismoAcao: 'Antimuscarínico relativamente seletivo para receptores vesicais.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: { dose: '2mg 2x/dia ou 4mg XR 1x/dia', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Retenção urinária', 'Glaucoma ângulo fechado não controlado', 'Gastroparesia'],
    precaucoes: ['Menos efeitos cognitivos que oxibutinina', 'Reduzir dose em IR/IH'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia', 'Constipação'],
      graves: ['Retenção urinária', 'Angiodema']
    },
    interacoes: [
      { medicamento: 'Fluoxetina', gravidade: 'moderada', efeito: 'Aumento tolterodina', conduta: 'Usar dose baixa' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  {
    id: 'mirabegrona',
    nomeGenerico: 'Mirabegrona',
    nomesComerciais: ['Myrbetric', 'Betmiga'],
    atcCode: 'G04BD12',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '50mg', disponivelSUS: false }
    ],
    indicacoes: ['Bexiga hiperativa', 'Alternativa a anticolinérgicos'],
    mecanismoAcao: 'Agonista beta-3 que relaxa músculo detrusor sem efeitos anticolinérgicos.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: { dose: '25-50mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['HAS não controlada grave', 'IR/IH grave'],
    precaucoes: ['Pode elevar PA', 'Monitorar em HAS', 'Ajustar dose em IR/IH'],
    efeitosAdversos: {
      comuns: ['ITU', 'Cefaleia', 'Nasofaringite'],
      graves: ['HAS', 'Retenção urinária']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumento níveis digoxina', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  // ============================================================================
  // DISFUNÇÃO ERÉTIL
  // ============================================================================
  {
    id: 'sildenafila',
    nomeGenerico: 'Sildenafila',
    nomesComerciais: ['Viagra', 'Suvvia'],
    atcCode: 'G04BE03',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: ['Disfunção erétil', 'Hipertensão arterial pulmonar (Revatio)'],
    mecanismoAcao: 'Inibidor PDE5 que aumenta GMPc e fluxo sanguíneo peniano.',
    posologias: [
      {
        indicacao: 'Disfunção erétil',
        adultos: { dose: '50mg inicial, pode ajustar 25-100mg', frequencia: '1h antes atividade sexual' }
      }
    ],
    contraindicacoes: ['Uso de nitratos', 'Hipotensão grave', 'AVC/IAM recente', 'NAION prévia'],
    precaucoes: ['Evitar com alimentos gordurosos', 'Reduzir dose em idosos/IR/IH'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Rubor facial', 'Dispepsia', 'Congestão nasal'],
      graves: ['Priapismo', 'NAION', 'Perda auditiva súbita', 'Hipotensão']
    },
    interacoes: [
      { medicamento: 'Nitratos', gravidade: 'grave', efeito: 'Hipotensão fatal', conduta: 'Contraindicado absoluto' },
      { medicamento: 'Alfabloqueadores', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Iniciar sildenafila 25mg' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumento níveis', conduta: 'Reduzir dose' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Não aplicável' }
  },

  {
    id: 'tadalafila',
    nomeGenerico: 'Tadalafila',
    nomesComerciais: ['Cialis', 'Pramil'],
    atcCode: 'G04BE08',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: ['Disfunção erétil', 'HPB/STUI', 'HAP'],
    mecanismoAcao: 'Inibidor PDE5 de longa duração (36h). Também inibe PDE11.',
    posologias: [
      {
        indicacao: 'DE sob demanda',
        adultos: { dose: '10-20mg', frequencia: 'Antes atividade sexual' }
      },
      {
        indicacao: 'DE/HPB uso diário',
        adultos: { dose: '5mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Nitratos', 'Hipotensão', 'IR grave (ClCr<30) para demanda'],
    precaucoes: ['Não afetado por alimentos', 'Dose diária preferida em HPB'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Dispepsia', 'Mialgia', 'Lombalgia'],
      graves: ['Priapismo', 'NAION', 'Hipotensão']
    },
    interacoes: [
      { medicamento: 'Nitratos', gravidade: 'grave', efeito: 'Hipotensão severa', conduta: 'Contraindicado' },
      { medicamento: 'Doxazosina', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Estabilizar doxazosina antes' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Não aplicável' }
  },

  // ============================================================================
  // INFECÇÃO URINÁRIA
  // ============================================================================
  {
    id: 'nitrofurantoina',
    nomeGenerico: 'Nitrofurantoína',
    nomesComerciais: ['Macrodantina', 'Hantina'],
    atcCode: 'J01XE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitrofurano',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '5mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['ITU baixa não complicada', 'Profilaxia ITU recorrente'],
    mecanismoAcao: 'Dano oxidativo a DNA e ribossomos bacterianos. Concentra na urina.',
    posologias: [
      {
        indicacao: 'Cistite',
        adultos: { dose: '100mg', frequencia: '6/6h ou 12/12h por 5-7 dias' },
        pediatrico: { dose: '5-7mg/kg/dia', frequencia: '6/6h por 7 dias', idadeMinima: '1 mês' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '50-100mg', frequencia: '1x/dia à noite' }
      }
    ],
    contraindicacoes: ['IR (ClCr<60)', 'Gestação a termo (38-42 sem)', 'G6PD deficiência', 'RN < 1 mês'],
    precaucoes: ['Tomar com alimentos', 'Ineficaz em pielonefrite', 'Toxicidade pulmonar crônica'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Urina marrom'],
      graves: ['Fibrose pulmonar', 'Hepatotoxicidade', 'Neuropatia periférica', 'Hemólise (G6PD)']
    },
    interacoes: [
      { medicamento: 'Antiácidos Mg', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Evitar se RN < 1 mês ou G6PD' }
  },

  {
    id: 'fosfomicina',
    nomeGenerico: 'Fosfomicina',
    nomesComerciais: ['Monuril', 'Fosfocin'],
    atcCode: 'J01XX01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'sache', concentracao: '3g', disponivelSUS: true }
    ],
    indicacoes: ['Cistite aguda não complicada em mulheres'],
    mecanismoAcao: 'Inibe MurA na síntese de parede celular. Amplo espectro, dose única.',
    posologias: [
      {
        indicacao: 'Cistite',
        adultos: { dose: '3g dose única', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'IR grave (ClCr<10)'],
    precaucoes: ['Diluir em água', 'Tomar com estômago vazio', 'Pode repetir após 24h se necessário'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Cefaleia'],
      graves: ['Colite por C. difficile (raro)']
    },
    interacoes: [
      { medicamento: 'Metoclopramida', gravidade: 'moderada', efeito: 'Reduz concentração fosfomicina', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  {
    id: 'trimetoprima',
    nomeGenerico: 'Trimetoprima',
    nomesComerciais: ['Bactrim (com SMX)', 'Triglobe'],
    atcCode: 'J01EA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: ['ITU não complicada', 'Profilaxia ITU'],
    mecanismoAcao: 'Inibe diidrofolato redutase bacteriana.',
    posologias: [
      {
        indicacao: 'Cistite',
        adultos: { dose: '100mg', frequencia: '12/12h por 3 dias' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '100mg', frequencia: '1x/dia à noite' }
      }
    ],
    contraindicacoes: ['Anemia megaloblástica', 'IR grave', 'Gestação 1º trimestre'],
    precaucoes: ['Pode elevar potássio', 'Pode elevar creatinina (sem lesão real)'],
    efeitosAdversos: {
      comuns: ['Rash', 'Prurido', 'Náusea'],
      graves: ['Hipercalemia', 'Agranulocitose', 'Síndrome Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade MTX', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  // ============================================================================
  // LITÍASE URINÁRIA
  // ============================================================================
  {
    id: 'citrato-potassio',
    nomeGenerico: 'Citrato de Potássio',
    nomesComerciais: ['Litocit', 'Urocit-K'],
    atcCode: 'A12BA02',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '10mEq', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '1100mg/5ml', disponivelSUS: false }
    ],
    indicacoes: ['Prevenção litíase cálcica', 'Acidose tubular renal', 'Litíase por ácido úrico'],
    mecanismoAcao: 'Alcaliniza urina e aumenta citrato urinário, inibindo cristalização.',
    posologias: [
      {
        indicacao: 'Prevenção litíase',
        adultos: { dose: '20-60mEq/dia', frequencia: 'Dividido em 2-3 doses' }
      }
    ],
    contraindicacoes: ['Hipercalemia', 'IR grave', 'Uso de poupadores potássio'],
    precaucoes: ['Monitorar potássio', 'Ulceração GI com comprimidos'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Desconforto abdominal'],
      graves: ['Hipercalemia', 'Arritmia cardíaca']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K' },
      { medicamento: 'Poupadores K', gravidade: 'grave', efeito: 'Hipercalemia grave', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  {
    id: 'alopurinol-urologico',
    nomeGenerico: 'Alopurinol',
    nomesComerciais: ['Zyloric', 'Allopurinol'],
    atcCode: 'M04AA01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true }
    ],
    indicacoes: ['Litíase por ácido úrico', 'Hiperuricosúria com litíase cálcica', 'Gota'],
    mecanismoAcao: 'Inibe xantina oxidase, reduzindo produção de ácido úrico.',
    posologias: [
      {
        indicacao: 'Litíase úrica',
        adultos: { dose: '100-300mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Crise aguda de gota', 'Hipersensibilidade'],
    precaucoes: ['Iniciar baixo e titular', 'Hidratação', 'HLA-B*5801 em asiáticos'],
    efeitosAdversos: {
      comuns: ['Rash', 'Náusea'],
      graves: ['DRESS', 'Síndrome Stevens-Johnson', 'Vasculite']
    },
    interacoes: [
      { medicamento: 'Azatioprina', gravidade: 'grave', efeito: 'Toxicidade', conduta: 'Reduzir azatioprina 75%' },
      { medicamento: 'Ampicilina', gravidade: 'leve', efeito: 'Aumenta rash', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  // ============================================================================
  // DIURÉTICOS (COMPLEMENTO UROLÓGICO)
  // ============================================================================
  {
    id: 'furosemida-urologia',
    nomeGenerico: 'Furosemida',
    nomesComerciais: ['Lasix', 'Nefrotal'],
    atcCode: 'C03CA01',
    classeTerapeutica: 'diuretico',
    subclasse: 'alca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Edema', 'ICC', 'IRA oligúrica', 'Hipercalcemia aguda'],
    mecanismoAcao: 'Inibe cotransportador Na-K-2Cl no ramo ascendente alça Henle.',
    posologias: [
      {
        indicacao: 'Edema',
        adultos: { dose: '20-80mg', frequencia: '1-2x/dia', doseMaxima: '600mg/dia' },
        pediatrico: { dose: '1-2mg/kg/dose', frequencia: '1-2x/dia', doseMaxima: '6mg/kg/dia' }
      }
    ],
    contraindicacoes: ['Anúria', 'Hipovolemia', 'Hipocalemia grave'],
    precaucoes: ['Monitorar eletrólitos', 'Ototoxicidade em doses altas'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiponatremia', 'Hipomagnesemia', 'Hiperuricemia'],
      graves: ['Ototoxicidade', 'Pancreatite', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Ototoxicidade aditiva', conduta: 'Evitar' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Toxicidade (hipocalemia)', conduta: 'Monitorar K' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumenta níveis Li', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' }
  },

  {
    id: 'espironolactona-urologia',
    nomeGenerico: 'Espironolactona',
    nomesComerciais: ['Aldactone', 'Spiroctan'],
    atcCode: 'C03DA01',
    classeTerapeutica: 'diuretico',
    subclasse: 'poupador_potassio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hiperaldosteronismo', 'ICC', 'Ascite cirrótica', 'Hipertensão resistente'],
    mecanismoAcao: 'Antagonista receptor mineralocorticoide (aldosterona).',
    posologias: [
      {
        indicacao: 'ICC',
        adultos: { dose: '12,5-25mg', frequencia: '1x/dia', doseMaxima: '50mg/dia' }
      },
      {
        indicacao: 'Ascite',
        adultos: { dose: '100-400mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipercalemia', 'Doença de Addison', 'IR grave (ClCr<10)'],
    precaucoes: ['Monitorar potássio', 'Ginecomastia dose-dependente'],
    efeitosAdversos: {
      comuns: ['Ginecomastia', 'Mastalgia', 'Irregularidade menstrual', 'Hipercalemia'],
      graves: ['Arritmias por K', 'Agranulocitose (raro)']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K' },
      { medicamento: 'Suplementos K', gravidade: 'grave', efeito: 'Hipercalemia grave', conduta: 'Evitar' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Metabólito excretado' }
  }
];

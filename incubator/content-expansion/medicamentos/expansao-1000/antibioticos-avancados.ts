/**
 * ANTIBIOTICOS AVANCADOS - DARWIN-MFC EXPANSAO 1000
 * =================================================
 * Antibioticos de nova geracao e reserva terapeutica
 *
 * Referencias:
 * - FDA Prescribing Information
 * - IDSA Guidelines 2024
 * - Sanford Guide to Antimicrobial Therapy
 * - WHO Essential Medicines List 2023
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antibioticosAvancados: Partial<Medicamento>[] = [
  // ============================================================================
  // CEFALOSPORINAS DE 5a GERACAO
  // ============================================================================
  {
    id: 'ceftaroline',
    nomeGenerico: 'Ceftarolina Fosamila',
    nomesComerciais: ['Teflaro', 'Zinforo'],
    atcCode: 'J01DI02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_5g',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '600mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia adquirida na comunidade (CAP) incluindo bacteremia',
      'Infeccoes complicadas de pele e tecidos moles (ABSSSI)',
      'Infeccoes por MRSA',
      'Infeccoes por Streptococcus pneumoniae resistente a penicilina'
    ],
    mecanismoAcao: 'Cefalosporina de 5a geracao com atividade anti-MRSA. Liga-se com alta afinidade a PBP2a (responsavel pela resistencia em MRSA) alem das PBPs convencionais. Bactericida por inibicao da sintese de parede celular.',
    posologias: [
      {
        indicacao: 'Pneumonia comunitaria (CAP)',
        adultos: { dose: '600mg IV', frequencia: '12/12h', doseMaxima: '1200mg/dia', observacoes: 'Infusao em 60 minutos. Duracao: 5-7 dias' },
        pediatrico: { dose: '8-12mg/kg IV', frequencia: '8/8h', idadeMinima: '2 meses', doseMaxima: '400mg/dose' }
      },
      {
        indicacao: 'Infeccoes de pele e tecidos moles (ABSSSI)',
        adultos: { dose: '600mg IV', frequencia: '12/12h', doseMaxima: '1200mg/dia', observacoes: 'Duracao: 5-14 dias' },
        pediatrico: { dose: '8-12mg/kg IV', frequencia: '8/8h', idadeMinima: '2 meses', doseMaxima: '400mg/dose' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ceftarolina ou cefalosporinas',
      'Reacao anafilatica previa a betalactamicos'
    ],
    precaucoes: [
      'Reacao cruzada possivel com alergia a penicilina (usar com cautela se reacao nao anafilatica)',
      'Ajuste de dose em insuficiencia renal',
      'Colite por C. difficile',
      'Convulsoes em pacientes com comprometimento renal ou do SNC'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nauseas', 'Rash cutaneo', 'Cefaleia', 'Prurido'],
      graves: ['Anafilaxia', 'Colite por C. difficile', 'Anemia hemolitica (Coombs positivo)', 'Eosinofilia', 'Convulsoes']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento dos niveis sericos de ceftarolina', conduta: 'Monitorar e considerar ajuste de dose' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Possivel aumento do INR', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '600mg 12/12h' },
      { tfg: '31-50', ajuste: '400mg 12/12h' },
      { tfg: '15-30', ajuste: '300mg 12/12h' },
      { tfg: '<15', ajuste: '200mg 12/12h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao no leite desconhecida, usar com cautela' }
  },
  {
    id: 'ceftobiprole',
    nomeGenerico: 'Ceftobiprole Medocaril',
    nomesComerciais: ['Zevtera', 'Mabelio'],
    atcCode: 'J01DI01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_5g',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia adquirida na comunidade (CAP)',
      'Pneumonia nosocomial (HAP) excluindo VAP',
      'Infeccoes por MRSA',
      'Infeccoes por Enterococcus faecalis'
    ],
    mecanismoAcao: 'Cefalosporina de 5a geracao com amplo espectro incluindo MRSA. Alta afinidade por PBP2a e PBP2x. Atividade contra Gram-positivos incluindo MRSA, Gram-negativos e anaerobios. Nao cobre Pseudomonas aeruginosa adequadamente.',
    posologias: [
      {
        indicacao: 'Pneumonia comunitaria (CAP)',
        adultos: { dose: '500mg IV', frequencia: '8/8h', observacoes: 'Infusao em 2 horas. Duracao: 7-14 dias' }
      },
      {
        indicacao: 'Pneumonia nosocomial (HAP)',
        adultos: { dose: '500mg IV', frequencia: '8/8h', observacoes: 'Infusao em 2 horas. Duracao: 7-14 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ceftobiprole ou betalactamicos',
      'Historia de reacao anafilatica a cefalosporinas'
    ],
    precaucoes: [
      'Ajuste necessario em insuficiencia renal',
      'Monitorar funcao renal',
      'Risco de colite por C. difficile',
      'Usar com cautela em pacientes com historico de convulsoes'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Vomitos', 'Diarreia', 'Disgeusia (alteracao do paladar)', 'Reacoes no local da infusao'],
      graves: ['Anafilaxia', 'Colite pseudomembranosa', 'Convulsoes', 'Agranulocitose']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento da exposicao a ceftobiprole', conduta: 'Nao coadministrar' },
      { medicamento: 'Medicamentos nefrotoxicos', gravidade: 'moderada', efeito: 'Aumento do risco de nefrotoxicidade', conduta: 'Monitorar funcao renal' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '500mg 8/8h' },
      { tfg: '30-50', ajuste: '500mg 12/12h' },
      { tfg: '<30', ajuste: '250mg 12/12h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' }
  },

  // ============================================================================
  // CEFALOSPORINAS COM INIBIDORES DE BETALACTAMASE
  // ============================================================================
  {
    id: 'ceftazidima-avibactam',
    nomeGenerico: 'Ceftazidima + Avibactam',
    nomesComerciais: ['Avycaz', 'Zavicefta'],
    atcCode: 'J01DD52',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_inibidor',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '2g/0.5g', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes por Enterobacterales produtores de ESBL',
      'Infeccoes por Enterobacterales produtores de carbapenemases (KPC)',
      'Pneumonia nosocomial incluindo VAP',
      'Infeccoes intra-abdominais complicadas (com metronidazol)',
      'Infeccoes urinarias complicadas incluindo pielonefrite'
    ],
    mecanismoAcao: 'Combinacao de cefalosporina de 3a geracao (ceftazidima) com inibidor de betalactamase nao-betalactamico (avibactam). Avibactam inibe betalactamases classe A (ESBL, KPC), classe C (AmpC) e algumas classe D (OXA-48). NAO inibe metalobetalactamases (NDM, VIM, IMP).',
    posologias: [
      {
        indicacao: 'Infeccoes por MDR/XDR Gram-negativos',
        adultos: { dose: '2g/0.5g IV', frequencia: '8/8h', doseMaxima: '7.5g/dia', observacoes: 'Infusao em 2 horas. Duracao: 5-14 dias dependendo do sitio' }
      },
      {
        indicacao: 'Pneumonia nosocomial/VAP',
        adultos: { dose: '2g/0.5g IV', frequencia: '8/8h', observacoes: 'Duracao: 7-14 dias' }
      },
      {
        indicacao: 'ITU complicada/Pielonefrite',
        adultos: { dose: '2g/0.5g IV', frequencia: '8/8h', observacoes: 'Duracao: 5-10 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ceftazidima, avibactam ou cefalosporinas',
      'Reacao anafilatica a betalactamicos'
    ],
    precaucoes: [
      'Ajuste obrigatorio em insuficiencia renal',
      'Monitorar funcao renal durante tratamento',
      'Sem atividade contra metalobetalactamases (verificar o tipo de carbapenemase)',
      'Associar metronidazol para cobertura de anaerobios em infeccoes intra-abdominais'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nauseas', 'Vomitos', 'Aumento de transaminases', 'Teste de Coombs positivo'],
      graves: ['Colite por C. difficile', 'Anafilaxia', 'Encefalopatia/convulsoes (especialmente em DRC)', 'Nefrotoxicidade']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento da meia-vida de ceftazidima', conduta: 'Monitorar' },
      { medicamento: 'Aminoglicosideos', gravidade: 'leve', efeito: 'Sinergismo contra Gram-negativos', conduta: 'Associacao util em infeccoes graves' },
      { medicamento: 'Cloranfenicol', gravidade: 'moderada', efeito: 'Antagonismo teorico', conduta: 'Evitar associacao' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '2g/0.5g 8/8h' },
      { tfg: '31-50', ajuste: '1g/0.25g 8/8h' },
      { tfg: '16-30', ajuste: '0.75g/0.1875g 12/12h' },
      { tfg: '6-15', ajuste: '0.75g/0.1875g 24/24h' },
      { tfg: '<6', ajuste: '0.75g/0.1875g 48/48h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Ceftazidima excretado em pequenas quantidades no leite, provavelmente seguro' }
  },
  {
    id: 'cefiderocol',
    nomeGenerico: 'Cefiderocol',
    nomesComerciais: ['Fetroja'],
    atcCode: 'J01DI04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1g', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes por Gram-negativos MDR/XDR quando opcoes limitadas',
      'Infeccoes por produtores de metalobetalactamases (NDM, VIM, IMP)',
      'Infeccoes por Acinetobacter baumannii resistente a carbapenemicos',
      'Infeccoes por Pseudomonas aeruginosa MDR',
      'Pneumonia nosocomial incluindo VAP',
      'ITU complicada'
    ],
    mecanismoAcao: 'Cefalosporina sideroforica - utiliza sistemas de captacao de ferro bacterianos (sideroforos) para entrar na celula via transportadores de ferro, funcionando como "cavalo de Troia". Estavel contra todas as classes de betalactamases incluindo metalobetalactamases (MBL). Atividade bactericida concentracao-dependente.',
    posologias: [
      {
        indicacao: 'Infeccoes graves por Gram-negativos MDR',
        adultos: { dose: '2g IV', frequencia: '8/8h', observacoes: 'Infusao em 3 horas. Duracao: 7-14 dias' }
      },
      {
        indicacao: 'Pneumonia nosocomial/VAP',
        adultos: { dose: '2g IV', frequencia: '8/8h', observacoes: 'Duracao: 7-14 dias' }
      },
      {
        indicacao: 'ITU complicada',
        adultos: { dose: '2g IV', frequencia: '8/8h', observacoes: 'Duracao: 7-14 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a cefiderocol ou cefalosporinas',
      'Historia de reacao anafilatica grave a betalactamicos'
    ],
    precaucoes: [
      'Monitorar funcao renal - ajuste obrigatorio',
      'Aumento de mortalidade observado em estudo (CREDIBLE-CR) vs. melhor terapia disponivel',
      'Reservar para infeccoes sem outras opcoes terapeuticas',
      'Colite por C. difficile',
      'Convulsoes em pacientes predispostos'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nauseas', 'Vomitos', 'Constipacao', 'Rash', 'Aumento de transaminases'],
      graves: ['Colite por C. difficile', 'Convulsoes', 'Anafilaxia', 'Coombs direto positivo']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Possivel aumento da exposicao', conduta: 'Monitorar' },
      { medicamento: 'Medicamentos nefrotoxicos', gravidade: 'moderada', efeito: 'Risco aumentado de lesao renal', conduta: 'Monitorar funcao renal' }
    ],
    ajusteDoseRenal: [
      { tfg: '>90', ajuste: '2g 8/8h' },
      { tfg: '60-89', ajuste: '2g 8/8h' },
      { tfg: '30-59', ajuste: '1.5g 8/8h' },
      { tfg: '15-29', ajuste: '1g 8/8h' },
      { tfg: '<15', ajuste: '0.75g 12/12h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' }
  },

  // ============================================================================
  // CARBAPENEMICOS COM INIBIDORES DE BETALACTAMASE
  // ============================================================================
  {
    id: 'meropenem-vaborbactam',
    nomeGenerico: 'Meropenem + Vaborbactam',
    nomesComerciais: ['Vabomere'],
    atcCode: 'J01DH52',
    classeTerapeutica: 'antibiotico',
    subclasse: 'carbapenemico',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1g/1g', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '2g/2g', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes por Enterobacterales produtores de KPC',
      'ITU complicada incluindo pielonefrite',
      'Pneumonia nosocomial incluindo VAP',
      'Infeccoes intra-abdominais complicadas',
      'Bacteremia'
    ],
    mecanismoAcao: 'Combinacao de carbapenemico (meropenem) com inibidor de betalactamase boronico ciclico (vaborbactam). Vaborbactam restaura atividade do meropenem contra produtores de KPC ao inibir serina-betalactamases classe A (incluindo KPC) e algumas classe C. NAO inibe metalobetalactamases (NDM, VIM) nem OXA-48.',
    posologias: [
      {
        indicacao: 'ITU complicada/Pielonefrite',
        adultos: { dose: '4g (2g/2g) IV', frequencia: '8/8h', observacoes: 'Infusao em 3 horas. Duracao: 7-14 dias' }
      },
      {
        indicacao: 'Infeccoes por KPC',
        adultos: { dose: '4g (2g/2g) IV', frequencia: '8/8h', observacoes: 'Infusao em 3 horas. Duracao baseada no sitio de infeccao' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a meropenem, vaborbactam ou carbapenemicos',
      'Historia de anafilaxia a betalactamicos',
      'Uso concomitante com acido valproico (reducao drastica dos niveis)'
    ],
    precaucoes: [
      'Ajuste obrigatorio em insuficiencia renal',
      'Convulsoes em pacientes com DRC ou historico de convulsoes',
      'Monitorar funcao renal',
      'Sem atividade contra metalobetalactamases ou OXA-48'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Nauseas', 'Flebite', 'Reacao no local da infusao'],
      graves: ['Convulsoes', 'Colite por C. difficile', 'Anafilaxia', 'Trombocitopenia', 'Leucopenia']
    },
    interacoes: [
      { medicamento: 'Acido valproico/Valproato', gravidade: 'contraindicada', efeito: 'Reducao de 60-100% dos niveis de valproato', conduta: 'CONTRAINDICADO - usar outro anticonvulsivante' },
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento da meia-vida do meropenem', conduta: 'Evitar coadministracao' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '4g (2g/2g) 8/8h' },
      { tfg: '30-49', ajuste: '2g (1g/1g) 8/8h' },
      { tfg: '15-29', ajuste: '2g (1g/1g) 12/12h' },
      { tfg: '<15', ajuste: '1g (0.5g/0.5g) 12/12h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Meropenem excretado em baixas concentracoes no leite, provavelmente seguro' }
  },
  {
    id: 'imipenem-cilastatin-relebactam',
    nomeGenerico: 'Imipenem + Cilastatin + Relebactam',
    nomesComerciais: ['Recarbrio'],
    atcCode: 'J01DH56',
    classeTerapeutica: 'antibiotico',
    subclasse: 'carbapenemico',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg/500mg/250mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia nosocomial incluindo VAP',
      'ITU complicada incluindo pielonefrite',
      'Infeccoes intra-abdominais complicadas',
      'Infeccoes por Enterobacterales produtores de KPC',
      'Infeccoes por Pseudomonas aeruginosa MDR'
    ],
    mecanismoAcao: 'Triplice combinacao: imipenem (carbapenemico) + cilastatin (inibidor da deidropeptidase renal, protege imipenem) + relebactam (inibidor de betalactamase). Relebactam inibe serina-betalactamases classe A (incluindo KPC) e classe C (AmpC). NAO inibe MBL nem OXA-48. Atividade melhorada contra P. aeruginosa resistente.',
    posologias: [
      {
        indicacao: 'Pneumonia nosocomial/VAP',
        adultos: { dose: '1.25g (500/500/250mg) IV', frequencia: '6/6h', observacoes: 'Infusao em 30 minutos. Duracao: 7-14 dias' }
      },
      {
        indicacao: 'ITU complicada/Infeccoes intra-abdominais',
        adultos: { dose: '1.25g (500/500/250mg) IV', frequencia: '6/6h', observacoes: 'Duracao: 4-14 dias dependendo do sitio' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a imipenem, cilastatin, relebactam ou carbapenemicos',
      'Anafilaxia previa a betalactamicos',
      'Uso com acido valproico'
    ],
    precaucoes: [
      'Convulsoes - especialmente em pacientes com DRC, lesoes do SNC ou historico',
      'Ajuste de dose em insuficiencia renal',
      'Colite por C. difficile',
      'Monitorar funcao renal e hepatica'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Vomitos', 'Diarreia', 'Cefaleia', 'Aumento de transaminases'],
      graves: ['Convulsoes', 'Colite por C. difficile', 'Anafilaxia', 'Mioclonia', 'Confusao mental']
    },
    interacoes: [
      { medicamento: 'Acido valproico', gravidade: 'contraindicada', efeito: 'Reducao drastica dos niveis de valproato com risco de convulsoes', conduta: 'CONTRAINDICADO' },
      { medicamento: 'Ganciclovir', gravidade: 'grave', efeito: 'Risco de convulsoes aumentado', conduta: 'Evitar associacao' },
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento da meia-vida', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>90', ajuste: '500/500/250mg 6/6h' },
      { tfg: '60-89', ajuste: '400/400/200mg 6/6h' },
      { tfg: '30-59', ajuste: '300/300/150mg 6/6h' },
      { tfg: '15-29', ajuste: '200/200/100mg 6/6h' },
      { tfg: '<15', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Imipenem excretado no leite em baixas concentracoes' }
  },

  // ============================================================================
  // LIPOGLICOPEPTIDEOS
  // ============================================================================
  {
    id: 'dalbavancina',
    nomeGenerico: 'Dalbavancina',
    nomesComerciais: ['Dalvance', 'Xydalba'],
    atcCode: 'J01XA04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicopeptideo',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes bacterianas agudas de pele e tecidos moles (ABSSSI)',
      'Infeccoes por MRSA',
      'Infeccoes por Streptococcus pyogenes',
      'Osteomielite (uso off-label)',
      'Endocardite (uso off-label)'
    ],
    mecanismoAcao: 'Lipoglicopeptideo semissintetico derivado da teicoplanina. Liga-se ao terminal D-Ala-D-Ala do peptidoglicano, inibindo a sintese de parede celular. Meia-vida extremamente longa (14 dias) permite dosagem semanal ou dose unica. Ativo contra MRSA, VISA e VRE tipo VanB.',
    posologias: [
      {
        indicacao: 'ABSSSI - Regime de dose unica',
        adultos: { dose: '1500mg IV', frequencia: 'Dose unica', observacoes: 'Infusao em 30 minutos' }
      },
      {
        indicacao: 'ABSSSI - Regime de duas doses',
        adultos: { dose: '1000mg IV D1, depois 500mg IV D8', frequencia: 'Semanal', observacoes: 'Infusao em 30 minutos' }
      },
      {
        indicacao: 'Infeccoes osteoarticulares (off-label)',
        adultos: { dose: '1500mg IV', frequencia: 'Semanal por 4-8 semanas', observacoes: 'Dados limitados' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a dalbavancina ou glicopeptideos',
      'VRE tipo VanA (resistencia intrinseca)'
    ],
    precaucoes: [
      'Infusao rapida pode causar "sindrome do homem vermelho"',
      'Ajuste de dose em DRC grave',
      'Monitorar para sinais de superinfeccao',
      'Dados limitados em infeccoes profundas'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Cefaleia', 'Diarreia', 'Prurido', 'Rash'],
      graves: ['Reacao de hipersensibilidade', 'Colite por C. difficile', 'Trombocitopenia', 'Sindrome do homem vermelho (infusao rapida)']
    },
    interacoes: [
      { medicamento: 'Nao ha interacoes clinicamente significativas conhecidas', gravidade: 'leve', efeito: 'Nao e metabolizada por CYP450', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: '1125mg dose unica ou 750mg D1 + 375mg D8' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' }
  },
  {
    id: 'oritavancina',
    nomeGenerico: 'Oritavancina',
    nomesComerciais: ['Orbactiv', 'Kimyrsa'],
    atcCode: 'J01XA05',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicopeptideo',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes bacterianas agudas de pele e tecidos moles (ABSSSI)',
      'Infeccoes por MRSA',
      'Infeccoes por Streptococcus',
      'Situacoes onde dose unica e vantajosa (adesao, alta hospitalar)'
    ],
    mecanismoAcao: 'Lipoglicopeptideo com triplo mecanismo: (1) inibe transglicosidase, (2) inibe transpeptidase por ligacao ao D-Ala-D-Ala, (3) disrupcao da membrana bacteriana pela cadeia lipidica. Atividade bactericida rapida. Meia-vida ~245 horas permite dose unica.',
    posologias: [
      {
        indicacao: 'ABSSSI - Dose unica',
        adultos: { dose: '1200mg IV', frequencia: 'Dose unica', observacoes: 'Infusao em 3 horas. Eficacia mantida por 14 dias.' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a oritavancina ou glicopeptideos',
      'Uso concomitante com heparina nao fracionada (interfere em testes de coagulacao)',
      'VRE tipo VanA'
    ],
    precaucoes: [
      'Interfere em testes de coagulacao (TTPa, INR, tempo de protrombina) por ate 120 horas',
      'Nao usar heparina nao fracionada nas 120h apos administracao',
      'Infusao lenta obrigatoria (sindrome do homem vermelho)',
      'Colite por C. difficile'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Cefaleia', 'Diarreia', 'Vomitos', 'Reacao no local da infusao'],
      graves: ['Anafilaxia', 'Sindrome do homem vermelho', 'Colite por C. difficile', 'Osteomielite (mascaramento)']
    },
    interacoes: [
      { medicamento: 'Heparina nao fracionada', gravidade: 'contraindicada', efeito: 'Falsamente eleva TTPa por ate 120h', conduta: 'Contraindicado uso concomitante e por 5 dias apos' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Falsamente eleva INR por ate 12h', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste, mas dados limitados' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },
  {
    id: 'telavancina',
    nomeGenerico: 'Telavancina',
    nomesComerciais: ['Vibativ'],
    atcCode: 'J01XA03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicopeptideo',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '250mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '750mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia nosocomial e VAP por S. aureus',
      'Infeccoes complicadas de pele e tecidos moles',
      'Infeccoes por MRSA',
      'Infeccoes por Gram-positivos quando vancomicina nao e adequada'
    ],
    mecanismoAcao: 'Lipoglicopeptideo com duplo mecanismo: (1) inibe sintese de parede celular por ligacao ao D-Ala-D-Ala, (2) disrupcao da membrana celular bacteriana causando despolarizacao. Bactericida concentracao-dependente. Ativo contra MRSA e hetero-VISA.',
    posologias: [
      {
        indicacao: 'Pneumonia nosocomial (HABP/VABP)',
        adultos: { dose: '10mg/kg IV', frequencia: '24/24h', observacoes: 'Infusao em 60 minutos. Duracao: 7-21 dias' }
      },
      {
        indicacao: 'Infeccoes de pele',
        adultos: { dose: '10mg/kg IV', frequencia: '24/24h', observacoes: 'Duracao: 7-14 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a telavancina ou glicopeptideos',
      'Uso concomitante com heparina nao fracionada',
      'Insuficiencia renal grave (ClCr <30) - cuidado especial'
    ],
    precaucoes: [
      'Nefrotoxicidade - monitorar funcao renal a cada 48-72h',
      'Maior mortalidade observada em pacientes com DRC moderada-grave',
      'Interfere em testes de coagulacao',
      'Prolongamento de QT - evitar com outros farmacos que prolongam QT',
      'Teratogenicidade (categoria C)'
    ],
    efeitosAdversos: {
      comuns: ['Disgeusia (sabor metalico)', 'Nauseas', 'Vomitos', 'Urina espumosa', 'Cefaleia'],
      graves: ['Nefrotoxicidade', 'Prolongamento QT', 'Colite por C. difficile', 'Sindrome do homem vermelho']
    },
    interacoes: [
      { medicamento: 'Heparina nao fracionada', gravidade: 'contraindicada', efeito: 'Interfere em TTPa', conduta: 'Contraindicado' },
      { medicamento: 'Farmacos que prolongam QT', gravidade: 'grave', efeito: 'Risco de arritmias', conduta: 'Evitar ou monitorar ECG' },
      { medicamento: 'Aminoglicosideos', gravidade: 'moderada', efeito: 'Aumento do risco de nefrotoxicidade', conduta: 'Monitorar funcao renal' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '10mg/kg 24/24h' },
      { tfg: '30-50', ajuste: '7.5mg/kg 24/24h' },
      { tfg: '<30', ajuste: 'Nao recomendado (aumento de mortalidade)' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - potencial toxicidade' }
  },

  // ============================================================================
  // AMINOGLICOSIDEO DE NOVA GERACAO
  // ============================================================================
  {
    id: 'plazomicina',
    nomeGenerico: 'Plazomicina',
    nomesComerciais: ['Zemdri'],
    atcCode: 'J01GB14',
    classeTerapeutica: 'antibiotico',
    subclasse: 'aminoglicosideo',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg/10mL', disponivelSUS: false }
    ],
    indicacoes: [
      'ITU complicada incluindo pielonefrite',
      'Infeccoes por Enterobacterales produtores de carbapenemases (CRE)',
      'Infeccoes por Enterobacterales produtores de ESBL',
      'Infeccoes por Gram-negativos MDR'
    ],
    mecanismoAcao: 'Aminoglicosideo semisintetico de nova geracao, derivado da sisomicina. Liga-se a subunidade 30S ribossomal causando erro na leitura do mRNA. Resistente a maioria das enzimas modificadoras de aminoglicosideos (AMEs). Bactericida concentracao-dependente com efeito pos-antibiotico prolongado.',
    posologias: [
      {
        indicacao: 'ITU complicada/Pielonefrite',
        adultos: { dose: '15mg/kg IV', frequencia: '24/24h', observacoes: 'Infusao em 30 minutos. Duracao: 4-7 dias' }
      },
      {
        indicacao: 'Infeccoes por CRE (associacao)',
        adultos: { dose: '15mg/kg IV', frequencia: '24/24h', observacoes: 'Usar em combinacao com outros antibioticos' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a plazomicina ou aminoglicosideos',
      'Miastenia gravis'
    ],
    precaucoes: [
      'Nefrotoxicidade - monitorar funcao renal diariamente',
      'Ototoxicidade (vestibular e coclear) - irreversivel',
      'Bloqueio neuromuscular em pacientes predispostos',
      'Monitorar niveis sericos (vale <3mcg/mL)',
      'Ajuste em insuficiencia renal'
    ],
    efeitosAdversos: {
      comuns: ['Diminuicao da funcao renal', 'Cefaleia', 'Nauseas', 'Diarreia', 'Vomitos'],
      graves: ['Nefrotoxicidade', 'Ototoxicidade irreversivel', 'Bloqueio neuromuscular', 'Hipomagnesemia', 'Hipocalemia']
    },
    interacoes: [
      { medicamento: 'Outros aminoglicosideos', gravidade: 'contraindicada', efeito: 'Nefro e ototoxicidade aditiva', conduta: 'Nunca associar' },
      { medicamento: 'Furosemida', gravidade: 'grave', efeito: 'Aumento da ototoxicidade', conduta: 'Evitar ou monitorar audiometria' },
      { medicamento: 'Vancomicina', gravidade: 'grave', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar funcao renal rigorosamente' },
      { medicamento: 'Bloqueadores neuromusculares', gravidade: 'grave', efeito: 'Paralisia prolongada', conduta: 'Cuidado em cirurgias/UTI' },
      { medicamento: 'Anfotericina B', gravidade: 'grave', efeito: 'Nefrotoxicidade sinergica', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: '15mg/kg 24/24h' },
      { tfg: '30-60', ajuste: '10mg/kg 24/24h' },
      { tfg: '15-30', ajuste: '10mg/kg 48/48h' },
      { tfg: '<15', ajuste: 'Guiar por niveis sericos' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Absorcao oral minima pelo lactente, monitorar diarreia' }
  },

  // ============================================================================
  // TETRACICLINAS DE NOVA GERACAO
  // ============================================================================
  {
    id: 'eravacyclina',
    nomeGenerico: 'Eravacyclina',
    nomesComerciais: ['Xerava'],
    atcCode: 'J01AA13',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes intra-abdominais complicadas (cIAI)',
      'Infeccoes por Enterobacterales MDR',
      'Infeccoes por Acinetobacter baumannii',
      'Cobertura polimicrobiana incluindo anaerobios'
    ],
    mecanismoAcao: 'Tetraciclina totalmente sintetica (fluorociclina). Inibe sintese proteica na subunidade 30S ribossomal. Desenhada para superar mecanismos de resistencia: resistente a bombas de efluxo (tetA, tetB, tetK) e protecao ribossomal (tetM, tetQ). Amplo espectro incluindo ESBL e CRE. Ativa contra anaerobios.',
    posologias: [
      {
        indicacao: 'Infeccoes intra-abdominais complicadas',
        adultos: { dose: '1mg/kg IV', frequencia: '12/12h', observacoes: 'Infusao em 60 minutos. Duracao: 4-14 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a eravacyclina ou tetraciclinas',
      'Gestacao (danos fetais)',
      'Criancas <8 anos (manchas permanentes nos dentes)'
    ],
    precaucoes: [
      'Fotossensibilidade - evitar exposicao solar',
      'Nauseas e vomitos frequentes',
      'Monitorar funcao hepatica',
      'Hipertensao intracraniana (pseudotumor cerebri)',
      'Superinfeccao por Candida'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Vomitos', 'Diarreia', 'Reacao no local da infusao', 'Cefaleia'],
      graves: ['Pancreatite', 'Hepatotoxicidade', 'Hipertensao intracraniana', 'Fotossensibilidade grave', 'Colite por C. difficile']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR frequentemente' },
      { medicamento: 'Anticonceptivos orais', gravidade: 'leve', efeito: 'Possivel reducao de eficacia', conduta: 'Metodo adicional por precaucao' },
      { medicamento: 'Antiacidos/Ferro/Calcio', gravidade: 'leve', efeito: 'Administracao IV nao afetada', conduta: 'Nao aplicavel (IV)' }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado - deposicao dentaria e ossea' }
  },
  {
    id: 'omadacycline',
    nomeGenerico: 'Omadaciclina',
    nomesComerciais: ['Nuzyra'],
    atcCode: 'J01AA15',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia adquirida na comunidade (CAP)',
      'Infeccoes bacterianas agudas de pele e tecidos moles (ABSSSI)',
      'Infeccoes por MRSA',
      'Infeccoes por patogenos atipicos (Mycoplasma, Chlamydia, Legionella)'
    ],
    mecanismoAcao: 'Aminometilciclina (derivado semisintetico da minociclina). Inibe sintese proteica na subunidade 30S. Supera mecanismos de resistencia comuns as tetraciclinas. Disponivel IV e oral (posologia diferente). Amplo espectro incluindo MRSA e patogenos atipicos.',
    posologias: [
      {
        indicacao: 'Pneumonia comunitaria (CAP)',
        adultos: { dose: 'IV: 200mg dose ataque, depois 100mg 24/24h. OU VO: 450mg dias 1-2, depois 300mg 24/24h', frequencia: '24/24h', observacoes: 'Oral: jejum (1h antes ou 2h apos refeicao). Duracao: 7-14 dias' }
      },
      {
        indicacao: 'ABSSSI',
        adultos: { dose: 'IV: 200mg dose ataque, depois 100mg 24/24h. OU VO: 450mg dias 1-2, depois 300mg 24/24h', frequencia: '24/24h', observacoes: 'Duracao: 7-14 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a omadaciclina ou tetraciclinas',
      'Gestacao',
      'Criancas <8 anos'
    ],
    precaucoes: [
      'Aumento de mortalidade observado em subgrupo de CAP com CURB-65 >=3',
      'Nauseas e vomitos com formulacao oral',
      'Fotossensibilidade',
      'Tomar em jejum (oral)'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Vomitos', 'Diarreia', 'Cefaleia', 'Constipacao', 'Hipertensao'],
      graves: ['Colite por C. difficile', 'Hipertensao intracraniana', 'Pancreatite', 'Reacao de fotossensibilidade grave']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' },
      { medicamento: 'Antiacidos/Ferro/Calcio (VO)', gravidade: 'moderada', efeito: 'Reducao significativa de absorcao oral', conduta: 'Evitar coadministracao' },
      { medicamento: 'Anticonceptivos orais', gravidade: 'leve', efeito: 'Possivel reducao de eficacia', conduta: 'Metodo adicional' }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ============================================================================
  // PLEUROMUTILIN
  // ============================================================================
  {
    id: 'lefamulina',
    nomeGenerico: 'Lefamulina',
    nomesComerciais: ['Xenleta'],
    atcCode: 'J01XX12',
    classeTerapeutica: 'antibiotico',
    subclasse: 'pleuromutilin',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia adquirida na comunidade (CAP)',
      'Infeccoes por Streptococcus pneumoniae',
      'Infeccoes por Haemophilus influenzae',
      'Infeccoes por Mycoplasma pneumoniae',
      'Infeccoes por Legionella pneumophila',
      'Infeccoes por MRSA (pneumonia)'
    ],
    mecanismoAcao: 'Primeiro pleuromutilin sistemico. Inibe sintese proteica bacteriana por ligacao ao centro peptidil transferase (PTC) da subunidade 50S ribossomal, diferente do sitio de ligacao de macrolideos. Bacteriostatico. Nova classe sem resistencia cruzada com outros antibioticos.',
    posologias: [
      {
        indicacao: 'Pneumonia comunitaria (CAP)',
        adultos: { dose: 'IV: 150mg 12/12h. VO: 600mg 12/12h', frequencia: '12/12h', observacoes: 'Oral: pode ser tomado com ou sem alimentos. Duracao: 5-7 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a lefamulina ou pleuromutilinicos',
      'Sindrome do QT longo congenita',
      'Uso com substratos de CYP3A4 com janela terapeutica estreita',
      'Uso com indutores fortes de CYP3A4'
    ],
    precaucoes: [
      'Prolonga intervalo QT - evitar com outros farmacos que prolongam QT',
      'ECG de controle em pacientes de risco',
      'Diarreia pode indicar colite por C. difficile',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Evitar formulacao oral em insuficiencia hepatica moderada-grave'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nauseas', 'Vomitos', 'Cefaleia', 'Aumento de transaminases'],
      graves: ['Prolongamento QT', 'Colite por C. difficile', 'Hepatotoxicidade', 'Reacao de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Farmacos que prolongam QT', gravidade: 'grave', efeito: 'Risco de torsades de pointes', conduta: 'Evitar associacao' },
      { medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol)', gravidade: 'moderada', efeito: 'Aumento da exposicao a lefamulina', conduta: 'Monitorar QT' },
      { medicamento: 'Indutores fortes de CYP3A4 (rifampicina)', gravidade: 'contraindicada', efeito: 'Reducao significativa da eficacia', conduta: 'Contraindicado' },
      { medicamento: 'Substratos CYP3A4 estreita (midazolam)', gravidade: 'moderada', efeito: 'Aumento de exposicao do substrato', conduta: 'Monitorar ou evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' }
  },

  // ============================================================================
  // FLUOROQUINOLONA DE NOVA GERACAO
  // ============================================================================
  {
    id: 'delafloxacino',
    nomeGenerico: 'Delafloxacino',
    nomesComerciais: ['Baxdela'],
    atcCode: 'J01MA23',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '300mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '450mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes bacterianas agudas de pele e tecidos moles (ABSSSI)',
      'Pneumonia adquirida na comunidade (CAP)',
      'Infeccoes por MRSA',
      'Infeccoes por Pseudomonas aeruginosa',
      'Cobertura ampla de Gram-positivos e Gram-negativos'
    ],
    mecanismoAcao: 'Fluoroquinolona anioica de nova geracao. Inibe DNA girase (topoisomerase II) e topoisomerase IV. Atividade equilibrada contra ambos alvos reduz emergencia de resistencia. Acido fraco - atividade aumentada em pH acido (como em abscessos). Ativo contra MRSA, diferente das quinolonas classicas.',
    posologias: [
      {
        indicacao: 'ABSSSI',
        adultos: { dose: 'IV: 300mg 12/12h. VO: 450mg 12/12h', frequencia: '12/12h', observacoes: 'Duracao: 5-14 dias. Pode trocar IV para oral quando clinicamente apropriado.' }
      },
      {
        indicacao: 'Pneumonia comunitaria (CAP)',
        adultos: { dose: 'IV: 300mg 12/12h. VO: 450mg 12/12h', frequencia: '12/12h', observacoes: 'Duracao: 5-10 dias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a delafloxacino ou fluoroquinolonas',
      'Historia de tendinopatia por quinolonas',
      'Miastenia gravis'
    ],
    precaucoes: [
      'Tendinite e ruptura de tendao - risco aumentado em >60 anos, corticoides, transplantados',
      'Neuropatia periferica - pode ser irreversivel',
      'Prolongamento QT (menor que outras quinolonas)',
      'Fotossensibilidade',
      'Disturbios psiquiatricos/SNC',
      'Disglicemia',
      'Risco de disseccao de aorta'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Diarreia', 'Cefaleia', 'Aumento de transaminases', 'Vomitos'],
      graves: ['Tendinite/ruptura de tendao', 'Neuropatia periferica', 'Prolongamento QT', 'Convulsoes', 'Disturbios psiquiatricos', 'Colite por C. difficile']
    },
    interacoes: [
      { medicamento: 'Antiacidos/Sucralfato/Ferro/Zinco', gravidade: 'moderada', efeito: 'Reducao da absorcao oral', conduta: 'Administrar 2h antes ou 6h apos' },
      { medicamento: 'Farmacos que prolongam QT', gravidade: 'moderada', efeito: 'Risco de arritmias', conduta: 'Monitorar ECG' },
      { medicamento: 'Corticoides sistemicos', gravidade: 'moderada', efeito: 'Aumento do risco de tendinopatia', conduta: 'Evitar associacao se possivel' },
      { medicamento: 'Antidiabeticos', gravidade: 'moderada', efeito: 'Hipo ou hiperglicemia', conduta: 'Monitorar glicemia' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-29', ajuste: 'IV: 200mg 12/12h. VO: 450mg 12/12h' },
      { tfg: '<15', ajuste: 'Dados insuficientes, usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - potencial toxicidade articular no lactente' }
  },

  // ============================================================================
  // FOSFOMICINA IV
  // ============================================================================
  {
    id: 'fosfomicina-iv',
    nomeGenerico: 'Fosfomicina Dissodica (IV)',
    nomesComerciais: ['Fosfocina', 'Monuril IV'],
    atcCode: 'J01XX01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '2g', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '4g', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccoes por MDR Gram-negativos (terapia combinada)',
      'Infeccoes por Enterobacterales produtores de carbapenemases',
      'ITU complicada (pielonefrite)',
      'Meningite bacteriana (em combinacao)',
      'Osteomielite (em combinacao)',
      'Pneumonia nosocomial (em combinacao)'
    ],
    mecanismoAcao: 'Antibiotico fosfonico que inibe MurA (UDP-N-acetilglicosamina enolpiruvil transferase), primeira enzima da sintese de peptidoglicano. Mecanismo unico sem resistencia cruzada. Bactericida. Alta penetracao em tecidos incluindo SNC. Geralmente usado em combinacao para infeccoes graves.',
    posologias: [
      {
        indicacao: 'Infeccoes graves/MDR (terapia combinada)',
        adultos: { dose: '4-8g IV', frequencia: '8/8h ou 6/6h', doseMaxima: '24g/dia', observacoes: 'Infusao em 30-60 minutos. SEMPRE em combinacao com outro antibiotico.' }
      },
      {
        indicacao: 'Meningite (combinacao)',
        adultos: { dose: '6-8g IV', frequencia: '6/6h', doseMaxima: '32g/dia', observacoes: 'Em combinacao com meropenem ou outro' }
      },
      {
        indicacao: 'ITU complicada',
        adultos: { dose: '4g IV', frequencia: '8/8h', observacoes: 'Duracao: 7-14 dias' },
        pediatrico: { dose: '100-200mg/kg/dia', frequencia: '8/8h', doseMaxima: '8g/dia' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a fosfomicina',
      'Insuficiencia renal grave sem ajuste de dose'
    ],
    precaucoes: [
      'Alta carga de sodio (14.5mEq/g) - cuidado em ICC e HAS',
      'Ajuste em insuficiencia renal',
      'Risco de emergencia de resistencia em monoterapia',
      'Monitorar eletrodos (sodio, potassio)',
      'Colite por C. difficile'
    ],
    efeitosAdversos: {
      comuns: ['Flebite', 'Nauseas', 'Diarreia', 'Hipocalemia', 'Hipernatremia'],
      graves: ['Colite por C. difficile', 'Sobrecarga de sodio/edema', 'Convulsoes (altas doses)', 'Reacao anafilatica']
    },
    interacoes: [
      { medicamento: 'Metoclopramida', gravidade: 'moderada', efeito: 'Reducao dos niveis sericos de fosfomicina oral (nao IV)', conduta: 'Nao significativo para via IV' },
      { medicamento: 'Aminoglicosideos', gravidade: 'leve', efeito: 'Sinergismo', conduta: 'Associacao util contra Gram-negativos MDR' },
      { medicamento: 'Carbapenemicios', gravidade: 'leve', efeito: 'Sinergismo', conduta: 'Combinacao frequente contra CRE' }
    ],
    ajusteDoseRenal: [
      { tfg: '>40', ajuste: '4-8g 8/8h' },
      { tfg: '20-40', ajuste: '4g 12/12h' },
      { tfg: '10-20', ajuste: '4g 24/24h' },
      { tfg: '<10', ajuste: '4g 48/48h ou apos dialise' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao baixa no leite, provavelmente seguro' }
  }
];

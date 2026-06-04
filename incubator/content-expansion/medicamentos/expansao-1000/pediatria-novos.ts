/**
 * PEDIATRIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==========================================
 * Medicamentos pediatricos especializados com abordagem ontology-first
 * Inclui terapias de reposicao enzimatica e tratamentos para doencas raras
 *
 * Referencias:
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - NORD (National Organization for Rare Disorders)
 * - PharmGKB Pharmacogenomics Database
 * - Orphanet Rare Disease Database
 */

import { Medicamento } from '@/lib/types/medicamento';

export const pediatriaNovos: Partial<Medicamento>[] = [
  // ============================================================================
  // SURFACTANTE PULMONAR
  // ============================================================================
  {
    id: 'surfactante-pulmonar',
    nomeGenerico: 'Surfactante Pulmonar (Beractanto)',
    nomesComerciais: ['Survanta', 'Curosurf', 'Infasurf'],
    atcCode: 'R07AA02',
    rxNormCui: '8814',
    drugBankId: 'DB00015',
    snomedCT: '396057002',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_nebulizacao', concentracao: '25mg/ml', quantidade: '4ml', disponivelSUS: true },
      { forma: 'suspensao_nebulizacao', concentracao: '80mg/ml', quantidade: '1,5ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Sindrome do desconforto respiratorio neonatal (SDR)',
      'Profilaxia de SDR em prematuros de alto risco',
      'Sindrome de aspiracao meconial',
      'SDRA neonatal'
    ],
    mecanismoAcao: 'Surfactante exogeno que substitui o surfactante endogeno deficiente em prematuros. Contem fosfolipidios (fosfatidilcolina, fosfatidilglicerol) e proteinas surfactantes (SP-B, SP-C) que reduzem a tensao superficial alveolar, prevenindo colapso alveolar e melhorando a complacencia pulmonar. Essencial para a transicao respiratoria ao nascimento.',
    posologias: [
      {
        indicacao: 'SDR neonatal (tratamento)',
        pediatrico: { dose: '100mg/kg (4ml/kg) de fosfolipidios', frequencia: 'Via intratraqueal, pode repetir a cada 6h', doseMaxima: '4 doses nas primeiras 48h', observacoes: 'Administrar em UTI neonatal com ventilacao mecanica' }
      },
      {
        indicacao: 'Profilaxia SDR (prematuro extremo)',
        pediatrico: { dose: '100mg/kg', frequencia: 'Dose unica profilatica nos primeiros 15 minutos de vida', idadeMinima: 'Prematuro <28 semanas', observacoes: 'Intubacao profilatica para administracao' }
      }
    ],
    contraindicacoes: [
      'Anomalias congenitas incompativeis com a vida',
      'Hipersensibilidade aos componentes (rara)'
    ],
    precaucoes: [
      'Administrar SOMENTE em UTI neonatal com equipe treinada',
      'Monitorar saturacao O2 e gasometria durante administracao',
      'Risco de hemorragia pulmonar pos-administracao',
      'Pode ocorrer bradicardia e dessaturacao transitoria durante instilacao',
      'Reflexo de tosse pode ocorrer - pausar administracao',
      'Ajustar parametros ventilatorios apos administracao'
    ],
    efeitosAdversos: {
      comuns: ['Dessaturacao transitoria', 'Bradicardia reflexa', 'Refluxo do surfactante'],
      graves: ['Hemorragia pulmonar', 'Pneumotorax', 'Obstrucao tubo endotraqueal']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao medicamentosa significativa conhecida', gravidade: 'leve', efeito: 'Produto biologico administrado localmente', conduta: 'Sem restricoes' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: true, observacao: 'Nao aplicavel - uso neonatal exclusivo' },
    consideracoesEspeciais: {
      pediatrico: 'USO EXCLUSIVAMENTE NEONATAL. Administracao requer intubacao e equipe de UTI neonatal treinada. Monitoramento continuo obrigatorio.'
    },
    monitorizacao: ['Saturacao O2 continua', 'Gasometria arterial seriada', 'RX torax pos-administracao', 'Sinais de hemorragia pulmonar'],
    doencasRelacionadas: ['sdr-neonatal', 'prematuridade'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['neonatal', 'uti-neonatal', 'prematuro', 'sdr', 'surfactante', 'respiratorio']
  },

  // ============================================================================
  // ANTICORPO MONOCLONAL - VSR
  // ============================================================================
  {
    id: 'palivizumabe',
    nomeGenerico: 'Palivizumabe',
    nomesComerciais: ['Synagis'],
    atcCode: 'J06BB16',
    rxNormCui: '213436',
    drugBankId: 'DB00110',
    snomedCT: '386896005',
    classeTerapeutica: 'antiviral',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '50mg/0,5ml', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '100mg/ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Profilaxia de infeccao grave por VSR em criancas de alto risco',
      'Prematuros (<=35 semanas) durante primeira estacao de VSR',
      'Criancas com displasia broncopulmonar',
      'Criancas com cardiopatia congenita hemodinamicamente significativa',
      'Criancas com imunodeficiencia grave'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1 humanizado que se liga a epitopo no sitio antigenico A da proteina de fusao (F) do virus sincicial respiratorio (VSR). Neutraliza ambos os subtipos de VSR (A e B), prevenindo fusao viral com a celula hospedeira e entrada viral.',
    posologias: [
      {
        indicacao: 'Profilaxia de VSR',
        pediatrico: { dose: '15mg/kg', frequencia: 'IM 1x/mes durante a estacao de VSR (5 doses)', idadeMinima: 'Nascimento', doseMaxima: '15mg/kg/dose', observacoes: 'Iniciar antes do inicio da estacao de VSR (abril-maio no Brasil)' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a palivizumabe ou excipientes',
      'Reacao anafilatica previa'
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade podem ocorrer',
      'Trombocitopenia pode aumentar risco de sangramento no local de injecao',
      'NAO usar para tratamento de infeccao por VSR estabelecida',
      'Nao impede hospitalizacao por outras causas',
      'Aplicar no musculo anterolateral da coxa (volume >1ml dividir em sitios)'
    ],
    efeitosAdversos: {
      comuns: ['Febre', 'Reacao no local da injecao', 'Rash cutaneo leve', 'Irritabilidade'],
      graves: ['Anafilaxia (rara)', 'Angioedema', 'Urticaria grave']
    },
    interacoes: [
      { medicamento: 'Vacinas', gravidade: 'leve', efeito: 'Nao interfere com vacinas do calendario', conduta: 'Pode ser administrado concomitantemente' },
      { medicamento: 'Imunoglobulinas', gravidade: 'leve', efeito: 'Sem interacao significativa', conduta: 'Podem ser usadas juntas' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: true, observacao: 'Nao aplicavel - uso pediatrico exclusivo' },
    consideracoesEspeciais: {
      pediatrico: 'Indicado apenas para profilaxia em criancas de alto risco. Nao tratar infeccao ativa por VSR com palivizumabe. Custo elevado - criterios rigorosos de indicacao.'
    },
    monitorizacao: ['Reacoes pos-injecao por 30 minutos', 'Sintomas respiratorios durante estacao VSR'],
    doencasRelacionadas: ['infeccao-vsr', 'bronquiolite', 'prematuridade'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['vsr', 'profilaxia', 'anticorpo-monoclonal', 'neonatal', 'prematuro', 'cardiopatia']
  },

  // ============================================================================
  // TERAPIA GENICA - AME
  // ============================================================================
  {
    id: 'nusinersen',
    nomeGenerico: 'Nusinersen',
    nomesComerciais: ['Spinraza'],
    atcCode: 'M09AX07',
    rxNormCui: '1870872',
    drugBankId: 'DB13161',
    snomedCT: '735197001',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '12mg/5ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Atrofia muscular espinhal (AME) 5q - todas as formas',
      'AME tipo 1 (forma infantil grave)',
      'AME tipo 2 e 3',
      'AME pre-sintomatica'
    ],
    mecanismoAcao: 'Oligonucleotideo antisense (ASO) que modifica o splicing do pre-mRNA do gene SMN2. Liga-se ao intron 7 do SMN2, promovendo inclusao do exon 7 no mRNA maduro. Resultado: aumento da producao de proteina SMN funcional a partir do gene SMN2 (gene de backup em pacientes com delecao de SMN1). PRIMEIRO TRATAMENTO APROVADO PARA AME.',
    posologias: [
      {
        indicacao: 'AME (todas as formas)',
        pediatrico: { dose: '12mg (5ml)', frequencia: 'Intratecal: doses 1-4 nos dias 0, 14, 28, 63 (inducao); depois 12mg a cada 4 meses (manutencao)', idadeMinima: 'Nascimento', observacoes: 'Puncao lombar sob sedacao em criancas' }
      },
      {
        indicacao: 'AME (adultos)',
        adultos: { dose: '12mg', frequencia: 'Intratecal: mesmo esquema de inducao e manutencao' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a nusinersen',
      'Infeccao ativa no local da puncao lombar'
    ],
    precaucoes: [
      'Administrar SOMENTE via intratecal por profissional experiente',
      'Trombocitopenia e alteracoes de coagulacao relatadas - monitorar plaquetas',
      'Toxicidade renal potencial - monitorar proteina urinaria',
      'Hidrocefalia comunicante relatada em alguns pacientes',
      'Pacientes com escoliose grave podem necessitar guia de imagem para puncao',
      'Sedacao pode ser necessaria em criancas pequenas'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia pos-puncao', 'Dor lombar', 'Vomitos', 'Infeccao respiratoria'],
      graves: ['Trombocitopenia', 'Toxicidade renal (proteinuria)', 'Hidrocefalia', 'Meningite (muito rara)']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Risco de sangramento em puncao lombar', conduta: 'Avaliar coagulacao; considerar suspensao temporaria' },
      { medicamento: 'Nenhuma interacao farmacocinetica conhecida', gravidade: 'leve', efeito: 'Administracao intratecal limita interacoes sistemicas', conduta: 'Sem restricoes especificas' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Tratamento de ALTO CUSTO em centros especializados. Melhor resposta quando iniciado precocemente (pre-sintomatico ideal). Resultados melhores quanto menor a idade ao inicio.'
    },
    monitorizacao: ['Plaquetas antes de cada dose', 'Proteina urinaria periodicamente', 'Funcao motora (escalas HFMSE, CHOP-INTEND)', 'Funcao respiratoria'],
    doencasRelacionadas: ['atrofia-muscular-espinhal'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['ame', 'doenca-rara', 'oligonucleotideo-antisense', 'intratecal', 'genetica', 'neurologia']
  },
  {
    id: 'onasemnogene-abeparvovec',
    nomeGenerico: 'Onasemnogene Abeparvovec',
    nomesComerciais: ['Zolgensma'],
    atcCode: 'M09AX09',
    rxNormCui: '2267570',
    drugBankId: 'DB15344',
    snomedCT: '787169008',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: 'Dose individualizada baseada no peso', disponivelSUS: true }
    ],
    indicacoes: [
      'Atrofia muscular espinhal (AME) 5q com mutacao bi-alelica do gene SMN1',
      'Pacientes com AME tipo 1 com ate 2 copias do gene SMN2',
      'Pacientes com AME ate 21kg (preferencial <2 anos)'
    ],
    mecanismoAcao: 'TERAPIA GENICA: Vetor viral adeno-associado sorotipo 9 (AAV9) nao replicante carregando copia funcional do gene SMN1 humano. AAV9 atravessa barreira hematoencefalica e transduz neuronios motores. Gene SMN1 funcional e expresso continuamente, restaurando producao de proteina SMN. DOSE UNICA VITALICIA - potencialmente curativa.',
    posologias: [
      {
        indicacao: 'AME (pacientes ate 21kg)',
        pediatrico: { dose: '1,1 x 10^14 genomas vetoriais por kg', frequencia: 'DOSE UNICA IV em infusao de 60 minutos', doseMaxima: 'Peso maximo 21kg', idadeMinima: 'Nascimento', observacoes: 'Medicamento mais caro do mundo. Premeditacao com corticoides obrigatoria.' }
      }
    ],
    contraindicacoes: [
      'Anticorpos anti-AAV9 com titulo >=1:50',
      'Infeccao ativa aguda',
      'Insuficiencia hepatica grave pre-existente'
    ],
    precaucoes: [
      'BLACK BOX: Hepatotoxicidade grave - pode ser fatal',
      'Dosar anticorpos anti-AAV9 antes da infusao',
      'Iniciar prednisolona 1mg/kg/dia um dia antes e manter por 30 dias (depois desmame)',
      'Monitorar funcao hepatica semanalmente por 3 meses',
      'Trombocitopenia pode ocorrer - monitorar plaquetas',
      'Microangiopatia trombotica relatada',
      'Administrar em centro especializado com UTI disponivel'
    ],
    efeitosAdversos: {
      comuns: ['Elevacao de transaminases (comum)', 'Vomitos', 'Febre', 'Trombocitopenia transitoria'],
      graves: ['Insuficiencia hepatica aguda', 'Hepatotoxicidade fatal', 'Microangiopatia trombotica', 'Ictericia']
    },
    interacoes: [
      { medicamento: 'Hepatotoxicos', gravidade: 'grave', efeito: 'Hepatotoxicidade aditiva', conduta: 'Evitar farmacos hepatotoxicos durante periodo de monitoramento' },
      { medicamento: 'Vacinas', gravidade: 'moderada', efeito: 'Imunossupressao por corticoides concomitantes', conduta: 'Ajustar calendario vacinal; evitar vacinas vivas durante corticoterapia' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: true, observacao: 'Nao aplicavel - uso pediatrico' },
    consideracoesEspeciais: {
      pediatrico: 'ALTO CUSTO - um dos medicamentos mais caros do mundo (>US$2 milhoes). Dose unica vitalicia. Melhor resposta em pacientes pre-sintomaticos ou com inicio precoce de tratamento. Centro especializado obrigatorio.'
    },
    monitorizacao: ['Funcao hepatica semanal por 3 meses, depois mensal por 3 meses', 'Plaquetas', 'Funcao motora', 'Bilirrubinas', 'Sinais de microangiopatia'],
    doencasRelacionadas: ['atrofia-muscular-espinhal'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['ame', 'terapia-genica', 'aav9', 'doenca-rara', 'alto-custo', 'dose-unica']
  },

  // ============================================================================
  // ENZIMAS DE REPOSICAO - DOENCAS LISOSSOMAIS
  // ============================================================================
  {
    id: 'sebelipase-alfa',
    nomeGenerico: 'Sebelipase Alfa',
    nomesComerciais: ['Kanuma'],
    atcCode: 'A16AB14',
    rxNormCui: '1720051',
    drugBankId: 'DB09109',
    snomedCT: '718586009',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '20mg/10ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Deficiencia de lipase acida lisossomal (DLAL)',
      'Doenca de Wolman (forma infantil grave)',
      'Doenca de armazenamento de esteres de colesterol (CESD)'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica (TRE) com lipase acida lisossomal humana recombinante. Substitui a enzima deficiente responsavel pela hidrolise de esteres de colesterol e triglicerides nos lisossomos. Reduz acumulo de lipidios em figado, baco e outros orgaos. Na doenca de Wolman (forma grave infantil) sem tratamento: letalidade ~100% no primeiro ano de vida.',
    posologias: [
      {
        indicacao: 'DLAL (criancas e adultos)',
        adultos: { dose: '1mg/kg', frequencia: 'IV a cada 2 semanas', observacoes: 'Infusao em 2 horas (pode aumentar se bem tolerada)' },
        pediatrico: { dose: '1mg/kg', frequencia: 'IV a cada 2 semanas', idadeMinima: 'Nascimento', observacoes: 'Doenca de Wolman: pode necessitar 3mg/kg semanal inicialmente' }
      },
      {
        indicacao: 'Doenca de Wolman (forma infantil grave)',
        pediatrico: { dose: '1mg/kg semanal, pode escalar ate 3mg/kg semanal', frequencia: 'Semanal', idadeMinima: 'Nascimento', observacoes: 'Urgencia de tratamento - doenca rapidamente fatal sem intervencao' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a sebelipase alfa',
      'Anafilaxia previa'
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade e anafilaxia relatadas',
      'Premeditacao com anti-histaminicos e antipireticos recomendada',
      'Anticorpos anti-farmaco podem se desenvolver',
      'Ter epinefrina e equipamento de reanimacao disponiveis',
      'Reduzir velocidade de infusao se reacao leve'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Vomitos', 'Febre', 'Urticaria', 'Eczema', 'Rinite'],
      graves: ['Anafilaxia', 'Reacoes de hipersensibilidade grave']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao medicamentosa clinicamente significativa conhecida', gravidade: 'leve', efeito: 'Enzima recombinante sem metabolismo CYP450', conduta: 'Sem restricoes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Doenca de Wolman requer inicio IMEDIATO de tratamento - doenca rapidamente fatal. Triagem neonatal pode identificar casos pre-sintomaticos. Tratamento vitalicio.'
    },
    monitorizacao: ['Funcao hepatica', 'Perfil lipidico', 'Crescimento em criancas', 'Anticorpos anti-farmaco se perda de resposta', 'Volume hepatico (ultrassom)'],
    doencasRelacionadas: ['doenca-wolman', 'deficiencia-lipase-acida-lisossomal'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'doenca-lisossomal', 'doenca-rara', 'wolman', 'dlal', 'enzima']
  },
  {
    id: 'elosulfase-alfa',
    nomeGenerico: 'Elosulfase Alfa',
    nomesComerciais: ['Vimizim'],
    atcCode: 'A16AB12',
    rxNormCui: '1491934',
    drugBankId: 'DB09107',
    snomedCT: '712564008',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '5mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Mucopolissacaridose tipo IVA (MPS IVA)',
      'Sindrome de Morquio A'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com N-acetilgalactosamina-6-sulfatase (GALNS) humana recombinante. Na MPS IVA, deficiencia de GALNS causa acumulo de queratan sulfato e condroitina-6-sulfato. TRE reduz acumulo de GAGs (glicosaminoglicanos), melhorando resistencia fisica e funcao respiratoria.',
    posologias: [
      {
        indicacao: 'MPS IVA (Morquio A)',
        adultos: { dose: '2mg/kg', frequencia: 'IV semanal', observacoes: 'Infusao em ~4 horas (iniciar lentamente)' },
        pediatrico: { dose: '2mg/kg', frequencia: 'IV semanal', idadeMinima: '5 anos (estudos)', observacoes: 'Premedicacao com anti-histaminico e antipiretico' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a elosulfase alfa',
      'Anafilaxia previa ao produto'
    ],
    precaucoes: [
      'Reacoes anafilaticas e hipersensibilidade frequentes',
      'Premedicacao OBRIGATORIA com anti-histaminico e antipiretico',
      'Ter recursos para tratar anafilaxia disponiveis',
      'Apneia do sono comum em MPS IVA - risco aumentado de complicacoes',
      'Anticorpos neutralizantes podem reduzir eficacia',
      'Comprometimento respiratorio - monitorar durante infusao'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais (muito comuns)', 'Pirexia', 'Cefaleia', 'Nauseas', 'Vomitos', 'Dor abdominal', 'Fadiga'],
      graves: ['Anafilaxia', 'Reacoes de hipersensibilidade grave', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao medicamentosa conhecida', gravidade: 'leve', efeito: 'Enzima recombinante', conduta: 'Sem restricoes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'MPS IVA causa baixa estatura severa, displasia esqueletica e instabilidade de coluna cervical. TRE melhora resistencia mas nao reverte dano esqueletico. Inicio precoce e tratamento vitalicio.'
    },
    monitorizacao: ['Teste de caminhada de 6 minutos', 'Funcao pulmonar', 'GAGs urinarios', 'Anticorpos anti-farmaco', 'Altura e crescimento'],
    doencasRelacionadas: ['mps-iva', 'morquio-a'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'mps', 'mucopolissacaridose', 'doenca-rara', 'morquio', 'enzima']
  },
  {
    id: 'miglustat',
    nomeGenerico: 'Miglustat',
    nomesComerciais: ['Zavesca'],
    atcCode: 'A16AX06',
    rxNormCui: '352159',
    drugBankId: 'DB00419',
    snomedCT: '395812006',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Doenca de Gaucher tipo 1 leve a moderada (quando TRE nao e adequada)',
      'Doenca de Niemann-Pick tipo C (NPC)'
    ],
    mecanismoAcao: 'Inibidor de glicosilceramida sintase - TERAPIA DE REDUCAO DE SUBSTRATO (TRS). Diferente da TRE, reduz a sintese do substrato (glicosilceramida) ao inves de repor a enzima deficiente. Na NPC, tambem atua como chaperona farmacologica. Molecula pequena - atravessa barreira hematoencefalica (util na NPC neurologica).',
    posologias: [
      {
        indicacao: 'Doenca de Gaucher tipo 1',
        adultos: { dose: '100mg', frequencia: '3x/dia', observacoes: 'Pode ser usado quando TRE nao e opcao' }
      },
      {
        indicacao: 'Niemann-Pick tipo C',
        adultos: { dose: '200mg', frequencia: '3x/dia', observacoes: 'Ajustar conforme tolerancia GI' },
        pediatrico: { dose: 'Superficie corporal: <0,47m2: 100mg 1x/dia; 0,47-0,73m2: 100mg 2x/dia; 0,73-0,88m2: 100mg 3x/dia; 0,88-1,25m2: 200mg 2x/dia; >1,25m2: 200mg 3x/dia', frequencia: 'Ver dose', idadeMinima: '4 anos' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a miglustat',
      'Gestacao (teratogenico)',
      'Homens que planejam paternidade (efeito em espermatogenese)'
    ],
    precaucoes: [
      'Diarreia MUITO comum no inicio - dieta pobre em carboidratos ajuda',
      'Perda de peso frequente - monitorar nutricao',
      'Neuropatia periferica - avaliar periodicamente',
      'Tremor pode ocorrer',
      'Contracepcao OBRIGATORIA em mulheres em idade fertil',
      'Homens devem usar contracepcao durante e 3 meses apos'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (>80%)', 'Flatulencia', 'Dor abdominal', 'Perda de peso', 'Tremor', 'Cefaleia'],
      graves: ['Neuropatia periferica', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Imiglucerase', gravidade: 'leve', efeito: 'Podem ser usados juntos em Gaucher', conduta: 'Associacao possivel' },
      { medicamento: 'Sacarideos da dieta', gravidade: 'moderada', efeito: 'Inibicao de dissacaridases causa diarreia osmotica', conduta: 'Dieta pobre em sacarose, lactose e maltose' }
    ],
    ajusteDoseRenal: [
      { tfg: '50-70', ajuste: '100mg 2x/dia (Gaucher); 200mg 2x/dia (NPC)' },
      { tfg: '30-50', ajuste: '100mg 1x/dia (Gaucher); 100mg 2x/dia (NPC)' },
      { tfg: '<30', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      pediatrico: 'Monitorar crescimento e desenvolvimento neuromotor. Diarreia inicial frequente - geralmente melhora com dieta e tempo. Avaliar neuropatia periodicamente.'
    },
    monitorizacao: ['Funcao neurologica (neuropatia)', 'Peso corporal', 'Plaquetas', 'Funcao renal', 'Vitamina B12'],
    doencasRelacionadas: ['gaucher', 'niemann-pick'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre-substrato', 'doenca-lisossomal', 'gaucher', 'niemann-pick', 'npc', 'oral']
  },
  {
    id: 'eliglustat',
    nomeGenerico: 'Eliglustat',
    nomesComerciais: ['Cerdelga'],
    atcCode: 'A16AX10',
    rxNormCui: '1535497',
    drugBankId: 'DB09039',
    snomedCT: '716062006',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '84mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Doenca de Gaucher tipo 1 em adultos',
      'Pacientes metabolizadores extensivos (EM), intermediarios (IM) ou lentos (PM) de CYP2D6'
    ],
    mecanismoAcao: 'Inibidor potente e especifico de glicosilceramida sintase - TERAPIA DE REDUCAO DE SUBSTRATO (TRS) de segunda geracao. Reduz producao de glicosilceramida, substrato que se acumula na doenca de Gaucher. Diferente de miglustat: mais potente, menor inibicao de outras enzimas, melhor tolerado.',
    posologias: [
      {
        indicacao: 'Gaucher tipo 1 - metabolizadores extensivos/intermediarios CYP2D6',
        adultos: { dose: '84mg', frequencia: '2x/dia', observacoes: 'OBRIGATORIO: genotipagem CYP2D6 antes de iniciar' }
      },
      {
        indicacao: 'Gaucher tipo 1 - metabolizadores lentos CYP2D6',
        adultos: { dose: '84mg', frequencia: '1x/dia', observacoes: 'Dose reduzida para PM' }
      }
    ],
    contraindicacoes: [
      'Metabolizadores ultra-rapidos de CYP2D6 (falta de eficacia)',
      'Metabolizadores indeterminados de CYP2D6',
      'Uso concomitante de inibidores fortes de CYP2D6 ou CYP3A4 em PM',
      'Insuficiencia hepatica moderada/grave com PM',
      'Gestacao'
    ],
    precaucoes: [
      'GENOTIPAGEM CYP2D6 OBRIGATORIA antes de iniciar',
      'Nao usar em metabolizadores ultra-rapidos',
      'ECG antes e durante tratamento (prolonga QT)',
      'Multiplas interacoes medicamentosas via CYP2D6 e CYP3A4',
      'Ajustar ou evitar conforme genotipo CYP2D6 e medicacoes concomitantes'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nauseas', 'Diarreia', 'Dor abdominal', 'Fadiga', 'Artralgia'],
      graves: ['Prolongamento QT', 'Sincope', 'Palpitacoes']
    },
    interacoes: [
      { medicamento: 'Inibidores fortes CYP2D6 (paroxetina, fluoxetina)', gravidade: 'grave', efeito: 'Aumenta niveis de eliglustat - risco de arritmia', conduta: 'Em EM: reduzir para 84mg 1x/dia. Em PM: contraindicado' },
      { medicamento: 'Inibidores fortes CYP3A4 (cetoconazol, claritromicina)', gravidade: 'grave', efeito: 'Aumenta exposicao em todas as categorias', conduta: 'EM: reduzir para 84mg 1x/dia. IM/PM: contraindicado' },
      { medicamento: 'Indutores CYP3A4 (rifampicina)', gravidade: 'grave', efeito: 'Reduz eficacia', conduta: 'Evitar combinacao' },
      { medicamento: 'Imiglucerase', gravidade: 'leve', efeito: 'Pode ser usado para transicao de TRE para TRS', conduta: 'Transicao possivel sob supervisao' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'NAO APROVADO para uso pediatrico. Estudos apenas em adultos.'
    },
    monitorizacao: ['ECG antes e durante', 'Funcao hepatica e esplenica', 'Hemoglobina e plaquetas', 'Biomarcadores de Gaucher'],
    doencasRelacionadas: ['gaucher'],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'extensive_metabolizer',
        implications: ['Dose padrao 84mg 2x/dia'],
        dosageRecommendations: ['Ajustar com inibidores CYP2D6/CYP3A4']
      },
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Niveis plasmaticos aumentados'],
        dosageRecommendations: ['84mg 1x/dia; contraindicado com inibidores fortes']
      }
    ],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['trs', 'gaucher', 'cyp2d6', 'farmacogenomica', 'oral', 'doenca-rara']
  },
  {
    id: 'cerliponase-alfa',
    nomeGenerico: 'Cerliponase Alfa',
    nomesComerciais: ['Brineura'],
    atcCode: 'A16AB17',
    rxNormCui: '1991485',
    drugBankId: 'DB13944',
    snomedCT: '735173004',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '150mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Lipofuscinose ceroide neuronal tipo 2 (CLN2)',
      'Doenca de Batten (forma CLN2)'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com tripeptidil peptidase 1 (TPP1) humana recombinante. Na CLN2, deficiencia de TPP1 causa acumulo de lipofuscina ceroide nos lisossomos, levando a neurodegeneracao progressiva. ADMINISTRACAO INTRACEREBROVENTRICULAR (ICV) direta - contorna barreira hematoencefalica.',
    posologias: [
      {
        indicacao: 'CLN2/Doenca de Batten',
        pediatrico: { dose: '300mg', frequencia: 'Intracerebroventricular a cada 2 semanas', idadeMinima: '3 anos', observacoes: 'Requer implante de dispositivo de acesso ventricular (reservatorio). Infusao em ~4 horas.' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a cerliponase alfa',
      'Shunt ventriculoperitoneal',
      'Infeccao ativa do SNC ou sistemica clinicamente significativa'
    ],
    precaucoes: [
      'ADMINISTRACAO ICV requer dispositivo implantado e equipe especializada',
      'Risco de infeccao do dispositivo e meningite',
      'Reacoes de hipersensibilidade incluindo anafilaxia',
      'Malfuncionamento do dispositivo pode ocorrer',
      'Premedicacao com anti-histaminico e antipiretico recomendada',
      'Monitorar sinais de infeccao do SNC'
    ],
    efeitosAdversos: {
      comuns: ['Pirexia', 'Convulsoes', 'Hipersensibilidade', 'Vomitos', 'Irritabilidade', 'Pleocitose do LCR'],
      graves: ['Infeccao do dispositivo/meningite', 'Anafilaxia', 'Malfuncionamento do dispositivo', 'Hematoma']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao medicamentosa conhecida', gravidade: 'leve', efeito: 'Administracao ICV limita interacoes sistemicas', conduta: 'Sem restricoes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Doenca neurodegenerativa rapidamente progressiva. Tratamento desacelera progressao mas nao reverte dano. Inicio precoce essencial. Via ICV complexa - centros especializados apenas.'
    },
    monitorizacao: ['Escala motora-linguagem CLN2', 'Sinais de infeccao do dispositivo', 'LCR periodicamente', 'Imagem do dispositivo'],
    doencasRelacionadas: ['cln2', 'batten'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'cln2', 'batten', 'neurodegenerativa', 'intracerebroventricular', 'doenca-rara']
  },
  {
    id: 'laronidase',
    nomeGenerico: 'Laronidase',
    nomesComerciais: ['Aldurazyme'],
    atcCode: 'A16AB05',
    rxNormCui: '284639',
    drugBankId: 'DB00083',
    snomedCT: '395814007',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2,9mg/5ml (500U/5ml)', disponivelSUS: true }
    ],
    indicacoes: [
      'Mucopolissacaridose tipo I (MPS I)',
      'Sindrome de Hurler',
      'Sindrome de Hurler-Scheie',
      'Sindrome de Scheie'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com alfa-L-iduronidase humana recombinante. Na MPS I, deficiencia de alfa-L-iduronidase causa acumulo de dermatan sulfato e heparan sulfato. TRE reduz deposicao de GAGs em tecidos, melhorando funcao organica. Nao atravessa barreira hematoencefalica - limitada eficacia neurologica.',
    posologias: [
      {
        indicacao: 'MPS I (todas as formas)',
        adultos: { dose: '0,58mg/kg (100U/kg)', frequencia: 'IV semanal', observacoes: 'Infusao em ~4 horas (taxa maxima)' },
        pediatrico: { dose: '0,58mg/kg (100U/kg)', frequencia: 'IV semanal', idadeMinima: 'Nascimento', observacoes: 'Premedicacao com antipiretico e anti-histaminico' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a laronidase'
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade e anafilaxia - ter epinefrina disponivel',
      'Premeditacao rotineira recomendada',
      'Anticorpos anti-laronidase se desenvolvem na maioria dos pacientes',
      'Comprometimento respiratorio em MPS I grave - monitorar durante infusao',
      'NAO atravessa BHE - nao previne deterioracao neurologica na forma grave'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais', 'Rash', 'Pirexia', 'Cefaleia', 'Dor abdominal', 'Artralgia'],
      graves: ['Anafilaxia', 'Broncoespasmo grave', 'Angioedema']
    },
    interacoes: [
      { medicamento: 'Cloroquina/hidroxicloroquina', gravidade: 'moderada', efeito: 'Podem inibir captacao celular da enzima', conduta: 'Evitar se possivel' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Na forma grave (Hurler), transplante de medula ossea e considerado para prevenir deterioracao neurologica. TRE complementa mas nao substitui TMO para SNC. Tratamento vitalicio.'
    },
    monitorizacao: ['Funcao pulmonar', 'Ecocardiograma', 'GAGs urinarios', 'Volume hepatico/esplenico', 'Teste caminhada 6 min', 'Anticorpos'],
    doencasRelacionadas: ['mps-i', 'hurler', 'scheie'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'mps', 'mucopolissacaridose', 'hurler', 'enzima', 'doenca-rara']
  },
  {
    id: 'idursulfase',
    nomeGenerico: 'Idursulfase',
    nomesComerciais: ['Elaprase'],
    atcCode: 'A16AB09',
    rxNormCui: '595819',
    drugBankId: 'DB01271',
    snomedCT: '416655004',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '6mg/3ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Mucopolissacaridose tipo II (MPS II)',
      'Sindrome de Hunter'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com iduronato-2-sulfatase (I2S) humana recombinante. Na MPS II, deficiencia de I2S causa acumulo de dermatan sulfato e heparan sulfato. Doenca ligada ao X - afeta quase exclusivamente meninos. TRE reduz GAGs em tecidos perifericos; limitada penetracao no SNC.',
    posologias: [
      {
        indicacao: 'MPS II (Sindrome de Hunter)',
        adultos: { dose: '0,5mg/kg', frequencia: 'IV semanal', observacoes: 'Infusao em 3-4 horas' },
        pediatrico: { dose: '0,5mg/kg', frequencia: 'IV semanal', idadeMinima: '16 meses (estudos)', observacoes: 'Premedicar com antihistaminico/antipiretico' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a idursulfase'
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade frequentes - premedicacao rotineira',
      'Anafilaxia pode ocorrer - ter epinefrina disponivel',
      'Comprometimento respiratorio grave em alguns pacientes',
      'Apneia do sono comum em MPS II - risco durante infusao',
      'Anticorpos neutralizantes podem reduzir eficacia',
      'Nao penetra BHE significativamente - nao previne deterioracao neurologica'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais (>50%)', 'Pirexia', 'Cefaleia', 'Prurido', 'Urticaria', 'Hipertensao'],
      graves: ['Anafilaxia', 'Angioedema', 'Broncoespasmo grave', 'Convulsoes']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao clinicamente relevante conhecida', gravidade: 'leve', efeito: 'Enzima recombinante', conduta: 'Sem restricoes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Nao aplicavel - doenca afeta homens' },
    consideracoesEspeciais: {
      pediatrico: 'Forma grave (neuronopática) progride para deterioracao cognitiva. TRE nao previne neurodegeneracao. Idursulfase intratecal (Hunterase ICV) em desenvolvimento para formas neurologicas.'
    },
    monitorizacao: ['GAGs urinarios', 'Funcao pulmonar', 'Volume hepatico/esplenico', 'Ecocardiograma', 'Teste caminhada', 'Anticorpos'],
    doencasRelacionadas: ['mps-ii', 'hunter'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'mps', 'hunter', 'ligada-x', 'enzima', 'doenca-rara']
  },
  {
    id: 'galsulfase',
    nomeGenerico: 'Galsulfase',
    nomesComerciais: ['Naglazyme'],
    atcCode: 'A16AB08',
    rxNormCui: '545218',
    drugBankId: 'DB01279',
    snomedCT: '416584007',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '5mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Mucopolissacaridose tipo VI (MPS VI)',
      'Sindrome de Maroteaux-Lamy'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com N-acetilgalactosamina-4-sulfatase (arilsulfatase B) humana recombinante. Na MPS VI, deficiencia desta enzima causa acumulo de dermatan sulfato. TRE reduz GAGs em tecidos, melhora resistencia e funcao pulmonar. Diferente de MPS I/II, nao ha comprometimento cognitivo na MPS VI.',
    posologias: [
      {
        indicacao: 'MPS VI (Maroteaux-Lamy)',
        adultos: { dose: '1mg/kg', frequencia: 'IV semanal', observacoes: 'Infusao em ~4 horas' },
        pediatrico: { dose: '1mg/kg', frequencia: 'IV semanal', idadeMinima: '5 anos (estudos)', observacoes: 'Premedicar com anti-histaminico e antipiretico' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a galsulfase'
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade frequentes - premedicacao rotineira',
      'Comprometimento respiratorio - monitorar durante infusao',
      'Apneia do sono comum - risco aumentado',
      'Instabilidade de coluna cervical em alguns pacientes',
      'Anticorpos se desenvolvem na maioria mas raramente neutralizantes'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais', 'Pirexia', 'Rash', 'Dor abdominal', 'Artralgia', 'Otite media'],
      graves: ['Anafilaxia', 'Angioedema', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao conhecida', gravidade: 'leve', efeito: 'Enzima recombinante', conduta: 'Sem restricoes' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'MPS VI nao afeta cognicao. Manifestacoes incluem displasia esqueletica, baixa estatura, cardiopatia, opacidade corneal. Inicio precoce de TRE melhora prognostico.'
    },
    monitorizacao: ['Teste caminhada 6 min', 'Funcao pulmonar', 'GAGs urinarios', 'Ecocardiograma', 'Avaliacao oftalmica'],
    doencasRelacionadas: ['mps-vi', 'maroteaux-lamy'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'mps', 'maroteaux-lamy', 'enzima', 'doenca-rara']
  },
  {
    id: 'agalsidase-alfa',
    nomeGenerico: 'Agalsidase Alfa',
    nomesComerciais: ['Replagal'],
    atcCode: 'A16AB03',
    rxNormCui: '284477',
    drugBankId: 'DB00073',
    snomedCT: '395769005',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '3,5mg/3,5ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Doenca de Fabry (deficiencia de alfa-galactosidase A)',
      'Tratamento a longo prazo em pacientes com diagnostico confirmado'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com alfa-galactosidase A humana recombinante (produzida em linhagem celular humana). Na doenca de Fabry (ligada ao X), deficiencia de alfa-gal A causa acumulo de globotriaosilceramida (GL-3/Gb3) em endotelio, rins, coracao e sistema nervoso. TRE reduz Gb3 e estabiliza funcao organica.',
    posologias: [
      {
        indicacao: 'Doenca de Fabry',
        adultos: { dose: '0,2mg/kg', frequencia: 'IV a cada 2 semanas', observacoes: 'Infusao em ~40 minutos' },
        pediatrico: { dose: '0,2mg/kg', frequencia: 'IV a cada 2 semanas', idadeMinima: '7 anos (estudos)', observacoes: 'Seguranca e eficacia estabelecidas em criancas' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a agalsidase alfa'
    ],
    precaucoes: [
      'Reacoes infusionais - pre-tratamento com antihistaminicos/antipireticos se necessario',
      'Anticorpos IgG se desenvolvem em homens; podem reduzir eficacia',
      'Monitorar funcao renal e cardiaca regularmente',
      'Pacientes com doenca renal avancada podem ter menor beneficio',
      'Considerar inicio precoce para prevenir dano organico'
    ],
    efeitosAdversos: {
      comuns: ['Calafrios', 'Cefaleia', 'Nauseas', 'Pirexia', 'Rubor', 'Fadiga', 'Rinite'],
      graves: ['Reacoes de hipersensibilidade', 'Acidente vascular (raro)', 'Arritmias (em pacientes com Fabry cardiaco)']
    },
    interacoes: [
      { medicamento: 'Cloroquina, amiodarona', gravidade: 'moderada', efeito: 'Podem inibir atividade intracelular da enzima', conduta: 'Evitar se possivel' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Inicio em criancas antes de dano organico e ideal. Meninas heterozigotas podem ter doenca e beneficiar de TRE. Tratamento vitalicio.'
    },
    monitorizacao: ['Funcao renal (creatinina, proteinuria)', 'Ecocardiograma/RMN cardiaca', 'Gb3 plasmatico/urinario', 'Dor neuropatica', 'Anticorpos'],
    doencasRelacionadas: ['fabry'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'fabry', 'ligada-x', 'enzima', 'doenca-rara']
  },
  {
    id: 'alglucosidase-alfa',
    nomeGenerico: 'Alglucosidase Alfa',
    nomesComerciais: ['Myozyme', 'Lumizyme'],
    atcCode: 'A16AB07',
    rxNormCui: '484150',
    drugBankId: 'DB01272',
    snomedCT: '416596004',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Doenca de Pompe (glicogenose tipo II)',
      'Forma infantil classica (cardiomiopatia grave)',
      'Forma tardia (infantil nao classica, juvenil, adulta)'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com alfa-glicosidase acida (GAA) humana recombinante. Na doenca de Pompe, deficiencia de GAA causa acumulo de glicogenio nos lisossomos, especialmente em musculo esqueletico e cardiaco. TRE reduz glicogenio muscular, melhorando funcao cardiaca e motora. Forma infantil sem tratamento e fatal no primeiro ano.',
    posologias: [
      {
        indicacao: 'Pompe - forma infantil',
        pediatrico: { dose: '20mg/kg', frequencia: 'IV a cada 2 semanas', idadeMinima: 'Nascimento', observacoes: 'Infusao em ~4 horas. Forma infantil classica: iniciar tratamento IMEDIATAMENTE ao diagnostico.' }
      },
      {
        indicacao: 'Pompe - forma tardia',
        adultos: { dose: '20mg/kg', frequencia: 'IV a cada 2 semanas', observacoes: 'Infusao em ~4 horas' },
        pediatrico: { dose: '20mg/kg', frequencia: 'IV a cada 2 semanas', idadeMinima: '1 ano', observacoes: 'Formas tardias: inicio mais lento, foco em funcao respiratoria e motora' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a alglucosidase alfa'
    ],
    precaucoes: [
      'Reacoes infusionais frequentes - premedicacao recomendada',
      'RISCO DE ANAFILAXIA - especialmente pacientes CRIM-negativos',
      'Pacientes CRIM-negativos podem desenvolver altos titulos de anticorpos neutralizantes',
      'Considerar imunomodulacao em pacientes CRIM-negativos',
      'Risco cardiaco em pacientes com cardiomiopatia - monitorar ECG durante infusao',
      'Arritmias podem ocorrer durante infusao'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais', 'Pirexia', 'Rash', 'Tosse', 'Vomitos', 'Taquicardia'],
      graves: ['Anafilaxia', 'Arritmias cardiacas', 'Insuficiencia cardiaca aguda', 'Choque anafilatico']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao medicamentosa clinicamente significativa conhecida', gravidade: 'leve', efeito: 'Enzima recombinante', conduta: 'Sem restricoes especificas' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'Triagem neonatal pode identificar forma infantil precocemente - inicio imediato de TRE e crucial. Status CRIM (cross-reactive immunologic material) influencia prognostico e manejo.'
    },
    monitorizacao: ['Funcao respiratoria (capacidade vital)', 'Funcao motora (escalas)', 'Ecocardiograma', 'Anticorpos anti-GAA', 'ECG durante infusao'],
    doencasRelacionadas: ['pompe', 'glicogenose-ii'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'pompe', 'glicogenose', 'enzima', 'cardiomiopatia', 'doenca-rara']
  },
  {
    id: 'vestronidase-alfa',
    nomeGenerico: 'Vestronidase Alfa',
    nomesComerciais: ['Mepsevii'],
    atcCode: 'A16AB18',
    rxNormCui: '2001538',
    drugBankId: 'DB14031',
    snomedCT: '763530009',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Mucopolissacaridose tipo VII (MPS VII)',
      'Sindrome de Sly'
    ],
    mecanismoAcao: 'Terapia de reposicao enzimatica com beta-glucuronidase humana recombinante. Na MPS VII, deficiencia de beta-glucuronidase causa acumulo de dermatan sulfato, heparan sulfato e condroitina sulfato. MPS VII e extremamente rara (<1:1.000.000). TRE reduz GAGs e melhora funcao organica. Espectro clinico amplo - desde hidropisia fetal ate formas atenuadas.',
    posologias: [
      {
        indicacao: 'MPS VII (Sindrome de Sly)',
        adultos: { dose: '4mg/kg', frequencia: 'IV a cada 2 semanas', observacoes: 'Infusao em ~4 horas' },
        pediatrico: { dose: '4mg/kg', frequencia: 'IV a cada 2 semanas', idadeMinima: 'Nascimento', observacoes: 'Premedicar com anti-histaminico, antipiretico e corticoide se necessario' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave a vestronidase alfa'
    ],
    precaucoes: [
      'Reacoes anafilaticas - ter epinefrina e recursos de emergencia disponiveis',
      'Premeditacao com anti-histaminico, antipiretico +/- corticoide',
      'MPS VII muito rara - experiencia clinica limitada',
      'Pode apresentar com hidropisia fetal - diagnostico precoce crucial',
      'Comprometimento neurologico variavel'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes infusionais', 'Prurido', 'Urticaria', 'Rash', 'Diarreia', 'Anafilaxia'],
      graves: ['Anafilaxia grave', 'Edema periorbitário', 'Reacoes de hipersensibilidade sistemica']
    },
    interacoes: [
      { medicamento: 'Nenhuma interacao conhecida', gravidade: 'leve', efeito: 'Enzima recombinante', conduta: 'Sem restricoes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      pediatrico: 'MPS VII extremamente rara. Pode se apresentar intraútero como hidropisia fetal. Amplo espectro de gravidade. Tratamento vitalicio em centros especializados.'
    },
    monitorizacao: ['GAGs urinarios', 'Volume hepatico/esplenico', 'Funcao pulmonar', 'Funcao motora', 'Anticorpos anti-farmaco'],
    doencasRelacionadas: ['mps-vii', 'sly'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tre', 'mps', 'sly', 'ultra-rara', 'enzima', 'doenca-rara']
  }
];

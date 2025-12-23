/**
 * EXPANSÃO HEMATOLOGIA - DARWIN-MFC
 * =================================
 * Medicamentos hematológicos: anticoagulantes, antiplaquetários, antianêmicos,
 * fatores de coagulação, e terapia de suporte hematológico.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosHematologia: Partial<Medicamento>[] = [
  // ==================== ANTICOAGULANTES ORAIS DIRETOS (DOACs) ====================
  {
    id: 'rivaroxabana',
    nomeGenerico: 'Rivaroxabana',
    nomesComerciais: ['Xarelto'],
    atcCode: 'B01AF01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: ['Fibrilação atrial não valvar', 'TEV tratamento/prevenção', 'Prevenção TEV pós-operatório'],
    mecanismoAcao: 'Inibidor direto do fator Xa, bloqueando a via comum da coagulação.',
    posologias: [
      {
        indicacao: 'FA não valvar',
        adultos: { dose: '20mg', frequencia: '1x/dia com refeição', doseMaxima: '20mg/dia', observacoes: 'Ajuste renal: ClCr 15-49: 15mg/dia; ClCr <15: contraindicado' }
      },
      {
        indicacao: 'TEV tratamento',
        adultos: { dose: '15mg 2x/dia por 21 dias, depois 20mg 1x/dia', frequencia: 'Com refeição' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hepatopatia com coagulopatia', 'ClCr <15', 'Prótese valvar mecânica'],
    precaucoes: ['Monitorar função renal', 'Suspender 24-48h antes de cirurgia', 'Não associar com antifúngicos azólicos'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Anemia', 'Náusea'],
      graves: ['Hemorragia intracraniana', 'Hemorragia GI grave']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'grave', efeito: 'Aumento níveis rivaroxabana', conduta: 'Evitar associação' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Redução níveis rivaroxabana', conduta: 'Evitar associação' },
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco sangramento', conduta: 'Usar com cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' }
  },

  {
    id: 'apixabana',
    nomeGenerico: 'Apixabana',
    nomesComerciais: ['Eliquis'],
    atcCode: 'B01AF02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false }
    ],
    indicacoes: ['Fibrilação atrial não valvar', 'TEV tratamento/prevenção', 'Prevenção TEV pós-artroplastia'],
    mecanismoAcao: 'Inibidor direto, seletivo e reversível do fator Xa.',
    posologias: [
      {
        indicacao: 'FA não valvar',
        adultos: { dose: '5mg 2x/dia', frequencia: '12/12h', observacoes: 'Reduzir para 2,5mg 2x se ≥2 critérios: idade ≥80, peso ≤60kg, Cr ≥1,5' }
      },
      {
        indicacao: 'TEV tratamento',
        adultos: { dose: '10mg 2x/dia por 7 dias, depois 5mg 2x/dia', frequencia: '12/12h' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hepatopatia grave', 'Prótese valvar mecânica'],
    precaucoes: ['Menor dependência renal que rivaroxabana', 'Cuidado com idosos'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Anemia', 'Contusões'],
      graves: ['Hemorragia intracraniana', 'Hemorragia retroperitoneal']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'grave', efeito: 'Aumento níveis', conduta: 'Evitar ou reduzir dose' },
      { medicamento: 'Indutores CYP3A4', gravidade: 'grave', efeito: 'Redução níveis', conduta: 'Evitar associação' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'dabigatrana',
    nomeGenerico: 'Dabigatrana',
    nomesComerciais: ['Pradaxa'],
    atcCode: 'B01AE07',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_trombina_direto',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '110mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: ['Fibrilação atrial não valvar', 'TEV tratamento/prevenção'],
    mecanismoAcao: 'Inibidor direto, competitivo e reversível da trombina livre e ligada ao coágulo.',
    posologias: [
      {
        indicacao: 'FA não valvar',
        adultos: { dose: '150mg 2x/dia', frequencia: '12/12h', observacoes: 'ClCr 30-50: considerar 110mg 2x; ClCr <30: contraindicado' }
      },
      {
        indicacao: 'TEV',
        adultos: { dose: '150mg 2x/dia após anticoagulação parenteral inicial', frequencia: '12/12h' }
      }
    ],
    contraindicacoes: ['ClCr <30', 'Sangramento ativo', 'Prótese valvar mecânica', 'Hepatopatia significativa'],
    precaucoes: ['Alta dependência renal', 'Engolir cápsula inteira (não abrir)', 'Existe antídoto: idarucizumabe'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Sangramento', 'Dor abdominal'],
      graves: ['Hemorragia grave', 'Reações anafiláticas (raro)']
    },
    interacoes: [
      { medicamento: 'Verapamil', gravidade: 'moderada', efeito: 'Aumento níveis dabigatrana', conduta: 'Reduzir dose dabigatrana' },
      { medicamento: 'Dronedarona', gravidade: 'grave', efeito: 'Aumento significativo níveis', conduta: 'Contraindicado' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'edoxabana',
    nomeGenerico: 'Edoxabana',
    nomesComerciais: ['Lixiana'],
    atcCode: 'B01AF03',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false }
    ],
    indicacoes: ['Fibrilação atrial não valvar', 'TEV tratamento/prevenção'],
    mecanismoAcao: 'Inibidor direto e seletivo do fator Xa.',
    posologias: [
      {
        indicacao: 'FA não valvar / TEV',
        adultos: { dose: '60mg', frequencia: '1x/dia', observacoes: 'ClCr 15-50 ou peso ≤60kg: 30mg/dia' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hepatopatia com coagulopatia', 'ClCr <15'],
    precaucoes: ['Dose única diária', 'Considerar redução dose conforme critérios'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Anemia', 'Rash'],
      graves: ['Hemorragia intracraniana', 'Hemorragia GI']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Redução eficácia', conduta: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ==================== HEPARINAS ====================
  {
    id: 'enoxaparina',
    nomeGenerico: 'Enoxaparina',
    nomesComerciais: ['Clexane', 'Versa'],
    atcCode: 'B01AB05',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'heparina_baixo_peso',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20mg/0,2ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '40mg/0,4ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '60mg/0,6ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '80mg/0,8ml', disponivelSUS: true }
    ],
    indicacoes: ['Profilaxia TEV', 'Tratamento TEV', 'SCA (angina instável/IAM)', 'Anticoagulação em hemodiálise'],
    mecanismoAcao: 'Potencializa atividade da antitrombina III, inibindo principalmente fator Xa.',
    posologias: [
      {
        indicacao: 'Profilaxia TEV',
        adultos: { dose: '40mg SC', frequencia: '1x/dia', observacoes: 'ClCr <30: 20mg/dia' }
      },
      {
        indicacao: 'Tratamento TEV',
        adultos: { dose: '1mg/kg SC', frequencia: '12/12h ou 1,5mg/kg 1x/dia', observacoes: 'ClCr <30: 1mg/kg 1x/dia' }
      },
      {
        indicacao: 'SCA',
        adultos: { dose: '1mg/kg SC', frequencia: '12/12h por 2-8 dias' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a heparinas', 'Sangramento ativo', 'Trombocitopenia induzida por heparina (HIT)'],
    precaucoes: ['Monitorar plaquetas', 'Cuidado em obesos (dose máxima)', 'Reversão parcial com protamina'],
    efeitosAdversos: {
      comuns: ['Hematoma no local injeção', 'Sangramento menor'],
      graves: ['Sangramento maior', 'HIT', 'Osteoporose (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco sangramento', conduta: 'Evitar se possível' },
      { medicamento: 'Antiagregantes', gravidade: 'moderada', efeito: 'Risco sangramento', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvida oralmente' }
  },

  {
    id: 'heparina-nao-fracionada',
    nomeGenerico: 'Heparina Não Fracionada',
    nomesComerciais: ['Liquemine', 'Heparina sódica'],
    atcCode: 'B01AB01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'heparina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '5.000UI/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5.000UI/0,25ml', disponivelSUS: true }
    ],
    indicacoes: ['Anticoagulação em cirurgias', 'TEV tratamento', 'SCA', 'CEC (circulação extracorpórea)'],
    mecanismoAcao: 'Potencializa antitrombina III, inibindo trombina e fator Xa.',
    posologias: [
      {
        indicacao: 'TEV tratamento',
        adultos: { dose: 'Bolus 80UI/kg IV + 18UI/kg/h infusão contínua', frequencia: 'Ajustar por TTPa' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '5.000UI SC', frequencia: '8/8h ou 12/12h' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'HIT', 'Hipersensibilidade'],
    precaucoes: ['Monitorar TTPa (1,5-2,5x controle)', 'Monitorar plaquetas', 'Antídoto: protamina'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Hematomas'],
      graves: ['HIT tipo II', 'Hemorragia grave', 'Osteoporose (longo prazo)']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes orais', gravidade: 'grave', efeito: 'Sinergismo anticoagulante', conduta: 'Monitorar rigorosamente' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não atravessa para o leite' }
  },

  // ==================== ANTIPLAQUETÁRIOS ====================
  {
    id: 'clopidogrel',
    nomeGenerico: 'Clopidogrel',
    nomesComerciais: ['Plavix', 'Plagrel'],
    atcCode: 'B01AC04',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['IAM', 'AVC isquêmico', 'Doença arterial periférica', 'Pós-angioplastia com stent'],
    mecanismoAcao: 'Inibidor irreversível do receptor P2Y12 de ADP nas plaquetas.',
    posologias: [
      {
        indicacao: 'Prevenção secundária',
        adultos: { dose: '75mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'SCA com ou sem stent',
        adultos: { dose: 'Ataque 300-600mg, manutenção 75mg/dia', frequencia: '1x/dia por 12 meses' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Insuficiência hepática grave'],
    precaucoes: ['Suspender 5-7 dias antes de cirurgia', 'Polimorfismo CYP2C19 (metabolizadores lentos)', 'Interação com IBPs'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Dispepsia', 'Diarreia'],
      graves: ['Púrpura trombocitopênica trombótica (PTT)', 'Hemorragia grave']
    },
    interacoes: [
      { medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Reduz ativação clopidogrel', conduta: 'Preferir pantoprazol' },
      { medicamento: 'AAS', gravidade: 'leve', efeito: 'Sinergismo antiplaquetário', conduta: 'Associação terapêutica comum' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'ticagrelor',
    nomeGenerico: 'Ticagrelor',
    nomesComerciais: ['Brilinta'],
    atcCode: 'B01AC24',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false }
    ],
    indicacoes: ['SCA (com ou sem elevação ST)', 'Pós-IAM prevenção secundária'],
    mecanismoAcao: 'Antagonista reversível do receptor P2Y12 de ADP - não requer ativação hepática.',
    posologias: [
      {
        indicacao: 'SCA',
        adultos: { dose: 'Ataque 180mg, manutenção 90mg 2x/dia', frequencia: '12/12h por 12 meses' }
      },
      {
        indicacao: 'Prevenção secundária pós-IAM (>1 ano)',
        adultos: { dose: '60mg 2x/dia', frequencia: '12/12h' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'AVC hemorrágico prévio', 'Insuficiência hepática moderada-grave'],
    precaucoes: ['Dispneia transitória comum', 'Pausas ventriculares (monitorar)', 'Não associar com AAS >100mg'],
    efeitosAdversos: {
      comuns: ['Dispneia', 'Sangramento', 'Cefaleia'],
      graves: ['Hemorragia grave', 'Bradicardia/pausas']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'grave', efeito: 'Aumento níveis', conduta: 'Contraindicado' },
      { medicamento: 'Sinvastatina >40mg', gravidade: 'moderada', efeito: 'Aumento estatina', conduta: 'Limitar dose estatina' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'prasugrel',
    nomeGenerico: 'Prasugrel',
    nomesComerciais: ['Effient'],
    atcCode: 'B01AC22',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false }
    ],
    indicacoes: ['SCA com ICP planejada'],
    mecanismoAcao: 'Pró-droga convertida em inibidor irreversível do receptor P2Y12.',
    posologias: [
      {
        indicacao: 'SCA com ICP',
        adultos: { dose: 'Ataque 60mg, manutenção 10mg/dia', frequencia: '1x/dia por 12 meses' }
      }
    ],
    contraindicacoes: ['AVC/AIT prévio', 'Sangramento ativo', 'Idade ≥75 anos (risco/benefício)', 'Peso <60kg (considerar 5mg)'],
    precaucoes: ['Maior risco sangramento vs clopidogrel', 'Não iniciar antes de definir anatomia coronária'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Cefaleia', 'Dispneia'],
      graves: ['Hemorragia grave', 'PTT (raro)']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Risco sangramento aumentado', conduta: 'Extrema cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ==================== ANTIANÊMICOS ====================
  {
    id: 'eritropoetina-alfa',
    nomeGenerico: 'Eritropoetina Alfa',
    nomesComerciais: ['Eprex', 'Hemax'],
    atcCode: 'B03XA01',
    classeTerapeutica: 'suplemento',
    subclasse: 'estimulante_eritropoiese',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2.000UI', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4.000UI', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10.000UI', disponivelSUS: true }
    ],
    indicacoes: ['Anemia DRC em diálise', 'Anemia por quimioterapia', 'Anemia pré-operatória'],
    mecanismoAcao: 'Glicoproteína que estimula proliferação e diferenciação de células eritropoiéticas.',
    posologias: [
      {
        indicacao: 'Anemia DRC',
        adultos: { dose: '50-100UI/kg 3x/semana SC ou IV', frequencia: '3x/semana' }
      },
      {
        indicacao: 'Anemia quimioterapia',
        adultos: { dose: '150UI/kg 3x/semana ou 40.000UI semanal', frequencia: '1-3x/semana' }
      }
    ],
    contraindicacoes: ['Hipertensão não controlada', 'Hipersensibilidade', 'Aplasia pura série vermelha'],
    precaucoes: ['Alvo Hb 10-12g/dL (não hipercorrigir)', 'Monitorar PA', 'Suplementar ferro se necessário'],
    efeitosAdversos: {
      comuns: ['Hipertensão', 'Cefaleia', 'Sintomas gripais'],
      graves: ['Eventos tromboembólicos', 'Aplasia pura série vermelha (anticorpos anti-EPO)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'darbepoetina-alfa',
    nomeGenerico: 'Darbepoetina Alfa',
    nomesComerciais: ['Aranesp'],
    atcCode: 'B03XA02',
    classeTerapeutica: 'suplemento',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '25mcg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '40mcg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '60mcg', disponivelSUS: false }
    ],
    indicacoes: ['Anemia DRC', 'Anemia por quimioterapia'],
    mecanismoAcao: 'EPO hiperglicosilada com meia-vida prolongada.',
    posologias: [
      {
        indicacao: 'Anemia DRC',
        adultos: { dose: '0,45mcg/kg semanal ou 0,75mcg/kg quinzenal', frequencia: '1x/semana ou 1x/2 semanas' }
      }
    ],
    contraindicacoes: ['Hipertensão não controlada', 'Hipersensibilidade'],
    precaucoes: ['Mesmas da EPO', 'Menor frequência de aplicação'],
    efeitosAdversos: {
      comuns: ['Hipertensão', 'Cefaleia'],
      graves: ['Eventos tromboembólicos']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'acido-folico',
    nomeGenerico: 'Ácido Fólico',
    nomesComerciais: ['Endofolin', 'Folin'],
    atcCode: 'B03BB01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true }
    ],
    indicacoes: ['Anemia megaloblástica', 'Prevenção defeitos tubo neural', 'Suplementação gestação'],
    mecanismoAcao: 'Vitamina B9 essencial para síntese de DNA e divisão celular.',
    posologias: [
      {
        indicacao: 'Deficiência/anemia',
        adultos: { dose: '5mg', frequencia: '1x/dia' },
        pediatrico: { dose: '0,5-1mg/dia', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Prevenção pré-concepcional',
        adultos: { dose: '0,4-0,8mg/dia', frequencia: '1x/dia desde 3 meses antes até 12 semanas gestação' }
      }
    ],
    contraindicacoes: ['Anemia perniciosa não diagnosticada (pode mascarar deficiência B12)'],
    precaucoes: ['Não tratar anemia megaloblástica sem excluir deficiência B12'],
    efeitosAdversos: {
      comuns: ['Bem tolerado'],
      graves: ['Reações alérgicas (raras)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Antagonismo (desejado em resgate)', conduta: 'Usar como resgate' },
      { medicamento: 'Fenitoína', gravidade: 'leve', efeito: 'Redução níveis anticonvulsivante', conduta: 'Monitorar' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro e recomendado' }
  },

  {
    id: 'hidroxicobalamina',
    nomeGenerico: 'Hidroxicobalamina (Vitamina B12)',
    nomesComerciais: ['Rubranova', 'B12 Depot'],
    atcCode: 'B03BA03',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '5.000mcg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10.000mcg/2ml', disponivelSUS: true }
    ],
    indicacoes: ['Anemia perniciosa', 'Deficiência vitamina B12', 'Neuropatia por deficiência B12'],
    mecanismoAcao: 'Coenzima essencial para síntese de DNA e metabolismo da mielina.',
    posologias: [
      {
        indicacao: 'Deficiência com sintomas neurológicos',
        adultos: { dose: '1.000mcg IM dias alternados por 2 semanas, depois semanal por 2 meses, depois mensal', frequencia: 'Conforme fase' },
        pediatrico: { dose: '50-100mcg/dose IM', frequencia: 'Conforme fase' }
      },
      {
        indicacao: 'Manutenção',
        adultos: { dose: '1.000mcg IM', frequencia: '1x/mês' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade ao cobalto'],
    precaucoes: ['Excluir deficiência de folato antes de tratar', 'Monitorar potássio (risco hipocalemia durante reposição)'],
    efeitosAdversos: {
      comuns: ['Dor no local', 'Diarreia transitória'],
      graves: ['Anafilaxia (raro)', 'Hipocalemia']
    },
    interacoes: [
      { medicamento: 'Metformina', gravidade: 'leve', efeito: 'Reduz absorção B12', conduta: 'Monitorar níveis B12 em uso crônico' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'ferro-endovenoso-sacarato',
    nomeGenerico: 'Ferro Sacarato',
    nomesComerciais: ['Noripurum EV', 'Feriv'],
    atcCode: 'B03AC02',
    classeTerapeutica: 'suplemento',
    subclasse: 'antianemico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Anemia ferropriva com intolerância oral', 'Reposição rápida de ferro', 'DRC com EPO'],
    mecanismoAcao: 'Complexo ferro-sacarose para reposição parenteral de ferro.',
    posologias: [
      {
        indicacao: 'Reposição',
        adultos: { dose: '100-200mg por infusão (máx 200mg/sessão)', frequencia: '1-3x/semana' }
      },
      {
        indicacao: 'Dose total',
        adultos: { dose: 'Calcular déficit: Peso x (Hb alvo - Hb atual) x 2,4 + 500mg', frequencia: 'Dividir em aplicações' }
      }
    ],
    contraindicacoes: ['Sobrecarga de ferro', 'Anemia não ferropriva', 'Primeiro trimestre gestação'],
    precaucoes: ['Infundir lentamente (risco anafilaxia)', 'Ter material de ressuscitação disponível', 'Não misturar com outros medicamentos'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Gosto metálico', 'Hipotensão'],
      graves: ['Anafilaxia', 'Hipotensão grave']
    },
    interacoes: [
      { medicamento: 'Ferro oral', gravidade: 'leve', efeito: 'Reduz absorção oral', conduta: 'Suspender oral 5 dias antes' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'carboximaltose-ferrica',
    nomeGenerico: 'Carboximaltose Férrica',
    nomesComerciais: ['Ferinject'],
    atcCode: 'B03AC01',
    classeTerapeutica: 'suplemento',
    subclasse: 'antianemico',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg/10ml', disponivelSUS: false }
    ],
    indicacoes: ['Anemia ferropriva com intolerância oral', 'IC com deficiência ferro', 'DRC pré-diálise'],
    mecanismoAcao: 'Complexo carboidrato-ferro para infusão rápida de altas doses.',
    posologias: [
      {
        indicacao: 'Deficiência ferro',
        adultos: { dose: '500-1000mg dose única (máx 15mg/kg ou 1000mg)', frequencia: 'Dose única, repetir se necessário após 1 semana' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Sobrecarga de ferro', 'Anemia não ferropriva'],
    precaucoes: ['Infusão mínima 15min para 1000mg', 'Hipofosfatemia pode ocorrer', 'Monitorar fósforo'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea', 'Hipofosfatemia'],
      graves: ['Reações anafiláticas (raro)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ==================== FATORES DE COAGULAÇÃO ====================
  {
    id: 'fitomenadiona',
    nomeGenerico: 'Fitomenadiona (Vitamina K1)',
    nomesComerciais: ['Kanakion'],
    atcCode: 'B02BA01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: true },
      { forma: 'gotas', concentracao: '20mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Reversão anticoagulação por varfarina', 'Doença hemorrágica do RN', 'Deficiência vitamina K'],
    mecanismoAcao: 'Cofator para síntese hepática de fatores II, VII, IX, X.',
    posologias: [
      {
        indicacao: 'Reversão varfarina (não urgente)',
        adultos: { dose: '1-2,5mg VO', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Reversão varfarina (sangramento)',
        adultos: { dose: '5-10mg IV lento', frequencia: 'Dose única, repetir se necessário' }
      },
      {
        indicacao: 'Profilaxia RN',
        adultos: { dose: 'N/A (uso neonatal)', frequencia: 'Ver outras indicações' },
        pediatrico: { dose: '1mg IM ao nascimento', frequencia: 'Dose única', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['IV lento (risco anafilaxia)', 'Efeito leva 12-24h', 'Em urgência associar plasma/CCP'],
    efeitosAdversos: {
      comuns: ['Reação local'],
      graves: ['Anafilaxia (IV rápido)', 'Resistência à varfarina temporária']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Antagonismo (desejado)', conduta: 'Objetivo terapêutico' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'acido-tranexamico',
    nomeGenerico: 'Ácido Tranexâmico',
    nomesComerciais: ['Transamin', 'Hemoblock'],
    atcCode: 'B02AA02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antifibrinolitico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '250mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Hemorragia pós-parto', 'Menorragia', 'Sangramento em trauma', 'Profilaxia sangramento cirúrgico'],
    mecanismoAcao: 'Inibidor competitivo da ativação do plasminogênio, prevenindo fibrinólise.',
    posologias: [
      {
        indicacao: 'Menorragia',
        adultos: { dose: '1-1,5g', frequencia: '8/8h por 3-5 dias durante menstruação' }
      },
      {
        indicacao: 'Hemorragia pós-parto',
        adultos: { dose: '1g IV em 10min', frequencia: 'Até 2 doses com intervalo de 30min' }
      },
      {
        indicacao: 'Trauma (protocolo CRASH-2)',
        adultos: { dose: '1g IV em 10min + 1g IV em 8h', frequencia: 'Iniciar até 3h após trauma' }
      }
    ],
    contraindicacoes: ['Doença tromboembólica ativa', 'Coagulação intravascular ativa', 'Convulsões'],
    precaucoes: ['Ajustar dose em IR', 'Risco convulsões em altas doses IV', 'Hidratação adequada'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Cefaleia'],
      graves: ['Convulsões', 'Tromboembolismo']
    },
    interacoes: [
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Risco trombótico', conduta: 'Usar com cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade no leite' }
  },

  {
    id: 'complexo-protrombinico',
    nomeGenerico: 'Complexo Protrombínico (CCP)',
    nomesComerciais: ['Beriplex', 'Octaplex'],
    atcCode: 'B02BD01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'fator_coagulacao',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500UI', disponivelSUS: false }
    ],
    indicacoes: ['Reversão urgente de anticoagulantes cumarínicos', 'Deficiência fatores vitamina K-dependentes'],
    mecanismoAcao: 'Concentrado de fatores II, VII, IX e X para reposição imediata.',
    posologias: [
      {
        indicacao: 'Reversão varfarina',
        adultos: { dose: '25-50UI/kg IV conforme INR', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['HIT', 'CIVD'],
    precaucoes: ['Administrar vitamina K concomitante', 'Risco trombótico', 'Derivado plasmático'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Febre'],
      graves: ['Trombose', 'CIVD', 'Reações alérgicas']
    },
    interacoes: [
      { medicamento: 'Antifibrinolíticos', gravidade: 'moderada', efeito: 'Risco trombótico', conduta: 'Usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== ANTÍDOTOS ANTICOAGULANTES ====================
  {
    id: 'idarucizumabe',
    nomeGenerico: 'Idarucizumabe',
    nomesComerciais: ['Praxbind'],
    atcCode: 'V03AB37',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2,5g/50ml', disponivelSUS: false }
    ],
    indicacoes: ['Reversão dabigatrana em sangramento grave', 'Cirurgia urgente em uso de dabigatrana'],
    mecanismoAcao: 'Fragmento de anticorpo monoclonal que se liga especificamente à dabigatrana.',
    posologias: [
      {
        indicacao: 'Reversão dabigatrana',
        adultos: { dose: '5g IV (2 frascos de 2,5g)', frequencia: 'Dose única, administrar em sequência ou simultâneo' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Retomar anticoagulação quando apropriado', 'Pode reaplicar se necessário'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Hipocalemia'],
      graves: ['Eventos tromboembólicos (retomada coagulação)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro (uso único)' }
  },

  {
    id: 'andexanet-alfa',
    nomeGenerico: 'Andexanet Alfa',
    nomesComerciais: ['Ondexxya'],
    atcCode: 'V03AB38',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: ['Reversão apixabana ou rivaroxabana em sangramento grave'],
    mecanismoAcao: 'Fator Xa recombinante inativo que age como decoy, sequestrando inibidores do fator Xa.',
    posologias: [
      {
        indicacao: 'Reversão (dose baixa)',
        adultos: { dose: 'Bolus 400mg em 15-30min + infusão 480mg em 2h', frequencia: 'Para última dose anticoagulante há >8h' }
      },
      {
        indicacao: 'Reversão (dose alta)',
        adultos: { dose: 'Bolus 800mg em 30min + infusão 960mg em 2h', frequencia: 'Para última dose anticoagulante há <8h ou dose desconhecida' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Custo elevado', 'Risco trombótico após reversão', 'Monitorar por 24h'],
    efeitosAdversos: {
      comuns: ['Infusão local', 'Febre'],
      graves: ['Eventos tromboembólicos', 'Parada cardíaca', 'AVC']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único, provavelmente seguro' }
  },

  {
    id: 'sulfato-protamina',
    nomeGenerico: 'Sulfato de Protamina',
    nomesComerciais: ['Protamina'],
    atcCode: 'V03AB14',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Reversão heparina não fracionada', 'Reversão parcial HBPM'],
    mecanismoAcao: 'Liga-se à heparina formando complexo inativo.',
    posologias: [
      {
        indicacao: 'Reversão HNF',
        adultos: { dose: '1mg para cada 100UI de heparina', frequencia: 'IV lento (10min), máx 50mg' }
      },
      {
        indicacao: 'Reversão HBPM (parcial)',
        adultos: { dose: '1mg para cada 1mg enoxaparina (até 8h)', frequencia: 'IV lento' }
      }
    ],
    contraindicacoes: ['Alergia a protamina', 'Alergia a peixe (cautela)'],
    precaucoes: ['Infusão lenta (hipotensão)', 'Risco anafilaxia em diabéticos com insulina NPH'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Bradicardia'],
      graves: ['Anafilaxia', 'Colapso cardiovascular']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  // ==================== AGENTES TROMBOLÍTICOS ====================
  {
    id: 'alteplase',
    nomeGenerico: 'Alteplase (rt-PA)',
    nomesComerciais: ['Actilyse'],
    atcCode: 'B01AD02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'trombolitico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['IAM com supradesnível ST', 'AVC isquêmico agudo (até 4,5h)', 'TEP maciço'],
    mecanismoAcao: 'Ativador tissular do plasminogênio recombinante, promove fibrinólise localizada.',
    posologias: [
      {
        indicacao: 'AVC isquêmico',
        adultos: { dose: '0,9mg/kg (máx 90mg): 10% bolus + 90% em 60min', frequencia: 'Dose única' }
      },
      {
        indicacao: 'IAM',
        adultos: { dose: '15mg bolus + 0,75mg/kg em 30min + 0,5mg/kg em 60min (máx 100mg)', frequencia: 'Dose única' }
      },
      {
        indicacao: 'TEP maciço',
        adultos: { dose: '100mg IV em 2h', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'AVC hemorrágico', 'Cirurgia maior recente', 'HAS grave não controlada'],
    precaucoes: ['Janela terapêutica estreita', 'Risco hemorragia intracraniana', 'UTI/monitorização'],
    efeitosAdversos: {
      comuns: ['Sangramento no local punção'],
      graves: ['Hemorragia intracraniana', 'Sangramento maior']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Risco sangramento', conduta: 'Suspender antes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  {
    id: 'tenecteplase',
    nomeGenerico: 'Tenecteplase',
    nomesComerciais: ['Metalyse'],
    atcCode: 'B01AD11',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'trombolitico',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '40mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '50mg', disponivelSUS: false }
    ],
    indicacoes: ['IAM com supradesnível ST', 'AVC isquêmico (em estudos)'],
    mecanismoAcao: 'Variante do t-PA com maior especificidade para fibrina e meia-vida mais longa.',
    posologias: [
      {
        indicacao: 'IAM',
        adultos: { dose: '30-50mg conforme peso (bolus único)', frequencia: 'Dose única em 5 segundos' }
      }
    ],
    contraindicacoes: ['Mesmas da alteplase'],
    precaucoes: ['Vantagem: bolus único', 'Mesmos riscos de sangramento'],
    efeitosAdversos: {
      comuns: ['Sangramento menor'],
      graves: ['Hemorragia intracraniana', 'Sangramento maior']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Risco sangramento', conduta: 'Protocolo específico' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  }
];

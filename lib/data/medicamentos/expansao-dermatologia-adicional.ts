/**
 * MEDICAMENTOS DERMATOLÓGICOS ADICIONAIS - DARWIN-MFC
 * ====================================================
 *
 * Psoríase, acne, eczema, infecções, estética
 * ~40 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosDermatologiaAdicional: Partial<Medicamento>[] = [
  // Acne
  {
    id: 'isotretinoina',
    nomeGenerico: 'Isotretinoína',
    nomesComerciais: ['Roacutan', 'Acnova', 'Isoface'],
    atcCode: 'D10BA01',
    classeTerapeutica: 'antiacneico',
    subclasse: 'retinoide_sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Acne grave/nodular', 'Acne moderada refratária'],
    mecanismoAcao: 'Retinoide; reduz produção sebácea, comedogênese e inflamação',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: '0,5-1mg/kg/dia', frequencia: 'Dividido 2x/dia com gordura', observacoes: 'Dose acumulada: 120-150mg/kg total' },
      }
    ],
    contraindicacoes: ['Gestação', 'Amamentação', 'Hipervitaminose A', 'Hepatopatia', 'Dislipidemia grave'],
    efeitosAdversos: {
      comuns: ['Queilite', 'Xerose cutânea', 'Epistaxe', 'Artralgias', 'Elevação transaminases', 'Dislipidemia'],
      graves: ['Teratogenicidade', 'Depressão/suicídio', 'Pseudotumor cerebral', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Tetraciclinas', gravidade: 'grave', efeito: 'Pseudotumor cerebral', conduta: 'Contraindicado' },
      { medicamento: 'Vitamina A', gravidade: 'grave', efeito: 'Hipervitaminose A', conduta: 'Evitar suplementação' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Beta-HCG mensal', 'Perfil lipídico', 'Transaminases', 'Hemograma'],
    doencasRelacionadas: ['acne'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'adapaleno',
    nomeGenerico: 'Adapaleno',
    nomesComerciais: ['Differin', 'Epiduo'],
    atcCode: 'D10AD03',
    classeTerapeutica: 'antiacneico',
    subclasse: 'retinoide_topico',
    rename: false,
    apresentacoes: [
      { forma: 'gel_topico', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '0,3%', disponivelSUS: false },
    ],
    indicacoes: ['Acne vulgar', 'Acne comedoniana'],
    mecanismoAcao: 'Retinoide tópico; normaliza queratinização folicular',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: 'Camada fina', frequencia: '1x/dia à noite', observacoes: 'Usar protetor solar' },
      }
    ],
    contraindicacoes: ['Eczema', 'Queimadura solar'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Descamação', 'Eritema', 'Fotossensibilidade'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar aplicar em mamas' },
    doencasRelacionadas: ['acne'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tretinoina-topica',
    nomeGenerico: 'Tretinoína',
    nomesComerciais: ['Vitacid', 'Retin-A'],
    atcCode: 'D10AD01',
    classeTerapeutica: 'antiacneico',
    subclasse: 'retinoide_topico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,025%', disponivelSUS: true },
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '0,025%', disponivelSUS: true },
    ],
    indicacoes: ['Acne', 'Fotoenvelhecimento', 'Melasma'],
    mecanismoAcao: 'Ácido retinóico; aumenta turnover celular e síntese de colágeno',
    posologias: [
      {
        indicacao: 'Acne/Fotoenvelhecimento',
        adultos: { dose: 'Camada fina', frequencia: '1x/dia à noite', observacoes: 'Iniciar em dias alternados' },
      }
    ],
    contraindicacoes: ['Queimadura solar', 'Eczema agudo'],
    efeitosAdversos: {
      comuns: ['Irritação inicial', 'Descamação', 'Fotossensibilidade'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível uso tópico' },
    doencasRelacionadas: ['acne'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'peroxido-benzoila',
    nomeGenerico: 'Peróxido de Benzoíla',
    nomesComerciais: ['Benzac', 'Acnase'],
    atcCode: 'D10AE01',
    classeTerapeutica: 'antiacneico',
    subclasse: 'antimicrobiano_topico',
    rename: false,
    apresentacoes: [
      { forma: 'gel_topico', concentracao: '2,5%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '5%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '10%', disponivelSUS: false },
    ],
    indicacoes: ['Acne inflamatória'],
    mecanismoAcao: 'Bactericida (P. acnes); queratolítico; oxidante',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: 'Camada fina', frequencia: '1-2x/dia', observacoes: 'Iniciar com menor concentração' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Ressecamento', 'Branqueamento de tecidos'],
      graves: ['Dermatite de contato']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['acne'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Psoríase
  {
    id: 'calcipotriol',
    nomeGenerico: 'Calcipotriol',
    nomesComerciais: ['Daivonex', 'Daivobet'],
    atcCode: 'D05AX02',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'analogo_vitamina_d',
    rename: false,
    apresentacoes: [
      { forma: 'pomada', concentracao: '50mcg/g', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '50mcg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Psoríase em placas leve-moderada'],
    mecanismoAcao: 'Análogo vitamina D3; inibe proliferação e induz diferenciação de queratinócitos',
    posologias: [
      {
        indicacao: 'Psoríase',
        adultos: { dose: 'Aplicar nas placas', frequencia: '1-2x/dia', doseMaxima: '100g/semana' },
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Distúrbios metabolismo cálcio'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido', 'Queimação'],
      graves: ['Hipercalcemia (uso extenso)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    monitorizacao: ['Cálcio sérico se uso extenso'],
    doencasRelacionadas: ['psoríase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acitretina',
    nomeGenerico: 'Acitretina',
    nomesComerciais: ['Neotigason'],
    atcCode: 'D05BB02',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'retinoide_sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '25mg', disponivelSUS: true },
    ],
    indicacoes: ['Psoríase grave', 'Ictiose', 'Doença de Darier'],
    mecanismoAcao: 'Retinoide; normaliza diferenciação epidérmica',
    posologias: [
      {
        indicacao: 'Psoríase',
        adultos: { dose: '25-50mg', frequencia: '1x/dia com refeição', doseMaxima: '75mg/dia' },
      }
    ],
    contraindicacoes: ['Gestação (e até 3 anos após)', 'Hepatopatia', 'Dislipidemia grave'],
    efeitosAdversos: {
      comuns: ['Queilite', 'Alopecia', 'Ressecamento mucosas', 'Dislipidemia'],
      graves: ['Teratogenicidade (meia-vida 2-3 anos)', 'Hepatotoxicidade', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Hepatotoxicidade aditiva', conduta: 'Evitar' },
      { medicamento: 'Tetraciclinas', gravidade: 'grave', efeito: 'Pseudotumor cerebral', conduta: 'Evitar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Contracepção rigorosa', 'Lipidograma', 'Transaminases'],
    doencasRelacionadas: ['psoríase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'coaltar',
    nomeGenerico: 'Coaltar (Alcatrão de Hulha)',
    nomesComerciais: ['Polytar', 'Tgel'],
    atcCode: 'D05AA',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'queratolítico_antisseborreico',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '1-5%', disponivelSUS: false },
      { forma: 'pomada', concentracao: '5%', disponivelSUS: false },
    ],
    indicacoes: ['Psoríase', 'Dermatite seborreica', 'Eczema crônico'],
    mecanismoAcao: 'Antiproliferativo; anti-inflamatório; fotossensibilizante',
    posologias: [
      {
        indicacao: 'Psoríase',
        adultos: { dose: 'Aplicar nas lesões', frequencia: '1-2x/dia', observacoes: 'Pode usar com fototerapia (Goeckerman)' },
      }
    ],
    contraindicacoes: ['Pele inflamada aguda', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Foliculite', 'Fotossensibilidade', 'Odor', 'Mancha em roupas'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com cuidados' },
    doencasRelacionadas: ['psoríase', 'dermatite-seborreica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Eczema/Dermatite Atópica
  {
    id: 'tacrolimo-topico',
    nomeGenerico: 'Tacrolimo',
    nomesComerciais: ['Protopic'],
    atcCode: 'D11AH01',
    classeTerapeutica: 'imunomodulador_topico',
    subclasse: 'inibidor_calcineurina_topico',
    rename: false,
    apresentacoes: [
      { forma: 'pomada', concentracao: '0,03%', disponivelSUS: false },
      { forma: 'pomada', concentracao: '0,1%', disponivelSUS: false },
    ],
    indicacoes: ['Dermatite atópica moderada-grave', 'Vitiligo'],
    mecanismoAcao: 'Inibe calcineurina; suprime ativação de células T',
    posologias: [
      {
        indicacao: 'Dermatite atópica',
        adultos: { dose: 'Camada fina', frequencia: '2x/dia', observacoes: '0,1% para adultos; 0,03% para crianças >2 anos' },
        pediatrico: { dose: '0,03%', frequencia: '2x/dia', idadeMinima: '2 anos' },
      }
    ],
    contraindicacoes: ['Infecção cutânea ativa', 'Síndrome de Netherton'],
    efeitosAdversos: {
      comuns: ['Queimação/prurido inicial', 'Intolerância ao álcool'],
      graves: ['Risco teórico de malignidade (black box)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível - absorção mínima' },
    doencasRelacionadas: ['dermatite-atopica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'pimecrolimo',
    nomeGenerico: 'Pimecrolimo',
    nomesComerciais: ['Elidel'],
    atcCode: 'D11AH02',
    classeTerapeutica: 'imunomodulador_topico',
    subclasse: 'inibidor_calcineurina_topico',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
    ],
    indicacoes: ['Dermatite atópica leve-moderada'],
    mecanismoAcao: 'Inibidor de calcineurina tópico; menos potente que tacrolimo',
    posologias: [
      {
        indicacao: 'Dermatite atópica',
        adultos: { dose: 'Camada fina', frequencia: '2x/dia' },
        pediatrico: { dose: 'Camada fina', frequencia: '2x/dia', idadeMinima: '3 meses' },
      }
    ],
    contraindicacoes: ['Infecção ativa'],
    efeitosAdversos: {
      comuns: ['Queimação local', 'Cefaleia'],
      graves: ['Risco teórico neoplasias']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    doencasRelacionadas: ['dermatite-atopica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dupilumabe',
    nomeGenerico: 'Dupilumabe',
    nomesComerciais: ['Dupixent'],
    atcCode: 'D11AH05',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il4_il13',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '200mg/1,14ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300mg/2ml', disponivelSUS: false },
    ],
    indicacoes: ['Dermatite atópica moderada-grave', 'Asma eosinofílica', 'Rinossinusite com pólipos'],
    mecanismoAcao: 'Anticorpo monoclonal anti-IL-4Rα; bloqueia IL-4 e IL-13',
    posologias: [
      {
        indicacao: 'Dermatite atópica',
        adultos: { dose: '600mg dose de ataque, depois 300mg', frequencia: 'SC a cada 2 semanas' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Conjuntivite', 'Cefaleia', 'Reações no local de injeção'],
      graves: ['Anafilaxia (raro)', 'Eosinofilia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'moderada', efeito: 'Resposta pode ser reduzida', conduta: 'Evitar se possível' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['dermatite-atopica', 'asma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Corticoides tópicos
  {
    id: 'betametasona-dipropionato',
    nomeGenerico: 'Betametasona Dipropionato',
    nomesComerciais: ['Diprosone', 'Betnovate'],
    atcCode: 'D07AC01',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticoide_topico_potente',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'locao', concentracao: '0,05%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatoses inflamatórias', 'Eczema', 'Psoríase'],
    mecanismoAcao: 'Corticoide potente; anti-inflamatório e imunossupressor tópico',
    posologias: [
      {
        indicacao: 'Dermatoses',
        adultos: { dose: 'Camada fina', frequencia: '1-2x/dia', observacoes: 'Evitar uso prolongado em face/dobras' },
      }
    ],
    contraindicacoes: ['Infecções cutâneas não tratadas', 'Rosácea', 'Acne'],
    efeitosAdversos: {
      comuns: ['Atrofia cutânea', 'Estrias', 'Telangiectasias', 'Foliculite'],
      graves: ['Supressão adrenal (uso extenso)', 'Glaucoma (periocular)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível - evitar nas mamas' },
    doencasRelacionadas: ['eczema', 'psoríase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'clobetasol',
    nomeGenerico: 'Clobetasol Propionato',
    nomesComerciais: ['Psorex', 'Dermovate'],
    atcCode: 'D07AD01',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticoide_topico_superpotente',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,05%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatoses graves', 'Psoríase em placas', 'Líquen plano'],
    mecanismoAcao: 'Corticoide superpotente',
    posologias: [
      {
        indicacao: 'Dermatoses graves',
        adultos: { dose: 'Camada fina', frequencia: '1-2x/dia', doseMaxima: '50g/semana; máx 2 semanas contínuas' },
      }
    ],
    contraindicacoes: ['Face', 'Dobras', 'Crianças pequenas'],
    efeitosAdversos: {
      comuns: ['Atrofia cutânea', 'Estrias'],
      graves: ['Supressão adrenal', 'Síndrome de Cushing']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado' },
    doencasRelacionadas: ['psoríase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidrocortisona-topica',
    nomeGenerico: 'Hidrocortisona',
    nomesComerciais: ['Stiefcortil', 'Berlison'],
    atcCode: 'D07AA02',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticoide_topico_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatites leves', 'Intertrigo', 'Picadas de inseto'],
    mecanismoAcao: 'Corticoide de baixa potência',
    posologias: [
      {
        indicacao: 'Dermatoses leves',
        adultos: { dose: 'Camada fina', frequencia: '2-3x/dia' },
        pediatrico: { dose: 'Camada fina', frequencia: '1-2x/dia' },
      }
    ],
    contraindicacoes: ['Infecções não tratadas'],
    efeitosAdversos: {
      comuns: ['Irritação local'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    doencasRelacionadas: ['dermatite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antifúngicos tópicos
  {
    id: 'cetoconazol-topico',
    nomeGenerico: 'Cetoconazol',
    nomesComerciais: ['Nizoral', 'Cetonax'],
    atcCode: 'D01AC08',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol_topico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '2%', disponivelSUS: true },
      { forma: 'xarope', concentracao: '2%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatofitoses', 'Candidíase cutânea', 'Pitiríase versicolor', 'Dermatite seborreica'],
    mecanismoAcao: 'Inibe síntese de ergosterol fúngico',
    posologias: [
      {
        indicacao: 'Dermatofitoses',
        adultos: { dose: 'Aplicar nas lesões', frequencia: '1-2x/dia', observacoes: 'Continuar 1-2 semanas após cura clínica' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível tópico' },
    doencasRelacionadas: ['tinea', 'pitiriase-versicolor'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'terbinafina-topica',
    nomeGenerico: 'Terbinafina',
    nomesComerciais: ['Lamisil', 'Funtyl'],
    atcCode: 'D01AE15',
    classeTerapeutica: 'antifungico',
    subclasse: 'alilamina',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '1%', disponivelSUS: false },
    ],
    indicacoes: ['Tinea pedis', 'Tinea corporis', 'Tinea cruris'],
    mecanismoAcao: 'Inibe esqualeno epoxidase; fungicida',
    posologias: [
      {
        indicacao: 'Dermatofitoses',
        adultos: { dose: 'Aplicar nas lesões', frequencia: '1-2x/dia x 1-2 semanas' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Ressecamento'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível tópico' },
    doencasRelacionadas: ['tinea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'terbinafina-oral',
    nomeGenerico: 'Terbinafina',
    nomesComerciais: ['Lamisil'],
    atcCode: 'D01BA02',
    classeTerapeutica: 'antifungico',
    subclasse: 'alilamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
    ],
    indicacoes: ['Onicomicose', 'Tinea capitis', 'Dermatofitoses extensas'],
    mecanismoAcao: 'Inibe esqualeno epoxidase; fungicida sistêmico',
    posologias: [
      {
        indicacao: 'Onicomicose',
        adultos: { dose: '250mg', frequencia: '1x/dia', observacoes: 'Unhas mãos: 6 sem; Pés: 12 sem' },
        pediatrico: { dose: '62,5-250mg (peso-dependente)', frequencia: '1x/dia', idadeMinima: '2 anos' },
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Lúpus'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Distúrbios GI', 'Rash', 'Alteração paladar'],
      graves: ['Hepatotoxicidade', 'Neutropenia', 'Síndrome de Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis de terbinafina', conduta: 'Pode necessitar dose maior' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática antes e durante tratamento'],
    doencasRelacionadas: ['onicomicose', 'tinea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'clotrimazol-topico',
    nomeGenerico: 'Clotrimazol',
    nomesComerciais: ['Canesten', 'Gino-Canesten'],
    atcCode: 'D01AC01',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol_topico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Candidíase cutânea/vaginal', 'Dermatofitoses', 'Pitiríase'],
    mecanismoAcao: 'Imidazólico; altera permeabilidade membrana fúngica',
    posologias: [
      {
        indicacao: 'Micoses cutâneas',
        adultos: { dose: 'Aplicar na área afetada', frequencia: '2-3x/dia x 2-4 semanas' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Queimação'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['candidiase', 'tinea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antibióticos tópicos
  {
    id: 'mupirocina',
    nomeGenerico: 'Mupirocina',
    nomesComerciais: ['Bactroban', 'Mupirocin'],
    atcCode: 'D06AX09',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: true,
    apresentacoes: [
      { forma: 'pomada', concentracao: '2%', disponivelSUS: true },
    ],
    indicacoes: ['Impetigo', 'Foliculite', 'Descolonização MRSA nasal'],
    mecanismoAcao: 'Inibe isoleucil-tRNA sintetase bacteriana',
    posologias: [
      {
        indicacao: 'Impetigo',
        adultos: { dose: 'Aplicar na lesão', frequencia: '3x/dia x 5-10 dias' },
      },
      {
        indicacao: 'Descolonização MRSA',
        adultos: { dose: 'Aplicar nas narinas', frequencia: '2x/dia x 5 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Queimação', 'Prurido'],
      graves: ['Colite pseudomembranosa (raro)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['impetigo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acido-fusidico',
    nomeGenerico: 'Ácido Fusídico',
    nomesComerciais: ['Verutex', 'Fucidine'],
    atcCode: 'D06AX01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '2%', disponivelSUS: false },
      { forma: 'pomada', concentracao: '2%', disponivelSUS: false },
    ],
    indicacoes: ['Infecções cutâneas por Staphylococcus', 'Impetigo', 'Furunculose'],
    mecanismoAcao: 'Inibe síntese proteica bacteriana',
    posologias: [
      {
        indicacao: 'Infecções cutâneas',
        adultos: { dose: 'Aplicar na lesão', frequencia: '2-3x/dia x 7-10 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Reações alérgicas'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['impetigo', 'furunculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'retapamulin',
    nomeGenerico: 'Retapamulin',
    nomesComerciais: ['Altargo'],
    atcCode: 'D06AX13',
    classeTerapeutica: 'antibiotico',
    subclasse: 'pleuromutilin',
    rename: false,
    apresentacoes: [
      { forma: 'pomada', concentracao: '1%', disponivelSUS: false },
    ],
    indicacoes: ['Impetigo', 'Infecções cutâneas superficiais'],
    mecanismoAcao: 'Pleuromutilina; inibe síntese proteica bacteriana',
    posologias: [
      {
        indicacao: 'Impetigo',
        adultos: { dose: 'Camada fina', frequencia: '2x/dia x 5 dias' },
        pediatrico: { dose: 'Camada fina', frequencia: '2x/dia x 5 dias', idadeMinima: '9 meses' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido'],
      graves: ['Dermatite de contato']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['impetigo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiparasitários tópicos
  {
    id: 'permetrina',
    nomeGenerico: 'Permetrina',
    nomesComerciais: ['Piolend', 'Kwell'],
    atcCode: 'P03AC04',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida_pediculicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '1%', disponivelSUS: true },
      { forma: 'locao', concentracao: '5%', disponivelSUS: true },
    ],
    indicacoes: ['Escabiose', 'Pediculose'],
    mecanismoAcao: 'Piretroide; paralisa sistema nervoso do parasita',
    posologias: [
      {
        indicacao: 'Escabiose',
        adultos: { dose: '5% em todo corpo do pescoço para baixo', frequencia: 'Deixar 8-14h, enxaguar; repetir em 7 dias' },
      },
      {
        indicacao: 'Pediculose',
        adultos: { dose: '1% no couro cabeludo', frequencia: 'Deixar 10min, enxaguar' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a crisântemos'],
    efeitosAdversos: {
      comuns: ['Prurido pós-tratamento', 'Eritema'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['escabiose', 'pediculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ivermectina-topica',
    nomeGenerico: 'Ivermectina',
    nomesComerciais: ['Soolantra', 'Sklice'],
    atcCode: 'D11AX22',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'avermectina',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
      { forma: 'locao', concentracao: '0,5%', disponivelSUS: false },
    ],
    indicacoes: ['Rosácea inflamatória', 'Pediculose capitis'],
    mecanismoAcao: 'Antiparasitário e anti-inflamatório; mata Demodex',
    posologias: [
      {
        indicacao: 'Rosácea',
        adultos: { dose: 'Camada fina na face', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Queimação', 'Ressecamento'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['rosacea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'benzoato-benzila',
    nomeGenerico: 'Benzoato de Benzila',
    nomesComerciais: ['Acarsan', 'Miticoçan'],
    atcCode: 'P03AX01',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '25%', disponivelSUS: true },
    ],
    indicacoes: ['Escabiose', 'Pediculose'],
    mecanismoAcao: 'Neurotóxico para ácaros e piolhos',
    posologias: [
      {
        indicacao: 'Escabiose',
        adultos: { dose: 'Aplicar do pescoço para baixo', frequencia: '1x/dia x 3 noites, banho na 4ª manhã' },
        pediatrico: { dose: 'Diluir 1:1 com água', frequencia: 'Aplicar 1x/dia', observacoes: 'Mais irritante que permetrina' },
      }
    ],
    contraindicacoes: ['Dermatite aguda', 'Pele lesada'],
    efeitosAdversos: {
      comuns: ['Irritação intensa', 'Queimação', 'Eczematização'],
      graves: ['Neurotoxicidade (se absorção excessiva)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    doencasRelacionadas: ['escabiose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Outros dermatológicos
  {
    id: 'minoxidil-topico',
    nomeGenerico: 'Minoxidil',
    nomesComerciais: ['Rogaine', 'Pant'],
    atcCode: 'D11AX01',
    classeTerapeutica: 'antialopecia',
    subclasse: 'vasodilatador_topico',
    rename: false,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '2%', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '5%', disponivelSUS: false },
    ],
    indicacoes: ['Alopecia androgenética', 'Alopecia areata'],
    mecanismoAcao: 'Vasodilatador; prolonga fase anágena do folículo',
    posologias: [
      {
        indicacao: 'Alopecia',
        adultos: { dose: '1ml', frequencia: '2x/dia no couro cabeludo', observacoes: '5% para homens; 2% para mulheres' },
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hipertricose facial', 'Irritação local', 'Cefaleia'],
      graves: ['Hipotensão (absorção sistêmica)', 'Taquicardia']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['alopecia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'finasterida-alopecia',
    nomeGenerico: 'Finasterida',
    nomesComerciais: ['Propecia', 'Finalop'],
    atcCode: 'D11AX10',
    classeTerapeutica: 'antialopecia',
    subclasse: 'inibidor_5alfa_redutase',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: ['Alopecia androgenética masculina'],
    mecanismoAcao: 'Inibe 5-alfa-redutase tipo 2; reduz DHT no couro cabeludo',
    posologias: [
      {
        indicacao: 'Alopecia',
        adultos: { dose: '1mg', frequencia: '1x/dia', observacoes: 'Uso contínuo; resultados em 3-6 meses' },
      }
    ],
    contraindicacoes: ['Mulheres', 'Crianças', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Redução libido', 'Disfunção erétil', 'Redução volume ejaculado'],
      graves: ['Síndrome pós-finasterida (controverso)', 'Depressão', 'Ginecomastia']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Não aplicável - uso masculino' },
    monitorizacao: ['PSA (reduz em ~50%)'],
    doencasRelacionadas: ['alopecia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidroquinona',
    nomeGenerico: 'Hidroquinona',
    nomesComerciais: ['Clariderm', 'Solaquin'],
    atcCode: 'D11AX11',
    classeTerapeutica: 'despigmentante',
    subclasse: 'inibidor_tirosinase',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '2%', disponivelSUS: false },
      { forma: 'creme', concentracao: '4%', disponivelSUS: false },
    ],
    indicacoes: ['Melasma', 'Hiperpigmentação pós-inflamatória', 'Lentigos'],
    mecanismoAcao: 'Inibe tirosinase; reduz síntese de melanina',
    posologias: [
      {
        indicacao: 'Melasma',
        adultos: { dose: 'Aplicar na área hiperpigmentada', frequencia: '1-2x/dia', observacoes: 'Usar com protetor solar; máx 4-6 meses' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Eritema', 'Ressecamento'],
      graves: ['Ocronose exógena (uso prolongado)', 'Leucodermia']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['melasma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acido-azelaico',
    nomeGenerico: 'Ácido Azeláico',
    nomesComerciais: ['Azelan', 'Skinoren'],
    atcCode: 'D10AX03',
    classeTerapeutica: 'antiacneico',
    subclasse: 'acido_dicarboxilico',
    rename: false,
    apresentacoes: [
      { forma: 'gel_topico', concentracao: '15%', disponivelSUS: false },
      { forma: 'creme', concentracao: '20%', disponivelSUS: false },
    ],
    indicacoes: ['Acne', 'Rosácea', 'Melasma'],
    mecanismoAcao: 'Antibacteriano; antiqueratinizante; inibe tirosinase',
    posologias: [
      {
        indicacao: 'Acne/Rosácea',
        adultos: { dose: 'Camada fina', frequencia: '2x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Queimação', 'Prurido'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['acne', 'rosacea', 'melasma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];

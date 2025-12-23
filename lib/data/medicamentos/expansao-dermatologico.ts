/**
 * EXPANSÃO DERMATOLÓGICA - DARWIN-MFC
 * ====================================
 *
 * Medicamentos dermatológicos baseados na WHO Essential Medicines e RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosDermatologicos: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTIFÚNGICOS TÓPICOS
  // ============================================================================
  {
    id: 'cetoconazol-topico',
    nomeGenerico: 'Cetoconazol Tópico',
    nomesComerciais: ['Nizoral', 'Cetonax', 'Cetoconazol'],
    atcCode: 'D01AC08',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '2%', disponivelSUS: true },
      { forma: 'xarope', concentracao: '2%', disponivelSUS: false }
    ],
    indicacoes: ['Dermatofitoses', 'Pitiríase versicolor', 'Candidíase cutânea', 'Dermatite seborreica'],
    mecanismoAcao: 'Inibe síntese de ergosterol da membrana fúngica via inibição da 14-alfa-demetilase.',
    posologias: [
      {
        indicacao: 'Dermatofitose/Candidíase',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '1-2x/dia por 2-4 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a imidazólicos'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido', 'Ardor'],
      graves: ['Dermatite de contato (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  {
    id: 'miconazol-topico',
    nomeGenerico: 'Miconazol Tópico',
    nomesComerciais: ['Daktarin', 'Vodol', 'Miconazol'],
    atcCode: 'D01AC02',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '2%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '2%', disponivelSUS: true },
      { forma: 'po_topico', concentracao: '2%', disponivelSUS: false }
    ],
    indicacoes: ['Tinea pedis', 'Tinea corporis', 'Tinea cruris', 'Candidíase cutânea'],
    mecanismoAcao: 'Imidazólico que inibe síntese de ergosterol fúngico.',
    posologias: [
      {
        indicacao: 'Dermatofitoses',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '2x/dia por 2-6 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação', 'Queimação local'],
      graves: ['Dermatite alérgica']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  {
    id: 'terbinafina-topica',
    nomeGenerico: 'Terbinafina Tópica',
    nomesComerciais: ['Lamisil', 'Funtyl'],
    atcCode: 'D01AE15',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
      { forma: 'gel', concentracao: '1%', disponivelSUS: false }
    ],
    indicacoes: ['Tinea pedis', 'Tinea corporis', 'Tinea cruris'],
    mecanismoAcao: 'Alilamina que inibe esqualeno epoxidase. Fungicida.',
    posologias: [
      {
        indicacao: 'Dermatofitoses',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '1-2x/dia por 1-2 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Secura'],
      graves: ['Raro']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  // ============================================================================
  // CORTICOIDES TÓPICOS
  // ============================================================================
  {
    id: 'hidrocortisona-topica',
    nomeGenerico: 'Hidrocortisona Tópica',
    nomesComerciais: ['Stiefcortil', 'Berlison', 'Hidrocortisona'],
    atcCode: 'D07AA02',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '1%', disponivelSUS: true }
    ],
    indicacoes: ['Dermatite de contato', 'Dermatite atópica leve', 'Eczema', 'Picadas de inseto', 'Prurido leve'],
    mecanismoAcao: 'Corticoide de baixa potência. Anti-inflamatório, imunossupressor local.',
    posologias: [
      {
        indicacao: 'Dermatites/Eczema',
        adultos: { dose: 'Aplicar camada fina', frequencia: '2-3x/dia por até 2 semanas' },
        pediatrico: { dose: 'Aplicar camada fina', frequencia: '1-2x/dia por até 1 semana', observacoes: 'Evitar face e áreas oclusivas' }
      }
    ],
    contraindicacoes: ['Infecções cutâneas não tratadas', 'Rosácea', 'Acne', 'Dermatite perioral'],
    precaucoes: ['Não usar oclusão prolongada', 'Evitar face e áreas de dobra em crianças', 'Atrofia cutânea com uso prolongado'],
    efeitosAdversos: {
      comuns: ['Ardor leve', 'Ressecamento'],
      graves: ['Atrofia cutânea', 'Estrias', 'Supressão adrenal (uso extenso)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar aplicação nas mamas' }
  },

  {
    id: 'betametasona-topica',
    nomeGenerico: 'Betametasona Tópica',
    nomesComerciais: ['Betnovate', 'Diprosone', 'Celestone'],
    atcCode: 'D07AC01',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'locao', concentracao: '0,05%', disponivelSUS: false }
    ],
    indicacoes: ['Dermatite atópica moderada-grave', 'Psoríase', 'Eczema grave', 'Líquen plano'],
    mecanismoAcao: 'Corticoide de alta potência. Potente efeito anti-inflamatório e imunossupressor.',
    posologias: [
      {
        indicacao: 'Dermatoses inflamatórias',
        adultos: { dose: 'Aplicar camada fina', frequencia: '1-2x/dia por até 2 semanas' }
      }
    ],
    contraindicacoes: ['Infecções cutâneas', 'Rosácea', 'Dermatite perioral', 'Face (uso prolongado)'],
    precaucoes: ['Máximo 2 semanas', 'Evitar face, dobras, genitais', 'Risco de atrofia significativo'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Prurido', 'Eritema'],
      graves: ['Atrofia cutânea', 'Teleangiectasias', 'Estrias', 'Supressão HPA']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar mamas e uso extenso' }
  },

  {
    id: 'clobetasol-topico',
    nomeGenerico: 'Clobetasol Tópico',
    nomesComerciais: ['Psorex', 'Dermatovate', 'Clobazam'],
    atcCode: 'D07AD01',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'locao', concentracao: '0,05%', disponivelSUS: false }
    ],
    indicacoes: ['Psoríase grave', 'Dermatoses graves refratárias', 'Líquen plano grave'],
    mecanismoAcao: 'Corticoide superpotente (Classe I). Reservado para casos refratários.',
    posologias: [
      {
        indicacao: 'Psoríase/Dermatoses graves',
        adultos: { dose: 'Aplicar camada fina', frequencia: '1-2x/dia máximo 2 semanas', doseMaxima: '50g/semana' }
      }
    ],
    contraindicacoes: ['<12 anos', 'Face', 'Intertriginosas', 'Genitais', 'Infecções'],
    precaucoes: ['Máximo 2 semanas', 'Máximo 50g/semana', 'Risco alto de atrofia'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Foliculite'],
      graves: ['Atrofia cutânea', 'Supressão HPA', 'Síndrome de Cushing', 'Estrias permanentes']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar por potência extrema' }
  },

  {
    id: 'dexametasona-topica',
    nomeGenerico: 'Dexametasona Tópica',
    nomesComerciais: ['Dexadermil', 'Maxidex'],
    atcCode: 'D07AB19',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,1%', disponivelSUS: true },
      { forma: 'gel', concentracao: '0,1%', disponivelSUS: false }
    ],
    indicacoes: ['Dermatites', 'Eczemas', 'Pruridos alérgicos'],
    mecanismoAcao: 'Corticoide fluorado de média-alta potência.',
    posologias: [
      {
        indicacao: 'Dermatoses',
        adultos: { dose: 'Aplicar camada fina', frequencia: '2-3x/dia' }
      }
    ],
    contraindicacoes: ['Infecções cutâneas', 'Rosácea'],
    efeitosAdversos: {
      comuns: ['Irritação local'],
      graves: ['Atrofia cutânea']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado' }
  },

  // ============================================================================
  // ANTIBIÓTICOS TÓPICOS
  // ============================================================================
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
      { forma: 'pomada', concentracao: '2% (nasal)', disponivelSUS: true }
    ],
    indicacoes: ['Impetigo', 'Foliculite', 'Infecções cutâneas estafilocócicas', 'Descolonização nasal MRSA'],
    mecanismoAcao: 'Inibe isoleucil-tRNA sintetase. Ativo contra Staphylococcus e Streptococcus.',
    posologias: [
      {
        indicacao: 'Impetigo',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '3x/dia por 5-10 dias' },
        pediatrico: { dose: 'Aplicar sobre lesão', frequencia: '3x/dia por 5-10 dias' }
      },
      {
        indicacao: 'Descolonização MRSA',
        adultos: { dose: 'Aplicar em narinas', frequencia: '2-3x/dia por 5 dias' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Prurido'],
      graves: ['Superinfecção (uso prolongado)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  {
    id: 'neomicina-bacitracina',
    nomeGenerico: 'Neomicina + Bacitracina',
    nomesComerciais: ['Nebacetin', 'Baneocin'],
    atcCode: 'D06AX04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: true,
    apresentacoes: [
      { forma: 'pomada', concentracao: '5mg/g + 250UI/g', disponivelSUS: true },
      { forma: 'po_topico', concentracao: '5mg/g + 250UI/g', disponivelSUS: false }
    ],
    indicacoes: ['Infecções cutâneas superficiais', 'Feridas', 'Queimaduras leves', 'Impetigo'],
    mecanismoAcao: 'Neomicina (aminoglicosídeo gram-neg) + Bacitracina (polipeptídeo gram-pos).',
    posologias: [
      {
        indicacao: 'Infecções cutâneas',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '2-3x/dia' },
        pediatrico: { dose: 'Aplicar sobre lesão', frequencia: '2-3x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a aminoglicosídeos', 'Aplicação extensa'],
    precaucoes: ['Pode causar sensibilização', 'Nefro/ototoxicidade se absorção sistêmica'],
    efeitosAdversos: {
      comuns: ['Dermatite de contato alérgica'],
      graves: ['Nefrotoxicidade (absorção em grandes áreas)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado' }
  },

  {
    id: 'sulfadiazina-prata',
    nomeGenerico: 'Sulfadiazina de Prata',
    nomesComerciais: ['Dermazine', 'Silvadene'],
    atcCode: 'D06BA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true }
    ],
    indicacoes: ['Queimaduras (prevenção e tratamento)', 'Úlceras de pressão infectadas', 'Feridas crônicas'],
    mecanismoAcao: 'Liberação lenta de prata e sulfadiazina. Ação bactericida ampla.',
    posologias: [
      {
        indicacao: 'Queimaduras',
        adultos: { dose: 'Aplicar camada 2-3mm', frequencia: '1-2x/dia sob curativo' },
        pediatrico: { dose: 'Aplicar camada 2-3mm', frequencia: '1-2x/dia', observacoes: 'Evitar em <2 meses' }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', '<2 meses', 'Gestação a termo', 'Deficiência G6PD'],
    precaucoes: ['Leucopenia transitória (monitorar em queimados extensos)', 'Argiria (raro)'],
    efeitosAdversos: {
      comuns: ['Dor/ardor local', 'Leucopenia transitória'],
      graves: ['Argiria', 'Hepatotoxicidade', 'Kernicterus neonatal']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Sulfonamida' }
  },

  // ============================================================================
  // ANTIPARASITÁRIOS TÓPICOS
  // ============================================================================
  {
    id: 'permetrina',
    nomeGenerico: 'Permetrina',
    nomesComerciais: ['Nedax', 'Piretrin', 'Kwell'],
    atcCode: 'P03AC04',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida_pediculicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '1%', disponivelSUS: true },
      { forma: 'locao', concentracao: '5%', disponivelSUS: true },
      { forma: 'creme', concentracao: '5%', disponivelSUS: false }
    ],
    indicacoes: ['Escabiose (sarna)', 'Pediculose (piolho)'],
    mecanismoAcao: 'Piretroide sintético. Paralisa sistema nervoso do parasita por ação nos canais de sódio.',
    posologias: [
      {
        indicacao: 'Escabiose',
        adultos: { dose: 'Aplicar 5% do pescoço aos pés', frequencia: 'Deixar 8-14h, lavar. Repetir em 7 dias' },
        pediatrico: { dose: 'Aplicar 5% incluindo couro cabeludo', frequencia: 'Deixar 8-14h, lavar', observacoes: '>2 meses' }
      },
      {
        indicacao: 'Pediculose',
        adultos: { dose: 'Aplicar 1% no cabelo úmido', frequencia: 'Deixar 10min, enxaguar. Repetir em 7 dias' },
        pediatrico: { dose: 'Aplicar 1% no cabelo úmido', frequencia: 'Deixar 10min, enxaguar' }
      }
    ],
    contraindicacoes: ['<2 meses', 'Alergia a crisântemos/piretro'],
    efeitosAdversos: {
      comuns: ['Prurido', 'Eritema', 'Formigamento leve'],
      graves: ['Irritação respiratória (se inalado)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  {
    id: 'ivermectina-topica',
    nomeGenerico: 'Ivermectina Tópica',
    nomesComerciais: ['Soolantra', 'Sklice'],
    atcCode: 'P02CF01',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida_pediculicida',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
      { forma: 'locao', concentracao: '0,5%', disponivelSUS: false }
    ],
    indicacoes: ['Rosácea (lesões inflamatórias)', 'Pediculose (loção 0,5%)'],
    mecanismoAcao: 'Anti-helmíntico com ação anti-inflamatória. Ativo contra Demodex.',
    posologias: [
      {
        indicacao: 'Rosácea',
        adultos: { dose: 'Aplicar camada fina na face', frequencia: '1x/dia por até 16 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Queimação', 'Irritação leve'],
      graves: ['Piora inicial (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  // ============================================================================
  // QUERATOLÍTICOS E RETINOIDES
  // ============================================================================
  {
    id: 'acido-salicilico-topico',
    nomeGenerico: 'Ácido Salicílico Tópico',
    nomesComerciais: ['Salex', 'Kalima'],
    atcCode: 'D11AF',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'pomada', concentracao: '5%', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10%', disponivelSUS: false },
      { forma: 'gel', concentracao: '2%', disponivelSUS: false }
    ],
    indicacoes: ['Hiperqueratose', 'Psoríase (queratólise)', 'Verrugas', 'Calosidades'],
    mecanismoAcao: 'Queratolítico. Dissolve o cimento intercelular das células queratinizadas.',
    posologias: [
      {
        indicacao: 'Verrugas/Calosidades',
        adultos: { dose: 'Aplicar sobre lesão', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['Diabetes (pés)', 'Neuropatia periférica', 'Circulação comprometida'],
    precaucoes: ['Evitar pele sã', 'Toxicidade sistêmica se aplicação extensa'],
    efeitosAdversos: {
      comuns: ['Irritação local'],
      graves: ['Salicilismo (uso extenso)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado' }
  },

  {
    id: 'tretinoina-topica',
    nomeGenerico: 'Tretinoína Tópica',
    nomesComerciais: ['Vitanol-A', 'Retin-A', 'Airol'],
    atcCode: 'D10AD01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'gel', concentracao: '0,025%', disponivelSUS: true },
      { forma: 'gel', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'creme', concentracao: '0,025%', disponivelSUS: false },
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: false }
    ],
    indicacoes: ['Acne vulgar', 'Fotoenvelhecimento', 'Queratose actínica'],
    mecanismoAcao: 'Retinoide tópico (ácido retinoico). Regula diferenciação epidérmica e renovação celular.',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: 'Aplicar camada fina à noite', frequencia: '1x/dia à noite', observacoes: 'Iniciar com concentração baixa' }
      }
    ],
    contraindicacoes: ['Gestação (Categoria X)', 'Eczema agudo', 'Rosácea'],
    precaucoes: ['Fotossensibilidade intensa', 'Iniciar devagar', 'Evitar exposição solar'],
    efeitosAdversos: {
      comuns: ['Eritema', 'Descamação', 'Ressecamento', 'Fotossensibilidade', 'Piora inicial da acne'],
      graves: ['Dermatite severa']
    },
    interacoes: [
      { medicamento: 'Produtos com peróxido de benzoíla', gravidade: 'moderada', efeito: 'Inativação', conduta: 'Usar em horários diferentes' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar. Absorção sistêmica.' }
  },

  {
    id: 'adapaleno',
    nomeGenerico: 'Adapaleno',
    nomesComerciais: ['Differin', 'Deriva', 'Epiduo'],
    atcCode: 'D10AD03',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'gel', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'gel', concentracao: '0,3%', disponivelSUS: false },
      { forma: 'creme', concentracao: '0,1%', disponivelSUS: false }
    ],
    indicacoes: ['Acne vulgar leve-moderada'],
    mecanismoAcao: 'Retinoide de 3ª geração. Menor irritação que tretinoína.',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: 'Aplicar camada fina', frequencia: '1x/dia à noite' },
        pediatrico: { dose: 'Aplicar camada fina', frequencia: '1x/dia à noite', observacoes: '>12 anos' }
      }
    ],
    contraindicacoes: ['Gestação', 'Eczema agudo'],
    precaucoes: ['Fotossensibilidade', 'Evitar lábios, olhos, mucosas'],
    efeitosAdversos: {
      comuns: ['Eritema leve', 'Descamação', 'Ressecamento'],
      graves: ['Dermatite severa (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  // ============================================================================
  // ANTISSÉPTICOS E CICATRIZANTES
  // ============================================================================
  {
    id: 'clorexidina-topica',
    nomeGenerico: 'Clorexidina Tópica',
    nomesComerciais: ['Periogard', 'Merthiolate', 'Riohex'],
    atcCode: 'D08AC02',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '2%', disponivelSUS: true },
      { forma: 'gel', concentracao: '0,2%', disponivelSUS: false }
    ],
    indicacoes: ['Antissepsia cutânea', 'Preparo pré-operatório', 'Feridas', 'Higiene bucal'],
    mecanismoAcao: 'Biguanida catiônica. Rompe membrana celular bacteriana.',
    posologias: [
      {
        indicacao: 'Antissepsia',
        adultos: { dose: 'Aplicar sobre área', frequencia: 'Conforme necessidade' }
      }
    ],
    contraindicacoes: ['Ouvidos', 'SNC (neurotoxicidade)', 'Olhos'],
    precaucoes: ['Não usar em mucosas não orais', 'Manchas em dentes com uso oral prolongado'],
    efeitosAdversos: {
      comuns: ['Irritação leve', 'Manchas dentárias (bucal)'],
      graves: ['Surdez (se entrar no ouvido)', 'Anafilaxia (raro)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro topicamente' }
  },

  {
    id: 'colagenase',
    nomeGenerico: 'Colagenase',
    nomesComerciais: ['Iruxol', 'Kollagenase'],
    atcCode: 'D03BA',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'pomada', concentracao: '0,6 UI/g', disponivelSUS: true }
    ],
    indicacoes: ['Desbridamento enzimático de feridas', 'Úlceras de pressão', 'Queimaduras'],
    mecanismoAcao: 'Enzima proteolítica que degrada colágeno do tecido necrótico.',
    posologias: [
      {
        indicacao: 'Desbridamento',
        adultos: { dose: 'Aplicar sobre tecido necrótico', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Uso em tecido sadio'],
    precaucoes: ['Não usar com antissépticos (inativam enzima)', 'Proteger pele sã ao redor'],
    efeitosAdversos: {
      comuns: ['Dor transitória', 'Eritema perilesional'],
      graves: ['Reação alérgica (raro)']
    },
    interacoes: [
      { medicamento: 'Antissépticos', gravidade: 'moderada', efeito: 'Inativação da colagenase', conduta: 'Não aplicar juntos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  // ============================================================================
  // ANTIPRURIGINOSOS
  // ============================================================================
  {
    id: 'calamina',
    nomeGenerico: 'Calamina',
    nomesComerciais: ['Caladryl', 'Calamina'],
    atcCode: 'D02AB',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '8%', disponivelSUS: true }
    ],
    indicacoes: ['Prurido', 'Varicela', 'Picadas de inseto', 'Dermatite de contato leve'],
    mecanismoAcao: 'Óxido de zinco com carbonato de ferro. Efeito secativo e antipruriginoso.',
    posologias: [
      {
        indicacao: 'Prurido',
        adultos: { dose: 'Aplicar sobre área', frequencia: '3-4x/dia conforme necessidade' },
        pediatrico: { dose: 'Aplicar sobre área', frequencia: '3-4x/dia conforme necessidade' }
      }
    ],
    contraindicacoes: ['Feridas abertas profundas'],
    efeitosAdversos: {
      comuns: ['Ressecamento'],
      graves: []
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ============================================================================
  // EMOLIENTES
  // ============================================================================
  {
    id: 'ureia-topica',
    nomeGenerico: 'Ureia Tópica',
    nomesComerciais: ['Ureadin', 'Hidramais', 'Eucerin'],
    atcCode: 'D02AE01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '10%', disponivelSUS: true },
      { forma: 'locao', concentracao: '10%', disponivelSUS: false },
      { forma: 'creme', concentracao: '20%', disponivelSUS: false }
    ],
    indicacoes: ['Xerose', 'Ictiose', 'Dermatite atópica', 'Queratose pilar', 'Hiperqueratose'],
    mecanismoAcao: 'Umectante e queratolítico. Aumenta hidratação do estrato córneo.',
    posologias: [
      {
        indicacao: 'Xerose/Hiperqueratose',
        adultos: { dose: 'Aplicar sobre pele', frequencia: '2x/dia' },
        pediatrico: { dose: 'Aplicar sobre pele', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Feridas abertas'],
    precaucoes: ['Pode arder em pele muito ressecada inicialmente'],
    efeitosAdversos: {
      comuns: ['Ardor leve inicial'],
      graves: []
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  }
];

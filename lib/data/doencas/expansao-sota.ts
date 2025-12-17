/**
 * EXPANSÃO SOTA - DOENÇAS ADICIONAIS
 * ===================================
 * Expansão adicional de doenças para alcançar 150+ condições
 * Todas com ontologias completas (DOID, SNOMED-CT, MeSH, UMLS CUI, CIAP-2, CID-10)
 */

import { Doenca } from '../../types/doenca';

export const doencasExpansaoSOTA: Partial<Doenca>[] = [
  // ============================================
  // CONDIÇÕES RESPIRATÓRIAS ADICIONAIS
  // ============================================
  {
    id: 'bronquite-cronica',
    titulo: 'Bronquite Crônica',
    sinonimos: ['Bronquite Crônica Simples', 'Doença Pulmonar Obstrutiva Crônica - Tipo Bronquítico'],
    ciap2: ['R78'],
    cid10: ['J41'],
    categoria: 'respiratorio',
    doid: 'DOID:6132',
    snomedCT: '13645005',
    meshId: 'D001991',
    umlsCui: 'C0006277',
    tags: ['cronica', 'respiratorio', 'tabagismo'],
    quickView: {
      definicao: 'Tosse e expectoração por ≥3 meses/ano em ≥2 anos consecutivos, sem outras causas. Frequentemente associada ao tabagismo.',
      criteriosDiagnosticos: ['Tosse produtiva ≥3 meses/ano', '≥2 anos consecutivos', 'Exclusão de outras causas (TB, bronquiectasias, etc)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação tabágica', 'Vacinação (gripe, pneumo)', 'Reabilitação pulmonar'],
        farmacologico: ['Broncodilatador inalatório: Salbutamol spray 2 jatos 4x/dia', 'Se sintomas frequentes: adicionar corticoide inalatório']
      },
      redFlags: ['Hemoptise', 'Perda ponderal', 'Febre persistente', 'Dispneia progressiva']
    },
    medicamentos: ['salbutamol', 'budesonida'],
    protocolos: ['dpoc'],
    calculadoras: []
  },
  {
    id: 'enfisema-pulmonar',
    titulo: 'Enfisema Pulmonar',
    ciap2: ['R95'],
    cid10: ['J43'],
    categoria: 'respiratorio',
    doid: 'DOID:3119',
    snomedCT: '196494001',
    meshId: 'D004656',
    umlsCui: 'C0014120',
    tags: ['cronica', 'respiratorio', 'dpoc'],
    quickView: {
      definicao: 'Destruição permanente de alvéolos com hiperinsuflação. Tipo enfisematoso da DPOC.',
      criteriosDiagnosticos: ['Dispneia progressiva', 'Tórax em barril', 'Diminuição do murmúrio vesicular', 'RX: hiperinsuflação'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação tabágica', 'Oxigenoterapia se SpO2 <88%', 'Reabilitação pulmonar'],
        farmacologico: ['Broncodilatador: Tiotrópio 18mcg 1x/dia', 'Se exacerbações: adicionar corticoide inalatório']
      },
      redFlags: ['Insuficiência respiratória', 'Pneumotórax', 'Perda ponderal importante']
    },
    medicamentos: ['tiotropio'],
    protocolos: ['dpoc'],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES NEUROLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'neuropatia-periferica',
    titulo: 'Neuropatia Periférica',
    ciap2: ['N94'],
    cid10: ['G62'],
    categoria: 'neurologico',
    doid: 'DOID:330',
    snomedCT: '302226006',
    meshId: 'D010523',
    umlsCui: 'C0027868',
    tags: ['neurologico', 'diabetes', 'cronica'],
    quickView: {
      definicao: 'Disfunção de nervos periféricos. Causas comuns: diabetes, alcoolismo, deficiência B12, idiopática.',
      criteriosDiagnosticos: ['Parestesias/dor em extremidades', 'Diminuição de sensibilidade', 'Perda de reflexos', 'Força preservada (inicialmente)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa de base', 'Fisioterapia', 'Cuidados com pés'],
        farmacologico: ['Amitriptilina 25mg HS (aumentar gradualmente)', 'Ou Gabapentina 300mg 3x/dia']
      },
      redFlags: ['Perda motora rápida', 'Assimetria', 'Déficit neurológico focal']
    },
    medicamentos: ['amitriptilina', 'gabapentina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-tunel-carpiano',
    titulo: 'Síndrome do Túnel do Carpo',
    ciap2: ['N92'],
    cid10: ['G56.0'],
    categoria: 'neurologico',
    doid: 'DOID:11696',
    snomedCT: '57406009',
    meshId: 'D002349',
    umlsCui: 'C0007286',
    tags: ['neurologico', 'ocupacional'],
    quickView: {
      definicao: 'Compressão do nervo mediano no túnel do carpo. Frequentemente relacionada a atividades repetitivas.',
      criteriosDiagnosticos: ['Parestesias nos 3 primeiros dedos', 'Pior à noite', 'Teste de Phalen positivo', 'Tinel positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Imobilização noturna', 'Modificar atividades', 'Fisioterapia'],
        farmacologico: ['AINES: Ibuprofeno 400mg 3x/dia', 'Infiltração com corticoide se necessário']
      },
      redFlags: ['Atrofia tenar', 'Perda motora', 'Bilateral com outras neuropatias']
    },
    medicamentos: ['ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES GASTROINTESTINAIS ADICIONAIS
  // ============================================
  {
    id: 'doenca-crohn',
    titulo: 'Doença de Crohn',
    ciap2: ['D94'],
    cid10: ['K50'],
    categoria: 'gastrointestinal',
    doid: 'DOID:8778',
    snomedCT: '34000006',
    meshId: 'D003424',
    umlsCui: 'C0010346',
    tags: ['cronica', 'gastrointestinal', 'autoimune'],
    quickView: {
      definicao: 'Doença inflamatória intestinal crônica. Pode afetar qualquer parte do TGI. Inflamação transmural.',
      criteriosDiagnosticos: ['Dor abdominal recorrente', 'Diarréia crônica', 'Perda ponderal', 'Aftas orais', 'Fístulas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento especializado', 'Suporte nutricional', 'Evitar tabagismo'],
        farmacologico: ['5-ASA: Mesalazina conforme orientação', 'Corticosteroides na exacerbação']
      },
      redFlags: ['Obstrução intestinal', 'Fístulas', 'Abscessos', 'Megacólon tóxico']
    },
    medicamentos: ['mesalazina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'colite-ulcerativa',
    titulo: 'Colite Ulcerativa',
    ciap2: ['D93'],
    cid10: ['K51'],
    categoria: 'gastrointestinal',
    doid: 'DOID:0050589',
    snomedCT: '64766004',
    meshId: 'D003093',
    umlsCui: 'C0009324',
    tags: ['cronica', 'gastrointestinal', 'autoimune'],
    quickView: {
      definicao: 'Doença inflamatória intestinal limitada ao cólon. Úlceras superficiais da mucosa.',
      criteriosDiagnosticos: ['Diarréia com sangue/muco', 'Urgência evacuatória', 'Dor abdominal', 'Sintomas sistêmicos'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento especializado', 'Suporte nutricional'],
        farmacologico: ['5-ASA: Mesalazina conforme extensão', 'Corticosteroides na exacerbação']
      },
      redFlags: ['Megacólon tóxico', 'Hemorragia grave', 'Perfuração', 'Colangite esclerosante']
    },
    medicamentos: ['mesalazina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-intestino-irritavel-diarréia',
    titulo: 'Síndrome do Intestino Irritável - Tipo Diarréia',
    ciap2: ['D93'],
    cid10: ['K58.0'],
    categoria: 'gastrointestinal',
    doid: 'DOID:10171',
    snomedCT: '107939000',
    meshId: 'D043183',
    umlsCui: 'C0022104',
    tags: ['funcional', 'gastrointestinal'],
    quickView: {
      definicao: 'SII com predomínio de diarréia (≥25% das evacuações). Critérios de Roma IV.',
      criteriosDiagnosticos: ['Dor abdominal recorrente ≥1x/semana', 'Associada a defecação e/ou alteração de frequência/forma', '≥6 meses', 'Diarréia predominante'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta FODMAP baixa', 'Fibras solúveis', 'Gerenciamento de estresse'],
        farmacologico: ['Loperamida 2mg após evacuações diarreicas (máx 16mg/dia)', 'Ou Rifaximina se sobrecrescimento bacteriano']
      },
      redFlags: ['Sintomas de início após 50 anos', 'Perda ponderal', 'Hemorragia digestiva', 'História familiar de câncer colorretal']
    },
    medicamentos: ['loperamida'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES ENDÓCRINAS ADICIONAIS
  // ============================================
  {
    id: 'hiperparatireoidismo',
    titulo: 'Hiperparatireoidismo Primário',
    ciap2: ['T93'],
    cid10: ['E21.0'],
    categoria: 'endocrino',
    doid: 'DOID:2723',
    snomedCT: '363478007',
    meshId: 'D049950',
    umlsCui: 'C0020507',
    tags: ['endocrino', 'metabolico'],
    quickView: {
      definicao: 'Aumento de PTH. Geralmente por adenoma. Causa hipercalcemia e complicações ósseas/renais.',
      criteriosDiagnosticos: ['Hipercalcemia', 'PTH elevado ou inapropriadamente normal', 'Exclusão de causas secundárias'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Limitar cálcio dietético'],
        farmacologico: ['Paratireoidectomia se sintomático ou complicações', 'Cinacalcet se não cirúrgico']
      },
      redFlags: ['Crise hipercalcêmica', 'Insuficiência renal', 'Litíase renal recorrente']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'doenca-graves',
    titulo: 'Doença de Graves',
    ciap2: ['T85'],
    cid10: ['E05.0'],
    categoria: 'endocrino',
    doid: 'DOID:4194',
    snomedCT: '56294001',
    meshId: 'D006111',
    umlsCui: 'C0018213',
    tags: ['endocrino', 'autoimune'],
    quickView: {
      definicao: 'Hipertireoidismo autoimune. Anticorpos anti-TSHR. Associada a oftalmopatia e bócio difuso.',
      criteriosDiagnosticos: ['Hipertireoidismo', 'Bócio difuso', 'Oftalmopatia (50%)', 'Anti-TSHR positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar iodo', 'Proteção ocular se oftalmopatia'],
        farmacologico: ['Metimazol 10-40mg/dia', 'Bloqueador beta para sintomas']
      },
      redFlags: ['Tempestade tireoidiana', 'Oftalmopatia grave', 'Compressão traqueal']
    },
    medicamentos: ['metimazol', 'propranolol'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES REUMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'artrite-reumatoide',
    titulo: 'Artrite Reumatóide',
    ciap2: ['L88'],
    cid10: ['M06'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:7148',
    snomedCT: '69896004',
    meshId: 'D001172',
    umlsCui: 'C0003873',
    tags: ['cronica', 'autoimune', 'reumatologica'],
    quickView: {
      definicao: 'Poliartrite inflamatória simétrica. Doença autoimune sistêmica. Pode ter manifestações extra-articulares.',
      criteriosDiagnosticos: ['Poliartrite simétrica', 'Rigidez matinal >1h', 'Fator reumatoide ou anti-CCP positivo', 'Alterações radiográficas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Terapia ocupacional', 'Exercícios adaptativos'],
        farmacologico: ['MTX 7,5-25mg/semana', 'Prednisona 5-10mg/dia na indução', 'DMARDs conforme necessário']
      },
      redFlags: ['Vasculite', 'Complicações pulmonares', 'Amiloidose', 'Erosões articulares rápidas']
    },
    medicamentos: ['metotrexato', 'prednisona'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'lupus-eritematoso-sistemico',
    titulo: 'Lúpus Eritematoso Sistêmico',
    ciap2: ['L99'],
    cid10: ['M32'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:9074',
    snomedCT: '55464009',
    meshId: 'D008180',
    umlsCui: 'C0024141',
    tags: ['cronica', 'autoimune', 'sistemica'],
    quickView: {
      definicao: 'Doença autoimune sistêmica. Pode afetar pele, articulações, rim, sistema nervoso. Mais comum em mulheres.',
      criteriosDiagnosticos: ['Critérios SLICC ou ACR', 'Rash malar', 'Fotosensibilidade', 'Anticorpos antinucleares'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Proteção solar', 'Repouso durante exacerbações'],
        farmacologico: ['Hidroxicloroquina 200-400mg/dia', 'Prednisona conforme gravidade', 'Imunossupressores se necessário']
      },
      redFlags: ['Nefrite lúpica', 'Neurolúpus', 'Crise lúpica', 'Plaquetopenia grave']
    },
    medicamentos: ['hidroxicloroquina', 'prednisona'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES HEMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'anemia-hemolitica',
    titulo: 'Anemia Hemolítica',
    ciap2: ['B82'],
    cid10: ['D59'],
    categoria: 'hematologico',
    doid: 'DOID:9538',
    snomedCT: '955009',
    meshId: 'D000743',
    umlsCui: 'C0002878',
    tags: ['hematologico', 'anemia'],
    quickView: {
      definicao: 'Anemia por hemólise aumentada. Pode ser autoimune, hereditária ou adquirida.',
      criteriosDiagnosticos: ['Anemia', 'Aumento de reticulócitos', 'LDH elevado', 'Bilirrubina indireta elevada', 'Haptoglobina baixa'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa de base', 'Evitar desencadeantes'],
        farmacologico: ['Corticosteroides se autoimune', 'Transfusão se sintomático']
      },
      redFlags: ['Crise aplástica', 'Insuficiência renal', 'Coagulopatia']
    },
    medicamentos: ['prednisona'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'leucemia-linfocitica-cronica',
    titulo: 'Leucemia Linfocítica Crônica',
    ciap2: ['B73'],
    cid10: ['C91.1'],
    categoria: 'hematologico',
    doid: 'DOID:8552',
    snomedCT: '91857009',
    meshId: 'D015451',
    umlsCui: 'C0023418',
    tags: ['hematologico', 'neoplasia', 'cronica'],
    quickView: {
      definicao: 'Neoplasia de linfócitos B maduros. Mais comum em idosos. Geralmente indolente.',
      criteriosDiagnosticos: ['Linfocitose >5000/μL', 'Morfológica compatível', 'Imunofenotipo característico'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilância se assintomático e estável', 'Acompanhamento onco-hematológico'],
        farmacologico: ['Tratamento apenas se sintomático ou progressivo', 'Quimioterapia conforme estadiamento']
      },
      redFlags: ['Citopenias', 'Linfonodos volumosos', 'Organomegalia', 'Infecções recorrentes']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES INFECCIOSAS ADICIONAIS
  // ============================================
  {
    id: 'mononucleose-infecciosa',
    titulo: 'Mononucleose Infecciosa',
    ciap2: ['A75'],
    cid10: ['B27'],
    categoria: 'infecciosas',
    doid: 'DOID:8620',
    snomedCT: '186759007',
    meshId: 'D007244',
    umlsCui: 'C0026650',
    tags: ['infecciosa', 'viral', 'pediatrica'],
    quickView: {
      definicao: 'Infecção pelo EBV. Caracterizada por febre, faringite, linfadenopatia, esplenomegalia.',
      criteriosDiagnosticos: ['Faringite exsudativa', 'Linfadenopatia cervical', 'Linfocitose atípica', 'Teste de Paul-Bunnell positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratação', 'Gargarejos'],
        farmacologico: ['Sintomático: Paracetamol ou Ibuprofeno', 'Corticoide apenas se complicações']
      },
      redFlags: ['Ruptura esplênica', 'Obstrução de vias aéreas', 'Hepatite grave', 'Meningoencefalite']
    },
    medicamentos: ['paracetamol', 'ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'hepatite-a',
    titulo: 'Hepatite A',
    ciap2: ['D72'],
    cid10: ['B15'],
    categoria: 'infecciosas',
    doid: 'DOID:12549',
    snomedCT: '50711007',
    meshId: 'D006506',
    umlsCui: 'C0019158',
    tags: ['infecciosa', 'viral', 'hepatite'],
    quickView: {
      definicao: 'Infecção pelo HAV. Transmissão fecal-oral. Geralmente autolimitada, raramente fulminante.',
      criteriosDiagnosticos: ['Icterícia', 'AST/ALT elevados', 'Anti-HAV IgM positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratação', 'Evitar álcool'],
        farmacologico: ['Sintomático apenas', 'Não há tratamento específico']
      },
      redFlags: ['Hepatite fulminante', 'Insuficiência hepática', 'Coagulopatia']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'hepatite-b',
    titulo: 'Hepatite B',
    ciap2: ['D72'],
    cid10: ['B16'],
    categoria: 'infecciosas',
    doid: 'DOID:2043',
    snomedCT: '66071002',
    meshId: 'D006509',
    umlsCui: 'C0019159',
    tags: ['infecciosa', 'viral', 'hepatite', 'cronica'],
    quickView: {
      definicao: 'Infecção pelo HBV. Pode ser aguda ou crônica. Transmissão parenteral, sexual ou vertical.',
      criteriosDiagnosticos: ['HBsAg positivo', 'Anti-HBc IgM (aguda)', 'Carga viral HBV'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Evitar álcool', 'Proteção de contatos'],
        farmacologico: ['Aguda: sintomático', 'Crônica: Tenofovir ou Entecavir']
      },
      redFlags: ['Hepatite fulminante', 'Cirrose', 'Carcinoma hepatocelular']
    },
    medicamentos: ['tenofovir', 'entecavir'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES DERMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'vitiligo',
    titulo: 'Vitiligo',
    ciap2: ['S93'],
    cid10: ['L80'],
    categoria: 'dermatologico',
    doid: 'DOID:9008',
    snomedCT: '9014002',
    meshId: 'D014820',
    umlsCui: 'C0042890',
    tags: ['dermatologico', 'autoimune'],
    quickView: {
      definicao: 'Despigmentação da pele por perda de melanócitos. Doença autoimune.',
      criteriosDiagnosticos: ['Manchas hipocrômicas/acrômicas', 'Bordas bem delimitadas', 'Lâmpada de Wood positiva'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Proteção solar', 'Maquiagem corretiva'],
        farmacologico: ['Corticosteroides tópicos', 'Inibidores de calcineurina tópicos', 'Fototerapia']
      },
      redFlags: ['Despigmentação rápida', 'Associado a outras doenças autoimunes']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'urticaria-cronica',
    titulo: 'Urticária Crônica',
    ciap2: ['S99'],
    cid10: ['L50'],
    categoria: 'dermatologico',
    doid: 'DOID:9119',
    snomedCT: '37796009',
    meshId: 'D014581',
    umlsCui: 'C0042109',
    tags: ['dermatologico', 'cronica', 'alergica'],
    quickView: {
      definicao: 'Urticária persistente >6 semanas. Geralmente idiopática ou autoimune.',
      criteriosDiagnosticos: ['Pápulas eritematosas pruriginosas', '>6 semanas de duração', 'Angioedema pode estar presente'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar desencadeantes identificados', 'Evitar AAS/AINES se relacionados'],
        farmacologico: ['Anti-histamínico H1: Cetirizina 10mg 1x/dia', 'Se não responde: aumentar dose ou adicionar H2']
      },
      redFlags: ['Angioedema de vias aéreas', 'Anafilaxia', 'Sintomas sistêmicos']
    },
    medicamentos: ['cetirizina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES REUMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'espondilite-anquilosante',
    titulo: 'Espondilite Anquilosante',
    ciap2: ['L88'],
    cid10: ['M45'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:7149',
    snomedCT: '59670000',
    meshId: 'D013167',
    umlsCui: 'C0003879',
    tags: ['cronica', 'autoimune', 'reumatologica'],
    quickView: {
      definicao: 'Espondiloartrite seronegativa. Inflamação crônica da coluna e sacroilíacas. Mais comum em homens jovens.',
      criteriosDiagnosticos: ['Dor lombar inflamatória', 'Rigidez matinal', 'Melhora com exercício', 'Sacroileíte radiográfica', 'HLA-B27 positivo (90%)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Exercícios', 'Postura correta'],
        farmacologico: ['AINEs: Naproxeno 500mg 2x/dia', 'Anti-TNF se não responde']
      },
      redFlags: ['Fratura vertebral', 'Cifose grave', 'Complicações cardíacas']
    },
    medicamentos: ['naproxeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-sjogren',
    titulo: 'Síndrome de Sjögren',
    ciap2: ['L99'],
    cid10: ['M35.0'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:12858',
    snomedCT: '48271000',
    meshId: 'D012859',
    umlsCui: 'C0037243',
    tags: ['cronica', 'autoimune', 'sistemica'],
    quickView: {
      definicao: 'Doença autoimune com secura de mucosas. Pode ser primária ou associada a outras doenças autoimunes.',
      criteriosDiagnosticos: ['Olho seco', 'Boca seca', 'Anti-SSA/Ro ou SSB/La positivo', 'Biópsia de glândula salivar'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Lubrificantes oculares', 'Saliva artificial', 'Hidratação'],
        farmacologico: ['Pilocarpina 5mg 3-4x/dia', 'Hidroxicloroquina para sintomas sistêmicos']
      },
      redFlags: ['Linfoma', 'Doença pulmonar intersticial', 'Vasculite']
    },
    medicamentos: ['pilocarpina', 'hidroxicloroquina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES CARDIOVASCULARES ADICIONAIS
  // ============================================
  {
    id: 'endocardite-infecciosa',
    titulo: 'Endocardite Infecciosa',
    ciap2: ['K71'],
    cid10: ['I33'],
    categoria: 'cardiovascular',
    doid: 'DOID:846',
    snomedCT: '84114007',
    meshId: 'D004696',
    umlsCui: 'C0014118',
    tags: ['cardiovascular', 'infecciosa', 'grave'],
    quickView: {
      definicao: 'Infecção do endocárdio/valvas cardíacas. Pode ser aguda (S. aureus) ou subaguda (estreptococos).',
      criteriosDiagnosticos: ['Febre', 'Sopro cardíaco novo ou alterado', 'Hemoculturas positivas', 'Vegetações ecocardiográficas', 'Critérios de Duke'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hospitalização', 'Ecocardiografia', 'Avaliação cardiológica'],
        farmacologico: ['Antibioticoterapia parenteral conforme hemocultura', 'Vancomicina + Gentamicina empiricamente']
      },
      redFlags: ['Insuficiência cardíaca', 'Embolias sistêmicas', 'Abscessos', 'Insuficiência valvar grave']
    },
    medicamentos: ['vancomicina', 'gentamicina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'miocardiopatia-dilatada',
    titulo: 'Miocardiopatia Dilatada',
    ciap2: ['K77'],
    cid10: ['I42.0'],
    categoria: 'cardiovascular',
    doid: 'DOID:12930',
    snomedCT: '84114007',
    meshId: 'D002311',
    umlsCui: 'C0027051',
    tags: ['cardiovascular', 'cronica'],
    quickView: {
      definicao: 'Dilatação ventricular com disfunção sistólica. Fração de ejeção reduzida.',
      criteriosDiagnosticos: ['IC com fração de ejeção reduzida', 'Dilatação ventricular', 'Ecocardiograma: FE <40%'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restrição de sal', 'Restrição de líquidos', 'Exercícios controlados'],
        farmacologico: ['IECA ou BRA: Enalapril ou Losartana', 'Beta-bloqueador: Carvedilol', 'Diurético se necessário']
      },
      redFlags: ['IC refratária', 'Arritmias', 'Morte súbita', 'Tromboembolismo']
    },
    medicamentos: ['enalapril', 'losartana', 'carvedilol'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES NEUROLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'esclerose-multipla',
    titulo: 'Esclerose Múltipla',
    ciap2: ['N99'],
    cid10: ['G35'],
    categoria: 'neurologico',
    doid: 'DOID:2377',
    snomedCT: '24700007',
    meshId: 'D009103',
    umlsCui: 'C0026769',
    tags: ['neurologico', 'cronica', 'autoimune'],
    quickView: {
      definicao: 'Doença desmielinizante do SNC. Lesões disseminadas no tempo e espaço.',
      criteriosDiagnosticos: ['Critérios de McDonald', 'Sintomas neurológicos múltiplos', 'RM: lesões desmielinizantes', 'Líquor: bandas oligoclonais'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Terapia ocupacional', 'Suporte psicológico'],
        farmacologico: ['Corticoide em surtos', 'Interferon beta ou Fingolimode para redução de surtos']
      },
      redFlags: ['Surto grave', 'Progresão rápida', 'Sintomas bulbares']
    },
    medicamentos: ['metilprednisolona'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-guillain-barre',
    titulo: 'Síndrome de Guillain-Barré',
    ciap2: ['N94'],
    cid10: ['G61.0'],
    categoria: 'neurologico',
    doid: 'DOID:12849',
    snomedCT: '398102000',
    meshId: 'D020275',
    umlsCui: 'C0018379',
    tags: ['neurologico', 'aguda', 'grave'],
    quickView: {
      definicao: 'Polirradiculoneuropatia desmielinizante aguda. Geralmente pós-infecciosa. Paralisia ascendente.',
      criteriosDiagnosticos: ['Paralisia ascendente', 'Areflexia', 'Líquor: dissociação proteína-citose', 'EMG: desmielinização'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hospitalização', 'Suporte ventilatório se necessário', 'Fisioterapia precoce'],
        farmacologico: ['IVIG 0,4g/kg/dia por 5 dias', 'Ou Plasmaférese']
      },
      redFlags: ['Insuficiência respiratória', 'Arritmias', 'Disfunção autonômica']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES PSIQUIÁTRICAS ADICIONAIS
  // ============================================
  {
    id: 'transtorno-bipolar',
    titulo: 'Transtorno Bipolar',
    ciap2: ['P73'],
    cid10: ['F31'],
    categoria: 'saude_mental',
    doid: 'DOID:3312',
    snomedCT: '13746004',
    meshId: 'D001714',
    umlsCui: 'C0005586',
    tags: ['saude_mental', 'cronica'],
    quickView: {
      definicao: 'Episódios de mania/hipomania e depressão. Tipo I (mania + depressão) ou II (hipomania + depressão).',
      criteriosDiagnosticos: ['Episódio maníaco (Tipo I) ou hipomaníaco (Tipo II)', 'Episódios depressivos', 'Mudança de humor'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Psicoterapia', 'Educação sobre a doença', 'Suporte familiar'],
        farmacologico: ['Estabilizador de humor: Lítio ou Valproato', 'Antipsicóticos na mania', 'Antidepressivos com cautela']
      },
      redFlags: ['Ideação suicida', 'Psicose', 'Mania grave', 'Hospitalização necessária']
    },
    medicamentos: ['lítio', 'valproato'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'esquizofrenia',
    titulo: 'Esquizofrenia',
    ciap2: ['P72'],
    cid10: ['F20'],
    categoria: 'saude_mental',
    doid: 'DOID:5419',
    snomedCT: '58214004',
    meshId: 'D012559',
    umlsCui: 'C0036341',
    tags: ['saude_mental', 'cronica', 'psicose'],
    quickView: {
      definicao: 'Doença mental com sintomas positivos (alucinações, delírios) e negativos (abulia, embotamento afetivo).',
      criteriosDiagnosticos: ['Sintomas positivos ou negativos por ≥1 mês', 'Disfunção social/ocupacional', 'Duração ≥6 meses'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Psicoterapia', 'Psicoeducação', 'Reabilitação psicossocial'],
        farmacologico: ['Antipsicótico: Risperidona ou Olanzapina', 'Manutenção prolongada']
      },
      redFlags: ['Ideação/conduta suicida', 'Agitação psicomotora', 'Negligência de autocuidados']
    },
    medicamentos: ['risperidona', 'olanzapina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES PEDIÁTRICAS ADICIONAIS
  // ============================================
  {
    id: 'bronquiolite-aguda',
    titulo: 'Bronquiolite Aguda',
    ciap2: ['R78'],
    cid10: ['J21'],
    categoria: 'pediatrico',
    doid: 'DOID:6131',
    snomedCT: '6142004',
    meshId: 'D001988',
    umlsCui: 'C0006274',
    tags: ['pediatrica', 'respiratorio', 'viral'],
    quickView: {
      definicao: 'Infecção das vias aéreas inferiores em <2 anos. Principalmente VSR. Sibilância e dispneia.',
      criteriosDiagnosticos: ['<2 anos', 'Rinorreia precedendo sintomas respiratórios', 'Sibilância', 'Tosse', 'Tachipneia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte ventilatório se necessário', 'Hidratação', 'Aspiração nasal'],
        farmacologico: ['Sintomático: Paracetamol', 'Salbutamol pode ser tentado mas eficácia limitada']
      },
      redFlags: ['Cianose', 'Apneia', 'Desidratação', 'Insuficiência respiratória']
    },
    medicamentos: ['paracetamol', 'salbutamol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'convulsao-febril',
    titulo: 'Convulsão Febril',
    ciap2: ['N89'],
    cid10: ['R56.0'],
    categoria: 'pediatrico',
    doid: 'DOID:8665',
    snomedCT: '85234005',
    meshId: 'D012640',
    umlsCui: 'C0038220',
    tags: ['pediatrica', 'neurologico'],
    quickView: {
      definicao: 'Convulsão associada a febre em 6 meses a 5 anos. Geralmente benigna e autolimitada.',
      criteriosDiagnosticos: ['6 meses a 5 anos', 'Febre ≥38°C', 'Convulsão generalizada', 'Sem infecção do SNC', 'Sem história prévia de convulsão afebril'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar febre: Paracetamol', 'Mantê-la lateralizada durante convulsão'],
        farmacologico: ['Diazepam retal se convulsão >5min', 'Antipirético: Paracetamol']
      },
      redFlags: ['Convulsão focal', 'Duração >15min', 'Múltiplas convulsões', 'Alteração de consciência prolongada']
    },
    medicamentos: ['paracetamol', 'diazepam'],
    protocolos: [],
    calculadoras: []
  },
];


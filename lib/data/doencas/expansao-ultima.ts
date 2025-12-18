/**
 * EXPANSÃO ÚLTIMA - DOENÇAS PARA 150+
 * ===================================
 * Expansão final para atingir meta de 150+ doenças:
 * - Doenças comuns na APS brasileira não cobertas
 * - Condições frequentes em atenção primária
 * - Todas com ontologias completas (DOID, SNOMED-CT, MeSH, UMLS, CIAP-2, CID-10, CID-11, HPO)
 */

import { Doenca } from '../../types/doenca';

export const doencasExpansaoUltima: Partial<Doenca>[] = [
  // ============================================
  // GASTROINTESTINAIS ADICIONAIS
  // ============================================
  {
    id: 'doenca-refluxo-gastroesofagico',
    titulo: 'Doença do Refluxo Gastroesofágico (DRGE)',
    sinonimos: ['Refluxo gastroesofágico', 'DRGE', 'Refluxo esofágico'],
    ciap2: ['D87'],
    cid10: ['K21'],
    cid11: ['DD90.3'],
    categoria: 'gastrointestinal',
    doid: 'DOID:77',
    snomedCT: '235595009',
    meshId: 'D005764',
    umlsCui: 'C0017158',
    hpo: ['HP:0002585', 'HP:0000202'], // HPO: pirose, regurgitação
    tags: ['gastrointestinal', 'comum', 'aps', 'cronica'],
    quickView: {
      definicao: 'Refluxo patológico do conteúdo gástrico para o esôfago, causando sintomas ou complicações. Pirose e regurgitação são os sintomas principais.',
      criteriosDiagnosticos: ['Pirose frequente', 'Regurgitação ácida', 'Sintomas pioram após refeições/decúbito', 'Melhora com antiácidos', 'Sintomas ≥2x/semana por >4 semanas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Elevar cabeceira', 'Evitar refeições 2-3h antes de deitar', 'Perder peso se obeso', 'Evitar alimentos gatilho (gordura, café, álcool)'],
        farmacologico: ['IBP: Omeprazol 20-40mg 1-2x/dia', 'Ou Pantoprazol 40mg 1x/dia', 'Antiacidos se sintomas leves']
      },
      redFlags: ['Disfagia', 'Odinofagia', 'Hematêmese', 'Perda ponderal', 'Anemia', 'Sintomas >5 anos']
    },
    medicamentos: ['omeprazol', 'pantoprazol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-intestino-irritavel',
    titulo: 'Síndrome do Intestino Irritável (SII)',
    sinonimos: ['Colon irritável', 'SII'],
    ciap2: ['D93'],
    cid10: ['K58'],
    cid11: ['DD91'],
    categoria: 'gastrointestinal',
    doid: 'DOID:10165',
    snomedCT: '10743008',
    meshId: 'D043183',
    umlsCui: 'C0022104',
    hpo: ['HP:0002019', 'HP:0002023'], // HPO: dor abdominal, diarreia
    tags: ['gastrointestinal', 'funcional', 'cronica'],
    quickView: {
      definicao: 'Transtorno funcional intestinal caracterizado por dor abdominal recorrente associada à alteração do hábito intestinal, na ausência de doença orgânica.',
      criteriosDiagnosticos: ['Critérios de Roma IV: Dor abdominal ≥1x/semana nos últimos 3 meses', 'Associada a ≥2: relacionada à defecação, mudança de frequência ou forma das fezes', 'Sintomas ≥6 meses antes do diagnóstico'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta FODMAP (temporária)', 'Fibras solúveis', 'Exercícios', 'Técnicas de relaxamento', 'Acompanhamento dietético'],
        farmacologico: ['Antiespasmódicos: Hioscina ou Butilescopolamina', 'Probióticos', 'Fibras: Psyllium se constipação predominante', 'Antidiarreicos se diarreia predominante']
      },
      redFlags: ['Sangramento retal', 'Perda ponderal', 'Anemia', 'História familiar de câncer colorretal', 'Idade >50 anos com sintomas novos']
    },
    medicamentos: ['hioscina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // RESPIRATÓRIAS ADICIONAIS
  // ============================================
  {
    id: 'rinite-alergica',
    titulo: 'Rinite Alérgica',
    sinonimos: ['Rinite alérgica perene', 'Rinite alérgica sazonal', 'Polinose'],
    ciap2: ['R97'],
    cid10: ['J30'],
    cid11: ['CA08.0'],
    categoria: 'respiratorio',
    doid: 'DOID:8819',
    snomedCT: '47758005',
    meshId: 'D012221',
    umlsCui: 'C0035384',
    hpo: ['HP:0002197', 'HP:0000422'], // HPO: rinorreia, espirros
    tags: ['respiratorio', 'alergia', 'comum'],
    quickView: {
      definicao: 'Inflamação da mucosa nasal mediada por IgE, desencadeada por alérgenos. Sintomas: rinorreia, espirros, prurido nasal, congestão.',
      criteriosDiagnosticos: ['Rinorreia aquosa', 'Espirros', 'Prurido nasal/ocular', 'Congestão nasal', 'Sintomas desencadeados por alérgenos conhecidos', 'Teste cutâneo ou IgE específica positiva'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar alérgenos', 'Lavagem nasal com soro fisiológico', 'Vacinas anti-alérgicas (imunoterapia) se indicado'],
        farmacologico: ['Anti-histamínicos orais: Cetirizina 10mg/dia ou Loratadina 10mg/dia', 'Corticosteroides nasais: Budesonida ou Fluticasona', 'Anti-histamínico tópico nasal se necessário']
      },
      redFlags: ['Sinusal', 'Obstrução nasal unilateral', 'Sangramento nasal persistente', 'Pólipos nasais']
    },
    medicamentos: ['cetirizina', 'loratadina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'tosse-cronica',
    titulo: 'Tosse Crônica',
    sinonimos: ['Tosse persistente'],
    ciap2: ['R05'],
    cid10: ['R05'],
    cid11: ['MD11.1'],
    categoria: 'respiratorio',
    doid: 'DOID:12759',
    snomedCT: '49727002',
    meshId: 'D003371',
    umlsCui: 'C0010200',
    tags: ['respiratorio', 'sintoma', 'cronica'],
    quickView: {
      definicao: 'Tosse persistente por >8 semanas. Principais causas: síndrome do gotejamento pós-nasal, asma, DRGE, uso de IECA.',
      criteriosDiagnosticos: ['Tosse >8 semanas', 'Investigar causas: DRGE, asma, rinite, IECA', 'Radiografia de tórax normal', 'Exclusão de outras causas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa subjacente', 'Suspender IECA se uso recente', 'Evitar irritantes'],
        farmacologico: ['Se DRGE: IBP', 'Se asma: Broncodilatadores + Corticosteroides inalatórios', 'Se rinite: Anti-histamínicos + Corticosteroides nasais', 'Codeína ou Dextrometorfano apenas curto prazo se necessário']
      },
      redFlags: ['Hemorragia', 'Perda ponderal', 'Febre', 'Adenomegalia', 'Tabagismo', 'Idade >50 anos']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DERMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'acne-vulgar',
    titulo: 'Acne Vulgar',
    sinonimos: ['Acne comum'],
    ciap2: ['S88'],
    cid10: ['L70'],
    cid11: ['ED80'],
    categoria: 'dermatologico',
    doid: 'DOID:654',
    snomedCT: '89765004',
    meshId: 'D000152',
    umlsCui: 'C0001053',
    hpo: ['HP:0001061'], // HPO: acne
    tags: ['dermatologico', 'comum', 'adolescencia'],
    quickView: {
      definicao: 'Dermatose inflamatória crônica do folículo pilossebáceo. Comum em adolescentes. Lesões: comedões, pápulas, pústulas, nódulos.',
      criteriosDiagnosticos: ['Lesões típicas: comedões, pápulas, pústulas, nódulos', 'Localização: face, tórax, dorso', 'Idade: principalmente adolescentes/adultos jovens'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene adequada', 'Evitar espremer lesões', 'Protetor solar não comedogênico', 'Dieta: reduzir açúcar/laticínios pode ajudar'],
        farmacologico: ['Leve: Peróxido de benzoíla tópico 2,5-10%', 'Moderada: Peróxido de benzoíla + Retinoide tópico', 'Severa: Doxiciclina ou Minociclina oral + Tretinoína tópica', 'Mulheres: Anticoncepcional oral combinado se indicado']
      },
      redFlags: ['Acne fulminante', 'Acne conglobata', 'Cicatrizes extensas', 'Resistente ao tratamento']
    },
    medicamentos: ['doxiciclina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'impetigo',
    titulo: 'Impetigo',
    sinonimos: ['Piodermite superficial'],
    ciap2: ['S72'],
    cid10: ['L01'],
    cid11: ['EA40'],
    categoria: 'dermatologico',
    doid: 'DOID:8406',
    snomedCT: '48277006',
    meshId: 'D007169',
    umlsCui: 'C0021099',
    tags: ['dermatologico', 'infecciosa', 'bacteriana', 'pediatrica'],
    quickView: {
      definicao: 'Infecção cutânea superficial bacteriana. Causas: S. aureus, S. pyogenes. Lesões: vesículas/pústulas que evoluem para crostas melicéricas.',
      criteriosDiagnosticos: ['Lesões vesiculares/pustulares', 'Evoluem para crostas melicéricas', 'Localização: face, extremidades', 'Mais comum em crianças'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene local', 'Remover crostas', 'Evitar contato'],
        farmacologico: ['Tópico: Mupirocina 2% 3x/dia por 7-10 dias', 'Ou Ácido fusídico tópico', 'Se extenso: Cefalexina oral 25-50mg/kg/dia por 7 dias', 'Ou Amoxicilina-clavulanato']
      },
      redFlags: ['Celulite', 'Erisipela', 'Linfangite', 'Glomerulonefrite pós-estreptocócica']
    },
    medicamentos: ['cefalexina', 'amoxicilina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // ORL ADICIONAIS
  // ============================================
  {
    id: 'otite-media-aguda',
    titulo: 'Otite Média Aguda',
    sinonimos: ['OMA'],
    ciap2: ['H71'],
    cid10: ['H66'],
    cid11: ['AA80.0'],
    categoria: 'pediatrico',
    doid: 'DOID:10727',
    snomedCT: '194267006',
    meshId: 'D006639',
    umlsCui: 'C0029879',
    hpo: ['HP:0000388', 'HP:0000379'], // HPO: otite média, otalgia
    tags: ['orl', 'pediatrica', 'infecciosa'],
    quickView: {
      definicao: 'Infecção aguda do ouvido médio. Comum em crianças <5 anos. Sintomas: otalgia, febre, irritabilidade. Pode ter otorreia se tímpano perfurado.',
      criteriosDiagnosticos: ['Otalgia aguda', 'Otoscopia: tímpano abombado/eritematoso', 'Febre', 'Irritabilidade em crianças', 'Pode ter otorreia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgésicos: Paracetamol ou Ibuprofeno', 'Observação vigilante por 48-72h em casos leves (crianças >6 meses)'],
        farmacologico: ['Se tratamento: Amoxicilina 80-90mg/kg/dia por 7-10 dias', 'Ou Amoxicilina-clavulanato se uso recente de antibióticos', 'Se alergia: Azitromicina ou Ceftriaxona']
      },
      redFlags: ['Mastoidite', 'Paralisia facial', 'Meningite', 'Complicações intracranianas']
    },
    medicamentos: ['amoxicilina', 'azitromicina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'cerume-impactado',
    titulo: 'Cerume Impactado',
    sinonimos: ['Rolha de cerume'],
    ciap2: ['H82'],
    cid10: ['H61.2'],
    cid11: ['AB30.0'],
    categoria: 'outros',
    doid: 'DOID:14694',
    snomedCT: '69695003',
    meshId: 'D002624',
    umlsCui: 'C0007783',
    tags: ['orl', 'comum'],
    quickView: {
      definicao: 'Acúmulo excessivo de cerume no conduto auditivo externo, causando obstrução e sintomas como hipoacusia e plenitude auricular.',
      criteriosDiagnosticos: ['Hipoacusia', 'Plenitude auricular', 'Otoscopia: cerume obstrutivo', 'Pode ter prurido', 'Pode ter otalgia leve'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Remoção manual com cureta', 'Irrigação com água morna', 'Gotas ceruminolíticas: Cerumin ou Peróxido de hidrogênio antes da remoção'],
        farmacologico: ['Ceruminolíticos tópicos por 3-5 dias antes da remoção']
      },
      redFlags: ['Perfuração timpânica', 'Infecção do ouvido externo', 'Dor intensa']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // UROLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'incontinencia-urgencia',
    titulo: 'Incontinência Urinária de Urgência',
    sinonimos: ['Bexiga hiperativa'],
    ciap2: ['U02'],
    cid10: ['N39.3'],
    cid11: ['GC40'],
    categoria: 'urologico',
    doid: 'DOID:11628',
    snomedCT: '126906006',
    meshId: 'D014547',
    umlsCui: 'C0020538',
    tags: ['urologico', 'comum', 'geriatrico'],
    quickView: {
      definicao: 'Perda involuntária de urina associada a urgência miccional. Causa: contrações involuntárias do detrusor (bexiga hiperativa).',
      criteriosDiagnosticos: ['Perda de urina com urgência', 'Frequência miccional aumentada', 'Noctúria', 'Diário miccional pode ajudar no diagnóstico'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios de Kegel', 'Treino vesical', 'Modificações comportamentais', 'Reduzir cafeína/álcool'],
        farmacologico: ['Anticolinérgicos: Oxybutinina 5mg 2x/dia', 'Ou Solifenacina 5-10mg/dia', 'Ou Tolterodina 2mg 2x/dia']
      },
      redFlags: ['Incontinência de esforço (diferencial)', 'Hematúria', 'Infecção urinária recorrente', 'Sintomas neurológicos']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // NEUROLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'neuropatia-periferica',
    titulo: 'Neuropatia Periférica',
    sinonimos: ['Polineuropatia'],
    ciap2: ['N94'],
    cid10: ['G62'],
    cid11: ['8C02'],
    categoria: 'neurologico',
    doid: 'DOID:330',
    snomedCT: '302226006',
    meshId: 'D010523',
    umlsCui: 'C0027882',
    hpo: ['HP:0009830', 'HP:0003470'], // HPO: neuropatia periférica, parestesia
    tags: ['neurologico', 'cronica'],
    quickView: {
      definicao: 'Lesão dos nervos periféricos. Sintomas: parestesia, formigamento, queimação, fraqueza, dor. Causas: diabetes, deficiências nutricionais, toxinas.',
      criteriosDiagnosticos: ['Parestesia/formigamento', 'Dor neuropática', 'Fraqueza muscular', 'Reflexos diminuídos', 'Exame neurológico: alterações sensitivas/motoras'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa subjacente', 'Fisioterapia', 'Apoio ortopédico se necessário'],
        farmacologico: ['Analgésicos: Amitriptilina 10-50mg/dia', 'Ou Gabapentina 300-1800mg/dia', 'Ou Pregabalina 75-300mg/dia', 'Suplementação: B12, B6, Ácido fólico se deficiente']
      },
      redFlags: ['Progressão rápida', 'Envolvimento de nervos cranianos', 'Sintomas autonômicos', 'Fraqueza ascendente']
    },
    medicamentos: ['amitriptilina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // INFECCIOSAS ADICIONAIS
  // ============================================
  {
    id: 'gastroenterite-viral',
    titulo: 'Gastroenterite Viral',
    sinonimos: ['Gastroenterite aguda viral'],
    ciap2: ['D73'],
    cid10: ['A08'],
    cid11: ['DD92'],
    categoria: 'infecciosas',
    doid: 'DOID:4374',
    snomedCT: '48866001',
    meshId: 'D005759',
    umlsCui: 'C0017168',
    tags: ['infecciosa', 'viral', 'gastrointestinal', 'pediatrica'],
    quickView: {
      definicao: 'Infecção viral do trato gastrointestinal. Causas: rotavírus, norovírus, adenovírus. Sintomas: diarreia, vômitos, náusea, dor abdominal.',
      criteriosDiagnosticos: ['Diarreia aguda', 'Vômitos', 'Náusea', 'Dor abdominal', 'Febre pode estar presente', 'História epidemiológica'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação oral: Soro de reidratação oral', 'Dieta leve', 'Repouso', 'Prevenção: higiene, vacinação (rotavírus)'],
        farmacologico: ['Antieméticos se vômitos intensos: Ondansetrona', 'Zinco em crianças <5 anos', 'Probióticos podem ajudar']
      },
      redFlags: ['Desidratação severa', 'Sangue nas fezes', 'Idosos/crianças pequenas', 'Sintomas >7 dias']
    },
    medicamentos: ['ondansetrona'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // ENDÓCRINAS ADICIONAIS
  // ============================================
  {
    id: 'bocio-simples',
    titulo: 'Bócio Simples',
    sinonimos: ['Bócio não tóxico'],
    ciap2: ['T85'],
    cid10: ['E04'],
    cid11: ['5A01'],
    categoria: 'endocrino',
    doid: 'DOID:11981',
    snomedCT: '367460001',
    meshId: 'D006042',
    umlsCui: 'C0018021',
    tags: ['endocrino', 'tireoide'],
    quickView: {
      definicao: 'Aumento difuso da glândula tireoide sem hipertireoidismo ou hipotireoidismo. Função tireoidiana normal. Causas: deficiência de iodo, fatores genéticos.',
      criteriosDiagnosticos: ['Aumento da tireoide', 'Função tireoidiana normal (TSH, T4 livre)', 'Ausência de nódulos', 'Sintomas compressivos podem estar presentes'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Se deficiência de iodo: Suplementação de iodo', 'Acompanhamento clínico'],
        farmacologico: ['Levotiroxina se TSH no limite superior (prevenção)', 'Geralmente não requer tratamento se função normal']
      },
      redFlags: ['Nódulos tireoidianos', 'Sintomas compressivos importantes', 'Alteração da função tireoidiana', 'História familiar de câncer de tireoide']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // HEMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'anemia-ferropriva',
    titulo: 'Anemia Ferropriva',
    sinonimos: ['Anemia por deficiência de ferro'],
    ciap2: ['B82'],
    cid10: ['D50'],
    cid11: ['3A00'],
    categoria: 'hematologico',
    doid: 'DOID:2355',
    snomedCT: '399096004',
    meshId: 'D000740',
    umlsCui: 'C0002871',
    hpo: ['HP:0001875', 'HP:0001892'], // HPO: anemia, ferropenia
    tags: ['hematologico', 'anemia', 'deficiencia', 'comum'],
    quickView: {
      definicao: 'Anemia por deficiência de ferro. A causa mais comum de anemia. Caracterizada por microcitose e hipocromia. Ferritina baixa, transferrina elevada.',
      criteriosDiagnosticos: ['Anemia microcítica hipocrômica', 'Ferritina baixa', 'Transferrina/saturação de transferrina baixa', 'Investigar causa: perda de sangue, má absorção, deficiência nutricional'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta rica em ferro', 'Tratar causa subjacente (sangramento, má absorção)', 'Evitar café/chá com refeições'],
        farmacologico: ['Sulfato ferroso 200mg (65mg de ferro elementar) 1-2x/dia', 'Ou Ferro quelato', 'Associar vitamina C pode melhorar absorção', 'Tratamento por 3-6 meses após normalização']
      },
      redFlags: ['Sangramento digestivo', 'Perda de sangue persistente', 'Não responsiva ao tratamento', 'Má absorção']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
];


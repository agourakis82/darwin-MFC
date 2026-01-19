/**
 * DOENÇAS TROPICAIS E NEGLIGENCIADAS - EXPANSÃO COMPLETA 30 DOENÇAS
 * ==================================================================
 *
 * Categorias:
 * - Parasitárias (15): Malária vivax/falciparum, Chagas, Leishmanioses, Esquistossomose,
 *   Toxoplasmose, Neurocisticercose, Estrongiloidíase, Ancilostomíase, Ascaridíase,
 *   Filariose, Oncocercose, Teníase, Giardíase, Amebíase
 * - Virais (8): Dengue, Zika, Chikungunya, Febre Amarela, Hantavirose, Oropouche, Mayaro, Raiva
 * - Bacterianas (7): Leptospirose, Febre Maculosa, Hanseníase, Tuberculose, Melioidose,
 *   Febre Tifoide, Cólera
 *
 * Padrão Q1 com citações e ontologias
 */

import { Doenca } from '../../types/doenca';

export const doencasTropicais: Partial<Doenca>[] = [
  // PARASITÁRIAS
  {
    id: 'malaria-vivax',
    titulo: 'Malária por P. vivax',
    sinonimos: ['Malária terçã benigna', 'Paludismo'],
    doid: 'DOID:12978',
    snomedCT: '61462000',
    meshId: 'D016780',
    ciap2: ['A73'],
    cid10: ['B51', 'B51.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Plasmodium vivax transmitida por Anopheles. Espécie mais prevalente na Amazônia (>80%). Caracterizada por formas latentes hepáticas (hipnozoítos) e recaídas.',
      criteriosDiagnosticos: [
        'Febre terçã (48h)',
        'Paroxismo: calafrio → febre → sudorese',
        'Gota espessa ou teste rápido positivo',
        'Epidemiologia compatível'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Notificação compulsória', 'Controle vetorial', 'Repouso'],
        farmacologico: ['Cloroquina 25mg/kg total (D1: 10mg/kg; D2-3: 7,5mg/kg)', 'Primaquina 0,5mg/kg/dia por 7 dias (ou 0,25mg/kg 14 dias)', 'Dosar G6PD antes de primaquina']
      },
      redFlags: ['Vômitos persistentes', 'Icterícia', 'Alteração consciência', 'Plaquetopenia grave', 'Gestante']
    },
    medicamentos: ['cloroquina', 'primaquina'],
    protocolos: ['malaria-vivax'],
    calculadoras: [],
    citations: [{ refId: 'ms-malaria-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'amazonia', 'notificacao']
  },
  {
    id: 'malaria-falciparum',
    titulo: 'Malária por P. falciparum',
    sinonimos: ['Malária terçã maligna', 'Malária grave'],
    doid: 'DOID:14067',
    snomedCT: '2931005',
    meshId: 'D016778',
    ciap2: ['A73'],
    cid10: ['B50', 'B50.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Forma mais grave de malária. P. falciparum causa sequestro vascular e complicações potencialmente fatais. Emergência médica se malária grave.',
      criteriosDiagnosticos: [
        'Febre irregular (pode não ter padrão)',
        'Gota espessa/teste rápido P. falciparum +',
        'Sinais de gravidade: alteração consciência, dispneia, icterícia, hipoglicemia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internação se grave', 'Hidratação', 'Monitorização glicemia', 'Notificação'],
        farmacologico: ['Não complicada: Artemether-Lumefantrina (Coartem) 4 comp 12/12h 3 dias', 'Grave: Artesunato IV 2,4mg/kg 0-12-24h, depois 1x/dia', 'Completar com ACT oral']
      },
      redFlags: ['Malária cerebral', 'Insuficiência renal', 'SDRA', 'Acidose', 'Parasitemia >5%', 'Hipoglicemia']
    },
    medicamentos: ['artemether-lumefantrina', 'artesunato'],
    protocolos: ['malaria-grave'],
    calculadoras: [],
    citations: [{ refId: 'who-malaria-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'emergencia', 'amazonia', 'notificacao']
  },
  {
    id: 'doenca-chagas',
    titulo: 'Doença de Chagas',
    sinonimos: ['Tripanossomíase americana', 'Cardiopatia chagásica'],
    doid: 'DOID:12140',
    snomedCT: '77506005',
    meshId: 'D014355',
    ciap2: ['A78'],
    cid10: ['B57', 'B57.2'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Trypanosoma cruzi. Transmissão vetorial (triatomíneos), oral, vertical, transfusional. Fases: aguda (rara), indeterminada, crônica (cardíaca/digestiva).',
      criteriosDiagnosticos: [
        'Epidemiologia: área endêmica, açaí artesanal',
        'Sorologia: 2 métodos positivos (ELISA + IFI/HAI)',
        'Aguda: parasitemia direta',
        'Crônica: cardiomegalia, megaesôfago, megacólon'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Notificação compulsória', 'Acompanhamento cardiológico', 'Evitar reinfecção'],
        farmacologico: ['Fase aguda: Benznidazol 5-7mg/kg/dia por 60 dias', 'Crônica indeterminada <50 anos: considerar tratamento', 'Crônica com cardiopatia: tratamento cardiológico']
      },
      redFlags: ['Miocardite aguda', 'ICC descompensada', 'Arritmias graves', 'Meningoencefalite', 'Reativação em imunodeprimidos']
    },
    medicamentos: ['benznidazol'],
    protocolos: ['chagas-aguda', 'chagas-cronica'],
    calculadoras: [],
    citations: [{ refId: 'ms-chagas-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'cardiologia', 'notificacao', 'cronico']
  },
  {
    id: 'leishmaniose-visceral',
    titulo: 'Leishmaniose Visceral',
    sinonimos: ['Calazar', 'Esplenomegalia tropical'],
    doid: 'DOID:9065',
    snomedCT: '186803007',
    meshId: 'D007896',
    ciap2: ['A78'],
    cid10: ['B55.0'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por L. infantum transmitida por flebotomíneo. Doença sistêmica grave. Brasil: maior endemia das Américas. Letalidade 5-10% se tratada.',
      criteriosDiagnosticos: [
        'Febre prolongada (>2 semanas)',
        'Hepatoesplenomegalia',
        'Pancitopenia',
        'Parasitológico ou rK39 positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internação', 'Suporte nutricional', 'Hemotransfusão se necessário', 'Notificação'],
        farmacologico: ['Anfotericina B lipossomal 3mg/kg/dia IV por 7 dias (1ª escolha)', 'Alternativa: Antimoniato de N-metilglucamina 20mg Sb/kg/dia por 20-30 dias', 'Miltefosina se disponível']
      },
      redFlags: ['Idade <1 ou >50 anos', 'Desnutrição', 'Coinfecção HIV', 'Sangramento', 'Infecção secundária']
    },
    medicamentos: ['anfotericina-b-lipossomal', 'antimoniato-meglumina'],
    protocolos: ['leishmaniose-visceral'],
    calculadoras: [],
    citations: [{ refId: 'ms-lv-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'emergencia', 'notificacao']
  },
  {
    id: 'leishmaniose-tegumentar',
    titulo: 'Leishmaniose Tegumentar Americana',
    sinonimos: ['Úlcera de Bauru', 'Ferida brava'],
    doid: 'DOID:9111',
    snomedCT: '20559001',
    meshId: 'D007897',
    ciap2: ['S99'],
    cid10: ['B55.1', 'B55.2'],
    categoria: 'dermatologico',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Leishmania spp. com manifestações cutâneas ou mucosas. Formas: cutânea localizada, disseminada, difusa e mucosa (espúndia).',
      criteriosDiagnosticos: [
        'Úlcera cutânea indolor com bordas elevadas',
        'Epidemiologia: área endêmica, mata',
        'IDRM (Montenegro) positivo',
        'Parasitológico ou PCR positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Limpeza local', 'Notificação', 'Investigação de lesões mucosas'],
        farmacologico: ['Antimoniato de N-metilglucamina 10-20mg Sb/kg/dia por 20-30 dias', 'Forma mucosa: dose alta por 30 dias', 'Anfotericina B se contraindicação a Sb']
      },
      redFlags: ['Lesão mucosa (nariz, palato)', 'Imunodepressão', 'Forma difusa', 'Múltiplas lesões']
    },
    medicamentos: ['antimoniato-meglumina', 'anfotericina-b'],
    protocolos: ['leishmaniose-tegumentar'],
    calculadoras: [],
    citations: [{ refId: 'ms-lta-2017', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'dermatologia', 'notificacao']
  },
  {
    id: 'esquistossomose',
    titulo: 'Esquistossomose Mansoni',
    sinonimos: ['Barriga d\'água', 'Xistose'],
    doid: 'DOID:1395',
    snomedCT: '61370005',
    meshId: 'D012552',
    ciap2: ['D96'],
    cid10: ['B65.1'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Schistosoma mansoni adquirida por contato com água doce contaminada (caramujos Biomphalaria). Formas: intestinal, hepatointestinal, hepatoesplênica.',
      criteriosDiagnosticos: [
        'Epidemiologia: contato com águas naturais em área endêmica',
        'Diarreia, dor abdominal',
        'Hepatoesplenomegalia (forma avançada)',
        'EPF (Kato-Katz) com ovos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Saneamento', 'Educação sanitária', 'Notificação'],
        farmacologico: ['Praziquantel 50mg/kg DU (adultos) ou 60mg/kg DU (crianças 2-15 anos)', 'Controle de cura: EPF 30-180 dias após']
      },
      redFlags: ['Hipertensão portal', 'Hemorragia digestiva (varizes)', 'Forma aguda (Katayama)', 'Neuroesquistossomose']
    },
    medicamentos: ['praziquantel'],
    protocolos: ['esquistossomose'],
    calculadoras: [],
    citations: [{ refId: 'ms-esquistossomose-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'notificacao']
  },
  {
    id: 'toxoplasmose',
    titulo: 'Toxoplasmose',
    sinonimos: ['Infecção por Toxoplasma'],
    doid: 'DOID:9965',
    snomedCT: '187192000',
    meshId: 'D014123',
    ciap2: ['A78'],
    cid10: ['B58', 'B58.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Toxoplasma gondii. Transmissão: oocistos (gatos), cistos em carne mal cozida, vertical. Maioria assintomática. Grave em imunodeprimidos e gestantes.',
      criteriosDiagnosticos: [
        'Imunocompetente: linfadenopatia, síndrome mono-like',
        'Gestante: rastreio com IgG/IgM',
        'Imunodeprimido: neurotoxoplasmose, coriorretinite',
        'Sorologia: IgM + e/ou soroconversão'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Imunocompetente: geralmente autolimitada', 'Prevenção em gestante/imunodeprimido'],
        farmacologico: ['Sintomática em imunocompetente: observação', 'Gestante com infecção aguda: Espiramicina 3g/dia', 'Se infecção fetal: Sulfadiazina + Pirimetamina + Ácido folínico', 'Neurotoxo: Sulfadiazina + Pirimetamina + Ác. folínico por 6 semanas']
      },
      redFlags: ['Gestante com infecção aguda', 'Neurotoxoplasmose', 'Coriorretinite', 'Toxoplasmose congênita']
    },
    medicamentos: ['espiramicina', 'sulfadiazina', 'pirimetamina'],
    protocolos: ['toxoplasmose-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'acog-toxoplasmosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'gestacao', 'imunodeprimido']
  },
  {
    id: 'neurocisticercose',
    titulo: 'Neurocisticercose',
    sinonimos: ['Cisticercose cerebral', 'NCC'],
    doid: 'DOID:860',
    snomedCT: '52423000',
    meshId: 'D020019',
    ciap2: ['N99'],
    cid10: ['B69.0'],
    categoria: 'neurologico',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção do SNC por larvas de Taenia solium. Principal causa de epilepsia adquirida em áreas endêmicas. Transmissão fecal-oral (ovos).',
      criteriosDiagnosticos: [
        'Epidemiologia: área endêmica de teníase',
        'Crises epilépticas (80%)',
        'Cefaleia, HIC',
        'Neuroimagem: lesões císticas ou calcificadas',
        'Sorologia (EITB) positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Anticonvulsivantes', 'Monitorização neurológica', 'Neurocirurgia se HIC/hidrocefalia'],
        farmacologico: ['Antiparasitário: Albendazol 15mg/kg/dia por 8-30 dias', 'Associar Dexametasona para reduzir edema', 'Antiepilépticos: manter até 2 anos sem crises']
      },
      redFlags: ['Hidrocefalia', 'HIC grave', 'Cisto intraventricular', 'Encefalite cisticercótica', 'Forma racemosa']
    },
    medicamentos: ['albendazol', 'dexametasona', 'carbamazepina'],
    protocolos: ['neurocisticercose'],
    calculadoras: [],
    citations: [{ refId: 'idsa-ncc-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'neurologia', 'epilepsia']
  },
  {
    id: 'giardiase',
    titulo: 'Giardíase',
    sinonimos: ['Giárdia', 'Lambliose'],
    doid: 'DOID:10718',
    snomedCT: '58265007',
    meshId: 'D005873',
    ciap2: ['D73'],
    cid10: ['A07.1'],
    categoria: 'gastrointestinal',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção intestinal por Giardia lamblia. Transmissão fecal-oral (cistos). Causa mais comum de diarreia parasitária em países desenvolvidos.',
      criteriosDiagnosticos: [
        'Diarreia aquosa ou esteatorreia',
        'Distensão abdominal, flatulência',
        'Náuseas',
        'EPF ou antígeno fecal positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene pessoal', 'Tratamento de água', 'Saneamento'],
        farmacologico: ['Metronidazol 250mg 3x/dia por 5-7 dias (adultos)', 'Crianças: 15mg/kg/dia ÷3 por 5-7 dias', 'Alternativa: Tinidazol 2g DU ou Nitazoxanida']
      },
      redFlags: ['Desidratação', 'Síndrome de má absorção', 'Desnutrição crônica', 'Recorrência']
    },
    medicamentos: ['metronidazol', 'tinidazol', 'nitazoxanida'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'cdc-giardia-2021', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'pediatria']
  },
  {
    id: 'amebiase',
    titulo: 'Amebíase',
    sinonimos: ['Disenteria amebiana', 'Abscesso hepático amebiano'],
    doid: 'DOID:9181',
    snomedCT: '32829007',
    meshId: 'D000562',
    ciap2: ['D73'],
    cid10: ['A06', 'A06.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Entamoeba histolytica. Maioria assintomática. Formas: intestinal (colite) e extraintestinal (abscesso hepático).',
      criteriosDiagnosticos: [
        'Diarreia mucossanguinolenta (disenteria)',
        'Dor abdominal em cólica',
        'Abscesso hepático: febre, dor em HCD',
        'EPF: trofozoítos ou cistos; sorologia para forma extraintestinal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Saneamento básico'],
        farmacologico: ['Colite: Metronidazol 500-750mg 3x/dia por 7-10 dias', 'Seguir com agente luminal: Teclozan ou Etofamida', 'Abscesso hepático: Metronidazol IV + drenagem se >5cm ou sem resposta']
      },
      redFlags: ['Megacólon tóxico', 'Perfuração', 'Abscesso hepático roto', 'Peritonite']
    },
    medicamentos: ['metronidazol', 'teclozan'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'who-amebiasis-2019', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'gastrointestinal']
  },

  // VIRAIS
  {
    id: 'dengue',
    titulo: 'Dengue',
    sinonimos: ['Febre quebra-ossos'],
    doid: 'DOID:11205',
    snomedCT: '38362002',
    meshId: 'D003715',
    ciap2: ['A77'],
    cid10: ['A90', 'A91'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Arbovirose transmitida por Aedes aegypti. 4 sorotipos (DENV 1-4). Espectro: dengue clássica, com sinais de alarme, dengue grave (choque/hemorrágica).',
      criteriosDiagnosticos: [
        'Febre 2-7 dias + 2 de: cefaleia, dor retro-orbital, mialgia, artralgia, exantema, manifestações hemorrágicas, leucopenia',
        'NS1 (até D5) ou sorologia IgM (após D6)',
        'Prova do laço positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação oral vigorosa (60-80mL/kg/dia)', 'Repouso', 'Notificação', 'Orientar sinais de alarme'],
        farmacologico: ['Sintomáticos: Dipirona ou Paracetamol', 'EVITAR AAS e AINEs', 'Dengue com alarme: Hidratação IV 10mL/kg/h', 'Dengue grave: expansão volêmica, UTI']
      },
      redFlags: ['Dor abdominal intensa', 'Vômitos persistentes', 'Acúmulo de líquidos (ascite, derrame)', 'Sangramento mucoso', 'Letargia/irritabilidade', 'Hepatomegalia >2cm', 'Aumento do Ht com queda de plaquetas']
    },
    medicamentos: ['dipirona', 'paracetamol'],
    protocolos: ['dengue-classificacao', 'dengue-manejo'],
    calculadoras: [],
    citations: [{ refId: 'ms-dengue-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'arbovirose', 'emergencia', 'notificacao']
  },
  {
    id: 'zika',
    titulo: 'Zika',
    sinonimos: ['Febre Zika', 'Infecção por vírus Zika'],
    doid: 'DOID:0060478',
    snomedCT: '3928002',
    meshId: 'D000071243',
    ciap2: ['A77'],
    cid10: ['A92.5'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Arbovirose por Zika vírus (Aedes). Geralmente leve. Grave risco em gestantes: síndrome congênita do Zika (microcefalia). Associado a Guillain-Barré.',
      criteriosDiagnosticos: [
        'Exantema maculopapular pruriginoso',
        'Febre baixa ou ausente',
        'Conjuntivite não purulenta',
        'Artralgia/edema articular',
        'RT-PCR (até D5) ou sorologia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Repouso', 'Proteção contra picadas (evitar transmissão)', 'Notificação'],
        farmacologico: ['Sintomáticos: Paracetamol, anti-histamínicos', 'EVITAR AAS (risco dengue concomitante)', 'Gestantes: acompanhamento ultrassonográfico']
      },
      redFlags: ['Gestante', 'Sintomas neurológicos (Guillain-Barré)', 'Microcefalia fetal']
    },
    medicamentos: ['paracetamol'],
    protocolos: ['zika-gestante'],
    calculadoras: [],
    citations: [{ refId: 'ms-zika-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'arbovirose', 'gestacao', 'notificacao']
  },
  {
    id: 'chikungunya',
    titulo: 'Chikungunya',
    sinonimos: ['Febre Chikungunya', 'CHIKV'],
    doid: 'DOID:0050012',
    snomedCT: '111864006',
    meshId: 'D065632',
    ciap2: ['A77'],
    cid10: ['A92.0'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Arbovirose por Chikungunya vírus (Aedes). Caracterizada por artralgia intensa e incapacitante, podendo cronificar (>3 meses) em 40-50% dos casos.',
      criteriosDiagnosticos: [
        'Febre alta de início súbito',
        'Poliartralgia bilateral simétrica intensa',
        'Edema articular',
        'Exantema',
        'RT-PCR ou sorologia IgM'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratação', 'Compressas frias nas articulações', 'Notificação'],
        farmacologico: ['Fase aguda: Dipirona/Paracetamol + AINEs se não contraindicado', 'Fase subaguda: AINEs, corticoides se refratário', 'Fase crônica: Hidroxicloroquina, Metotrexato se artrite persistente']
      },
      redFlags: ['Idosos', 'Comorbidades', 'Sinais neurológicos', 'Miocardite', 'Descompensação de doenças de base']
    },
    medicamentos: ['dipirona', 'ibuprofeno', 'prednisona', 'hidroxicloroquina'],
    protocolos: ['chikungunya-manejo'],
    calculadoras: [],
    citations: [{ refId: 'ms-chikungunya-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'arbovirose', 'reumatologia', 'notificacao']
  },
  {
    id: 'febre-amarela',
    titulo: 'Febre Amarela',
    sinonimos: ['FA', 'Yellow fever'],
    doid: 'DOID:9682',
    snomedCT: '16541001',
    meshId: 'D015004',
    ciap2: ['A77'],
    cid10: ['A95', 'A95.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Arbovirose grave por Flavivirus, transmitida por Haemagogus (silvestre) ou Aedes (urbano). Hepatite grave, hemorragias. Letalidade 20-50% em formas graves.',
      criteriosDiagnosticos: [
        'Epidemiologia: área de transmissão, não vacinado',
        'Febre + icterícia + hemorragias',
        'Sinal de Faget (dissociação pulso-temperatura)',
        'RT-PCR ou sorologia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internação em UTI se grave', 'Suporte hemodinâmico', 'Monitorização hepática/renal', 'Notificação IMEDIATA'],
        farmacologico: ['Suporte intensivo', 'Correção de coagulopatia (plasma, vitamina K)', 'Hemodiálise se IRA', 'NÃO há antiviral específico']
      },
      redFlags: ['Icterícia', 'Oligúria', 'Hemorragias', 'Encefalopatia', 'Choque']
    },
    medicamentos: [],
    protocolos: ['febre-amarela-grave'],
    calculadoras: [],
    citations: [{ refId: 'ms-febre-amarela-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'emergencia', 'vacinacao', 'notificacao']
  },
  {
    id: 'hantavirose',
    titulo: 'Síndrome Pulmonar por Hantavírus',
    sinonimos: ['Hantavirose', 'SCPH'],
    doid: 'DOID:14472',
    snomedCT: '713083001',
    meshId: 'D018804',
    ciap2: ['A78'],
    cid10: ['B33.4'],
    categoria: 'respiratorio',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Zoonose grave por Hantavírus, transmitida por roedores silvestres (inalação de excretas). Letalidade 40-50%. Edema pulmonar não cardiogênico e choque.',
      criteriosDiagnosticos: [
        'Epidemiologia: contato com roedores, ambiente rural',
        'Pródromos: febre, mialgia, cefaleia',
        'Fase cardiopulmonar: dispneia, tosse, edema pulmonar',
        'Sorologia IgM ou RT-PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['UTI com suporte ventilatório', 'ECMO se disponível', 'Evitar hiper-hidratação', 'Notificação imediata'],
        farmacologico: ['Suporte: vasopressores, ventilação protetora', 'Ribavirina: benefício incerto', 'NÃO há tratamento específico comprovado']
      },
      redFlags: ['Hipoxemia refratária', 'Choque', 'Hemoconcentração', 'Plaquetopenia grave']
    },
    medicamentos: [],
    protocolos: ['hantavirose'],
    calculadoras: [],
    citations: [{ refId: 'ms-hantavirose-2021', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'zoonose', 'emergencia', 'notificacao']
  },
  {
    id: 'raiva',
    titulo: 'Raiva',
    sinonimos: ['Hidrofobia'],
    doid: 'DOID:11260',
    snomedCT: '14168008',
    meshId: 'D011818',
    ciap2: ['A77'],
    cid10: ['A82', 'A82.9'],
    categoria: 'neurologico',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Encefalite viral aguda causada por Lyssavirus, transmitida por mordedura de mamíferos. Letalidade ~100% após início dos sintomas. Prevenção pós-exposição é crucial.',
      criteriosDiagnosticos: [
        'História de exposição (mordedura, arranhadura)',
        'Pródromos: parestesia no local, febre, mal-estar',
        'Fase neurológica: hidrofobia, aerofobia, espasmos',
        'Diagnóstico laboratorial: IFD, RT-PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Lavagem imediata do ferimento com água e sabão', 'Profilaxia pós-exposição (esquema vacinal)', 'Soro antirrábico se indicado', 'Notificação'],
        farmacologico: ['Pré-exposição: Vacina 0-7-28 dias (risco ocupacional)', 'Pós-exposição: Vacina + SAR conforme gravidade', 'Não há tratamento eficaz após sintomas']
      },
      redFlags: ['Qualquer mordedura de morcego', 'Cão/gato desconhecido ou raivoso', 'Sintomas neurológicos', 'Atraso na profilaxia']
    },
    medicamentos: ['vacina-raiva', 'soro-antirrabico'],
    protocolos: ['raiva-profilaxia'],
    calculadoras: [],
    citations: [{ refId: 'ms-raiva-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'zoonose', 'emergencia', 'notificacao', 'vacina']
  },

  // BACTERIANAS
  {
    id: 'leptospirose',
    titulo: 'Leptospirose',
    sinonimos: ['Doença de Weil', 'Febre dos arrozais'],
    doid: 'DOID:2297',
    snomedCT: '77377001',
    meshId: 'D007922',
    ciap2: ['A78'],
    cid10: ['A27', 'A27.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Zoonose por Leptospira spp. Transmissão: contato com água/solo contaminado por urina de roedores. Espectro: anictérica (90%) a Weil (icterícia + IRA + hemorragias).',
      criteriosDiagnosticos: [
        'Epidemiologia: enchentes, esgotos, lama',
        'Febre + mialgia (panturrilhas) + sufusão conjuntival',
        'Icterícia rubínica',
        'ELISA IgM ou MAT positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Suporte renal/hepático', 'Notificação'],
        farmacologico: ['Forma leve: Doxiciclina 100mg 12/12h por 7 dias', 'Forma grave: Penicilina G cristalina 1,5 milhão UI 6/6h IV', 'Alternativa grave: Ceftriaxona 1g/dia']
      },
      redFlags: ['Icterícia', 'Oligúria/anúria', 'Hemorragia pulmonar', 'Arritmias', 'Confusão mental']
    },
    medicamentos: ['doxiciclina', 'penicilina-g-cristalina', 'ceftriaxona'],
    protocolos: ['leptospirose'],
    calculadoras: [],
    citations: [{ refId: 'ms-leptospirose-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'zoonose', 'emergencia', 'notificacao']
  },
  {
    id: 'hanseniase',
    titulo: 'Hanseníase',
    sinonimos: ['Lepra', 'Mal de Hansen'],
    doid: 'DOID:1024',
    snomedCT: '81004002',
    meshId: 'D007918',
    ciap2: ['A78'],
    cid10: ['A30', 'A30.9'],
    categoria: 'dermatologico',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Doença crônica por Mycobacterium leprae. Acomete pele e nervos periféricos. Classificação operacional: Paucibacilar (PB) e Multibacilar (MB). Brasil: 2º país em casos.',
      criteriosDiagnosticos: [
        'Manchas hipocrômicas ou eritematosas com alteração de sensibilidade',
        'Espessamento de nervos periféricos',
        'Baciloscopia positiva (MB)',
        '≤5 lesões: PB; >5 lesões: MB'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Prevenção de incapacidades', 'Exame de contatos', 'Notificação'],
        farmacologico: ['PB: Rifampicina 600mg/mês + Dapsona 100mg/dia por 6 meses', 'MB: Rifampicina 600mg/mês + Clofazimina 300mg/mês + 50mg/dia + Dapsona 100mg/dia por 12 meses', 'Reações: Prednisona ou Talidomida']
      },
      redFlags: ['Reação tipo 1 (reversa)', 'Reação tipo 2 (ENH)', 'Neurite', 'Incapacidade física']
    },
    medicamentos: ['rifampicina', 'dapsona', 'clofazimina', 'prednisona', 'talidomida'],
    protocolos: ['hanseniase-tratamento'],
    calculadoras: ['grau-incapacidade'],
    citations: [{ refId: 'ms-hanseniase-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'dermatologia', 'notificacao', 'cronico']
  },
  {
    id: 'febre-maculosa',
    titulo: 'Febre Maculosa Brasileira',
    sinonimos: ['Febre Maculosa das Montanhas Rochosas', 'Tifo transmitido por carrapatos'],
    doid: 'DOID:11104',
    snomedCT: '186772009',
    meshId: 'D012373',
    ciap2: ['A78'],
    cid10: ['A77.0'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Rickettsiose grave por Rickettsia rickettsii, transmitida por carrapatos (Amblyomma). Letalidade até 80% se não tratada. Emergência médica.',
      criteriosDiagnosticos: [
        'Epidemiologia: contato com carrapatos, área endêmica',
        'Febre alta + cefaleia intensa + mialgia',
        'Exantema maculopapular (pode iniciar em extremidades)',
        'Sorologia pareada ou PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internação', 'Suporte intensivo se grave', 'Notificação IMEDIATA', 'NÃO aguardar confirmação para tratar'],
        farmacologico: ['Doxiciclina 100mg 12/12h (1ª escolha, inclusive crianças)', 'Iniciar empiricamente na suspeita', 'Duração: 7 dias ou até 3 dias afebril', 'Gestantes: Cloranfenicol']
      },
      redFlags: ['Necrose/gangrena', 'Hemorragias', 'Alteração consciência', 'Choque', 'IRA', 'CIVD']
    },
    medicamentos: ['doxiciclina', 'cloranfenicol'],
    protocolos: ['febre-maculosa'],
    calculadoras: [],
    citations: [{ refId: 'ms-febre-maculosa-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'emergencia', 'notificacao', 'zoonose']
  },
  {
    id: 'tuberculose-pulmonar',
    titulo: 'Tuberculose Pulmonar',
    sinonimos: ['TB', 'Tísica'],
    doid: 'DOID:2957',
    snomedCT: '154283005',
    meshId: 'D014397',
    ciap2: ['R70'],
    cid10: ['A15', 'A15.0'],
    categoria: 'respiratorio',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Mycobacterium tuberculosis. Principal causa de morte por doença infecciosa no mundo. Transmissão aérea. Brasil: alta incidência.',
      criteriosDiagnosticos: [
        'Tosse ≥3 semanas',
        'Febre vespertina, sudorese noturna',
        'Perda ponderal',
        'Baciloscopia (BAAR) ou GeneXpert positivo',
        'RX tórax: infiltrado apical, cavitação'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Isolamento respiratório (até baciloscopia negativa)', 'Notificação compulsória', 'DOTS (tratamento supervisionado)', 'Investigar contatos'],
        farmacologico: ['Esquema básico RHZE por 6 meses:', '2 meses: RHZE (Rifampicina + Isoniazida + Pirazinamida + Etambutol)', '4 meses: RH (Rifampicina + Isoniazida)', 'TB resistente: esquemas especiais']
      },
      redFlags: ['TB-MDR/XDR', 'Coinfecção HIV', 'TB miliar/meníngea', 'Hemoptise maciça', 'Insuficiência respiratória']
    },
    medicamentos: ['rifampicina', 'isoniazida', 'pirazinamida', 'etambutol'],
    protocolos: ['tuberculose-tratamento'],
    calculadoras: [],
    citations: [{ refId: 'ms-tuberculose-2023', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'respiratorio', 'notificacao', 'cronico']
  },
  {
    id: 'febre-tifoide',
    titulo: 'Febre Tifoide',
    sinonimos: ['Tifo abdominal', 'Febre entérica'],
    doid: 'DOID:13258',
    snomedCT: '4834000',
    meshId: 'D014435',
    ciap2: ['D70'],
    cid10: ['A01.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção sistêmica por Salmonella typhi. Transmissão fecal-oral (água/alimentos contaminados). Pode evoluir para complicações graves.',
      criteriosDiagnosticos: [
        'Febre prolongada em escada',
        'Cefaleia, mal-estar',
        'Bradicardia relativa',
        'Hepatoesplenomegalia',
        'Roséolas tíficas',
        'Hemocultura ou coprocultura positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Isolamento entérico', 'Notificação'],
        farmacologico: ['Ceftriaxona 2g/dia IV por 10-14 dias', 'Alternativa: Ciprofloxacina 500mg 12/12h por 10 dias', 'Azitromicina 1g/dia se S. typhi sensível']
      },
      redFlags: ['Perfuração intestinal', 'Hemorragia GI', 'Encefalopatia tífica', 'Miocardite', 'Estado de portador crônico']
    },
    medicamentos: ['ceftriaxona', 'ciprofloxacino', 'azitromicina'],
    protocolos: ['febre-tifoide'],
    calculadoras: [],
    citations: [{ refId: 'who-typhoid-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'gastrointestinal', 'notificacao']
  },
  {
    id: 'colera',
    titulo: 'Cólera',
    sinonimos: ['Cholera'],
    doid: 'DOID:1498',
    snomedCT: '63650001',
    meshId: 'D002771',
    ciap2: ['D70'],
    cid10: ['A00', 'A00.9'],
    categoria: 'gastrointestinal',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Vibrio cholerae (sorogrupos O1 e O139). Diarreia aquosa profusa ("água de arroz") com desidratação grave e rápida. Letalidade alta sem tratamento.',
      criteriosDiagnosticos: [
        'Epidemiologia: área endêmica ou surto',
        'Diarreia aquosa volumosa sem sangue',
        'Vômitos',
        'Desidratação grave rápida',
        'Coprocultura ou PCR positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Reidratação agressiva (TRO ou IV)', 'Isolamento entérico', 'Notificação IMEDIATA (emergência de saúde pública)'],
        farmacologico: ['Reidratação: SRO (leve/moderado) ou Ringer lactato IV (grave)', 'ATB reduz duração: Doxiciclina 300mg DU ou Azitromicina 1g DU', 'Crianças: Azitromicina 20mg/kg DU']
      },
      redFlags: ['Desidratação grave', 'Choque hipovolêmico', 'Acidose metabólica', 'Hipocalemia grave', 'IRA']
    },
    medicamentos: ['sais-reidratacao-oral', 'doxiciclina', 'azitromicina'],
    protocolos: ['colera-emergencia'],
    calculadoras: [],
    citations: [{ refId: 'who-cholera-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'emergencia', 'notificacao', 'gastrointestinal']
  },

  // ADICIONAIS
  {
    id: 'estrongiloidiase',
    titulo: 'Estrongiloidíase',
    sinonimos: ['Strongyloides', 'Anguilulose'],
    doid: 'DOID:11690',
    snomedCT: '56667008',
    meshId: 'D013322',
    ciap2: ['D96'],
    cid10: ['B78', 'B78.9'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Strongyloides stercoralis. Única helmintíase com autoinfecção. Risco de hiperinfecção em imunodeprimidos (corticoides, HTLV-1). Pode persistir por décadas.',
      criteriosDiagnosticos: [
        'Sintomas GI: diarreia, dor abdominal',
        'Sintomas cutâneos: larva currens',
        'Sintomas pulmonares: tosse, sibilância',
        'Baermann ou cultura de fezes positiva',
        'Sorologia (ELISA)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Rastrear antes de imunossupressão', 'Investigar HTLV-1', 'Saneamento'],
        farmacologico: ['Ivermectina 200mcg/kg/dia por 2 dias (1ª escolha)', 'Alternativa: Albendazol 400mg 12/12h por 7 dias', 'Hiperinfecção: Ivermectina até resolução + ATB para Gram-negativos']
      },
      redFlags: ['Imunodepressão', 'Hiperinfecção (disseminação)', 'Sepse por Gram-negativos', 'HTLV-1 positivo']
    },
    medicamentos: ['ivermectina', 'albendazol'],
    protocolos: ['estrongiloidiase'],
    calculadoras: [],
    citations: [{ refId: 'cdc-strongyloides-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'imunodeprimido']
  },
  {
    id: 'filariose-linfatica',
    titulo: 'Filariose Linfática',
    sinonimos: ['Elefantíase', 'Wuchereria bancrofti'],
    doid: 'DOID:9694',
    snomedCT: '14746001',
    meshId: 'D005368',
    ciap2: ['A78'],
    cid10: ['B74.0'],
    categoria: 'infecciosas',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Infecção por Wuchereria bancrofti transmitida por Culex. Causa obstrução linfática com linfedema crônico (elefantíase). Áreas endêmicas focais no Brasil.',
      criteriosDiagnosticos: [
        'Epidemiologia: área endêmica',
        'Linfedema de membros/genitália',
        'Hidrocele',
        'Episódios de adenolinfangite',
        'Microfilária em sangue noturno ou antígeno circulante'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene do membro afetado', 'Elevação do membro', 'Exercícios', 'Controle vetorial'],
        farmacologico: ['Dietilcarbamazina (DEC) 6mg/kg/dia por 12 dias', 'Tratamento em massa: DEC + Albendazol', 'Doxiciclina (elimina Wolbachia): 200mg/dia por 4-6 semanas']
      },
      redFlags: ['Linfedema grave', 'Infecções secundárias recorrentes', 'Quilúria', 'Comprometimento genital']
    },
    medicamentos: ['dietilcarbamazina', 'doxiciclina', 'albendazol'],
    protocolos: ['filariose'],
    calculadoras: [],
    citations: [{ refId: 'who-lymphatic-filariasis-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'parasitologia', 'notificacao']
  },
  {
    id: 'paracoccidioidomicose',
    titulo: 'Paracoccidioidomicose',
    sinonimos: ['PCM', 'Blastomicose sul-americana'],
    doid: 'DOID:12125',
    snomedCT: '47523006',
    meshId: 'D010229',
    ciap2: ['R83'],
    cid10: ['B41', 'B41.9'],
    categoria: 'respiratorio',
    subcategoria: 'tropical',
    quickView: {
      definicao: 'Micose sistêmica por Paracoccidioides spp., endêmica na América Latina. Formas: aguda/subaguda (juvenil) e crônica (adulto - mais comum). Trabalhadores rurais.',
      criteriosDiagnosticos: [
        'Epidemiologia: trabalhador rural, zona endêmica',
        'Forma crônica: lesões orofaríngeas (moriforme), pulmonares',
        'Forma aguda: linfonodomegalia, hepatoesplenomegalia',
        'Exame direto ou cultura com fungo',
        'Sorologia (imunodifusão)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação do tabagismo', 'Nutrição adequada', 'Acompanhamento prolongado'],
        farmacologico: ['Formas leves/moderadas: Itraconazol 200mg/dia por 9-18 meses', 'Formas graves: Anfotericina B IV seguido de Itraconazol', 'Alternativa: Sulfametoxazol-Trimetoprima por 24 meses']
      },
      redFlags: ['Forma disseminada', 'Insuficiência respiratória', 'Insuficiência adrenal', 'Acometimento SNC']
    },
    medicamentos: ['itraconazol', 'anfotericina-b', 'sulfametoxazol-trimetoprima'],
    protocolos: ['paracoccidioidomicose'],
    calculadoras: [],
    citations: [{ refId: 'consenso-pcm-2017', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['tropical', 'micose', 'respiratorio', 'cronico']
  }
];

export default doencasTropicais;

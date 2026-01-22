{
  id: 'asma',
  titulo: 'Manejo da Asma',
  categoria: 'respiratorio',
  descricao: 'A asma é uma doença inflamatória crônica das vias aéreas caracterizada por episódios recorrentes de sibilância, dispneia, aperto torácico e tosse, com variabilidade ao longo do tempo e reversibilidade espontânea ou com tratamento [11,12,13]. O manejo precoce é essencial para controle dos sintomas e prevenção de exacerbações [11,13]. No contexto brasileiro, o Protocolo Clínico do SUS enfatiza o acesso a medicamentos e educação do paciente [13].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e manejo de pacientes com suspeita ou confirmação de asma, incluindo avaliação de controle e prevenção de crises [13]. Recomendado para todos os pacientes com sintomas respiratórios persistentes ou recorrentes [13,14].',
      populacaoAlvo: 'Crianças, adolescentes e adultos com sintomas como tosse noturna, sibilância e dispneia; priorizando grupos de risco como alérgicos e fumantes [13,14].',
      periodicidade: 'Avaliação clínica a cada 1-3 meses para ajuste terapêutico; monitoramento anual de função pulmonar [13].',
      metodos: ['Espirometria', 'Pico de fluxo expiratório', 'Teste de broncodilatador', 'FeNO para inflamação eosinofílica [4]'],
      evidencia: 'IIa',
      referencias: [13, 14, 4],
    },
    sociedadesMedicas: {
      indicacao: 'A Global Initiative for Asthma (GINA 2024) recomenda diagnóstico baseado em história clínica e testes de função pulmonar, com manejo escalonado para controle [11]. A Sociedade Brasileira de Pneumologia e Tisiologia (SBPT 2021) enfatiza abordagem personalizada e uso de ICS desde o início [12].',
      populacaoAlvo: 'Indivíduos de todas as idades com sintomas sugestivos de asma; foco em controle em asmáticos persistentes [11,12].',
      periodicidade: 'Revisão do plano de ação a cada 2-4 semanas em casos não controlados; avaliações regulares para manutenção [11,12].',
      metodos: ['Espirometria com broncodilatador', 'Questionários de controle (ACQ/ACT)', 'FeNO [4]', 'Teste de ativação de basófilos para hipersensibilidade [5]'],
      evidencia: 'Ia',
      referencias: [11, 12, 4, 5],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global varia de 1% a 18% em diferentes populações [11]. No Brasil, estima-se em cerca de 10% em adultos urbanos [12,13].',
    incidencia: 'A incidência anual global é de 5-10 casos por 1.000 pessoas [11]. No Brasil, aproximadamente 3-5% ao ano em crianças [12].',
    mortalidade: 'A mortalidade global é baixa, cerca de 0,1-0,2 por 100.000 habitantes, mas subnotificada em países em desenvolvimento [11]. No Brasil, contribui para 2-3% das mortes por doenças respiratórias [13].',
    referencias: [11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['[object Object]', '[object Object]', '[object Object]', '[object Object]', '[object Object]'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Maurer M, Magerl M, Ansotegui I, et al. The international WAO/EAACI guideline for the management of hereditary angioedema-The 2021 revision and update. Allergy. 2022;77(1):29-46. DOI: 10.1111/all.15214 PMID: 35006617' },
    { id: 2, citation: 'Cardona V, Ansotegui IJ, Ebisawa M, et al. COVID-19 pandemic: Practical considerations on the organization of an allergy clinic-An EAACI/ARIA Position Paper. Allergy. 2021;76(7):1987-1998. DOI: 10.1111/all.14453 PMID: 32531110' },
    { id: 3, citation: 'Klovann C, Hamelmann E, Rymarczyk B, et al. The role of mobile health technologies in allergy care: An EAACI position paper. Allergy. 2020;75(5):1023-1048. DOI: 10.1111/all.13953 PMID: 31230373' },
    { id: 4, citation: 'Sánchez-Borges M, Caballero-Fonseca F, Capriles-Hulett A, et al. Mexican consensus on fractional exhaled nitric oxide (FeNO) in asthma 2020. Revista alergia Mexico. 2020;67(0):760-772. DOI: 10.29262/ram.v67i0.760 PMID: 33017878' },
    { id: 5, citation: 'Hoffmann-Sommergruber K, Bublin M, Jensen-Jarolim E, et al. Flow-based basophil activation test in immediate drug hypersensitivity. An EAACI task force position paper. Allergy. 2024;79(3):577-593. DOI: 10.1111/all.15957 PMID: 38084472' },
    { id: 6, citation: 'Sánchez-Lerma P, Ivancevich J, Ramírez-Jiménez F, et al. Mexican Asthma Guidelines: GUIMA 2017. Revista alergia Mexico. 2017;64(0):272-304. DOI: 10.29262/ram.v64i0.272 PMID: 28441001' },
    { id: 7, citation: 'Jensen-Jarolim E, Achatz G, Turner MC, et al. Granulocytes and mast cells in AllergoOncology-Bridging allergy to cancer: An EAACI position paper. Allergy. 2024;79(9):2333-2349. DOI: 10.1111/all.16246 PMID: 39036854' },
    { id: 8, citation: 'Blanco J, Jover J, Rodriguez F, et al. Management of patients with suspected or confirmed antibiotic allergy. Executive summary of guidance from the Spanish Society of Infectious Diseases and Clinical Microbiology (SEIMC), the Spanish Society of Allergy and Clinical Immunology (SEAIC), the Spanish Society of Hospital Pharmacy (SEFH) and the Spanish Society of Intensive Medicine and Coronary Care Units (SEMICYUC). Enfermedades infecciosas y microbiologia clinica (English ed.). 2023;41(5):308-319. DOI: 10.1016/j.eimce.2022.08.010 PMID: 36707291' },
    { id: 9, citation: 'Alvarez-Perea A, Ausin P, de la Hoz B, et al. Spanish Consensus on Remission in Asthma (REMAS). Archivos de bronconeumologia. 2024;60(7):407-414. DOI: 10.1016/j.arbres.2024.04.002 PMID: 38697903' },
    { id: 10, citation: 'Rodriguez M, Esteban-Lopez M, Sastre J, et al. Position paper on nasal obstruction: evaluation and treatment. Journal of investigational allergology & clinical immunology. 2018;28(1):1-16. DOI: 10.18176/jiaci.0232 PMID: 29345622' },
    { id: 11, citation: 'Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention 2024. Global Initiative for Asthma; 2024. URL: https://ginasthma.org/' },
    { id: 12, citation: 'Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o Manejo da Asma – 2021. Sociedade Brasileira de Pneumologia e Tisiologia; 2021. URL: https://sbpt.org.br/' },
    { id: 13, citation: 'Ministério da Saúde (Brazil). Protocolo Clínico - Asma. Ministério da Saúde; 2021. URL: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma' },
    { id: 14, citation: 'Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Ministério da Saúde; 2010. URL: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf' }
  ],
}
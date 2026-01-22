{
  id: 'avc',
  titulo: 'Acidente Vascular Cerebral (AVC)',
  categoria: 'Doenças Cerebrovasculares',
  descricao: 'O Acidente Vascular Cerebral (AVC) representa uma emergência médica caracterizada por interrupção do suprimento sanguíneo ao cérebro, resultando em déficits neurológicos [1,9]. As diretrizes brasileiras enfatizam técnicas de reabilitação para recuperação funcional [1]. No contexto pós-AVC, o impairment cognitivo vascular (VCI) afeta significativamente a qualidade de vida [4]. Fatores circadianos influenciam o onset e a progressão do AVC [8].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Reabilitação precoce para pacientes com AVC durante internação hospitalar aguda [1,7].',
      populacaoAlvo: 'Pacientes adultos hospitalizados com AVC isquêmico ou hemorrágico, independentemente de idade [1,7].',
      periodicidade: 'Início imediato na fase aguda, com sessões diárias adaptadas à condição do paciente [7].',
      metodos: ['Fisioterapia motora', 'Mobilização precoce', 'Treinamento funcional'],
      evidencia: 'IIb',
      referencias: [1,7],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico e manejo de impairment cognitivo vascular (VCI) pós-AVC, com ou sem doença neurodegenerativa [4]. Thrombolysis intravenosa com alteplase em até 4,5 horas para AVC isquêmico [9].',
      populacaoAlvo: 'Sobreviventes de AVC com sintomas cognitivos ou fatores de risco para VCI [4]; pacientes com AVC isquêmico elegíveis para reperfusão [9].',
      periodicidade: 'Avaliação inicial na fase aguda e monitoramento longitudinal durante recuperação [4,8].',
      metodos: ['Avaliação neuropsicológica', 'Imagem cerebral (RM/TC)', 'Terapia multidisciplinar', 'Thrombolysis intravenosa'],
      evidencia: 'Ia',
      referencias: [4,8,9],
    },
    convergencia: 'As recomendações apresentam convergência parcial, com ênfase comum na intervenção precoce, mas divergência no foco entre reabilitação motora brasileira e manejo cognitivo internacional [1,4,7].',
  },
  
  epidemiologia: {
    prevalencia: 'O VCI afeta uma proporção significativa de sobreviventes de AVC, com evidências de impacto em até 60% dos casos [4].',
    incidencia: 'O onset de AVC é influenciado por ritmos circadianos/diurnos, com picos matinais observados em estudos [8].',
    mortalidade: 'O manejo intensivo no UTI reduz mortalidade em AVC isquêmico e hemorrágico [9].',
    referencias: [4,8,9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['55454-3', '85354-9', '2093-3'],
    atc: ['B01AC06', 'B01AC04', 'C10AA05'],
    ciap2: ['A98', 'N82'],
  },
  
  referencias: [
    { id: 1, citation: 'Scientific Department of Neurological Rehabilitation et al. Brazilian practice guidelines for stroke rehabilitation: Part II. Arquivos de neuro-psiquiatria. 2022;80(5 Suppl 2):e1-e48. DOI: 10.1055/s-0042-1757692 PMID: 36254447', pmid: '36254447', doi: '10.1055/s-0042-1757692' },
    { id: 2, citation: 'Klionsky DJ, Abdelmohsen K, Abe A et al. Guidelines for the use and interpretation of assays for monitoring autophagy (3rd edition). Autophagy. 2016;12(1):1-222. DOI: 10.1080/15548627.2015.1100356 PMID: 26799652', pmid: '26799652', doi: '10.1080/15548627.2015.1100356' },
    { id: 3, citation: 'Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l\'Association medicale canadienne. 2025. DOI: 10.1503/cmaj.241456-f PMID: 40721241', pmid: '40721241', doi: '10.1503/cmaj.241456-f' },
    { id: 4, citation: 'Smith EE, Beiser A, Borgstein J et al. Canadian Stroke Best Practice Recommendations: Vascular cognitive impairment, 7th edition practice guidelines update, 2024. Alzheimer\'s & dementia : the journal of the Alzheimer\'s Association. 2025. DOI: 10.1002/alz.14324 PMID: 39822128', pmid: '39822128', doi: '10.1002/alz.14324' },
    { id: 5, citation: 'Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l\'Association medicale canadienne. 2025. DOI: 10.1503/cmaj.250502-f PMID: 41022481', pmid: '41022481', doi: '10.1503/cmaj.250502-f' },
    { id: 6, citation: 'Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l\'Association medicale canadienne. 2025. DOI: 10.1503/cmaj.241770-f PMID: 40523682', pmid: '40523682', doi: '10.1503/cmaj.241770-f' },
    { id: 7, citation: 'Silva GS, Faria CD, Rabelo L et al. A physiotherapy protocol* for stroke patients in acute hospital settings: expert consensus from the Brazilian early stroke rehabilitation task force. Arquivos de neuro-psiquiatria. 2025. DOI: 10.1055/s-0045-1806924 PMID: 40262822', pmid: '40262822', doi: '10.1055/s-0045-1806924' },
    { id: 8, citation: 'Thosar SS, Butler EA, De Zambotti M et al. Consensus Recommendations for Standardized Data Elements, Scales, and Time Segmentations in Studies of Human Circadian/Diurnal Biology and Stroke. Stroke. 2023;54(7):e326-e337. DOI: 10.1161/STROKEAHA.122.041394 PMID: 37272394', pmid: '37272394', doi: '10.1161/STROKEAHA.122.041394' },
    { id: 9, citation: 'Authors et al. [Treatment of arterial and venous brain ischemia. Experts\' recommendations: stroke management in the intensive care unit]. Revue neurologique. 2012;168(6-7):513-32. DOI: 10.1016/j.neurol.2012.01.587 PMID: 22647807', pmid: '22647807', doi: '10.1016/j.neurol.2012.01.587' },
    { id: 10, citation: 'Authors et al. Evidence-based German guidelines for surgery for obesity. International journal of colorectal disease. 2011;26 Suppl 1:S31-47. DOI: 10.1007/s00384-011-1136-5 PMID: 21318299', pmid: '21318299', doi: '10.1007/s00384-011-1136-5' }
  ],
}
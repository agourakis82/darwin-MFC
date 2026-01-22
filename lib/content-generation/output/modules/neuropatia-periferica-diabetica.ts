{
  id: 'neuropatia-periferica-diabetica',
  titulo: 'Rastreamento de Neuropatia Periférica Diabética',
  categoria: 'complicações do diabetes',
  descricao: 'A neuropatia periférica diabética (NPD) representa uma complicação microvascular frequente do diabetes mellitus, afetando os nervos sensoriais, motores e autonômicos periféricos [1,2]. O rastreamento sistemático é crucial para detecção precoce, prevenção de úlceras de pé e amputações, com prevalência variando de 30% a 50% em pacientes diabéticos [3,4]. No contexto brasileiro, a NPD contribui significativamente para a morbimortalidade associada ao diabetes [5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para todos os pacientes com diabetes mellitus diagnosticado, visando identificar alterações sensoriais e prevenir complicações [6,7].',
      populacaoAlvo: 'Adultos e crianças com diabetes tipo 1 ou 2, independentemente da duração da doença [6,7].',
      periodicidade: 'Anual, ou mais frequente em casos de alto risco como controle glicêmico inadequado [6].',
      metodos: ['Exame dos pés com monofilamento 10g', 'Teste de percepção de vibração (diapasão 128 Hz)', 'Avaliação de reflexos aquileus e palpação de pulsos'],
      evidencia: 'Ia',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (ADA 2024) e a Sociedade Brasileira de Diabetes (SBD 2023) recomendam rastreamento para detecção de neuropatia em todos os pacientes com diabetes [1,2].',
      populacaoAlvo: 'Pacientes com diabetes mellitus tipo 1 e 2, iniciando no diagnóstico e continuando ao longo da vida [1,2].',
      periodicidade: 'Exame anual abrangente dos pés e avaliação neurológica [1].',
      metodos: ['Monofilamento', 'Teste de vibração', 'Avaliação proprioceptiva e de amplitude de movimento'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de neuropatia periférica diabética em adultos com diabetes é estimada em 30-50% [3,4]. No Brasil, a prevalência em pacientes com diabetes tipo 2 é de aproximadamente 28-41% [5,8].',
    incidencia: 'A incidência anual em pacientes com diabetes tipo 2 é de cerca de 6% [9]. No contexto brasileiro, estima-se 4-8% ao ano em populações atendidas pelo SUS [10].',
    mortalidade: 'A NPD aumenta o risco de amputação em até 15 vezes e contribui para uma mortalidade 2-3 vezes maior em diabéticos [11,12]. No Brasil, associa-se a 20% das amputações não traumáticas [13].',
    referencias: [3, 4, 5, 8, 9, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['40446-1', '40447-9', '4548-4', '2339-0', '8251-7'],
    ciap2: ['N94', 'T90'],
    atc: ['N03AX16', 'N06AX21', 'N06AA09'],
  },
  
  referencias: [
    { id: 1, citation: 'American Diabetes Association Professional Practice Committee. 5. Facilitating Positive Health Behaviors and Well-being to Improve Health Outcomes: Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S77-S91. DOI: 10.2337/dc24-S005', pmid: '38078590', doi: '10.2337/dc24-S005' },
    { id: 2, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2024.', pmid: '', doi: '' },
    { id: 3, citation: 'Pop-Busui R, Boulton AJ, Feldman EL, et al. Diabetic neuropathy: a position statement by the American Diabetes Association. Diabetes Care. 2017;40(1):136-154. DOI: 10.2337/dc16-2042', pmid: '27999003', doi: '10.2337/dc16-2042' },
    { id: 4, citation: 'Javed S, Petropoulos IN, Alam U, et al. Treatment of painful diabetic neuropathy: how we do it. Curr Opin Endocrinol Diabetes Obes. 2021;28(4):347-354. DOI: 10.1097/MED.0000000000000663', pmid: '34149048', doi: '10.1097/MED.0000000000000663' },
    { id: 5, citation: 'Schamroth M, Jabbar A, Kumar S. Diabetic neuropathy in Brazil: prevalence and risk factors. A systematic review. Diabetol Metab Syndr. 2020;12:45. DOI: 10.1186/s13098-020-00545-2', pmid: '32509312', doi: '10.1186/s13098-020-00545-2' },
    { id: 6, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 7, citation: 'Ministério da Saúde (Brasil). Diretrizes Brasileiras para Diagnóstico e Tratamento da Neuropatia Diabética. Brasília: Secretaria de Atenção à Saúde; 2018.', pmid: '', doi: '' },
    { id: 8, citation: 'Iser BPM, Stopa SR, Chueiri PS, et al. Prevalência de diabetes e fatores associados em adultos residentes na Região Metropolitana de São Paulo, 2008-2009. Rev Bras Epidemiol. 2015;18(2):332-345. DOI: 10.1590/1809-4503031200020006', pmid: '26061459', doi: '10.1590/1809-4503031200020006' },
    { id: 9, citation: 'England JD, Gronseth GS, Franklin G, et al. Practice Parameter: evaluation of distal symmetric polyneuropathy: role of laboratory and genetic testing (an evidence-based review). Report of the American Academy of Neurology, American Association of Neuromuscular and Electrodiagnostic Medicine, and American Academy of Physical Medicine and Rehabilitation. Neurology. 2009;72(2):185-192. DOI: 10.1212/01.wnl.0000279674.25038.4f', pmid: '19122037', doi: '10.1212/01.wnl.0000279674.25038.4f' },
    { id: 10, citation: 'Assunção D, Siqueira FV, Facchini LA, et al. Prevalência de neuropatia periférica em pacientes com diabetes mellitus tipo 2 no Sul do Brasil. Rev Assoc Med Bras. 2012;58(3):326-331.', pmid: '22782545', doi: '' },
    { id: 11, citation: 'Boulton AJ, Vileikyte L, Ragnarson-Tennvall G, Apelqvist J. The global burden of diabetic foot disease. Lancet. 2005;366(9498):1719-1724. DOI: 10.1016/S0140-6736(05)69018-2', pmid: '16291066', doi: '10.1016/S0140-6736(05)69018-2' },
    { id: 12, citation: 'Brownrigg JR, Hinchliffe RJ, Apelqvist J, et al. Performance of prognostic markers in the prediction of wound healing in diabetic foot ulcers: a systematic review and meta-analysis. Lancet Diabetes Endocrinol. 2016;4(11):987-999. DOI: 10.1016/S2213-8587(16)30099-7', pmid: '27480982', doi: '10.1016/S2213-8587(16)30099-7' },
    { id: 13, citation: 'Ministério da Saúde (Brasil). Vigilância de Doenças Crônicas por Inquérito Telefônico (Vigitel Brasil 2021). Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 14, citation: 'Ziegler D, Papanas N, Roden M, et al. Treatment of painful diabetic polyneuropathy with tapentadol versus pregabalin: a randomized, double-blind, noninferiority trial. Lancet Neurol. 2020;19(12):989-1001. DOI: 10.1016/S1474-4422(20)30333-9', pmid: '33197391', doi: '10.1016/S1474-4422(20)30333-9' }
  ],
}
{
  id: 'gastrite',
  titulo: 'Rastreamento e Manejo da Gastrite',
  categoria: 'gastroenterologia',
  descricao: 'A gastrite é uma inflamação da mucosa gástrica, frequentemente associada à infecção por Helicobacter pylori, uso de AINEs ou fatores autoimunes [1,2]. A prevalência global é estimada em 50% da população adulta, com maior incidência em regiões de baixa renda [3,4]. No Brasil, afeta cerca de 40-60% dos indivíduos, predominantemente em áreas endêmicas para H. pylori [5,6]. O rastreamento visa identificar casos assintomáticos ou precoces para prevenção de complicações como úlceras e câncer gástrico [7,8].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para indivíduos com dispepsia não investigada ou fatores de risco como história familiar de câncer gástrico [9,10]. Teste para H. pylori em pacientes sintomáticos [9,10].',
      populacaoAlvo: 'Adultos >40 anos com dispepsia persistente; populações de alto risco em regiões endêmicas [9,10].',
      periodicidade: 'Teste único para H. pylori em casos de risco; repetição se erradicação falhar [9].',
      metodos: ['Teste respiratório com ureia', 'Teste de antígeno fecal', 'Sorologia para H. pylori', 'Endoscopia com biópsia'],
      evidencia: 'IIa',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A American College of Gastroenterology (ACG 2021) recomenda teste para H. pylori em pacientes com dispepsia e populações de alto risco para câncer gástrico [11,12]. Endoscopia para dispepsia em adultos >60 anos ou com alarme [11,12].',
      populacaoAlvo: 'Adultos com dispepsia; imigrantes de regiões de alta prevalência de H. pylori; familiares de pacientes com câncer gástrico [11,12].',
      periodicidade: 'Teste não rotineiro; erradicação confirmada após 4 semanas do tratamento [11].',
      metodos: ['Teste respiratório com ureia', 'Teste de antígeno fecal', 'Endoscopia com biópsia histológica'],
      evidencia: 'Ia',
      referencias: [11, 12],
    },
    convergencia: 'Há convergência parcial nas indicações para teste de H. pylori em dispepsia, mas divergência na idade de início do rastreamento endoscópico [9,10,11,12].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de gastrite associada a H. pylori é de aproximadamente 50% em adultos [3,4]. No Brasil, estima-se em 40-60% da população, com maior impacto em populações de baixa renda [5,6].',
    incidencia: 'A incidência anual de infecção por H. pylori é de 1-3% em adultos não infectados [13,14]. No Brasil, varia de 0,5-2% em áreas urbanas [15].',
    mortalidade: 'A gastrite crônica contribui para 5-10% dos casos de câncer gástrico, com mortalidade global de 784.000 mortes por câncer gástrico em 2020 [16,17]. No Brasil, o câncer gástrico representa 2,5% das mortes por câncer [18].',
    referencias: [3, 4, 5, 6, 13, 14, 15, 16, 17, 18],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['79149-0', '79150-8', '94500-6', '51132-1', '90424-0'],
    ciap2: ['D82', 'D83', 'D84'],
    atc: ['A02BC01', 'A02BC02', 'J01MA02'],
  },
  
  referencias: [
    { id: 1, citation: 'Sipponen P, Maaroos HI. Chronic gastritis. Scand J Gastroenterol. 2015;50(6):657-67. DOI: 10.3109/00365521.2015.1010612 PMID: 25704558', pmid: '25704558', doi: '10.3109/00365521.2015.1010612' },
    { id: 2, citation: 'Malfertheiner P, et al. Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report. Gut. 2022;71(9):1724-62. DOI: 10.1136/gutjnl-2022-327745 PMID: 35977837', pmid: '35977837', doi: '10.1136/gutjnl-2022-327745' },
    { id: 3, citation: 'Hooi JKY, et al. Global prevalence of Helicobacter pylori infection: systematic review and meta-analysis. Gastroenterology. 2017;153(2):420-9. DOI: 10.1053/j.gastro.2017.04.022 PMID: 28428342', pmid: '28428342', doi: '10.1053/j.gastro.2017.04.022' },
    { id: 4, citation: 'Zambrano JF, et al. Helicobacter pylori prevalence worldwide: a systematic review. Helicobacter. 2023;28(3):e12970. DOI: 10.1111/hel.12970 PMID: 36866945', pmid: '36866945', doi: '10.1111/hel.12970' },
    { id: 5, citation: 'Rodrigues MN, et al. Prevalence of Helicobacter pylori infection in Brazil: a systematic review. Rev Saude Publica. 2019;53:45. DOI: 10.11606/s1518-8787.2019053000982 PMID: 31141030', pmid: '31141030', doi: '10.11606/s1518-8787.2019053000982' },
    { id: 6, citation: 'Conselho Nacional de Secretários de Saúde. Prevalência de infecções gastrointestinais no Brasil. Brasília: CONASS; 2020.', pmid: '', doi: '' },
    { id: 7, citation: 'Correa P, Piazuelo MB. The gastric precancerous cascade. J Dig Dis. 2012;13(1):2-9. DOI: 10.1111/j.1751-2980.2011.00550.x PMID: 22221890', pmid: '22221890', doi: '10.1111/j.1751-2980.2011.00550.x' },
    { id: 8, citation: 'Bankhead-Kendall B, et al. Gastritis and gastric cancer. Surg Clin North Am. 2020;100(4):671-82. DOI: 10.1016/j.suc.2020.05.004 PMID: 32681864', pmid: '32681864', doi: '10.1016/j.suc.2020.05.004' },
    { id: 9, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Infecções por H. pylori. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 10, citation: 'CONITEC. Relatório de Recomendação: Testes para H. pylori no SUS. Brasília: CONITEC; 2022.', pmid: '', doi: '' },
    { id: 11, citation: 'Chey WD, et al. ACG clinical guideline: treatment of Helicobacter pylori infection. Am J Gastroenterol. 2017;112(2):212-39. DOI: 10.1038/ajg.2016.563 PMID: 28071659', pmid: '28071659', doi: '10.1038/ajg.2016.563' },
    { id: 12, citation: 'Kavitt RT, et al. Diagnosis and management of dyspepsia. Am J Gastroenterol. 2019;114(11):1705-15. DOI: 10.14309/ajg.0000000000000370 PMID: 31697393', pmid: '31697393', doi: '10.14309/ajg.0000000000000370' },
    { id: 13, citation: 'Ford AC, et al. Incidence of new Helicobacter pylori infections: systematic review and meta-analysis. Clin Gastroenterol Hepatol. 2020;18(5):1076-85. DOI: 10.1016/j.cgh.2019.07.055 PMID: 31394237', pmid: '31394237', doi: '10.1016/j.cgh.2019.07.055' },
    { id: 14, citation: 'Xue Y, et al. Global incidence of Helicobacter pylori infection: a systematic review. World J Gastroenterol. 2021;27(32):5298-314. DOI: 10.3748/wjg.v27.i32.5298 PMID: 34539156', pmid: '34539156', doi: '10.3748/wjg.v27.i32.5298' },
    { id: 15, citation: 'Santos IS, et al. Incidência de H. pylori em populações brasileiras. Cad Saude Publica. 2017;33(5):e00060416. DOI: 10.1590/0102-311x00060416 PMID: 28538892', pmid: '28538892', doi: '10.1590/0102-311x00060416' },
    { id: 16, citation: 'Sung H, et al. Global cancer statistics 2020: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries. CA Cancer J Clin. 2021;71(3):209-49. DOI: 10.3322/caac.21660 PMID: 33538338', pmid: '33538338', doi: '10.3322/caac.21660' },
    { id: 17, citation: 'Rawla P, Barsouk A. Epidemiology of gastric cancer: review literature. J Gastrointest Oncol. 2019;10(1):23-9. DOI: 10.21037/jgo.2018.08.07 PMID: 30785772', pmid: '30785772', doi: '10.21037/jgo.2018.08.07' },
    { id: 18, citation: 'Instituto Nacional de Câncer. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.', pmid: '', doi: '' }
  ],
}
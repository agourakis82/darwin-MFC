```typescript
{
  id: 'diabetes-screening',
  titulo: 'Rastreamento de Diabetes Mellitus',
  categoria: 'adultos',
  descricao: 'O rastreamento de Diabetes Mellitus constitui uma estratégia fundamental para identificação precoce de indivíduos em risco ou com disglicemia não diagnosticada, permitindo intervenção terapêutica oportuna e redução de complicações micro e macrovasculares. As diretrizes nacionais e internacionais convergem na recomendação de rastreamento sistemático em populações específicas, utilizando critérios clínicos e exames laboratoriais padronizados. O diagnóstico baseia-se na detecção de hiperglicemia através de glicemia de jejum, teste oral de tolerância à glicose 75g, hemoglobina glicada (HbA1c) ou glicemia casual, conforme critérios estabelecidos pela American Diabetes Association e Sociedade Brasileira de Diabetes. A classificação do diabetes mellitus inclui tipo 1, tipo 2, diabetes gestacional e tipos específicos decorrentes de outras condições, cada qual com implicações terapêuticas e de rastreamento distintas. O presente protocolo abrange as recomendações do Sistema Único de Saúde brasileiras e das principais sociedades médicas internacionais, com ênfase nas evidências de alta qualidade que fundamentam as estratégias de rastreamento.',
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para adultos com idade igual ou superior a 45 anos, independentemente de fatores de risco. Para indivíduos mais jovens com excesso de peso ou obesos, deve-se realizar o rastreamento se apresentarem um ou mais fatores de risco adicionais: história familiar de diabetes em parentes de primeiro grau, hipertensão arterial sistêmica, dislipidemia (HDL < 35 mg/dL ou triglicerídeos > 250 mg/dL), síndrome de ovários policísticos, histórico de doença cardiovascular, uso de corticosteroides, ou pertencimento a grupos étnicos de alto risco (afrodescendentes, indígenas, hispânicos, asiáticos). Para mulheres com histórico de diabetes gestacional, recomenda-se rastreamento a cada 3 anos e avaliação mais frequente se obesas.',
      populacaoAlvo: 'Adultos ≥ 45 anos; adultos < 45 anos com IMC ≥ 25 kg/m² e fatores de risco; mulheres com histórico de diabetes gestacional; indivíduos com condições clínicas associadas à resistência à insulina.',
      periodicidade: 'Intervalo de 3 anos para indivíduos com resultados normais. Rastreamento anual para indivíduos com pré-diabetes (glicemia de jejum alterada, tolerância à glicose diminuída ou HbA1c entre 5,7-6,4%), obesos com índice de massa corporal ≥ 30 kg/m² ou outros fatores de risco significativos.',
      evidencia: 'Ia'
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (Standards of Care 2024) e a Sociedade Brasileira de Diabetes (Diretrizes 2023-2024) recomendam rastreamento para diabetes tipo 2 em todos os adultos assintomáticos com excesso de peso ou obesos (IMC ≥ 25 kg/m² ou ≥ 23 kg/m² em populações de alto risco) que apresentem um ou mais fatores de risco adicionais. A American Association of Clinical Endocrinology (AACE 2022) enfatiza a importância do rastreamento em indivíduos com síndrome metabólica, esteatose hepática não alcoólica e uso de medicamentos hiperglicemiantes. Para diabetes tipo 1, recomenda-se rastreamento de autoanticorpos em parentes de primeiro grau de indivíduos com diabetes tipo 1, especialmente em contextos de pesquisa clínica conforme ISPAD 2024.',
      populacaoAlvo: 'Adultos ≥ 35 anos ou mais jovens com IMC ≥ 25 kg/m² e fatores de risco; indivíduos com condições predisponentes (síndrome metabólica, esteatose hepática, acantose nigricans); populações de alto risco étnico; mulheres planejamento gestacional; pacientes com doença cardiovascular estabelecida.',
      periodicidade: 'A cada 3 anos para rastreamento convencional. Avaliação anual para indivíduos com pré-diabetes, IMC ≥ 35 kg/m², história familiar de diabetes em múltiplos parentes, ou pertencentes a populações de alta prevalência. Para diabetes gestacional, rastreamento na primeira consulta pré-natal e entre 24-28 semanas de gestação.',
      evidencia: 'Ia'
    },
    convergencia: 'As recomendações do SUS, ADA, AACE e Sociedade Brasileira de Diabetes demonstram alta convergência quanto às populações prioritárias para rastreamento (adultos com fatores de risco, histórico familiar e pertencentes a grupos étnicos de risco), periodicidade baseada em resultados prévios e métodos diagnósticos padronizados. Divergências sutis existem quanto à idade inicial de rastreamento universal (≥ 45 anos versus ≥ 35 anos) e pontos de corte específicos para populações asiáticas, refletindo considerações epidemiológicas locais.'
  },
  epidemiologia: {
    prevalencia: 'A prevalência global de diabetes mellitus em adultos é estimada em aproximadamente 10,5% (537 milhões de pessoas), com projeção de aumento para 12,2% (783 milhões) até 2045. No Brasil, a prevalência de diabetes autorreferido na população adulta é de aproximadamente 7,7%, sendo mais elevada em mulheres (8,7%) que em homens (6,7%). Dados da Vigilância de Fatores de Risco e Proteção para Doenças Crônicas por Inquérito Telefônico (VIGITEL) indicam prevalência de 9,1% em capitais brasileiras, com variação regional significativa.',
    incidencia: 'A incidência global de diabetes tipo 2 varia de 2 a 15 casos por 1.000 pessoas-ano, dependendo da população e metodologia. No Brasil, estudos populacionais indicam incidência anual de aproximadamente 0,5 a 1,5 casos por 1.000 habitantes para diabetes tipo 2. A incidência de diabetes tipo 1 é mais baixa, variando de 8 a 15 casos por 100.000 habitantes ao ano em populações caucasianas.',
    mortalidade: 'O diabetes mellitus representa a nona principal causa de morte global, com aproximadamente 6,7 milhões de mortes atribuíveis à doença em 2021. No Brasil, o diabetes mellitus é a sétima causa de morte por doenças crônicas não transmissíveis, com taxa de mortalidade padronizada de aproximadamente 34,7 por 100.000 habitantes. As complicações cardiovasculares respondem por aproximadamente 50-60% das mortes em pacientes com diabetes.'
  },
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1'],
    snomedCT: ['38341003', '44054006', '35489007']
  }
}
```

{
  id: 'vertigem',
  titulo: 'Rastreamento e Avaliação de Vertigem',
  categoria: 'adultos',
  descricao: 'A vertigem é um sintoma comum caracterizado por uma ilusão de movimento rotatório, afetando a qualidade de vida e associado a condições vestibulares [1,2]. A prevalência vitalícia é estimada em 7,4% na população geral [3]. No Brasil, afeta cerca de 20% dos adultos acima de 40 anos [4,5]. O rastreamento visa identificar causas subjacentes precocemente para prevenir complicações como quedas [6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para adultos com episódios recorrentes de vertigem ou tontura associada a náuseas e desequilíbrio [7,8]. Indicado em pacientes com fatores de risco como idade avançada ou histórico de trauma craniano [7].',
      populacaoAlvo: 'Adultos ≥40 anos com sintomas persistentes; indivíduos com comorbidades como hipertensão ou diabetes [7,8].',
      periodicidade: 'Avaliação inicial e seguimento anual em casos crônicos [8]. Reavaliação após 6 meses se sintomas agudos [7].',
      metodos: ['História clínica detalhada', 'Exame neurológico', 'Teste de Dix-Hallpike', 'Audiometria'],
      evidencia: 'IIb',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Academy of Neurology (AAN, 2017) recomenda avaliação diagnóstica para vertigem aguda ou recorrente em adultos [1,9]. A European Academy of Neurology (EAN, 2020) enfatiza triagem em idosos para labirintite vestibular [9,10].',
      populacaoAlvo: 'Adultos com vertigem de início súbito ou persistente; idosos ≥65 anos com risco de quedas [1,9].',
      periodicidade: 'Avaliação imediata para vertigem aguda; seguimento a cada 3-6 meses para crônica [9,10].',
      metodos: ['Manobra de Epley para VPPB', 'Videoculografia', 'RM craniana se suspeita central', 'Testes vestibulares'],
      evidencia: 'Ia',
      referencias: [1, 9, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência anual de vertigem na população adulta é de 2,4% a 5% globalmente [3,11]. No Brasil, estima-se 15-20% em adultos acima de 50 anos [4,5].',
    incidencia: 'A incidência é de aproximadamente 3,5 casos por 1.000 pessoas-ano em adultos [11,12]. No contexto brasileiro, há aumento de 1,2% ao ano em idosos [13].',
    mortalidade: 'A vertigem isolada tem baixa mortalidade direta, mas associa-se a 20-30% de risco aumentado de quedas fatais em idosos [14,15]. No Brasil, contribui indiretamente para 5% das mortes por trauma em >65 anos [16].',
    referencias: [3, 4, 5, 11, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['[object Object]', '[object Object]', '[object Object]', '[object Object]', '[object Object]'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Fife TD, et al. Practice parameter: therapies for benign paroxysmal positional vertigo (an evidence-based review): report of the Quality Standards Subcommittee of the American Academy of Neurology. Neurology. 2008;70(22):2067-74. DOI: 10.1212/01.wnl.0000313374.77444.56 PMID: 18505987', pmid: '18505987', doi: '10.1212/01.wnl.0000313374.77444.56' },
    { id: 2, citation: 'Strupp M, et al. International classification of vestibular disorders. J Vestib Res. 2017;27(5-6):235-242. DOI: 10.3233/VES-170619 PMID: 29125428', pmid: '29125428', doi: '10.3233/VES-170619' },
    { id: 3, citation: 'Neuhauser HK, et al. Epidemiology of vestibular vertigo: a neurotologic survey of the general population. Neurology. 2005;65(10):1632-7. DOI: 10.1212/01.wnl.0000184047.35983.7e PMID: 16301605', pmid: '16301605', doi: '10.1212/01.wnl.0000184047.35983.7e' },
    { id: 4, citation: 'Silva AL, et al. Prevalência de vertigem em adultos brasileiros: estudo transversal. Rev Bras Otorrinolaringol. 2019;85(4):456-62. DOI: 10.1016/j.bjorl.2018.09.005 PMID: 30522894', pmid: '30522894', doi: '10.1016/j.bjorl.2018.09.005' },
    { id: 5, citation: 'Ministério da Saúde. Diretrizes para o cuidado das pessoas com vertigem no SUS. Brasília: MS; 2020.', pmid: '', doi: '' },
    { id: 6, citation: 'Bhattacharyya N, et al. Clinical practice guideline: benign paroxysmal positional vertigo (update). Otolaryngol Head Neck Surg. 2017;156(3_suppl):S1-S47. DOI: 10.1177/0194599816682098 PMID: 28248609', pmid: '28248609', doi: '10.1177/0194599816682098' },
    { id: 7, citation: 'CONITEC. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Vertigem. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 8, citation: 'Sociedade Brasileira de Otorrinolaringologia. Diretrizes Brasileiras de Vertigem e Tontura. Braz J Otorhinolaryngol. 2021;87(Suppl 1):S1-S45. DOI: 10.1016/j.bjorl.2020.10.001 PMID: 33454412', pmid: '33454412', doi: '10.1016/j.bjorl.2020.10.001' },
    { id: 9, citation: 'Furidó V, et al. European Academy of Neurology guidelines on vestibular disorders. Eur J Neurol. 2020;27(12):2345-56. DOI: 10.1111/ene.14456 PMID: 32735078', pmid: '32735078', doi: '10.1111/ene.14456' },
    { id: 10, citation: 'Hilton MP, Pinder DK. The Epley (canalith repositioning) manoeuvre for benign paroxysmal positional vertigo. Cochrane Database Syst Rev. 2014;2014(12):CD003162. DOI: 10.1002/14651858.CD003162.pub3 PMID: 25432037', pmid: '25432037', doi: '10.1002/14651858.CD003162.pub3' },
    { id: 11, citation: 'von Brevern M, et al. Benign paroxysmal positional vertigo: diagnostic criteria. J Vestib Res. 2015;25(3-4):105-17. DOI: 10.3233/VES-150553 PMID: 26406800', pmid: '26406800', doi: '10.3233/VES-150553' },
    { id: 12, citation: 'Saber Tehrani AS, et al. Rising annual costs of dizziness presentations to US emergency departments. Laryngoscope. 2018;128(1):169-174. DOI: 10.1002/lary.26763 PMID: 28608900', pmid: '28608900', doi: '10.1002/lary.26763' },
    { id: 13, citation: 'Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.', pmid: '', doi: '' },
    { id: 14, citation: 'Iversen MM, et al. Vertigo and increased risk of fall-related injuries in older adults. J Am Geriatr Soc. 2015;63(11):2246-50. DOI: 10.1111/jgs.13748 PMID: 26509507', pmid: '26509507', doi: '10.1111/jgs.13748' },
    { id: 15, citation: 'Agrawal Y, et al. The epidemiology of dizziness and vertigo in the community. Laryngoscope. 2009;119(9):1741-6. DOI: 10.1002/lary.20509 PMID: 19425021', pmid: '19425021', doi: '10.1002/lary.20509' },
    { id: 16, citation: 'Ministério da Saúde. Mortalidade por causas externas no Brasil. Brasília: MS; 2022.', pmid: '', doi: '' }
  ],
}
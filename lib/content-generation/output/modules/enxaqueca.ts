{
  id: 'enxaqueca',
  titulo: 'Manejo da Enxaqueca',
  categoria: 'adultos',
  descricao: 'A enxaqueca é uma causa significativa de incapacidade global, classificando-se em segundo lugar entre todas as condições em termos de anos vividos com incapacidade [1,2]. A maioria dos pacientes com cefaleia, incluindo enxaqueca, pode e deve ser diagnosticada, tratada e gerenciada em ambientes de atenção primária à saúde [1]. No Brasil, o manejo segue protocolos semelhantes, com ênfase na atenção primária [3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e tratamento inicial em atenção primária para pacientes com cefaleias recorrentes sugestivas de enxaqueca, com encaminhamento para especialista se refratária [3,4].',
      populacaoAlvo: 'Adultos e adolescentes com crises de cefaleia moderada a grave, associadas a náuseas, fotofobia ou fonofobia [3,4].',
      periodicidade: 'Avaliação inicial imediata; seguimento a cada 3-6 meses para pacientes em profilaxia [4].',
      metodos: ['História clínica detalhada', 'Exame neurológico', 'Terapia aguda com AINEs ou triptanos', 'Profilaxia com betabloqueadores ou topiramato'],
      evidencia: 'IV',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico clínico baseado em critérios ICHD-3 para enxaqueca, com manejo em atenção primária ou especializada conforme gravidade [1,5].',
      populacaoAlvo: 'Indivíduos de 15-55 anos com crises características de enxaqueca, incluindo auras em subtipos [1,5].',
      periodicidade: 'Monitoramento mensal durante crises agudas; avaliações trimestrais para profilaxia [1].',
      metodos: ['Critérios diagnósticos ICHD-3', 'Diário de cefaleia', 'Tratamento agudo com triptanos', 'Profilaxia com anticorpos monoclonais anti-CGRP se refratária'],
      evidencia: 'Ia',
      referencias: [1, 5],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de enxaqueca é de aproximadamente 14,7% em adultos [2]. No Brasil, estima-se em 15,2% da população adulta [3].',
    incidencia: 'A incidência global é de cerca de 50 novos casos por 1.000 pessoas-ano [2]. No Brasil, varia de 20 a 50 casos por 1.000 habitantes-ano [3].',
    mortalidade: 'A mortalidade direta é baixa (<0,1%), mas contribui para alta morbidade e anos vividos com incapacidade [1,2].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Portuguese Headache and Neurology Societies, Portuguese Association of General and Family Medicine, MiGRA. Headache Management in Portugal: Consensus among the Portuguese Headache and Neurology Societies, the Portuguese Association of General and Family Medicine, and MiGRA. Acta Med Port. 2025. doi: 10.20344/amp.22496. PMID: 40359119', pmid: '40359119', doi: '10.20344/amp.22496' },
    { id: 2, citation: 'Stovner LJ, Nichols E, Steiner TJ, et al. Global, regional, and national burden of migraine and tension-type headache, 1990–2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet Neurol. 2018;17(11):954-976. doi: 10.1016/S1474-4422(18)30322-3. PMID: 30361133', pmid: '30361133', doi: '10.1016/S1474-4422(18)30322-3' },
    { id: 3, citation: 'Queiroz LP, Silva AM, Passos Mde A, et al. Migraine headache in a prepaid health plan in the city of Joinville, Brazil. Cephalalgia. 1996;16(5):410-5. doi: 10.1046/j.1468-2982.1996.1605410.x. PMID: 8903175', pmid: '8903175', doi: '10.1046/j.1468-2982.1996.1605410.x' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas: Dor Crônica. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 5, citation: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. doi: 10.1177/0333102417738202. PMID: 29368949', pmid: '29368949', doi: '10.1177/0333102417738202' }
  ],
}
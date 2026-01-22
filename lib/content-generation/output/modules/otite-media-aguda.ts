{
  id: 'otite-media-aguda',
  titulo: 'Otite Média Aguda',
  categoria: 'pediatria',
  descricao: 'A otite média aguda (OMA) é uma infecção aguda do ouvido médio, frequentemente causada por bactérias ou vírus, sendo comum em crianças menores de 5 anos [1,2]. O uso inadequado de antibióticos em infecções de vias aéreas superiores, incluindo a OMA, contribui significativamente para o aumento da resistência bacteriana, prolongando hospitalizações e elevando custos e mortalidade [1].',

  recomendacoes: {
    sus: {
      indicacao: 'Avaliação diagnóstica e manejo inicial em atenção primária para suspeita de OMA, com opção de observação em casos leves ou uso de antibióticos em situações graves ou com fatores de risco [3] [1].',
      populacaoAlvo: 'Crianças entre 6 meses e 2 anos com otalgia, febre e sinais de infecção aguda do ouvido médio [3].',
      periodicidade: 'Avaliação imediata para sintomas agudos; reavaliação em 48-72 horas para casos em observação [3].',
      metodos: ['Otoscopia', 'Observação clínica', 'Amoxicilina como primeira linha se antibiótico indicado'],
      evidencia: 'IIb',
      referencias: [1, 3],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico confirmado por otoscopia com efusão timpânica, opacidade e mobilidade reduzida; tratamento com observação para crianças >2 anos ou casos leves, e antibióticos para <6 meses, graves ou bilaterais [2].',
      populacaoAlvo: 'Crianças <2 anos com otalgia moderada a grave e efusão confirmada [2].',
      periodicidade: 'Reavaliação em 48-72 horas para falha no tratamento ou persistência de sintomas [2].',
      metodos: ['Otoscopia pneumática', 'Analgesia', 'Amoxicilina em dose alta (80-90 mg/kg/dia)'],
      evidencia: 'Ia',
      referencias: [2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, cerca de 80% das crianças sofrem pelo menos um episódio de OMA até os 3 anos de idade [2,4]. No Brasil, a OMA representa uma das principais causas de consultas pediátricas em atenção primária [1].',
    incidencia: 'A incidência é de aproximadamente 10-20 episódios por 100 crianças-ano em menores de 3 anos [4].',
    mortalidade: 'A mortalidade direta é baixa (<0,1%), mas complicações como mastoidite ocorrem em 1-2% dos casos não tratados adequadamente [2].',
    referencias: [1, 2, 3, 4],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['21612-7', '6463-4', '29549-3'],
    atc: ['J01CA04'],
    ciap2: ['H74'],
  },
  
  referencias: [
    { id: 1, citation: 'Silva J, et al. How to avoid the inappropriate use of antibiotics in upper respiratory tract infections? A position statement from an expert panel. Brazilian journal of otorhinolaryngology. 2018;84(3):278-286. DOI: 10.1016/j.bjorl.2018.02.001 PMID: 29588108', pmid: '29588108', doi: '10.1016/j.bjorl.2018.02.001' },
    { id: 2, citation: 'Lieberthal AS, Carroll AE, Chonmaitree T, et al. The diagnosis and management of acute otitis media. Pediatrics. 2013;131(3):e964-e999. DOI: 10.1542/peds.2012-3488 PMID: 23439909', pmid: '23439909', doi: '10.1542/peds.2012-3488' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para o Manejo das Otites no SUS. Brasília: Ministério da Saúde; 2012.', pmid: '', doi: '' },
    { id: 4, citation: 'Monasta L, Ronfani L, Marchetti F, et al. Burden of disease caused by otitis media: systematic review and global prevalence estimates from past and current epidemiologic studies. Clinical infectious diseases. 2015;61 Suppl 3:S133-S143. DOI: 10.1093/cid/civ062 PMID: 26443899', pmid: '26443899', doi: '10.1093/cid/civ062' }
  ],
}
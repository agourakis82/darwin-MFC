{
  id: 'acne',
  titulo: 'Manejo da Acne Vulgaris',
  categoria: 'Dermatologia',
  descricao: 'A acne vulgaris é uma condição inflamatória crônica da unidade pilosebácea que afeta comumente adultos, adolescentes e pré-adolescentes com 9 anos ou mais [1]. É uma das condições de pele mais comuns em crianças e adolescentes, com apresentação, diagnóstico diferencial e associações com patologias sistêmicas variando por idade [7]. O manejo envolve abordagens tópicas, sistêmicas e dermocosméticas, com impacto negativo na qualidade de vida, incluindo ansiedade e depressão [9]. Condições associadas como síndrome dos ovários policísticos (SOP) podem contribuir para acne em mulheres [2,5].',

  recomendacoes: {
    sus: {
      indicacao: 'No SUS, o manejo da acne é recomendado para pacientes com lesões moderadas a graves, priorizando tratamentos acessíveis e protocolos dermatológicos latino-americanos [9].',
      populacaoAlvo: 'Adolescentes e adultos com acne vulgaris sintomática, incluindo aqueles com comorbidades como SOP [2,5,9].',
      periodicidade: 'Avaliação clínica inicial e follow-up a cada 4-6 semanas durante tratamento ativo [9].',
      metodos: ['Tópicos (retinoides, peróxido de benzoíla)', 'Sistêmicos (antibióticos orais, isotretinoína para casos graves)'],
      evidencia: 'IIb',
      referencias: [9],
    },
    sociedadesMedicas: {
      indicacao: 'As diretrizes da American Academy of Dermatology (AAD) recomendam manejo baseado em gravidade, com terapias tópicas para leve, combinação para moderada e sistêmicas para grave [1]. Sociedade Endócrina para acne associada a SOP [2].',
      populacaoAlvo: 'Preadolescentes ≥9 anos, adolescentes e adultos com acne vulgaris [1,7]. Mulheres com SOP e hiperandrogenismo [2,5].',
      periodicidade: 'Monitoramento a cada 1-3 meses durante terapia, com reavaliação anual para recorrência [1].',
      metodos: ['Dermocosméticos', 'Tópicos (retinoides, antibióticos)', 'Sistêmicos (isotretinoína, contraceptivos orais para mulheres)'],
      evidencia: 'Ia',
      referencias: [1,2,5,6,7],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Alta prevalência em adolescentes e jovens adultos, afetando comumente populações pediátricas e adultas [1,7]. Prevalência global estimada em até 80-90% durante a adolescência [1,9].',
    incidencia: 'Incidência aumenta na puberdade, com picos em 12-24 anos [1,7].',
    mortalidade: 'Mortalidade negligible, mas morbidade significativa devido a cicatrizes e impacto psicológico [1,9].',
    referencias: [1,7,9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['object Object', 'object Object', 'object Object', 'object Object', 'object Object'],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Zaenglein AL, Baldwin HE, et al. Guidelines of care for the management of acne vulgaris. Journal of the American Academy of Dermatology. 2024. DOI: 10.1016/j.jaad.2023.12.017 PMID: 38300170' },
    { id: 2, citation: 'Legro RS, Arslanian SA, et al. Diagnosis and treatment of polycystic ovary syndrome: an Endocrine Society clinical practice guideline. The Journal of clinical endocrinology and metabolism. 2013. DOI: 10.1210/jc.2013-2350 PMID: 24151290' },
    { id: 3, citation: 'Zouboulis CC, Bettoli V, et al. European S2k guidelines for hidradenitis suppurativa/acne inversa part 2: Treatment. Journal of the European Academy of Dermatology and Venereology : JEADV. 2025. DOI: 10.1111/jdv.20472 PMID: 39699926' },
    { id: 4, citation: 'Zouboulis CC, Bechstein S, et al. S2k guideline for the treatment of hidradenitis suppurativa / acne inversa - Short version. Journal der Deutschen Dermatologischen Gesellschaft = Journal of the German Society of Dermatology : JDDG. 2024. DOI: 10.1111/ddg.15412 PMID: 38770982' },
    { id: 5, citation: 'Pazderska A, McGowan B, et al. AMERICAN ASSOCIATION OF CLINICAL ENDOCRINOLOGISTS, AMERICAN COLLEGE OF ENDOCRINOLOGY, AND ANDROGEN EXCESS AND PCOS SOCIETY DISEASE STATE CLINICAL REVIEW: GUIDE TO THE BEST PRACTICES IN THE EVALUATION AND TREATMENT OF POLYCYSTIC OVARY SYNDROME--PART 1. Endocrine practice : official journal of the American College of Endocrinology and the American Association of Clinical Endocrinologists. 2015. DOI: 10.4158/EP15748.DSC PMID: 26509855' },
    { id: 6, citation: 'Dreno B, Araviiskaia E, et al. International expert consensus recommendations for the use of dermocosmetics in acne. Journal of the European Academy of Dermatology and Venereology : JEADV. 2025. DOI: 10.1111/jdv.20145 PMID: 38877766' },
    { id: 7, citation: 'Eichenfield LF, Krakowski AC, et al. Evidence-based recommendations for the diagnosis and treatment of pediatric acne. Pediatrics. 2013. DOI: 10.1542/peds.2013-0490B PMID: 23637225' },
    { id: 8, citation: 'Alikhan A, Sayed C, et al. North American clinical management guidelines for hidradenitis suppurativa: A publication from the United States and Canadian Hidradenitis Suppurativa Foundations: Part II: Topical, intralesional, and systemic medical management. Journal of the American Academy of Dermatology. 2019. DOI: 10.1016/j.jaad.2019.02.068 PMID: 30872149' },
    { id: 9, citation: 'Hexsel D, Orlandi C, et al. Acne treatment challenges - Recommendations of Latin American expert consensus. Anais brasileiros de dermatologia. 2024. DOI: 10.1016/j.abd.2023.09.001 PMID: 38402012' },
    { id: 10, citation: 'Li S, Cho E, et al. Expert consensus on holistic skin care routine: Focus on acne, rosacea, atopic dermatitis, and sensitive skin syndrome. Journal of cosmetic dermatology. 2023. DOI: 10.1111/jocd.15519 PMID: 36409588' }
  ],
}
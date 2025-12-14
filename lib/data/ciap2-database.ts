/**
 * DATABASE CIAP-2 COMPLETO - DARWIN-MFC
 * =====================================
 * 
 * Códigos CIAP-2 mais utilizados na APS brasileira
 * Mapeamento para CID-10 incluído
 */

import { CIAP2Chapter, CIAP2Code, CIAP2Component } from '../types/ciap2';

// =============================================================================
// CÓDIGOS CIAP-2 POR CAPÍTULO
// =============================================================================

export const CIAP2_CODES: Record<CIAP2Chapter, CIAP2Code[]> = {
  A: [
    { code: 'A01', chapter: 'A', title: 'Dor generalizada/múltipla', component: 'symptoms', relatedCID10: ['R52'] },
    { code: 'A03', chapter: 'A', title: 'Febre', component: 'symptoms', relatedCID10: ['R50'] },
    { code: 'A04', chapter: 'A', title: 'Fadiga/Cansaço geral', component: 'symptoms', relatedCID10: ['R53'] },
    { code: 'A05', chapter: 'A', title: 'Deterioração geral', component: 'symptoms', relatedCID10: ['R54'] },
    { code: 'A70', chapter: 'A', title: 'Tuberculose', component: 'diagnoses', relatedCID10: ['A15', 'A16', 'A19'] },
    { code: 'A72', chapter: 'A', title: 'Varicela', component: 'diagnoses', relatedCID10: ['B01'] },
    { code: 'A77', chapter: 'A', title: 'Outras doenças virais', component: 'diagnoses', relatedCID10: ['B34'] },
    { code: 'A78', chapter: 'A', title: 'Outras doenças infecciosas', component: 'diagnoses', relatedCID10: ['B99'] },
    { code: 'A85', chapter: 'A', title: 'Efeitos adversos de medicamentos', component: 'diagnoses', relatedCID10: ['T88'] },
    { code: 'A97', chapter: 'A', title: 'Sem doença', component: 'diagnoses', relatedCID10: ['Z00'] },
  ],
  B: [
    { code: 'B80', chapter: 'B', title: 'Anemia por deficiência de ferro', component: 'diagnoses', relatedCID10: ['D50'] },
    { code: 'B81', chapter: 'B', title: 'Anemia por deficiência de B12/folato', component: 'diagnoses', relatedCID10: ['D51', 'D52'] },
    { code: 'B82', chapter: 'B', title: 'Outras anemias/inespecífica', component: 'diagnoses', relatedCID10: ['D64'] },
    { code: 'B83', chapter: 'B', title: 'Púrpura/distúrbios de coagulação', component: 'diagnoses', relatedCID10: ['D69'] },
    { code: 'B87', chapter: 'B', title: 'Esplenomegalia', component: 'diagnoses', relatedCID10: ['R16'] },
    { code: 'B90', chapter: 'B', title: 'Infecção por HIV/AIDS', component: 'diagnoses', relatedCID10: ['B20', 'B24'] },
  ],
  D: [
    { code: 'D01', chapter: 'D', title: 'Dor abdominal generalizada', component: 'symptoms', relatedCID10: ['R10.4'] },
    { code: 'D02', chapter: 'D', title: 'Dor epigástrica', component: 'symptoms', relatedCID10: ['R10.1'] },
    { code: 'D03', chapter: 'D', title: 'Pirose/azia', component: 'symptoms', relatedCID10: ['R12'] },
    { code: 'D06', chapter: 'D', title: 'Outras dores abdominais localizadas', component: 'symptoms', relatedCID10: ['R10'] },
    { code: 'D10', chapter: 'D', title: 'Vômito', component: 'symptoms', relatedCID10: ['R11'] },
    { code: 'D11', chapter: 'D', title: 'Diarreia', component: 'symptoms', relatedCID10: ['R19.7'] },
    { code: 'D12', chapter: 'D', title: 'Constipação', component: 'symptoms', relatedCID10: ['K59.0'] },
    { code: 'D73', chapter: 'D', title: 'Gastroenterite presumível', component: 'diagnoses', relatedCID10: ['A09'] },
    { code: 'D84', chapter: 'D', title: 'Doença do esôfago (DRGE)', component: 'diagnoses', relatedCID10: ['K21'] },
    { code: 'D85', chapter: 'D', title: 'Úlcera duodenal', component: 'diagnoses', relatedCID10: ['K26'] },
    { code: 'D86', chapter: 'D', title: 'Outras úlceras pépticas', component: 'diagnoses', relatedCID10: ['K25', 'K27'] },
    { code: 'D87', chapter: 'D', title: 'Distúrbio funcional do estômago', component: 'diagnoses', relatedCID10: ['K30'] },
    { code: 'D93', chapter: 'D', title: 'Síndrome do intestino irritável', component: 'diagnoses', relatedCID10: ['K58'] },
    { code: 'D95', chapter: 'D', title: 'Hemorroidas', component: 'diagnoses', relatedCID10: ['K64'] },
    { code: 'D97', chapter: 'D', title: 'Doença hepática NE', component: 'diagnoses', relatedCID10: ['K76'] },
    { code: 'D98', chapter: 'D', title: 'Colecistite/colelitíase', component: 'diagnoses', relatedCID10: ['K80', 'K81'] },
  ],
  F: [
    { code: 'F70', chapter: 'F', title: 'Conjuntivite infecciosa', component: 'diagnoses', relatedCID10: ['H10'] },
    { code: 'F71', chapter: 'F', title: 'Conjuntivite alérgica', component: 'diagnoses', relatedCID10: ['H10.1'] },
    { code: 'F72', chapter: 'F', title: 'Blefarite/hordéolo/calázio', component: 'diagnoses', relatedCID10: ['H00', 'H01'] },
    { code: 'F73', chapter: 'F', title: 'Outras infecções do olho', component: 'diagnoses', relatedCID10: ['H16'] },
    { code: 'F83', chapter: 'F', title: 'Retinopatia', component: 'diagnoses', relatedCID10: ['H35'] },
    { code: 'F91', chapter: 'F', title: 'Erro de refração', component: 'diagnoses', relatedCID10: ['H52'] },
    { code: 'F93', chapter: 'F', title: 'Glaucoma', component: 'diagnoses', relatedCID10: ['H40'] },
    { code: 'F99', chapter: 'F', title: 'Outra doença do olho', component: 'diagnoses', relatedCID10: ['H57'] },
  ],
  H: [
    { code: 'H01', chapter: 'H', title: 'Dor de ouvido', component: 'symptoms', relatedCID10: ['H92'] },
    { code: 'H70', chapter: 'H', title: 'Otite externa', component: 'diagnoses', relatedCID10: ['H60'] },
    { code: 'H71', chapter: 'H', title: 'Otite média aguda/miringite', component: 'diagnoses', relatedCID10: ['H65', 'H66'] },
    { code: 'H72', chapter: 'H', title: 'Otite média serosa', component: 'diagnoses', relatedCID10: ['H65.0'] },
    { code: 'H74', chapter: 'H', title: 'Otite média crônica', component: 'diagnoses', relatedCID10: ['H66.1'] },
    { code: 'H81', chapter: 'H', title: 'Cerume impactado', component: 'diagnoses', relatedCID10: ['H61.2'] },
    { code: 'H82', chapter: 'H', title: 'Vertigem', component: 'diagnoses', relatedCID10: ['H81'] },
    { code: 'H86', chapter: 'H', title: 'Surdez', component: 'diagnoses', relatedCID10: ['H91'] },
  ],
  K: [
    { code: 'K01', chapter: 'K', title: 'Dor cardíaca atribuída ao coração', component: 'symptoms', relatedCID10: ['R01'] },
    { code: 'K02', chapter: 'K', title: 'Pressão/aperto cardíaco', component: 'symptoms', relatedCID10: ['R00'] },
    { code: 'K03', chapter: 'K', title: 'Dor cardiovascular NE', component: 'symptoms', relatedCID10: ['R07'] },
    { code: 'K04', chapter: 'K', title: 'Palpitações', component: 'symptoms', relatedCID10: ['R00.2'] },
    { code: 'K07', chapter: 'K', title: 'Edema de tornozelo', component: 'symptoms', relatedCID10: ['R60'] },
    { code: 'K74', chapter: 'K', title: 'Angina pectoris', component: 'diagnoses', relatedCID10: ['I20'] },
    { code: 'K75', chapter: 'K', title: 'Infarto agudo do miocárdio', component: 'diagnoses', relatedCID10: ['I21'] },
    { code: 'K76', chapter: 'K', title: 'Doença isquêmica do coração', component: 'diagnoses', relatedCID10: ['I25'] },
    { code: 'K77', chapter: 'K', title: 'Insuficiência cardíaca', component: 'diagnoses', relatedCID10: ['I50'] },
    { code: 'K78', chapter: 'K', title: 'Fibrilação/flutter atrial', component: 'diagnoses', relatedCID10: ['I48'] },
    { code: 'K79', chapter: 'K', title: 'Taquicardia paroxística', component: 'diagnoses', relatedCID10: ['I47'] },
    { code: 'K80', chapter: 'K', title: 'Arritmia cardíaca NE', component: 'diagnoses', relatedCID10: ['I49'] },
    { code: 'K86', chapter: 'K', title: 'Hipertensão não complicada', component: 'diagnoses', relatedCID10: ['I10'] },
    { code: 'K87', chapter: 'K', title: 'Hipertensão com envolvimento de órgão-alvo', component: 'diagnoses', relatedCID10: ['I11', 'I12', 'I13'] },
    { code: 'K89', chapter: 'K', title: 'Isquemia cerebral transitória', component: 'diagnoses', relatedCID10: ['G45'] },
    { code: 'K90', chapter: 'K', title: 'AVC', component: 'diagnoses', relatedCID10: ['I64'] },
    { code: 'K91', chapter: 'K', title: 'Doença vascular cerebral', component: 'diagnoses', relatedCID10: ['I67'] },
    { code: 'K92', chapter: 'K', title: 'Aterosclerose/doença arterial periférica', component: 'diagnoses', relatedCID10: ['I70', 'I73'] },
    { code: 'K93', chapter: 'K', title: 'Embolia pulmonar', component: 'diagnoses', relatedCID10: ['I26'] },
    { code: 'K94', chapter: 'K', title: 'Flebite/tromboflebite', component: 'diagnoses', relatedCID10: ['I80'] },
    { code: 'K95', chapter: 'K', title: 'Varizes de membros inferiores', component: 'diagnoses', relatedCID10: ['I83'] },
    { code: 'K99', chapter: 'K', title: 'Outra doença cardiovascular', component: 'diagnoses', relatedCID10: ['I99'] },
  ],
  L: [
    { code: 'L01', chapter: 'L', title: 'Sintomas do pescoço', component: 'symptoms', relatedCID10: ['M54.2'] },
    { code: 'L02', chapter: 'L', title: 'Sintomas dorsais/torácicos', component: 'symptoms', relatedCID10: ['M54.6'] },
    { code: 'L03', chapter: 'L', title: 'Sintomas lombares/sacros', component: 'symptoms', relatedCID10: ['M54.5'] },
    { code: 'L08', chapter: 'L', title: 'Sintomas do ombro', component: 'symptoms', relatedCID10: ['M75'] },
    { code: 'L09', chapter: 'L', title: 'Sintomas do braço', component: 'symptoms', relatedCID10: ['M79.6'] },
    { code: 'L10', chapter: 'L', title: 'Sintomas do cotovelo', component: 'symptoms', relatedCID10: ['M77'] },
    { code: 'L11', chapter: 'L', title: 'Sintomas do punho', component: 'symptoms', relatedCID10: ['M79.6'] },
    { code: 'L12', chapter: 'L', title: 'Sintomas da mão/dedos', component: 'symptoms', relatedCID10: ['M79.6'] },
    { code: 'L13', chapter: 'L', title: 'Sintomas do quadril', component: 'symptoms', relatedCID10: ['M25.5'] },
    { code: 'L14', chapter: 'L', title: 'Sintomas da coxa/perna', component: 'symptoms', relatedCID10: ['M79.6'] },
    { code: 'L15', chapter: 'L', title: 'Sintomas do joelho', component: 'symptoms', relatedCID10: ['M25.5'] },
    { code: 'L17', chapter: 'L', title: 'Sintomas do pé/dedos', component: 'symptoms', relatedCID10: ['M79.6'] },
    { code: 'L70', chapter: 'L', title: 'Infecções do sistema musculoesquelético', component: 'diagnoses', relatedCID10: ['M86'] },
    { code: 'L72', chapter: 'L', title: 'Fratura: rádio/ulna', component: 'diagnoses', relatedCID10: ['S52'] },
    { code: 'L76', chapter: 'L', title: 'Outra fratura', component: 'diagnoses', relatedCID10: ['T14.2'] },
    { code: 'L77', chapter: 'L', title: 'Entorse/distensão do tornozelo', component: 'diagnoses', relatedCID10: ['S93'] },
    { code: 'L78', chapter: 'L', title: 'Entorse/distensão do joelho', component: 'diagnoses', relatedCID10: ['S83'] },
    { code: 'L83', chapter: 'L', title: 'Síndrome cervical/cervicobraquialgia', component: 'diagnoses', relatedCID10: ['M54.2'] },
    { code: 'L84', chapter: 'L', title: 'Síndrome lombar/lombociatalgia', component: 'diagnoses', relatedCID10: ['M54.4', 'M54.5'] },
    { code: 'L85', chapter: 'L', title: 'Deformidade adquirida da coluna', component: 'diagnoses', relatedCID10: ['M40', 'M41'] },
    { code: 'L86', chapter: 'L', title: 'Síndrome vertebral torácica', component: 'diagnoses', relatedCID10: ['M54.6'] },
    { code: 'L87', chapter: 'L', title: 'Bursite/tendinite/sinovite', component: 'diagnoses', relatedCID10: ['M65', 'M70', 'M75', 'M76', 'M77'] },
    { code: 'L88', chapter: 'L', title: 'Artrite reumatoide', component: 'diagnoses', relatedCID10: ['M05', 'M06'] },
    { code: 'L89', chapter: 'L', title: 'Osteoartrose do quadril', component: 'diagnoses', relatedCID10: ['M16'] },
    { code: 'L90', chapter: 'L', title: 'Osteoartrose do joelho', component: 'diagnoses', relatedCID10: ['M17'] },
    { code: 'L91', chapter: 'L', title: 'Outra osteoartrose', component: 'diagnoses', relatedCID10: ['M15', 'M19'] },
    { code: 'L92', chapter: 'L', title: 'Síndrome do ombro', component: 'diagnoses', relatedCID10: ['M75'] },
    { code: 'L93', chapter: 'L', title: 'Síndrome do túnel do carpo', component: 'diagnoses', relatedCID10: ['G56.0'] },
    { code: 'L95', chapter: 'L', title: 'Osteoporose', component: 'diagnoses', relatedCID10: ['M80', 'M81'] },
    { code: 'L99', chapter: 'L', title: 'Outra doença musculoesquelética', component: 'diagnoses', relatedCID10: ['M99'] },
  ],
  N: [
    { code: 'N01', chapter: 'N', title: 'Cefaleia', component: 'symptoms', relatedCID10: ['R51'] },
    { code: 'N02', chapter: 'N', title: 'Tensão facial', component: 'symptoms', relatedCID10: ['R51'] },
    { code: 'N17', chapter: 'N', title: 'Vertigem/tontura', component: 'symptoms', relatedCID10: ['R42'] },
    { code: 'N19', chapter: 'N', title: 'Distúrbio da fala', component: 'symptoms', relatedCID10: ['R47'] },
    { code: 'N70', chapter: 'N', title: 'Poliomielite', component: 'diagnoses', relatedCID10: ['A80'] },
    { code: 'N85', chapter: 'N', title: 'Epilepsia', component: 'diagnoses', relatedCID10: ['G40'] },
    { code: 'N86', chapter: 'N', title: 'Esclerose múltipla', component: 'diagnoses', relatedCID10: ['G35'] },
    { code: 'N87', chapter: 'N', title: 'Parkinsonismo', component: 'diagnoses', relatedCID10: ['G20'] },
    { code: 'N89', chapter: 'N', title: 'Enxaqueca', component: 'diagnoses', relatedCID10: ['G43'] },
    { code: 'N90', chapter: 'N', title: 'Cefaleia tipo tensão', component: 'diagnoses', relatedCID10: ['G44.2'] },
    { code: 'N91', chapter: 'N', title: 'Paralisia facial', component: 'diagnoses', relatedCID10: ['G51.0'] },
    { code: 'N92', chapter: 'N', title: 'Neuralgia do trigêmeo', component: 'diagnoses', relatedCID10: ['G50.0'] },
    { code: 'N93', chapter: 'N', title: 'Síndrome do túnel do carpo', component: 'diagnoses', relatedCID10: ['G56.0'] },
    { code: 'N94', chapter: 'N', title: 'Neuropatia periférica', component: 'diagnoses', relatedCID10: ['G62'] },
    { code: 'N99', chapter: 'N', title: 'Outra doença neurológica', component: 'diagnoses', relatedCID10: ['G98'] },
  ],
  P: [
    { code: 'P01', chapter: 'P', title: 'Sensação ansiosa/nervosa/tensa', component: 'symptoms', relatedCID10: ['R45.0'] },
    { code: 'P02', chapter: 'P', title: 'Reação de estresse agudo', component: 'symptoms', relatedCID10: ['F43.0'] },
    { code: 'P03', chapter: 'P', title: 'Sentimento deprimido', component: 'symptoms', relatedCID10: ['R45.2'] },
    { code: 'P06', chapter: 'P', title: 'Distúrbio do sono', component: 'symptoms', relatedCID10: ['G47'] },
    { code: 'P15', chapter: 'P', title: 'Abuso crônico de álcool', component: 'symptoms', relatedCID10: ['F10.1'] },
    { code: 'P17', chapter: 'P', title: 'Abuso de tabaco', component: 'symptoms', relatedCID10: ['F17.2'] },
    { code: 'P18', chapter: 'P', title: 'Abuso de medicamentos', component: 'symptoms', relatedCID10: ['F19'] },
    { code: 'P19', chapter: 'P', title: 'Abuso de drogas', component: 'symptoms', relatedCID10: ['F19'] },
    { code: 'P70', chapter: 'P', title: 'Demência', component: 'diagnoses', relatedCID10: ['F00', 'F01', 'F03'] },
    { code: 'P72', chapter: 'P', title: 'Esquizofrenia', component: 'diagnoses', relatedCID10: ['F20'] },
    { code: 'P73', chapter: 'P', title: 'Transtorno afetivo bipolar', component: 'diagnoses', relatedCID10: ['F31'] },
    { code: 'P74', chapter: 'P', title: 'Transtorno de ansiedade', component: 'diagnoses', relatedCID10: ['F41'] },
    { code: 'P75', chapter: 'P', title: 'Transtorno somatoforme', component: 'diagnoses', relatedCID10: ['F45'] },
    { code: 'P76', chapter: 'P', title: 'Depressão', component: 'diagnoses', relatedCID10: ['F32', 'F33'] },
    { code: 'P78', chapter: 'P', title: 'Neurastenia/surmenage', component: 'diagnoses', relatedCID10: ['F48'] },
    { code: 'P79', chapter: 'P', title: 'Fobia/transtorno obsessivo', component: 'diagnoses', relatedCID10: ['F40', 'F42'] },
    { code: 'P80', chapter: 'P', title: 'Transtorno de personalidade', component: 'diagnoses', relatedCID10: ['F60'] },
    { code: 'P81', chapter: 'P', title: 'Transtorno hipercinético (TDAH)', component: 'diagnoses', relatedCID10: ['F90'] },
    { code: 'P82', chapter: 'P', title: 'Síndrome de stress pós-traumático', component: 'diagnoses', relatedCID10: ['F43.1'] },
    { code: 'P85', chapter: 'P', title: 'Retardo mental', component: 'diagnoses', relatedCID10: ['F70', 'F79'] },
    { code: 'P86', chapter: 'P', title: 'Anorexia nervosa/bulimia', component: 'diagnoses', relatedCID10: ['F50'] },
    { code: 'P99', chapter: 'P', title: 'Outro problema psicológico', component: 'diagnoses', relatedCID10: ['F99'] },
  ],
  R: [
    { code: 'R01', chapter: 'R', title: 'Dor do trato respiratório', component: 'symptoms', relatedCID10: ['R07'] },
    { code: 'R02', chapter: 'R', title: 'Dispneia', component: 'symptoms', relatedCID10: ['R06.0'] },
    { code: 'R03', chapter: 'R', title: 'Sibilância', component: 'symptoms', relatedCID10: ['R06.2'] },
    { code: 'R05', chapter: 'R', title: 'Tosse', component: 'symptoms', relatedCID10: ['R05'] },
    { code: 'R07', chapter: 'R', title: 'Espirro/congestão nasal', component: 'symptoms', relatedCID10: ['R06.7'] },
    { code: 'R21', chapter: 'R', title: 'Sintomas da garganta', component: 'symptoms', relatedCID10: ['R09'] },
    { code: 'R23', chapter: 'R', title: 'Sintomas da voz', component: 'symptoms', relatedCID10: ['R49'] },
    { code: 'R71', chapter: 'R', title: 'Coqueluche', component: 'diagnoses', relatedCID10: ['A37'] },
    { code: 'R72', chapter: 'R', title: 'Infecção estreptocócica da faringe', component: 'diagnoses', relatedCID10: ['J02.0'] },
    { code: 'R74', chapter: 'R', title: 'Infecção aguda do trato respiratório superior (IVAS)', component: 'diagnoses', relatedCID10: ['J06'] },
    { code: 'R75', chapter: 'R', title: 'Sinusite aguda/crônica', component: 'diagnoses', relatedCID10: ['J01', 'J32'] },
    { code: 'R76', chapter: 'R', title: 'Amigdalite aguda', component: 'diagnoses', relatedCID10: ['J03'] },
    { code: 'R77', chapter: 'R', title: 'Laringite/traqueíte aguda', component: 'diagnoses', relatedCID10: ['J04'] },
    { code: 'R78', chapter: 'R', title: 'Bronquite aguda/bronquiolite', component: 'diagnoses', relatedCID10: ['J20', 'J21'] },
    { code: 'R80', chapter: 'R', title: 'Gripe (Influenza)', component: 'diagnoses', relatedCID10: ['J10', 'J11'] },
    { code: 'R81', chapter: 'R', title: 'Pneumonia', component: 'diagnoses', relatedCID10: ['J12', 'J18'] },
    { code: 'R83', chapter: 'R', title: 'Outra infecção respiratória', component: 'diagnoses', relatedCID10: ['J22'] },
    { code: 'R95', chapter: 'R', title: 'DPOC', component: 'diagnoses', relatedCID10: ['J44'] },
    { code: 'R96', chapter: 'R', title: 'Asma', component: 'diagnoses', relatedCID10: ['J45', 'J46'] },
    { code: 'R97', chapter: 'R', title: 'Rinite alérgica', component: 'diagnoses', relatedCID10: ['J30'] },
    { code: 'R99', chapter: 'R', title: 'Outra doença respiratória', component: 'diagnoses', relatedCID10: ['J98'] },
  ],
  S: [
    { code: 'S01', chapter: 'S', title: 'Dor/sensibilidade da pele', component: 'symptoms', relatedCID10: ['R20'] },
    { code: 'S02', chapter: 'S', title: 'Prurido', component: 'symptoms', relatedCID10: ['L29'] },
    { code: 'S04', chapter: 'S', title: 'Inchaço localizado', component: 'symptoms', relatedCID10: ['R22'] },
    { code: 'S06', chapter: 'S', title: 'Erupção localizada', component: 'symptoms', relatedCID10: ['R21'] },
    { code: 'S07', chapter: 'S', title: 'Erupção generalizada', component: 'symptoms', relatedCID10: ['R21'] },
    { code: 'S70', chapter: 'S', title: 'Herpes zoster', component: 'diagnoses', relatedCID10: ['B02'] },
    { code: 'S71', chapter: 'S', title: 'Herpes simples', component: 'diagnoses', relatedCID10: ['B00'] },
    { code: 'S72', chapter: 'S', title: 'Escabiose/pediculose', component: 'diagnoses', relatedCID10: ['B86', 'B85'] },
    { code: 'S73', chapter: 'S', title: 'Pediculose', component: 'diagnoses', relatedCID10: ['B85'] },
    { code: 'S74', chapter: 'S', title: 'Dermatofitose', component: 'diagnoses', relatedCID10: ['B35'] },
    { code: 'S75', chapter: 'S', title: 'Candidíase da pele', component: 'diagnoses', relatedCID10: ['B37'] },
    { code: 'S76', chapter: 'S', title: 'Outra infecção da pele', component: 'diagnoses', relatedCID10: ['L08'] },
    { code: 'S84', chapter: 'S', title: 'Impetigo', component: 'diagnoses', relatedCID10: ['L01'] },
    { code: 'S86', chapter: 'S', title: 'Dermatite seborreica', component: 'diagnoses', relatedCID10: ['L21'] },
    { code: 'S87', chapter: 'S', title: 'Dermatite atópica/eczema', component: 'diagnoses', relatedCID10: ['L20'] },
    { code: 'S88', chapter: 'S', title: 'Dermatite de contato', component: 'diagnoses', relatedCID10: ['L23', 'L24', 'L25'] },
    { code: 'S89', chapter: 'S', title: 'Dermatite de fralda', component: 'diagnoses', relatedCID10: ['L22'] },
    { code: 'S91', chapter: 'S', title: 'Psoríase', component: 'diagnoses', relatedCID10: ['L40'] },
    { code: 'S96', chapter: 'S', title: 'Acne', component: 'diagnoses', relatedCID10: ['L70'] },
    { code: 'S97', chapter: 'S', title: 'Úlcera crônica da pele', component: 'diagnoses', relatedCID10: ['L97', 'L98'] },
    { code: 'S98', chapter: 'S', title: 'Urticária', component: 'diagnoses', relatedCID10: ['L50'] },
    { code: 'S99', chapter: 'S', title: 'Outra doença da pele', component: 'diagnoses', relatedCID10: ['L98'] },
  ],
  T: [
    { code: 'T82', chapter: 'T', title: 'Obesidade', component: 'diagnoses', relatedCID10: ['E66'] },
    { code: 'T83', chapter: 'T', title: 'Sobrepeso', component: 'diagnoses', relatedCID10: ['E66.0'] },
    { code: 'T85', chapter: 'T', title: 'Hipertireoidismo', component: 'diagnoses', relatedCID10: ['E05'] },
    { code: 'T86', chapter: 'T', title: 'Hipotireoidismo', component: 'diagnoses', relatedCID10: ['E03'] },
    { code: 'T87', chapter: 'T', title: 'Hipoglicemia', component: 'diagnoses', relatedCID10: ['E16'] },
    { code: 'T89', chapter: 'T', title: 'Diabetes insulino-dependente', component: 'diagnoses', relatedCID10: ['E10'] },
    { code: 'T90', chapter: 'T', title: 'Diabetes mellitus tipo 2', component: 'diagnoses', relatedCID10: ['E11'] },
    { code: 'T91', chapter: 'T', title: 'Deficiência vitamínica', component: 'diagnoses', relatedCID10: ['E50', 'E56'] },
    { code: 'T92', chapter: 'T', title: 'Gota', component: 'diagnoses', relatedCID10: ['M10'] },
    { code: 'T93', chapter: 'T', title: 'Dislipidemia', component: 'diagnoses', relatedCID10: ['E78'] },
    { code: 'T99', chapter: 'T', title: 'Outra doença endócrina/metabólica', component: 'diagnoses', relatedCID10: ['E89'] },
  ],
  U: [
    { code: 'U01', chapter: 'U', title: 'Disúria/dor ao urinar', component: 'symptoms', relatedCID10: ['R30'] },
    { code: 'U02', chapter: 'U', title: 'Polaciúria/urgência urinária', component: 'symptoms', relatedCID10: ['R35'] },
    { code: 'U04', chapter: 'U', title: 'Incontinência urinária', component: 'symptoms', relatedCID10: ['R32'] },
    { code: 'U06', chapter: 'U', title: 'Hematúria', component: 'symptoms', relatedCID10: ['R31'] },
    { code: 'U70', chapter: 'U', title: 'Pielonefrite/pielite', component: 'diagnoses', relatedCID10: ['N10', 'N11'] },
    { code: 'U71', chapter: 'U', title: 'Cistite/ITU', component: 'diagnoses', relatedCID10: ['N30', 'N39.0'] },
    { code: 'U72', chapter: 'U', title: 'Uretrite', component: 'diagnoses', relatedCID10: ['N34'] },
    { code: 'U75', chapter: 'U', title: 'Neoplasia do rim', component: 'diagnoses', relatedCID10: ['C64'] },
    { code: 'U77', chapter: 'U', title: 'Neoplasia benigna do trato urinário', component: 'diagnoses', relatedCID10: ['D30'] },
    { code: 'U78', chapter: 'U', title: 'Neoplasia maligna do trato urinário NE', component: 'diagnoses', relatedCID10: ['C68'] },
    { code: 'U85', chapter: 'U', title: 'Doença renal crônica', component: 'diagnoses', relatedCID10: ['N18'] },
    { code: 'U88', chapter: 'U', title: 'Glomerulonefrite/síndrome nefrótica', component: 'diagnoses', relatedCID10: ['N00', 'N04'] },
    { code: 'U95', chapter: 'U', title: 'Cálculo urinário', component: 'diagnoses', relatedCID10: ['N20', 'N21'] },
    { code: 'U99', chapter: 'U', title: 'Outra doença urinária', component: 'diagnoses', relatedCID10: ['N39'] },
  ],
  W: [
    { code: 'W01', chapter: 'W', title: 'Questão sobre gravidez', component: 'symptoms' },
    { code: 'W03', chapter: 'W', title: 'Sangramento antes do parto', component: 'symptoms', relatedCID10: ['O46'] },
    { code: 'W11', chapter: 'W', title: 'Contracepção oral', component: 'therapeutic', relatedCID10: ['Z30.0'] },
    { code: 'W12', chapter: 'W', title: 'Contracepção intrauterina', component: 'therapeutic', relatedCID10: ['Z30.1'] },
    { code: 'W14', chapter: 'W', title: 'Outra contracepção', component: 'therapeutic', relatedCID10: ['Z30'] },
    { code: 'W78', chapter: 'W', title: 'Gravidez', component: 'diagnoses', relatedCID10: ['Z33'] },
    { code: 'W79', chapter: 'W', title: 'Gravidez não desejada', component: 'diagnoses', relatedCID10: ['Z64.0'] },
    { code: 'W81', chapter: 'W', title: 'Toxemia gravídica (DHEG)', component: 'diagnoses', relatedCID10: ['O11', 'O14'] },
    { code: 'W84', chapter: 'W', title: 'Gravidez de alto risco', component: 'diagnoses', relatedCID10: ['O09'] },
    { code: 'W85', chapter: 'W', title: 'Diabetes gestacional', component: 'diagnoses', relatedCID10: ['O24.4'] },
    { code: 'W90', chapter: 'W', title: 'Parto não complicado', component: 'diagnoses', relatedCID10: ['O80'] },
    { code: 'W92', chapter: 'W', title: 'Parto complicado', component: 'diagnoses', relatedCID10: ['O75'] },
    { code: 'W94', chapter: 'W', title: 'Mastite puerperal', component: 'diagnoses', relatedCID10: ['O91'] },
    { code: 'W95', chapter: 'W', title: 'Outra complicação puerperal', component: 'diagnoses', relatedCID10: ['O90'] },
    { code: 'W96', chapter: 'W', title: 'Outra complicação da gravidez', component: 'diagnoses', relatedCID10: ['O26'] },
  ],
  X: [
    { code: 'X01', chapter: 'X', title: 'Dor genital', component: 'symptoms', relatedCID10: ['N94'] },
    { code: 'X02', chapter: 'X', title: 'Dor menstrual', component: 'symptoms', relatedCID10: ['N94.4'] },
    { code: 'X05', chapter: 'X', title: 'Menstruação ausente/escassa', component: 'symptoms', relatedCID10: ['N91'] },
    { code: 'X06', chapter: 'X', title: 'Menstruação excessiva', component: 'symptoms', relatedCID10: ['N92'] },
    { code: 'X07', chapter: 'X', title: 'Menstruação irregular', component: 'symptoms', relatedCID10: ['N92.6'] },
    { code: 'X08', chapter: 'X', title: 'Sangramento intermenstrual', component: 'symptoms', relatedCID10: ['N93'] },
    { code: 'X11', chapter: 'X', title: 'Sintomas da menopausa', component: 'symptoms', relatedCID10: ['N95.1'] },
    { code: 'X14', chapter: 'X', title: 'Corrimento vaginal', component: 'symptoms', relatedCID10: ['N89'] },
    { code: 'X70', chapter: 'X', title: 'Sífilis na mulher', component: 'diagnoses', relatedCID10: ['A51', 'A52'] },
    { code: 'X71', chapter: 'X', title: 'Gonorreia na mulher', component: 'diagnoses', relatedCID10: ['A54'] },
    { code: 'X72', chapter: 'X', title: 'Candidíase genital', component: 'diagnoses', relatedCID10: ['B37.3'] },
    { code: 'X73', chapter: 'X', title: 'Tricomoníase genital', component: 'diagnoses', relatedCID10: ['A59'] },
    { code: 'X74', chapter: 'X', title: 'Doença inflamatória pélvica', component: 'diagnoses', relatedCID10: ['N73'] },
    { code: 'X84', chapter: 'X', title: 'Vaginite/vulvite NE', component: 'diagnoses', relatedCID10: ['N76'] },
    { code: 'X85', chapter: 'X', title: 'Doença do colo uterino NE', component: 'diagnoses', relatedCID10: ['N88'] },
    { code: 'X86', chapter: 'X', title: 'Citologia cervical anormal', component: 'diagnoses', relatedCID10: ['R87'] },
    { code: 'X87', chapter: 'X', title: 'Prolapso uterovaginal', component: 'diagnoses', relatedCID10: ['N81'] },
    { code: 'X88', chapter: 'X', title: 'Mastopatia fibrocística', component: 'diagnoses', relatedCID10: ['N60'] },
    { code: 'X89', chapter: 'X', title: 'Síndrome da tensão pré-menstrual', component: 'diagnoses', relatedCID10: ['N94.3'] },
    { code: 'X99', chapter: 'X', title: 'Outra doença genital feminina', component: 'diagnoses', relatedCID10: ['N94'] },
  ],
  Y: [
    { code: 'Y01', chapter: 'Y', title: 'Dor no pênis', component: 'symptoms', relatedCID10: ['N48'] },
    { code: 'Y02', chapter: 'Y', title: 'Dor no escroto/testículo', component: 'symptoms', relatedCID10: ['N50'] },
    { code: 'Y04', chapter: 'Y', title: 'Sintomas/queixas da função sexual masculina', component: 'symptoms', relatedCID10: ['N48.4'] },
    { code: 'Y07', chapter: 'Y', title: 'Impotência orgânica NE', component: 'symptoms', relatedCID10: ['N48.4'] },
    { code: 'Y70', chapter: 'Y', title: 'Sífilis no homem', component: 'diagnoses', relatedCID10: ['A51', 'A52'] },
    { code: 'Y71', chapter: 'Y', title: 'Gonorreia no homem', component: 'diagnoses', relatedCID10: ['A54'] },
    { code: 'Y72', chapter: 'Y', title: 'Herpes genital no homem', component: 'diagnoses', relatedCID10: ['A60'] },
    { code: 'Y73', chapter: 'Y', title: 'Prostatite/vesiculite seminal', component: 'diagnoses', relatedCID10: ['N41'] },
    { code: 'Y74', chapter: 'Y', title: 'Orquite/epididimite', component: 'diagnoses', relatedCID10: ['N45'] },
    { code: 'Y76', chapter: 'Y', title: 'Condiloma acuminado no homem', component: 'diagnoses', relatedCID10: ['A63.0'] },
    { code: 'Y77', chapter: 'Y', title: 'Neoplasia maligna da próstata', component: 'diagnoses', relatedCID10: ['C61'] },
    { code: 'Y78', chapter: 'Y', title: 'Neoplasia maligna do testículo', component: 'diagnoses', relatedCID10: ['C62'] },
    { code: 'Y79', chapter: 'Y', title: 'Neoplasia benigna genital masculina', component: 'diagnoses', relatedCID10: ['D29'] },
    { code: 'Y80', chapter: 'Y', title: 'Fimose/prepúcio redundante', component: 'diagnoses', relatedCID10: ['N47'] },
    { code: 'Y81', chapter: 'Y', title: 'Hipertrofia prostática benigna', component: 'diagnoses', relatedCID10: ['N40'] },
    { code: 'Y82', chapter: 'Y', title: 'Hidrocele', component: 'diagnoses', relatedCID10: ['N43'] },
    { code: 'Y83', chapter: 'Y', title: 'Varicocele', component: 'diagnoses', relatedCID10: ['I86.1'] },
    { code: 'Y84', chapter: 'Y', title: 'Outra doença genital masculina', component: 'diagnoses', relatedCID10: ['N50'] },
    { code: 'Y85', chapter: 'Y', title: 'Disfunção erétil', component: 'diagnoses', relatedCID10: ['N48.4', 'F52.2'] },
  ],
  Z: [
    { code: 'Z01', chapter: 'Z', title: 'Pobreza/problemas econômicos', component: 'symptoms', relatedCID10: ['Z59'] },
    { code: 'Z02', chapter: 'Z', title: 'Problema alimentar/água', component: 'symptoms', relatedCID10: ['Z59.4'] },
    { code: 'Z03', chapter: 'Z', title: 'Problema habitacional', component: 'symptoms', relatedCID10: ['Z59'] },
    { code: 'Z04', chapter: 'Z', title: 'Problema sociocultural', component: 'symptoms', relatedCID10: ['Z60'] },
    { code: 'Z05', chapter: 'Z', title: 'Problema trabalhista', component: 'symptoms', relatedCID10: ['Z56'] },
    { code: 'Z06', chapter: 'Z', title: 'Problema de desemprego', component: 'symptoms', relatedCID10: ['Z56.0'] },
    { code: 'Z07', chapter: 'Z', title: 'Problema educacional', component: 'symptoms', relatedCID10: ['Z55'] },
    { code: 'Z08', chapter: 'Z', title: 'Problema do sistema de saúde', component: 'symptoms', relatedCID10: ['Z75'] },
    { code: 'Z10', chapter: 'Z', title: 'Problema de saúde do parceiro', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z12', chapter: 'Z', title: 'Problema de relacionamento', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z14', chapter: 'Z', title: 'Problema de comportamento do parceiro', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z15', chapter: 'Z', title: 'Perda/morte do parceiro', component: 'symptoms', relatedCID10: ['Z63.4'] },
    { code: 'Z16', chapter: 'Z', title: 'Problema de relacionamento com criança', component: 'symptoms', relatedCID10: ['Z62'] },
    { code: 'Z18', chapter: 'Z', title: 'Problema com criança doente', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z19', chapter: 'Z', title: 'Perda/morte de criança', component: 'symptoms', relatedCID10: ['Z63.4'] },
    { code: 'Z20', chapter: 'Z', title: 'Problema de relacionamento familiar', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z21', chapter: 'Z', title: 'Problema de comportamento de familiar', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z22', chapter: 'Z', title: 'Problema com familiar doente', component: 'symptoms', relatedCID10: ['Z63'] },
    { code: 'Z23', chapter: 'Z', title: 'Perda/morte de familiar', component: 'symptoms', relatedCID10: ['Z63.4'] },
    { code: 'Z25', chapter: 'Z', title: 'Abuso/violência', component: 'diagnoses', relatedCID10: ['T74'] },
    { code: 'Z29', chapter: 'Z', title: 'Problema social NE', component: 'symptoms', relatedCID10: ['Z60'] },
  ],
};

// =============================================================================
// FUNÇÕES DE BUSCA
// =============================================================================

export function getCIAP2ByCode(code: string): CIAP2Code | undefined {
  const chapter = code.charAt(0).toUpperCase() as CIAP2Chapter;
  const codes = CIAP2_CODES[chapter];
  if (!codes) return undefined;
  
  return codes.find(c => c.code.toUpperCase() === code.toUpperCase());
}

export function getCIAP2ByChapter(chapter: CIAP2Chapter): CIAP2Code[] {
  return CIAP2_CODES[chapter] || [];
}

export function searchCIAP2(query: string): CIAP2Code[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: CIAP2Code[] = [];
  
  Object.values(CIAP2_CODES).forEach(codes => {
    codes.forEach(code => {
      if (
        code.code.toLowerCase().includes(normalizedQuery) ||
        code.title.toLowerCase().includes(normalizedQuery)
      ) {
        results.push(code);
      }
    });
  });
  
  return results;
}

export function getCID10FromCIAP2(ciap2Code: string): string[] {
  const code = getCIAP2ByCode(ciap2Code);
  return code?.relatedCID10 || [];
}

export function getTotalCodes(): number {
  return Object.values(CIAP2_CODES).reduce((total, codes) => total + codes.length, 0);
}

export function getCodesByComponent(component: CIAP2Component): CIAP2Code[] {
  const results: CIAP2Code[] = [];
  
  Object.values(CIAP2_CODES).forEach(codes => {
    codes.forEach(code => {
      if (code.component === component) {
        results.push(code);
      }
    });
  });
  
  return results;
}


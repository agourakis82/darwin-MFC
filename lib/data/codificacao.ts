/**
 * CODIFICAÇÃO CIAP-2 E CID-10 - DARWIN-MFC
 * =========================================
 * 
 * Mapeamento completo dos sistemas de classificação
 * para uso na Atenção Primária à Saúde
 * 
 * Referências:
 * - CIAP-2: Classificação Internacional de Atenção Primária, 2ª ed. (WONCA, 2009)
 * - CID-10: Classificação Internacional de Doenças, 10ª revisão (OMS, 2019)
 * - Tabela de correspondência CIAP-2/CID-10 (MS/DATASUS)
 */

// =============================================================================
// CIAP-2 - CAPÍTULOS
// =============================================================================

export interface CapituloCIAP2 {
  codigo: string;
  titulo: string;
  descricao: string;
}

export const CAPITULOS_CIAP2: CapituloCIAP2[] = [
  { codigo: 'A', titulo: 'Geral e Inespecífico', descricao: 'Sinais, sintomas e problemas gerais' },
  { codigo: 'B', titulo: 'Sangue/Órgãos Hematopoéticos/Linfáticos/Baço', descricao: 'Problemas hematológicos' },
  { codigo: 'D', titulo: 'Aparelho Digestivo', descricao: 'Problemas gastrointestinais' },
  { codigo: 'F', titulo: 'Olho', descricao: 'Problemas oftalmológicos' },
  { codigo: 'H', titulo: 'Ouvido', descricao: 'Problemas otológicos' },
  { codigo: 'K', titulo: 'Aparelho Circulatório', descricao: 'Problemas cardiovasculares' },
  { codigo: 'L', titulo: 'Sistema Musculoesquelético', descricao: 'Problemas osteomusculares' },
  { codigo: 'N', titulo: 'Sistema Nervoso', descricao: 'Problemas neurológicos' },
  { codigo: 'P', titulo: 'Psicológico', descricao: 'Problemas de saúde mental' },
  { codigo: 'R', titulo: 'Aparelho Respiratório', descricao: 'Problemas respiratórios' },
  { codigo: 'S', titulo: 'Pele', descricao: 'Problemas dermatológicos' },
  { codigo: 'T', titulo: 'Endócrino/Metabólico e Nutricional', descricao: 'Problemas metabólicos' },
  { codigo: 'U', titulo: 'Aparelho Urinário', descricao: 'Problemas urológicos' },
  { codigo: 'W', titulo: 'Gravidez/Parto/Planeamento Familiar', descricao: 'Saúde da mulher e gestação' },
  { codigo: 'X', titulo: 'Aparelho Genital Feminino (excl. Mama)', descricao: 'Ginecologia' },
  { codigo: 'Y', titulo: 'Aparelho Genital Masculino', descricao: 'Andrologia' },
  { codigo: 'Z', titulo: 'Problemas Sociais', descricao: 'Determinantes sociais' },
];

// =============================================================================
// CIAP-2 - CÓDIGOS MAIS USADOS NA APS
// =============================================================================

export interface CodigoCIAP2 {
  codigo: string;
  descricao: string;
  capitulo: string;
  cid10Correspondentes: string[];
  prevalenciaAPS?: 'muito_alta' | 'alta' | 'media' | 'baixa';
}

export const CODIGOS_CIAP2: CodigoCIAP2[] = [
  // CAPÍTULO K - CARDIOVASCULAR
  { codigo: 'K86', descricao: 'Hipertensão sem complicações', capitulo: 'K', cid10Correspondentes: ['I10'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'K87', descricao: 'Hipertensão com complicações', capitulo: 'K', cid10Correspondentes: ['I11', 'I12', 'I13'], prevalenciaAPS: 'alta' },
  { codigo: 'K74', descricao: 'Doença isquêmica do coração com angina', capitulo: 'K', cid10Correspondentes: ['I20', 'I25.1'], prevalenciaAPS: 'media' },
  { codigo: 'K75', descricao: 'Infarto agudo do miocárdio', capitulo: 'K', cid10Correspondentes: ['I21', 'I22'], prevalenciaAPS: 'baixa' },
  { codigo: 'K76', descricao: 'Doença isquêmica do coração sem angina', capitulo: 'K', cid10Correspondentes: ['I25'], prevalenciaAPS: 'media' },
  { codigo: 'K77', descricao: 'Insuficiência cardíaca', capitulo: 'K', cid10Correspondentes: ['I50'], prevalenciaAPS: 'media' },
  { codigo: 'K78', descricao: 'Fibrilação/flutter atrial', capitulo: 'K', cid10Correspondentes: ['I48'], prevalenciaAPS: 'media' },
  { codigo: 'K79', descricao: 'Taquicardia paroxística', capitulo: 'K', cid10Correspondentes: ['I47'], prevalenciaAPS: 'baixa' },
  { codigo: 'K80', descricao: 'Arritmia cardíaca NE', capitulo: 'K', cid10Correspondentes: ['I49'], prevalenciaAPS: 'media' },
  { codigo: 'K89', descricao: 'Isquemia cerebral transitória', capitulo: 'K', cid10Correspondentes: ['G45'], prevalenciaAPS: 'baixa' },
  { codigo: 'K90', descricao: 'AVC/Sequela de AVC', capitulo: 'K', cid10Correspondentes: ['I60', 'I61', 'I62', 'I63', 'I64', 'I69'], prevalenciaAPS: 'media' },
  { codigo: 'K91', descricao: 'Doença cerebrovascular', capitulo: 'K', cid10Correspondentes: ['I67'], prevalenciaAPS: 'media' },
  { codigo: 'K92', descricao: 'Doença arterial periférica', capitulo: 'K', cid10Correspondentes: ['I70', 'I73', 'I74'], prevalenciaAPS: 'media' },
  { codigo: 'K93', descricao: 'Embolia pulmonar', capitulo: 'K', cid10Correspondentes: ['I26'], prevalenciaAPS: 'baixa' },
  { codigo: 'K94', descricao: 'Flebite/tromboflebite', capitulo: 'K', cid10Correspondentes: ['I80'], prevalenciaAPS: 'media' },
  { codigo: 'K95', descricao: 'Varizes das pernas', capitulo: 'K', cid10Correspondentes: ['I83'], prevalenciaAPS: 'alta' },
  { codigo: 'K96', descricao: 'Hemorroidas', capitulo: 'K', cid10Correspondentes: ['K64'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO T - ENDÓCRINO/METABÓLICO
  { codigo: 'T89', descricao: 'Diabetes insulino-dependente', capitulo: 'T', cid10Correspondentes: ['E10'], prevalenciaAPS: 'media' },
  { codigo: 'T90', descricao: 'Diabetes não insulino-dependente', capitulo: 'T', cid10Correspondentes: ['E11'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'T82', descricao: 'Obesidade', capitulo: 'T', cid10Correspondentes: ['E66'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'T83', descricao: 'Excesso de peso', capitulo: 'T', cid10Correspondentes: ['E66.9'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'T93', descricao: 'Distúrbio do metabolismo dos lípidos', capitulo: 'T', cid10Correspondentes: ['E78'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'T81', descricao: 'Bócio', capitulo: 'T', cid10Correspondentes: ['E01', 'E04'], prevalenciaAPS: 'media' },
  { codigo: 'T85', descricao: 'Hipertiroidismo', capitulo: 'T', cid10Correspondentes: ['E05'], prevalenciaAPS: 'media' },
  { codigo: 'T86', descricao: 'Hipotiroidismo', capitulo: 'T', cid10Correspondentes: ['E03'], prevalenciaAPS: 'alta' },
  { codigo: 'T99', descricao: 'Outros distúrbios endócrinos/metabólicos', capitulo: 'T', cid10Correspondentes: ['E89'], prevalenciaAPS: 'media' },
  
  // CAPÍTULO R - RESPIRATÓRIO
  { codigo: 'R74', descricao: 'Infecção aguda do aparelho respiratório superior', capitulo: 'R', cid10Correspondentes: ['J00', 'J01', 'J02', 'J03', 'J06'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'R75', descricao: 'Sinusite aguda/crônica', capitulo: 'R', cid10Correspondentes: ['J01', 'J32'], prevalenciaAPS: 'alta' },
  { codigo: 'R76', descricao: 'Amigdalite aguda', capitulo: 'R', cid10Correspondentes: ['J03'], prevalenciaAPS: 'alta' },
  { codigo: 'R77', descricao: 'Laringite/traqueíte aguda', capitulo: 'R', cid10Correspondentes: ['J04', 'J05'], prevalenciaAPS: 'media' },
  { codigo: 'R78', descricao: 'Bronquite/bronquiolite aguda', capitulo: 'R', cid10Correspondentes: ['J20', 'J21'], prevalenciaAPS: 'alta' },
  { codigo: 'R79', descricao: 'Bronquite crônica', capitulo: 'R', cid10Correspondentes: ['J41', 'J42'], prevalenciaAPS: 'alta' },
  { codigo: 'R81', descricao: 'Pneumonia', capitulo: 'R', cid10Correspondentes: ['J12', 'J13', 'J14', 'J15', 'J18'], prevalenciaAPS: 'media' },
  { codigo: 'R95', descricao: 'Doença pulmonar obstrutiva crônica', capitulo: 'R', cid10Correspondentes: ['J44'], prevalenciaAPS: 'alta' },
  { codigo: 'R96', descricao: 'Asma', capitulo: 'R', cid10Correspondentes: ['J45', 'J46'], prevalenciaAPS: 'alta' },
  { codigo: 'R97', descricao: 'Rinite alérgica', capitulo: 'R', cid10Correspondentes: ['J30'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO P - PSICOLÓGICO
  { codigo: 'P01', descricao: 'Sensação de ansiedade/nervosismo/tensão', capitulo: 'P', cid10Correspondentes: ['R45.0', 'R45.1'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P03', descricao: 'Sensação de depressão', capitulo: 'P', cid10Correspondentes: ['R45.2'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P06', descricao: 'Perturbação do sono/insônia', capitulo: 'P', cid10Correspondentes: ['G47', 'F51'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P74', descricao: 'Distúrbio ansioso/estado de ansiedade', capitulo: 'P', cid10Correspondentes: ['F41'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P76', descricao: 'Depressão', capitulo: 'P', cid10Correspondentes: ['F32', 'F33'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P77', descricao: 'Suicídio/tentativa de suicídio', capitulo: 'P', cid10Correspondentes: ['X60-X84'], prevalenciaAPS: 'media' },
  { codigo: 'P15', descricao: 'Abuso crônico de álcool', capitulo: 'P', cid10Correspondentes: ['F10'], prevalenciaAPS: 'alta' },
  { codigo: 'P16', descricao: 'Abuso agudo de álcool', capitulo: 'P', cid10Correspondentes: ['F10.0'], prevalenciaAPS: 'alta' },
  { codigo: 'P17', descricao: 'Abuso de tabaco', capitulo: 'P', cid10Correspondentes: ['F17'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'P18', descricao: 'Abuso de medicação', capitulo: 'P', cid10Correspondentes: ['F11', 'F12', 'F13', 'F19'], prevalenciaAPS: 'media' },
  { codigo: 'P19', descricao: 'Abuso de droga', capitulo: 'P', cid10Correspondentes: ['F11', 'F12', 'F14', 'F15', 'F16', 'F19'], prevalenciaAPS: 'media' },
  { codigo: 'P73', descricao: 'Psicose afetiva', capitulo: 'P', cid10Correspondentes: ['F30', 'F31'], prevalenciaAPS: 'baixa' },
  { codigo: 'P72', descricao: 'Esquizofrenia', capitulo: 'P', cid10Correspondentes: ['F20'], prevalenciaAPS: 'baixa' },
  
  // CAPÍTULO L - MUSCULOESQUELÉTICO
  { codigo: 'L01', descricao: 'Sinais/sintomas do pescoço', capitulo: 'L', cid10Correspondentes: ['M54.2'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L02', descricao: 'Sinais/sintomas dorsais', capitulo: 'L', cid10Correspondentes: ['M54.5', 'M54.6'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L03', descricao: 'Sinais/sintomas lombares', capitulo: 'L', cid10Correspondentes: ['M54.5'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L84', descricao: 'Síndrome vertebral sem irradiação de dor', capitulo: 'L', cid10Correspondentes: ['M54'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L86', descricao: 'Síndrome vertebral com irradiação de dor', capitulo: 'L', cid10Correspondentes: ['M54.3', 'M54.4'], prevalenciaAPS: 'alta' },
  { codigo: 'L88', descricao: 'Artrite reumatoide', capitulo: 'L', cid10Correspondentes: ['M05', 'M06'], prevalenciaAPS: 'media' },
  { codigo: 'L89', descricao: 'Osteoartrose do quadril', capitulo: 'L', cid10Correspondentes: ['M16'], prevalenciaAPS: 'alta' },
  { codigo: 'L90', descricao: 'Osteoartrose do joelho', capitulo: 'L', cid10Correspondentes: ['M17'], prevalenciaAPS: 'alta' },
  { codigo: 'L91', descricao: 'Osteoartrose outra', capitulo: 'L', cid10Correspondentes: ['M15', 'M18', 'M19'], prevalenciaAPS: 'alta' },
  { codigo: 'L95', descricao: 'Osteoporose', capitulo: 'L', cid10Correspondentes: ['M80', 'M81'], prevalenciaAPS: 'alta' },
  { codigo: 'L18', descricao: 'Dor muscular', capitulo: 'L', cid10Correspondentes: ['M79.1'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L87', descricao: 'Bursite/tendinite/sinovite NE', capitulo: 'L', cid10Correspondentes: ['M70', 'M71', 'M75', 'M76', 'M77'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO U - URINÁRIO
  { codigo: 'U71', descricao: 'Cistite/outra infecção urinária', capitulo: 'U', cid10Correspondentes: ['N30', 'N39.0'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'U70', descricao: 'Pielonefrite/pielite', capitulo: 'U', cid10Correspondentes: ['N10', 'N11', 'N12'], prevalenciaAPS: 'media' },
  { codigo: 'U99', descricao: 'Outras doenças urinárias', capitulo: 'U', cid10Correspondentes: ['N39.9'], prevalenciaAPS: 'alta' },
  { codigo: 'U95', descricao: 'Cálculo urinário', capitulo: 'U', cid10Correspondentes: ['N20', 'N21'], prevalenciaAPS: 'media' },
  
  // CAPÍTULO D - DIGESTIVO
  { codigo: 'D73', descricao: 'Gastroenterite presumível infecção', capitulo: 'D', cid10Correspondentes: ['A09', 'K52.9'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'D84', descricao: 'Esofagite/doença do refluxo gastroesofágico', capitulo: 'D', cid10Correspondentes: ['K21'], prevalenciaAPS: 'alta' },
  { codigo: 'D85', descricao: 'Úlcera duodenal', capitulo: 'D', cid10Correspondentes: ['K26'], prevalenciaAPS: 'media' },
  { codigo: 'D86', descricao: 'Úlcera péptica outra', capitulo: 'D', cid10Correspondentes: ['K25', 'K27', 'K28'], prevalenciaAPS: 'media' },
  { codigo: 'D87', descricao: 'Distúrbio funcional do estômago', capitulo: 'D', cid10Correspondentes: ['K30', 'K31'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'D93', descricao: 'Síndrome do cólon irritável', capitulo: 'D', cid10Correspondentes: ['K58'], prevalenciaAPS: 'alta' },
  { codigo: 'D12', descricao: 'Constipação', capitulo: 'D', cid10Correspondentes: ['K59.0'], prevalenciaAPS: 'alta' },
  { codigo: 'D96', descricao: 'Hepatite viral', capitulo: 'D', cid10Correspondentes: ['B15', 'B16', 'B17', 'B18', 'B19'], prevalenciaAPS: 'media' },
  { codigo: 'D97', descricao: 'Cirrose/outra doença do fígado', capitulo: 'D', cid10Correspondentes: ['K70', 'K74'], prevalenciaAPS: 'media' },
  { codigo: 'D98', descricao: 'Colecistite/colelitíase', capitulo: 'D', cid10Correspondentes: ['K80', 'K81'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO S - PELE
  { codigo: 'S74', descricao: 'Dermatomicose', capitulo: 'S', cid10Correspondentes: ['B35', 'B36', 'B37'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'S84', descricao: 'Impetigo', capitulo: 'S', cid10Correspondentes: ['L01'], prevalenciaAPS: 'alta' },
  { codigo: 'S76', descricao: 'Outras infecções de pele', capitulo: 'S', cid10Correspondentes: ['L02', 'L03', 'L08'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'S87', descricao: 'Dermatite de contato/alérgica', capitulo: 'S', cid10Correspondentes: ['L23', 'L24', 'L25'], prevalenciaAPS: 'alta' },
  { codigo: 'S88', descricao: 'Dermatite atópica', capitulo: 'S', cid10Correspondentes: ['L20'], prevalenciaAPS: 'alta' },
  { codigo: 'S91', descricao: 'Psoríase', capitulo: 'S', cid10Correspondentes: ['L40'], prevalenciaAPS: 'media' },
  { codigo: 'S82', descricao: 'Herpes simples', capitulo: 'S', cid10Correspondentes: ['B00'], prevalenciaAPS: 'alta' },
  { codigo: 'S70', descricao: 'Herpes zoster', capitulo: 'S', cid10Correspondentes: ['B02'], prevalenciaAPS: 'media' },
  { codigo: 'S96', descricao: 'Acne', capitulo: 'S', cid10Correspondentes: ['L70'], prevalenciaAPS: 'alta' },
  { codigo: 'S97', descricao: 'Úlcera crônica da pele', capitulo: 'S', cid10Correspondentes: ['L97', 'L98.4'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO A - GERAL
  { codigo: 'A70', descricao: 'Tuberculose', capitulo: 'A', cid10Correspondentes: ['A15', 'A16', 'A17', 'A18', 'A19'], prevalenciaAPS: 'media' },
  { codigo: 'A77', descricao: 'Outras doenças virais', capitulo: 'A', cid10Correspondentes: ['B34'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'A78', descricao: 'Outra doença infecciosa', capitulo: 'A', cid10Correspondentes: ['A49'], prevalenciaAPS: 'alta' },
  { codigo: 'A90', descricao: 'Malformação congênita múltipla', capitulo: 'A', cid10Correspondentes: ['Q89'], prevalenciaAPS: 'baixa' },
  
  // CAPÍTULO B - SANGUE
  { codigo: 'B82', descricao: 'Anemia ferropriva', capitulo: 'B', cid10Correspondentes: ['D50'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'B81', descricao: 'Anemia por deficiência de vitamina B12/folato', capitulo: 'B', cid10Correspondentes: ['D51', 'D52'], prevalenciaAPS: 'media' },
  { codigo: 'B80', descricao: 'Anemia não especificada', capitulo: 'B', cid10Correspondentes: ['D64.9'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO N - NEUROLÓGICO
  { codigo: 'N01', descricao: 'Cefaleia', capitulo: 'N', cid10Correspondentes: ['R51'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'N89', descricao: 'Enxaqueca', capitulo: 'N', cid10Correspondentes: ['G43'], prevalenciaAPS: 'alta' },
  { codigo: 'N90', descricao: 'Cefaleia tipo tensão', capitulo: 'N', cid10Correspondentes: ['G44.2'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'N88', descricao: 'Epilepsia', capitulo: 'N', cid10Correspondentes: ['G40', 'G41'], prevalenciaAPS: 'media' },
  { codigo: 'N86', descricao: 'Esclerose múltipla', capitulo: 'N', cid10Correspondentes: ['G35'], prevalenciaAPS: 'baixa' },
  { codigo: 'N87', descricao: 'Parkinsonismo', capitulo: 'N', cid10Correspondentes: ['G20', 'G21', 'G22'], prevalenciaAPS: 'media' },
  { codigo: 'N99', descricao: 'Outras doenças neurológicas', capitulo: 'N', cid10Correspondentes: ['G98'], prevalenciaAPS: 'media' },
  
  // CAPÍTULO W - GRAVIDEZ
  { codigo: 'W78', descricao: 'Gravidez', capitulo: 'W', cid10Correspondentes: ['Z34'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'W84', descricao: 'Gravidez de alto risco', capitulo: 'W', cid10Correspondentes: ['O09'], prevalenciaAPS: 'alta' },
  { codigo: 'W81', descricao: 'Toxemia gravídica/Pré-eclâmpsia', capitulo: 'W', cid10Correspondentes: ['O14', 'O15'], prevalenciaAPS: 'media' },
  { codigo: 'W85', descricao: 'Diabetes gestacional', capitulo: 'W', cid10Correspondentes: ['O24.4'], prevalenciaAPS: 'alta' },
  { codigo: 'W14', descricao: 'Planejamento familiar', capitulo: 'W', cid10Correspondentes: ['Z30'], prevalenciaAPS: 'muito_alta' },
  
  // CAPÍTULO X - GENITAL FEMININO
  { codigo: 'X72', descricao: 'Candidíase vaginal', capitulo: 'X', cid10Correspondentes: ['B37.3'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'X74', descricao: 'Doença inflamatória pélvica', capitulo: 'X', cid10Correspondentes: ['N70', 'N71', 'N72', 'N73', 'N74'], prevalenciaAPS: 'alta' },
  { codigo: 'X84', descricao: 'Vaginite/vulvite NE', capitulo: 'X', cid10Correspondentes: ['N76'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'X11', descricao: 'Sintomas da menopausa/climatério', capitulo: 'X', cid10Correspondentes: ['N95'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO Y - GENITAL MASCULINO
  { codigo: 'Y85', descricao: 'Hiperplasia benigna da próstata', capitulo: 'Y', cid10Correspondentes: ['N40'], prevalenciaAPS: 'alta' },
  { codigo: 'Y77', descricao: 'Neoplasia maligna da próstata', capitulo: 'Y', cid10Correspondentes: ['C61'], prevalenciaAPS: 'media' },
  
  // CAPÍTULO H - OUVIDO
  { codigo: 'H70', descricao: 'Otite externa', capitulo: 'H', cid10Correspondentes: ['H60'], prevalenciaAPS: 'alta' },
  { codigo: 'H71', descricao: 'Otite média aguda', capitulo: 'H', cid10Correspondentes: ['H65', 'H66'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'H84', descricao: 'Vertigem/síndrome vestibular', capitulo: 'H', cid10Correspondentes: ['H81', 'R42'], prevalenciaAPS: 'alta' },
  
  // CAPÍTULO F - OLHO
  { codigo: 'F70', descricao: 'Conjuntivite infecciosa', capitulo: 'F', cid10Correspondentes: ['H10.0', 'H10.1'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F71', descricao: 'Conjuntivite alérgica', capitulo: 'F', cid10Correspondentes: ['H10.1'], prevalenciaAPS: 'alta' },
  { codigo: 'F92', descricao: 'Catarata', capitulo: 'F', cid10Correspondentes: ['H25', 'H26'], prevalenciaAPS: 'alta' },
  { codigo: 'F93', descricao: 'Glaucoma', capitulo: 'F', cid10Correspondentes: ['H40'], prevalenciaAPS: 'media' },
];

// =============================================================================
// CID-10 - CAPÍTULOS
// =============================================================================

export interface CapituloCID10 {
  codigo: string;
  faixa: string;
  titulo: string;
}

export const CAPITULOS_CID10: CapituloCID10[] = [
  { codigo: 'I', faixa: 'A00-B99', titulo: 'Algumas doenças infecciosas e parasitárias' },
  { codigo: 'II', faixa: 'C00-D48', titulo: 'Neoplasias' },
  { codigo: 'III', faixa: 'D50-D89', titulo: 'Doenças do sangue e dos órgãos hematopoéticos' },
  { codigo: 'IV', faixa: 'E00-E90', titulo: 'Doenças endócrinas, nutricionais e metabólicas' },
  { codigo: 'V', faixa: 'F00-F99', titulo: 'Transtornos mentais e comportamentais' },
  { codigo: 'VI', faixa: 'G00-G99', titulo: 'Doenças do sistema nervoso' },
  { codigo: 'VII', faixa: 'H00-H59', titulo: 'Doenças do olho e anexos' },
  { codigo: 'VIII', faixa: 'H60-H95', titulo: 'Doenças do ouvido e da apófise mastoide' },
  { codigo: 'IX', faixa: 'I00-I99', titulo: 'Doenças do aparelho circulatório' },
  { codigo: 'X', faixa: 'J00-J99', titulo: 'Doenças do aparelho respiratório' },
  { codigo: 'XI', faixa: 'K00-K93', titulo: 'Doenças do aparelho digestivo' },
  { codigo: 'XII', faixa: 'L00-L99', titulo: 'Doenças da pele e do tecido subcutâneo' },
  { codigo: 'XIII', faixa: 'M00-M99', titulo: 'Doenças do sistema osteomuscular e do tecido conjuntivo' },
  { codigo: 'XIV', faixa: 'N00-N99', titulo: 'Doenças do aparelho geniturinário' },
  { codigo: 'XV', faixa: 'O00-O99', titulo: 'Gravidez, parto e puerpério' },
  { codigo: 'XVI', faixa: 'P00-P96', titulo: 'Algumas afecções originadas no período perinatal' },
  { codigo: 'XVII', faixa: 'Q00-Q99', titulo: 'Malformações congênitas, deformidades e anomalias cromossômicas' },
  { codigo: 'XVIII', faixa: 'R00-R99', titulo: 'Sintomas, sinais e achados anormais' },
  { codigo: 'XIX', faixa: 'S00-T98', titulo: 'Lesões, envenenamento e algumas outras consequências de causas externas' },
  { codigo: 'XX', faixa: 'V01-Y98', titulo: 'Causas externas de morbidade e de mortalidade' },
  { codigo: 'XXI', faixa: 'Z00-Z99', titulo: 'Fatores que influenciam o estado de saúde e o contato com os serviços de saúde' },
];

// =============================================================================
// CID-10 - CÓDIGOS MAIS USADOS NA APS
// =============================================================================

export interface CodigoCID10 {
  codigo: string;
  descricao: string;
  capitulo: string;
  ciap2Correspondentes: string[];
  prevalenciaAPS?: 'muito_alta' | 'alta' | 'media' | 'baixa';
}

export const CODIGOS_CID10: CodigoCID10[] = [
  // Cardiovascular (Capítulo IX)
  { codigo: 'I10', descricao: 'Hipertensão essencial (primária)', capitulo: 'IX', ciap2Correspondentes: ['K86'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'I11', descricao: 'Doença cardíaca hipertensiva', capitulo: 'IX', ciap2Correspondentes: ['K87'], prevalenciaAPS: 'alta' },
  { codigo: 'I50', descricao: 'Insuficiência cardíaca', capitulo: 'IX', ciap2Correspondentes: ['K77'], prevalenciaAPS: 'media' },
  { codigo: 'I48', descricao: 'Fibrilação e flutter atrial', capitulo: 'IX', ciap2Correspondentes: ['K78'], prevalenciaAPS: 'media' },
  { codigo: 'I20', descricao: 'Angina pectoris', capitulo: 'IX', ciap2Correspondentes: ['K74'], prevalenciaAPS: 'media' },
  { codigo: 'I21', descricao: 'Infarto agudo do miocárdio', capitulo: 'IX', ciap2Correspondentes: ['K75'], prevalenciaAPS: 'baixa' },
  { codigo: 'I25', descricao: 'Doença isquêmica crônica do coração', capitulo: 'IX', ciap2Correspondentes: ['K76'], prevalenciaAPS: 'media' },
  { codigo: 'I63', descricao: 'Infarto cerebral', capitulo: 'IX', ciap2Correspondentes: ['K90'], prevalenciaAPS: 'media' },
  { codigo: 'I83', descricao: 'Varizes dos membros inferiores', capitulo: 'IX', ciap2Correspondentes: ['K95'], prevalenciaAPS: 'alta' },
  
  // Endócrino/Metabólico (Capítulo IV)
  { codigo: 'E10', descricao: 'Diabetes mellitus insulino-dependente', capitulo: 'IV', ciap2Correspondentes: ['T89'], prevalenciaAPS: 'media' },
  { codigo: 'E11', descricao: 'Diabetes mellitus não insulino-dependente', capitulo: 'IV', ciap2Correspondentes: ['T90'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'E66', descricao: 'Obesidade', capitulo: 'IV', ciap2Correspondentes: ['T82', 'T83'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'E78', descricao: 'Distúrbios do metabolismo de lipoproteínas', capitulo: 'IV', ciap2Correspondentes: ['T93'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'E03', descricao: 'Hipotireoidismo', capitulo: 'IV', ciap2Correspondentes: ['T86'], prevalenciaAPS: 'alta' },
  { codigo: 'E05', descricao: 'Tireotoxicose [hipertireoidismo]', capitulo: 'IV', ciap2Correspondentes: ['T85'], prevalenciaAPS: 'media' },
  
  // Respiratório (Capítulo X)
  { codigo: 'J00', descricao: 'Nasofaringite aguda [resfriado comum]', capitulo: 'X', ciap2Correspondentes: ['R74'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'J06', descricao: 'Infecções agudas das vias aéreas superiores', capitulo: 'X', ciap2Correspondentes: ['R74'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'J03', descricao: 'Amigdalite aguda', capitulo: 'X', ciap2Correspondentes: ['R76'], prevalenciaAPS: 'alta' },
  { codigo: 'J01', descricao: 'Sinusite aguda', capitulo: 'X', ciap2Correspondentes: ['R75'], prevalenciaAPS: 'alta' },
  { codigo: 'J20', descricao: 'Bronquite aguda', capitulo: 'X', ciap2Correspondentes: ['R78'], prevalenciaAPS: 'alta' },
  { codigo: 'J18', descricao: 'Pneumonia por microrganismo não especificado', capitulo: 'X', ciap2Correspondentes: ['R81'], prevalenciaAPS: 'media' },
  { codigo: 'J44', descricao: 'Outras doenças pulmonares obstrutivas crônicas', capitulo: 'X', ciap2Correspondentes: ['R95'], prevalenciaAPS: 'alta' },
  { codigo: 'J45', descricao: 'Asma', capitulo: 'X', ciap2Correspondentes: ['R96'], prevalenciaAPS: 'alta' },
  { codigo: 'J30', descricao: 'Rinite alérgica e vasomotora', capitulo: 'X', ciap2Correspondentes: ['R97'], prevalenciaAPS: 'alta' },
  
  // Transtornos Mentais (Capítulo V)
  { codigo: 'F32', descricao: 'Episódios depressivos', capitulo: 'V', ciap2Correspondentes: ['P76'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F33', descricao: 'Transtorno depressivo recorrente', capitulo: 'V', ciap2Correspondentes: ['P76'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F41', descricao: 'Outros transtornos ansiosos', capitulo: 'V', ciap2Correspondentes: ['P74'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F41.0', descricao: 'Transtorno de pânico', capitulo: 'V', ciap2Correspondentes: ['P74'], prevalenciaAPS: 'alta' },
  { codigo: 'F41.1', descricao: 'Ansiedade generalizada', capitulo: 'V', ciap2Correspondentes: ['P74'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F51', descricao: 'Transtornos não-orgânicos do sono', capitulo: 'V', ciap2Correspondentes: ['P06'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'F10', descricao: 'Transtornos mentais e comportamentais devidos ao uso de álcool', capitulo: 'V', ciap2Correspondentes: ['P15', 'P16'], prevalenciaAPS: 'alta' },
  { codigo: 'F17', descricao: 'Transtornos mentais e comportamentais devidos ao uso de fumo', capitulo: 'V', ciap2Correspondentes: ['P17'], prevalenciaAPS: 'muito_alta' },
  
  // Musculoesquelético (Capítulo XIII)
  { codigo: 'M54', descricao: 'Dorsalgia', capitulo: 'XIII', ciap2Correspondentes: ['L01', 'L02', 'L03', 'L84'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'M54.5', descricao: 'Dor lombar baixa', capitulo: 'XIII', ciap2Correspondentes: ['L03', 'L84'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'M54.2', descricao: 'Cervicalgia', capitulo: 'XIII', ciap2Correspondentes: ['L01', 'L83'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'M17', descricao: 'Gonartrose [artrose do joelho]', capitulo: 'XIII', ciap2Correspondentes: ['L90'], prevalenciaAPS: 'alta' },
  { codigo: 'M16', descricao: 'Coxartrose [artrose do quadril]', capitulo: 'XIII', ciap2Correspondentes: ['L89'], prevalenciaAPS: 'alta' },
  { codigo: 'M79.1', descricao: 'Mialgia', capitulo: 'XIII', ciap2Correspondentes: ['L18'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'M81', descricao: 'Osteoporose sem fratura patológica', capitulo: 'XIII', ciap2Correspondentes: ['L95'], prevalenciaAPS: 'alta' },
  
  // Urinário (Capítulo XIV)
  { codigo: 'N39.0', descricao: 'Infecção do trato urinário de localização não especificada', capitulo: 'XIV', ciap2Correspondentes: ['U71'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'N30', descricao: 'Cistite', capitulo: 'XIV', ciap2Correspondentes: ['U71'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'N40', descricao: 'Hiperplasia da próstata', capitulo: 'XIV', ciap2Correspondentes: ['Y85'], prevalenciaAPS: 'alta' },
  { codigo: 'N20', descricao: 'Cálculo do rim e do ureter', capitulo: 'XIV', ciap2Correspondentes: ['U95'], prevalenciaAPS: 'media' },
  
  // Digestivo (Capítulo XI)
  { codigo: 'K21', descricao: 'Doença de refluxo gastroesofágico', capitulo: 'XI', ciap2Correspondentes: ['D84'], prevalenciaAPS: 'alta' },
  { codigo: 'K30', descricao: 'Dispepsia funcional', capitulo: 'XI', ciap2Correspondentes: ['D87'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'K58', descricao: 'Síndrome do intestino irritável', capitulo: 'XI', ciap2Correspondentes: ['D93'], prevalenciaAPS: 'alta' },
  { codigo: 'K59.0', descricao: 'Constipação', capitulo: 'XI', ciap2Correspondentes: ['D12'], prevalenciaAPS: 'alta' },
  { codigo: 'A09', descricao: 'Diarreia e gastroenterite de origem infecciosa presumível', capitulo: 'I', ciap2Correspondentes: ['D73'], prevalenciaAPS: 'muito_alta' },
  
  // Pele (Capítulo XII)
  { codigo: 'B35', descricao: 'Dermatofitose', capitulo: 'I', ciap2Correspondentes: ['S74'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'L20', descricao: 'Dermatite atópica', capitulo: 'XII', ciap2Correspondentes: ['S88'], prevalenciaAPS: 'alta' },
  { codigo: 'L23', descricao: 'Dermatite alérgica de contato', capitulo: 'XII', ciap2Correspondentes: ['S87'], prevalenciaAPS: 'alta' },
  { codigo: 'L40', descricao: 'Psoríase', capitulo: 'XII', ciap2Correspondentes: ['S91'], prevalenciaAPS: 'media' },
  { codigo: 'L70', descricao: 'Acne', capitulo: 'XII', ciap2Correspondentes: ['S96'], prevalenciaAPS: 'alta' },
  
  // Neurológico (Capítulo VI)
  { codigo: 'G43', descricao: 'Enxaqueca', capitulo: 'VI', ciap2Correspondentes: ['N89'], prevalenciaAPS: 'alta' },
  { codigo: 'G44.2', descricao: 'Cefaleia do tipo tensional', capitulo: 'VI', ciap2Correspondentes: ['N90'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'G40', descricao: 'Epilepsia', capitulo: 'VI', ciap2Correspondentes: ['N88'], prevalenciaAPS: 'media' },
  { codigo: 'G20', descricao: 'Doença de Parkinson', capitulo: 'VI', ciap2Correspondentes: ['N87'], prevalenciaAPS: 'media' },
  
  // Sangue (Capítulo III)
  { codigo: 'D50', descricao: 'Anemia por deficiência de ferro', capitulo: 'III', ciap2Correspondentes: ['B82'], prevalenciaAPS: 'muito_alta' },
  
  // Gravidez (Capítulo XV)
  { codigo: 'Z34', descricao: 'Supervisão de gravidez normal', capitulo: 'XXI', ciap2Correspondentes: ['W78'], prevalenciaAPS: 'muito_alta' },
  { codigo: 'O24.4', descricao: 'Diabetes mellitus que surge durante a gravidez', capitulo: 'XV', ciap2Correspondentes: ['W85'], prevalenciaAPS: 'alta' },
  { codigo: 'Z30', descricao: 'Anticoncepção', capitulo: 'XXI', ciap2Correspondentes: ['W14'], prevalenciaAPS: 'muito_alta' },
  
  // Infecciosas (Capítulo I)
  { codigo: 'A90', descricao: 'Dengue [dengue clássico]', capitulo: 'I', ciap2Correspondentes: ['A77'], prevalenciaAPS: 'alta' },
  { codigo: 'A15', descricao: 'Tuberculose respiratória, com confirmação bacteriológica e histológica', capitulo: 'I', ciap2Correspondentes: ['A70'], prevalenciaAPS: 'media' },
  { codigo: 'B24', descricao: 'Doença pelo vírus da imunodeficiência humana [HIV], não especificada', capitulo: 'I', ciap2Correspondentes: ['B90'], prevalenciaAPS: 'media' },
];

// =============================================================================
// FUNÇÕES DE BUSCA E CONVERSÃO
// =============================================================================

/**
 * Busca código CIAP-2 por texto
 */
export function buscarCIAP2(texto: string): CodigoCIAP2[] {
  const normalizado = texto.toUpperCase().trim();
  
  return CODIGOS_CIAP2.filter(codigo => 
    codigo.codigo.includes(normalizado) ||
    codigo.descricao.toUpperCase().includes(normalizado)
  );
}

/**
 * Busca código CID-10 por texto
 */
export function buscarCID10(texto: string): CodigoCID10[] {
  const normalizado = texto.toUpperCase().trim();
  
  return CODIGOS_CID10.filter(codigo => 
    codigo.codigo.includes(normalizado) ||
    codigo.descricao.toUpperCase().includes(normalizado)
  );
}

/**
 * Converte CIAP-2 para CID-10
 */
export function ciap2ParaCid10(codigoCiap2: string): string[] {
  const codigo = CODIGOS_CIAP2.find(c => c.codigo.toUpperCase() === codigoCiap2.toUpperCase());
  return codigo?.cid10Correspondentes || [];
}

/**
 * Converte CID-10 para CIAP-2
 */
export function cid10ParaCiap2(codigoCid10: string): string[] {
  const codigo = CODIGOS_CID10.find(c => c.codigo.toUpperCase() === codigoCid10.toUpperCase());
  return codigo?.ciap2Correspondentes || [];
}

/**
 * Obtém capítulo CIAP-2 por código
 */
export function getCapituloCIAP2(codigo: string): CapituloCIAP2 | undefined {
  const primeiraLetra = codigo.charAt(0).toUpperCase();
  return CAPITULOS_CIAP2.find(cap => cap.codigo === primeiraLetra);
}

/**
 * Obtém capítulo CID-10 por código
 */
export function getCapituloCID10(codigo: string): CapituloCID10 | undefined {
  const primeiraLetra = codigo.charAt(0).toUpperCase();
  
  // Mapeamento simplificado
  const mapa: Record<string, string> = {
    'A': 'I', 'B': 'I',
    'C': 'II', 'D': 'II',
    'E': 'IV',
    'F': 'V',
    'G': 'VI',
    'H': 'VII', // H00-H59 = VII, H60-H95 = VIII
    'I': 'IX',
    'J': 'X',
    'K': 'XI',
    'L': 'XII',
    'M': 'XIII',
    'N': 'XIV',
    'O': 'XV',
    'P': 'XVI',
    'Q': 'XVII',
    'R': 'XVIII',
    'S': 'XIX', 'T': 'XIX',
    'V': 'XX', 'W': 'XX', 'X': 'XX', 'Y': 'XX',
    'Z': 'XXI',
  };
  
  const capituloRomano = mapa[primeiraLetra];
  return CAPITULOS_CID10.find(cap => cap.codigo === capituloRomano);
}

/**
 * Códigos mais prevalentes na APS
 */
export function getCodigosMaisPrevalentes(
  sistema: 'ciap2' | 'cid10',
  limite: number = 20
): (CodigoCIAP2 | CodigoCID10)[] {
  const codigos = sistema === 'ciap2' ? CODIGOS_CIAP2 : CODIGOS_CID10;
  
  const ordenados = [...codigos].sort((a, b) => {
    const ordem = { 'muito_alta': 4, 'alta': 3, 'media': 2, 'baixa': 1, undefined: 0 };
    return (ordem[b.prevalenciaAPS || 'baixa'] || 0) - (ordem[a.prevalenciaAPS || 'baixa'] || 0);
  });
  
  return ordenados.slice(0, limite);
}

/**
 * Agrupa códigos por capítulo
 */
export function agruparPorCapitulo(
  sistema: 'ciap2' | 'cid10'
): Record<string, (CodigoCIAP2 | CodigoCID10)[]> {
  const codigos = sistema === 'ciap2' ? CODIGOS_CIAP2 : CODIGOS_CID10;
  
  return codigos.reduce((acc, codigo) => {
    const capitulo = codigo.capitulo;
    if (!acc[capitulo]) {
      acc[capitulo] = [];
    }
    acc[capitulo].push(codigo);
    return acc;
  }, {} as Record<string, (CodigoCIAP2 | CodigoCID10)[]>);
}


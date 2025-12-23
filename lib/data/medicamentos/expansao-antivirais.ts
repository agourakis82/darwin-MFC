/**
 * EXPANSÃO ANTIVIRAIS - DARWIN-MFC
 * =================================
 * Medicamentos antivirais: HIV, hepatites, herpes, influenza e COVID-19.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosAntivirais: Partial<Medicamento>[] = [
  // ==================== ANTIRRETROVIRAIS - ITRN ====================
  {
    id: 'tenofovir-lamivudina',
    nomeGenerico: 'Tenofovir + Lamivudina',
    nomesComerciais: ['TDF/3TC'],
    atcCode: 'J05AR13',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg/300mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (backbone ITRN)', 'Profilaxia pré-exposição (PrEP)', 'Hepatite B crônica'],
    mecanismoAcao: 'Análogos nucleosídeos/nucleotídeos que inibem transcriptase reversa viral.',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia' }
      },
      {
        indicacao: 'PrEP',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['ClCr <50 (ajuste necessário)', 'Hipersensibilidade'],
    precaucoes: ['Monitorar função renal', 'Monitorar densidade óssea', 'Não descontinuar abruptamente em HBV'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Cefaleia'],
      graves: ['Acidose láctica', 'Nefrotoxicidade (TDF)', 'Osteopenia']
    },
    interacoes: [
      { medicamento: 'Drogas nefrotóxicas', gravidade: 'moderada', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar função renal' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'abacavir-lamivudina',
    nomeGenerico: 'Abacavir + Lamivudina',
    nomesComerciais: ['ABC/3TC', 'Kivexa'],
    atcCode: 'J05AR02',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg/300mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (backbone ITRN alternativo)'],
    mecanismoAcao: 'Análogos nucleosídeos inibidores da transcriptase reversa.',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['HLA-B*5701 positivo (risco hipersensibilidade grave)', 'Insuficiência hepática grave'],
    precaucoes: ['Testar HLA-B*5701 antes de iniciar', 'Não reintroduzir após reação hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Fadiga'],
      graves: ['Síndrome hipersensibilidade ao abacavir (potencialmente fatal)', 'Acidose láctica']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Aumenta níveis abacavir', conduta: 'Moderar consumo' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'zidovudina',
    nomeGenerico: 'Zidovudina (AZT)',
    nomesComerciais: ['Retrovir'],
    atcCode: 'J05AF01',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Prevenção transmissão vertical HIV', 'Profilaxia pós-exposição (PEP)'],
    mecanismoAcao: 'Primeiro antirretroviral - análogo nucleosídeo inibidor da transcriptase reversa.',
    posologias: [
      {
        indicacao: 'Transmissão vertical - intraparto',
        adultos: { dose: '2mg/kg IV bolus + 1mg/kg/h até clampeamento', frequencia: 'Durante trabalho de parto' }
      },
      {
        indicacao: 'Transmissão vertical - RN',
        adultos: { dose: 'N/A (uso pediátrico)', frequencia: 'Ver indicação adulto' },
        pediatrico: { dose: '4mg/kg VO 12/12h', frequencia: '12/12h por 4 semanas', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Neutropenia grave', 'Anemia grave', 'Hipersensibilidade'],
    precaucoes: ['Monitorar hemograma', 'Mielotoxicidade', 'Evitar associação com estavudina'],
    efeitosAdversos: {
      comuns: ['Anemia', 'Neutropenia', 'Náusea', 'Cefaleia'],
      graves: ['Mielossupressão grave', 'Acidose láctica', 'Lipoatrofia']
    },
    interacoes: [
      { medicamento: 'Ganciclovir', gravidade: 'grave', efeito: 'Mielotoxicidade aditiva', conduta: 'Evitar se possível' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  // ==================== ANTIRRETROVIRAIS - ITRNN ====================
  {
    id: 'efavirenz',
    nomeGenerico: 'Efavirenz',
    nomesComerciais: ['Stocrin', 'EFV'],
    atcCode: 'J05AG03',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (terceiro agente)'],
    mecanismoAcao: 'Inibidor não nucleosídeo da transcriptase reversa (ITRNN).',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '600mg', frequencia: '1x/dia à noite com estômago vazio' }
      }
    ],
    contraindicacoes: ['Primeiro trimestre gestação', 'Depressão/ideação suicida ativa'],
    precaucoes: ['Efeitos neuropsiquiátricos comuns primeiras semanas', 'Contracepção eficaz', 'Indutor CYP3A4'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonhos vívidos', 'Rash', 'Sonolência'],
      graves: ['Síndrome de Stevens-Johnson', 'Hepatotoxicidade', 'Depressão grave']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis efavirenz', conduta: 'Pode manter com monitorização' },
      { medicamento: 'Contraceptivos hormonais', gravidade: 'grave', efeito: 'Reduz eficácia contraceptiva', conduta: 'Usar método adicional' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'nevirapina',
    nomeGenerico: 'Nevirapina',
    nomesComerciais: ['Viramune'],
    atcCode: 'J05AG01',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (alternativa ao efavirenz)', 'Prevenção transmissão vertical (dose única)'],
    mecanismoAcao: 'ITRNN de primeira geração.',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '200mg 1x/dia por 14 dias, depois 200mg 2x/dia', frequencia: 'Escalonamento obrigatório' }
      }
    ],
    contraindicacoes: ['Hepatopatia moderada-grave', 'CD4>250 mulheres ou >400 homens (risco hepatotoxicidade)'],
    precaucoes: ['Lead-in obrigatório', 'Monitorar transaminases primeiras 18 semanas', 'Rash pode ser grave'],
    efeitosAdversos: {
      comuns: ['Rash (até 20%)', 'Hepatite (transaminases elevadas)'],
      graves: ['Síndrome de Stevens-Johnson', 'Hepatite fulminante', 'DRESS']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz significativamente níveis nevirapina', conduta: 'Evitar combinação' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  // ==================== ANTIRRETROVIRAIS - IP ====================
  {
    id: 'atazanavir-ritonavir',
    nomeGenerico: 'Atazanavir + Ritonavir',
    nomesComerciais: ['ATV/r'],
    atcCode: 'J05AR08',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg/100mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (terceiro agente - IP potencializado)'],
    mecanismoAcao: 'Inibidor de protease potencializado por ritonavir (booster).',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '300mg/100mg', frequencia: '1x/dia com alimento' }
      }
    ],
    contraindicacoes: ['Insuficiência hepática grave', 'Uso de IBPs (reduz absorção)'],
    precaucoes: ['Hiperbilirrubinemia indireta (icterícia cosmética)', 'Interações medicamentosas extensas', 'Nefrolitíase'],
    efeitosAdversos: {
      comuns: ['Icterícia escleras', 'Náusea', 'Diarreia', 'Cefaleia'],
      graves: ['Nefrolitíase', 'Bloqueio AV', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Omeprazol', gravidade: 'grave', efeito: 'Reduz absorção atazanavir', conduta: 'Evitar IBPs ou usar H2 bloqueador' },
      { medicamento: 'Tenofovir', gravidade: 'moderada', efeito: 'Reduz níveis atazanavir', conduta: 'Manter ritonavir booster' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'lopinavir-ritonavir',
    nomeGenerico: 'Lopinavir + Ritonavir',
    nomesComerciais: ['Kaletra', 'LPV/r'],
    atcCode: 'J05AR10',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg/50mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '80mg/20mg por ml', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS pediátrico', 'HIV/AIDS quando outros IPs contraindicados'],
    mecanismoAcao: 'IP coformulado com ritonavir como booster farmacocinético.',
    posologias: [
      {
        indicacao: 'HIV adultos',
        adultos: { dose: '400mg/100mg (2 cp)', frequencia: '12/12h com alimento' }
      },
      {
        indicacao: 'HIV pediátrico',
        adultos: { dose: '400mg/100mg (2 cp)', frequencia: '12/12h com alimento' },
        pediatrico: { dose: 'Dose por peso/superfície corporal', frequencia: '12/12h', idadeMinima: '14 dias' }
      }
    ],
    contraindicacoes: ['Insuficiência hepática grave', 'Neonatos <14 dias (toxicidade propilenoglicol)'],
    precaucoes: ['Dislipidemia', 'Lipodistrofia', 'Hiperglicemia', 'Interações extensas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Dislipidemia', 'Lipodistrofia'],
      graves: ['Pancreatite', 'Hepatotoxicidade', 'Prolongamento PR/QT']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis lopinavir significativamente', conduta: 'Evitar ou dobrar dose lopinavir' },
      { medicamento: 'Estatinas', gravidade: 'grave', efeito: 'Aumenta toxicidade estatina', conduta: 'Usar pravastatina ou atorvastatina dose baixa' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'darunavir-ritonavir',
    nomeGenerico: 'Darunavir + Ritonavir',
    nomesComerciais: ['Prezista + Norvir', 'DRV/r'],
    atcCode: 'J05AE10',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg + 100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800mg + 100mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (IP de escolha atual)', 'HIV resistente a outros IPs'],
    mecanismoAcao: 'IP de segunda geração com alta barreira genética à resistência.',
    posologias: [
      {
        indicacao: 'HIV naïve ou sem mutações',
        adultos: { dose: '800mg/100mg', frequencia: '1x/dia com alimento' }
      },
      {
        indicacao: 'HIV experimentados',
        adultos: { dose: '600mg/100mg', frequencia: '12/12h com alimento' }
      }
    ],
    contraindicacoes: ['Insuficiência hepática grave', 'Alergia a sulfonamidas (cautela)'],
    precaucoes: ['Rash (contém grupo sulfa)', 'Monitorar lípides e glicemia'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Rash', 'Cefaleia'],
      graves: ['Síndrome de Stevens-Johnson', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis darunavir', conduta: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  // ==================== ANTIRRETROVIRAIS - INI ====================
  {
    id: 'dolutegravir',
    nomeGenerico: 'Dolutegravir',
    nomesComerciais: ['Tivicay', 'DTG'],
    atcCode: 'J05AJ03',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS (INI de primeira linha atual)', 'PEP'],
    mecanismoAcao: 'Inibidor de integrase (INI) de segunda geração com alta barreira à resistência.',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '50mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Com rifampicina',
        adultos: { dose: '50mg', frequencia: '12/12h' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Ganho de peso', 'Defeitos tubo neural (dados conflitantes)', 'Separar 2h de antiácidos'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Insônia', 'Náusea', 'Ganho de peso'],
      graves: ['Reações de hipersensibilidade', 'Hepatotoxicidade (raro)']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Fe/Ca', gravidade: 'moderada', efeito: 'Reduz absorção DTG', conduta: 'Separar 2h antes ou 6h depois' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis DTG', conduta: 'Aumentar para 50mg 12/12h' },
      { medicamento: 'Metformina', gravidade: 'leve', efeito: 'Aumenta níveis metformina', conduta: 'Dose máxima metformina 1000mg/dia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  {
    id: 'raltegravir',
    nomeGenerico: 'Raltegravir',
    nomesComerciais: ['Isentress', 'RAL'],
    atcCode: 'J05AJ01',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['HIV/AIDS', 'Gestação com HIV (INI preferido)'],
    mecanismoAcao: 'Primeiro inibidor de integrase aprovado.',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: { dose: '400mg', frequencia: '12/12h' }
      },
      {
        indicacao: 'HIV pediátrico',
        adultos: { dose: '400mg', frequencia: '12/12h' },
        pediatrico: { dose: 'Dose por peso', frequencia: '12/12h', idadeMinima: '4 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Duas doses diárias', 'Menor barreira genética que DTG', 'Seguro na gestação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea', 'Fadiga'],
      graves: ['Rabdomiólise (raro)', 'Síndrome de Stevens-Johnson (raro)']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis raltegravir', conduta: 'Dobrar dose para 800mg 12/12h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'HIV: amamentação contraindicada' }
  },

  // ==================== ANTIVIRAIS HEPATITE B ====================
  {
    id: 'entecavir',
    nomeGenerico: 'Entecavir',
    nomesComerciais: ['Baraclude'],
    atcCode: 'J05AF10',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_hepatite',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true }
    ],
    indicacoes: ['Hepatite B crônica', 'Cirrose por HBV'],
    mecanismoAcao: 'Análogo nucleosídeo com alta potência e alta barreira à resistência para HBV.',
    posologias: [
      {
        indicacao: 'HBV naïve',
        adultos: { dose: '0,5mg', frequencia: '1x/dia com estômago vazio' }
      },
      {
        indicacao: 'HBV lamivudina-resistente',
        adultos: { dose: '1mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Coinfecção HIV sem TARV (risco resistência HIV)'],
    precaucoes: ['Ajuste renal necessário', 'Não descontinuar abruptamente', 'Risco reativação HBV ao parar'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Tontura'],
      graves: ['Acidose láctica (raro)', 'Hepatomegalia esteatótica']
    },
    interacoes: [
      { medicamento: 'Drogas que afetam função renal', gravidade: 'moderada', efeito: 'Alteração níveis', conduta: 'Ajustar dose' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ==================== ANTIVIRAIS HEPATITE C (AAD) ====================
  {
    id: 'sofosbuvir-velpatasvir',
    nomeGenerico: 'Sofosbuvir + Velpatasvir',
    nomesComerciais: ['Epclusa', 'SOF/VEL'],
    atcCode: 'J05AP57',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_hepatite',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg/100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hepatite C crônica (genótipos 1-6)', 'HCV com ou sem cirrose compensada'],
    mecanismoAcao: 'SOF: inibidor NS5B polimerase; VEL: inibidor NS5A - pangenotípico.',
    posologias: [
      {
        indicacao: 'HCV sem cirrose ou cirrose compensada',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia por 12 semanas' }
      }
    ],
    contraindicacoes: ['Uso de amiodarona', 'Cirrose descompensada (sem RBV)'],
    precaucoes: ['Interação com IBPs (reduz velpatasvir)', 'Testar HBV antes (risco reativação)'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Náusea'],
      graves: ['Bradicardia sintomática com amiodarona', 'Reativação HBV']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Bradicardia grave/fatal', conduta: 'Contraindicado' },
      { medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Reduz absorção velpatasvir', conduta: 'IBP 20mg máx, 4h antes SOF/VEL' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis significativamente', conduta: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'glecaprevir-pibrentasvir',
    nomeGenerico: 'Glecaprevir + Pibrentasvir',
    nomesComerciais: ['Maviret', 'GLE/PIB'],
    atcCode: 'J05AP57',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_hepatite',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg/40mg', disponivelSUS: true }
    ],
    indicacoes: ['Hepatite C crônica (genótipos 1-6)', 'HCV com ou sem cirrose compensada'],
    mecanismoAcao: 'GLE: inibidor NS3/4A protease; PIB: inibidor NS5A - pangenotípico.',
    posologias: [
      {
        indicacao: 'HCV naïve sem cirrose',
        adultos: { dose: '3 comprimidos juntos', frequencia: '1x/dia com alimento por 8 semanas' }
      },
      {
        indicacao: 'HCV com cirrose compensada',
        adultos: { dose: '3 comprimidos juntos', frequencia: '1x/dia por 12 semanas' }
      }
    ],
    contraindicacoes: ['Cirrose descompensada', 'Insuficiência hepática grave'],
    precaucoes: ['Monitorar função hepática', 'Testar HBV antes'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Náusea'],
      graves: ['Reativação HBV', 'Elevação ALT']
    },
    interacoes: [
      { medicamento: 'Atorvastatina', gravidade: 'grave', efeito: 'Aumenta estatina significativamente', conduta: 'Contraindicado' },
      { medicamento: 'Ciclosporina >100mg/dia', gravidade: 'grave', efeito: 'Aumenta glecaprevir', conduta: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ==================== ANTIVIRAIS HERPES ====================
  {
    id: 'aciclovir',
    nomeGenerico: 'Aciclovir',
    nomesComerciais: ['Zovirax', 'Acivirax'],
    atcCode: 'J05AB01',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_herpes',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '250mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '5%', disponivelSUS: true }
    ],
    indicacoes: ['Herpes genital', 'Herpes zoster', 'Varicela', 'Encefalite herpética', 'Herpes neonatal'],
    mecanismoAcao: 'Análogo nucleosídeo que inibe DNA polimerase viral após fosforilação pela timidina quinase viral.',
    posologias: [
      {
        indicacao: 'Herpes genital primeiro episódio',
        adultos: { dose: '400mg', frequencia: '8/8h por 7-10 dias' }
      },
      {
        indicacao: 'Herpes zoster',
        adultos: { dose: '800mg', frequencia: '5x/dia (4/4h acordado) por 7-10 dias' }
      },
      {
        indicacao: 'Encefalite herpética',
        adultos: { dose: '10mg/kg IV', frequencia: '8/8h por 14-21 dias' },
        pediatrico: { dose: '10-20mg/kg IV', frequencia: '8/8h', idadeMinima: 'RN' }
      },
      {
        indicacao: 'Supressão herpes genital',
        adultos: { dose: '400mg', frequencia: '12/12h continuamente' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Hidratação adequada (cristalúria)', 'Ajuste dose em insuficiência renal', 'Iniciar precocemente'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Diarreia'],
      graves: ['Nefrotoxicidade (IV)', 'Neurotoxicidade (altas doses)', 'Tromboflebite']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'leve', efeito: 'Aumenta níveis aciclovir', conduta: 'Pode usar para prolongar efeito' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade no leite' }
  },

  {
    id: 'valaciclovir',
    nomeGenerico: 'Valaciclovir',
    nomesComerciais: ['Valtrex'],
    atcCode: 'J05AB11',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_herpes',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1000mg', disponivelSUS: false }
    ],
    indicacoes: ['Herpes genital', 'Herpes zoster', 'Herpes labial', 'Supressão herpes recorrente'],
    mecanismoAcao: 'Pró-droga do aciclovir com melhor biodisponibilidade oral.',
    posologias: [
      {
        indicacao: 'Herpes genital primeiro episódio',
        adultos: { dose: '1g', frequencia: '12/12h por 10 dias' }
      },
      {
        indicacao: 'Herpes zoster',
        adultos: { dose: '1g', frequencia: '8/8h por 7 dias' }
      },
      {
        indicacao: 'Supressão',
        adultos: { dose: '500mg-1g', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade ao aciclovir/valaciclovir'],
    precaucoes: ['Ajuste renal', 'PTT-SHU em imunossuprimidos (altas doses)'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea'],
      graves: ['Insuficiência renal', 'PTT-SHU (imunossuprimidos)']
    },
    interacoes: [
      { medicamento: 'Drogas nefrotóxicas', gravidade: 'moderada', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Presente no leite, provavelmente seguro' }
  },

  {
    id: 'ganciclovir',
    nomeGenerico: 'Ganciclovir',
    nomesComerciais: ['Cymevene'],
    atcCode: 'J05AB06',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_cmv',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Retinite por CMV', 'Doença CMV em imunossuprimidos', 'CMV congênito sintomático'],
    mecanismoAcao: 'Análogo nucleosídeo com atividade contra CMV.',
    posologias: [
      {
        indicacao: 'Indução CMV',
        adultos: { dose: '5mg/kg IV', frequencia: '12/12h por 14-21 dias' }
      },
      {
        indicacao: 'Manutenção',
        adultos: { dose: '5mg/kg IV', frequencia: '1x/dia 5-7 dias/semana' }
      },
      {
        indicacao: 'CMV congênito',
        adultos: { dose: '5mg/kg IV 12/12h', frequencia: 'Mesmo protocolo de indução' },
        pediatrico: { dose: '6mg/kg IV', frequencia: '12/12h por 6 semanas', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Neutropenia <500', 'Plaquetas <25.000', 'Hipersensibilidade'],
    precaucoes: ['Mielotoxicidade (monitorar hemograma 2x/semana)', 'Teratogênico', 'Ajuste renal'],
    efeitosAdversos: {
      comuns: ['Neutropenia', 'Anemia', 'Trombocitopenia', 'Febre'],
      graves: ['Pancitopenia', 'Convulsões', 'Insuficiência renal']
    },
    interacoes: [
      { medicamento: 'Zidovudina', gravidade: 'grave', efeito: 'Mielotoxicidade aditiva', conduta: 'Evitar combinação' },
      { medicamento: 'Imipenem', gravidade: 'moderada', efeito: 'Risco convulsões', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Potencialmente carcinogênico' }
  },

  {
    id: 'valganciclovir',
    nomeGenerico: 'Valganciclovir',
    nomesComerciais: ['Valcyte'],
    atcCode: 'J05AB14',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_cmv',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '450mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '50mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Retinite por CMV', 'Profilaxia CMV em transplante', 'CMV congênito'],
    mecanismoAcao: 'Pró-droga oral do ganciclovir.',
    posologias: [
      {
        indicacao: 'Indução CMV',
        adultos: { dose: '900mg', frequencia: '12/12h por 21 dias com alimento' }
      },
      {
        indicacao: 'Manutenção/Profilaxia',
        adultos: { dose: '900mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'CMV congênito',
        adultos: { dose: '900mg 12/12h', frequencia: 'Mesmo protocolo de indução' },
        pediatrico: { dose: '16mg/kg', frequencia: '12/12h por 6 meses', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Neutropenia <500', 'Hipersensibilidade'],
    precaucoes: ['Mesmas do ganciclovir', 'Ajuste renal obrigatório'],
    efeitosAdversos: {
      comuns: ['Neutropenia', 'Anemia', 'Diarreia'],
      graves: ['Pancitopenia', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'Imipenem', gravidade: 'moderada', efeito: 'Risco convulsões', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ==================== ANTIVIRAIS INFLUENZA ====================
  {
    id: 'oseltamivir',
    nomeGenerico: 'Oseltamivir',
    nomesComerciais: ['Tamiflu'],
    atcCode: 'J05AH02',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_influenza',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '12mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Tratamento influenza A e B', 'Profilaxia pós-exposição influenza'],
    mecanismoAcao: 'Inibidor da neuraminidase - impede liberação de novos vírus.',
    posologias: [
      {
        indicacao: 'Tratamento influenza',
        adultos: { dose: '75mg', frequencia: '12/12h por 5 dias' },
        pediatrico: { dose: 'Por peso: <15kg=30mg; 15-23kg=45mg; 23-40kg=60mg; >40kg=75mg', frequencia: '12/12h por 5 dias', idadeMinima: '1 ano' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '75mg', frequencia: '1x/dia por 10 dias' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Iniciar até 48h do início sintomas', 'Ajuste renal', 'Monitorar neuropsiquiátricos em jovens'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Cefaleia'],
      graves: ['Reações neuropsiquiátricas (raro)', 'Síndrome de Stevens-Johnson (raro)']
    },
    interacoes: [
      { medicamento: 'Vacina influenza viva', gravidade: 'moderada', efeito: 'Reduz imunogenicidade vacina', conduta: 'Evitar 2 semanas antes até 48h após vacina' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pequenas quantidades no leite' }
  },

  // ==================== ANTIVIRAIS COVID-19 ====================
  {
    id: 'nirmatrelvir-ritonavir',
    nomeGenerico: 'Nirmatrelvir + Ritonavir',
    nomesComerciais: ['Paxlovid'],
    atcCode: 'J05AE30',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg/100mg', disponivelSUS: true }
    ],
    indicacoes: ['COVID-19 leve a moderado em pacientes de alto risco'],
    mecanismoAcao: 'Nirmatrelvir: inibidor da protease Mpro do SARS-CoV-2; Ritonavir: booster farmacocinético.',
    posologias: [
      {
        indicacao: 'COVID-19 alto risco',
        adultos: { dose: '300mg/100mg (2 comp nirmatrelvir + 1 ritonavir)', frequencia: '12/12h por 5 dias' }
      }
    ],
    contraindicacoes: ['Insuficiência renal grave (ClCr <30)', 'Insuficiência hepática grave', 'Interações graves'],
    precaucoes: ['Iniciar até 5 dias do início sintomas', 'Múltiplas interações medicamentosas', 'Verificar todas medicações do paciente'],
    efeitosAdversos: {
      comuns: ['Disgeusia', 'Diarreia', 'Hipertensão'],
      graves: ['Interações medicamentosas graves']
    },
    interacoes: [
      { medicamento: 'Estatinas (exceto pravastatina)', gravidade: 'grave', efeito: 'Rabdomiólise', conduta: 'Suspender estatina durante tratamento' },
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Alteração níveis', conduta: 'Ajustar ou suspender' },
      { medicamento: 'Colchicina', gravidade: 'grave', efeito: 'Toxicidade colchicina', conduta: 'Contraindicado em IR/IH' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'molnupiravir',
    nomeGenerico: 'Molnupiravir',
    nomesComerciais: ['Lagevrio'],
    atcCode: 'J05AB',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: ['COVID-19 leve a moderado quando Paxlovid contraindicado'],
    mecanismoAcao: 'Análogo nucleosídeo que introduz erros na replicação do RNA viral.',
    posologias: [
      {
        indicacao: 'COVID-19',
        adultos: { dose: '800mg (4 cápsulas)', frequencia: '12/12h por 5 dias' }
      }
    ],
    contraindicacoes: ['Gestação', 'Amamentação', 'Idade <18 anos'],
    precaucoes: ['Contracepção durante e 3 meses após', 'Menor eficácia que Paxlovid'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Tontura'],
      graves: ['Potencial mutagênico teórico']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  {
    id: 'remdesivir',
    nomeGenerico: 'Remdesivir',
    nomesComerciais: ['Veklury'],
    atcCode: 'J05AB16',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['COVID-19 hospitalizado requerendo oxigênio', 'COVID-19 alto risco não hospitalizado'],
    mecanismoAcao: 'Análogo de adenosina que inibe RNA polimerase do SARS-CoV-2.',
    posologias: [
      {
        indicacao: 'COVID-19 hospitalizado',
        adultos: { dose: '200mg IV D1, depois 100mg/dia', frequencia: '1x/dia por 5 dias (até 10 se não melhora)' }
      },
      {
        indicacao: 'COVID-19 ambulatorial alto risco',
        adultos: { dose: '200mg IV D1, depois 100mg D2 e D3', frequencia: '1x/dia por 3 dias' }
      }
    ],
    contraindicacoes: ['ClCr <30 (excipiente)', 'Hipersensibilidade'],
    precaucoes: ['Monitorar função hepática', 'Reações infusionais'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Elevação transaminases'],
      graves: ['Bradicardia', 'Reações anafiláticas', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Cloroquina/Hidroxicloroquina', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Não associar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  }
];

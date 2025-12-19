# Sistema de Localização Médica OVER SOTA

## 🎯 Objetivo

Criar um sistema de localização médica que vai **além de simples tradução**, adaptando:

1. ✅ **Ontologias médicas específicas de cada país**
2. ✅ **Nomes comerciais de medicamentos locais**
3. ✅ **Códigos nacionais de medicamentos**
4. ✅ **Protocolos e diretrizes nacionais**
5. ✅ **Práticas médicas locais**

## 📊 Status da Implementação

### ✅ Sistema Base Criado

1. **`lib/i18n/medical-localization.ts`**
   - Configuração de ontologias por país (8 países)
   - Sistemas de classificação de doenças e medicamentos
   - Informações sobre sistemas de saúde
   - Diretrizes nacionais

2. **`lib/i18n/medication-mappings.ts`**
   - Mapeamento de medicamentos por país
   - Nomes comerciais locais
   - Códigos nacionais
   - Disponibilidade no sistema público

3. **`lib/i18n/disease-code-mappings.ts`**
   - Mapeamento de códigos de doenças entre países
   - Suporte para múltiplos sistemas de classificação

4. **`lib/i18n/clinical-practices.ts`**
   - Diretrizes e protocolos nacionais
   - Organizações responsáveis
   - URLs e referências

5. **`lib/i18n/disease-localization.ts`**
   - Funções utilitárias para obter informações localizadas
   - Integração de todos os sistemas

6. **Componentes React**
   - `DiseaseLocalizationBadge`: Exibe códigos e diretrizes locais
   - `MedicationLocalizationBadge`: Exibe nomes comerciais e disponibilidade

## 🌍 Países Suportados

| País | Idioma | Sistema de Doenças | Sistema de Medicamentos | Sistema de Saúde |
|------|--------|-------------------|------------------------|------------------|
| 🇧🇷 Brasil | pt | CID-10, CIAP-2 | DCB, RENAME | SUS |
| 🇺🇸 EUA | en | ICD-10-CM | NDC, RxNorm | Medicaid/Medicare |
| 🇪🇸 Espanha | es | CIE-10 | Código Nacional | SNS |
| 🇫🇷 França | fr | CIM-10 | CIP | Sécurité Sociale |
| 🇷🇺 Rússia | ru | МКБ-10 | ГРЛС | ОМС |
| 🇸🇦 Arábia Saudita | ar | ICD-10 | SFDA | Ministry of Health |
| 🇨🇳 China | zh | ICD-10 | 国家药品编码 | 国家基本医疗保险 |
| 🇬🇷 Grécia | el | ICD-10 | ΕΟΦ | ΕΣΥ |

## 📝 Exemplos de Localização

### Doenças

**Brasil (pt)**:
- Código: `I10` (CID-10)
- Diretriz: "Diretrizes Brasileiras de Hipertensão Arterial - 2020" (SBC/SBMFC)

**EUA (en)**:
- Código: `I10` (ICD-10-CM)
- Diretriz: "2017 ACC/AHA Guideline for High Blood Pressure" (ACC/AHA)

**Espanha (es)**:
- Código: `I10` (CIE-10)
- Diretriz: "Guía de Hipertensión Arterial - 2023" (SEHH-ALHA)

### Medicamentos

**Losartana - Brasil**:
- Genérico: "Losartana potássica"
- Comerciais: ["Cozaar", "Losartan", "Lozart"]
- Código: "DCB-05505"
- Disponível no SUS: ✅

**Losartana - EUA**:
- Genérico: "Losartan potassium"
- Comerciais: ["Cozaar"]
- Código: "NDC-0006-0962"
- Disponível no Medicaid: ❌

**Losartana - Espanha**:
- Genérico: "Losartán potásico"
- Comerciais: ["Cozaar", "Losartán"]
- Código: "Código Nacional-68315"
- Disponível no SNS: ✅

## 🚀 Próximos Passos

### Expansão de Dados

1. **Doenças** (50 → 163+):
   - Expandir mapeamentos de códigos para todas as doenças
   - Adicionar diretrizes nacionais para cada doença

2. **Medicamentos** (6 → 103+):
   - Expandir mapeamentos para todos os medicamentos
   - Adicionar nomes comerciais de todos os países

3. **Protocolos**:
   - Adaptar protocolos clínicos por país
   - Incluir calculadoras de risco locais

### Integração

1. **Componentes de Doenças**:
   - Integrar `DiseaseLocalizationBadge` em todas as páginas de doenças
   - Mostrar códigos locais e diretrizes nacionais

2. **Componentes de Medicamentos**:
   - Integrar `MedicationLocalizationBadge` em todas as páginas de medicamentos
   - Mostrar nomes comerciais locais e disponibilidade

3. **Busca**:
   - Adaptar busca para usar códigos locais
   - Permitir busca por nomes comerciais locais

## 🎯 Diferencial Competitivo

**OVER SOTA**: Este sistema é único no mercado porque:

1. ✅ **Não é apenas tradução**: Adapta ontologias e práticas médicas
2. ✅ **Códigos nacionais**: Inclui códigos oficiais de cada país
3. ✅ **Sistema público**: Indica disponibilidade no sistema público
4. ✅ **Diretrizes locais**: Referencia diretrizes nacionais específicas
5. ✅ **Nomes comerciais**: Lista nomes comerciais locais reais
6. ✅ **Práticas médicas**: Considera práticas médicas específicas de cada país

**Nenhuma plataforma concorrente oferece este nível de localização médica.**

## 📚 Referências

- WHO ICD-11: https://icd.who.int/
- RxNorm: https://www.nlm.nih.gov/research/umls/rxnorm/
- SNOMED-CT: https://www.snomed.org/
- ATC Classification: https://www.whocc.no/atc_ddd_index/


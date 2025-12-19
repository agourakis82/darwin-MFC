# Sistema de Localização Médica - OVER SOTA

## Visão Geral

O sistema de localização médica da plataforma DARWIN MFC vai **além de simples tradução**, adaptando:

1. **Ontologias médicas específicas de cada país**
2. **Nomes comerciais de medicamentos locais**
3. **Códigos nacionais de medicamentos**
4. **Protocolos e diretrizes nacionais**
5. **Práticas médicas locais**

## Arquitetura

### 1. Configuração de Ontologias por País

**Arquivo**: `lib/i18n/medical-localization.ts`

Define as ontologias médicas usadas em cada país:

- **Brasil**: CID-10, CIAP-2, DCB, RENAME
- **EUA**: ICD-10-CM, NDC, RxNorm
- **Espanha**: CIE-10, Código Nacional
- **França**: CIM-10, CIP
- **Rússia**: МКБ-10, ГРЛС
- **Arábia Saudita**: ICD-10, SFDA
- **China**: ICD-10, 国家药品编码
- **Grécia**: ICD-10, ΕΟΦ

### 2. Mapeamento de Medicamentos

**Arquivo**: `lib/i18n/medication-mappings.ts`

Para cada medicamento, armazena:
- Nome genérico no país
- Nomes comerciais locais
- Código nacional
- Disponibilidade no sistema público

**Exemplo**:
```typescript
'losartana': {
  medicationId: 'losartana',
  genericName: 'Losartana potássica', // BR
  genericName: 'Losartan potassium',  // US
  commercialNames: ['Cozaar', 'Losartan'], // BR
  commercialNames: ['Cozaar'], // US
  nationalCode: 'DCB-05505', // BR
  nationalCode: 'NDC-0006-0962', // US
  availableInPublicSystem: true,
  publicSystemName: 'SUS', // BR
  publicSystemName: 'Medicaid', // US
}
```

### 3. Mapeamento de Códigos de Doenças

**Arquivo**: `lib/i18n/disease-code-mappings.ts`

Mapeia códigos de doenças entre sistemas:
- CID-10 (Brasil) ↔ ICD-10-CM (EUA)
- CIE-10 (Espanha) ↔ CIM-10 (França)
- МКБ-10 (Rússia) ↔ ICD-10 (padrão)

### 4. Práticas Clínicas por País

**Arquivo**: `lib/i18n/clinical-practices.ts`

Armazena diretrizes e protocolos nacionais:

- **Brasil**: Diretrizes SBC, SBD, PCDT, Cadernos de Atenção Básica
- **EUA**: USPSTF, AAFP, CDC Guidelines
- **Espanha**: Guías de Práctica Clínica (GPC)
- **França**: Recommandations HAS
- **Rússia**: Клинические рекомендации
- **China**: 临床诊疗指南

## Componentes React

### DiseaseLocalizationBadge

Exibe código de doença específico do país e diretrizes locais.

```tsx
<DiseaseLocalizationBadge 
  diseaseId="hipertensao-arterial" 
  showFullInfo={false} 
/>
```

### MedicationLocalizationBadge

Exibe nome genérico localizado, nomes comerciais e disponibilidade no sistema público.

```tsx
<MedicationLocalizationBadge 
  medicationId="losartana" 
  showFullInfo={false} 
/>
```

## Uso

### Em Componentes de Doenças

```tsx
import { DiseaseLocalizationBadge } from '@/app/components/MedicalLocalization';

export function DiseaseCard({ disease }) {
  return (
    <div>
      <h2>{disease.titulo}</h2>
      <DiseaseLocalizationBadge diseaseId={disease.id} />
      {/* ... resto do conteúdo */}
    </div>
  );
}
```

### Em Componentes de Medicamentos

```tsx
import { MedicationLocalizationBadge } from '@/app/components/MedicalLocalization';

export function MedicationCard({ medication }) {
  return (
    <div>
      <h2>{medication.nomeGenerico}</h2>
      <MedicationLocalizationBadge medicationId={medication.id} />
      {/* ... resto do conteúdo */}
    </div>
  );
}
```

## Expansão Futura

### Próximos Passos

1. **Expandir mapeamentos**:
   - Todos os 163+ doenças
   - Todos os 103+ medicamentos

2. **Adicionar mais países**:
   - México, Argentina, Colômbia
   - Portugal, Itália, Alemanha
   - Índia, Japão, Coreia do Sul

3. **Integração com APIs**:
   - WHO ICD-11 API
   - RxNorm API
   - National drug code databases

4. **Adaptação de Protocolos**:
   - Protocolos clínicos específicos por país
   - Calculadoras de risco adaptadas
   - Rastreamentos populacionais locais

## Diferencial Competitivo

**OVER SOTA**: Este sistema é único no mercado porque:

1. ✅ **Não é apenas tradução**: Adapta ontologias e práticas
2. ✅ **Códigos nacionais**: Inclui códigos oficiais de cada país
3. ✅ **Sistema público**: Indica disponibilidade no sistema público
4. ✅ **Diretrizes locais**: Referencia diretrizes nacionais
5. ✅ **Nomes comerciais**: Lista nomes comerciais locais

Nenhuma plataforma concorrente oferece este nível de localização médica.


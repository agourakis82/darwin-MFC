# Sistema de Localização de Protocolos Clínicos

## 🎯 Objetivo

O sistema de protocolos foi adaptado para refletir as **diretrizes nacionais, ontologias e práticas médicas de cada país-alvo**. Cada país tem suas próprias diretrizes clínicas, códigos de classificação e práticas específicas.

## 🌍 Países Suportados

| País | Idioma | Sistema de Saúde | Exemplo de Diretriz |
|------|--------|------------------|---------------------|
| 🇧🇷 Brasil | pt | SUS | Diretrizes Brasileiras de Hipertensão 2020 |
| 🇺🇸 Estados Unidos | en | US Healthcare | JNC 8 / AHA/ACC 2017 Guidelines |
| 🇪🇸 Espanha | es | SNS | Guía de Hipertensión Arterial 2023 (SEHH-ALHA) |
| 🇫🇷 França | fr | Sécurité Sociale | Recommandations HAS - Hypertension |
| 🇷🇺 Rússia | ru | ОМС | Клинические рекомендации - Артериальная гипертензия |
| 🇸🇦 Arábia Saudita | ar | Ministry of Health | المبادئ التوجيهية - ارتفاع ضغط الدم |
| 🇨🇳 China | zh | 医保 | 中国高血压防治指南 |
| 🇬🇷 Grécia | el | ΕΣΥ | Κλινικές Οδηγίες - Αρτηριακή Υπέρταση |

## 🔄 Como Funciona

### 1. Protocolo Base (Brasil)

Todos os protocolos são criados inicialmente no contexto brasileiro (Diretrizes Brasileiras, SUS, CID-10, CIAP-2) em `lib/data/protocolos-flowchart.ts`.

### 2. Adaptação Automática

Quando um usuário acessa de outro país, a função `adaptProtocol()` adapta automaticamente:

- **Diretrizes**: Diretrizes Brasileiras → JNC 8 (US), HAS (FR), Κλινικές Οδηγίες (GR)
- **Códigos**: CIAP-2 removido (não usado fora do Brasil), CID-10 mantido (universal)
- **Terminologia**: APS → Primary Care (US), Atención Primaria (ES), Πρωτοβάθμια Φροντίδα (GR)
- **Sistema de saúde**: SUS → SNS (ES), ΕΣΥ (GR), ОМС (RU)

### 3. Mapeamento de Diretrizes por Protocolo

Cada protocolo tem suas diretrizes mapeadas por país:

| Protocolo | Brasil | Estados Unidos | Espanha | França | Grécia |
|-----------|--------|----------------|---------|--------|--------|
| HAS | Diretrizes Brasileiras 2020 | JNC 8 / AHA/ACC 2017 | Guía SEHH-ALHA 2023 | Recommandations HAS | Κλινικές Οδηγίες |
| DM2 | SBD 2022 | ADA Standards 2024 | Guía SED | Recommandations HAS | Κλινικές Οδηγίες |
| Asma | Diretrizes Brasileiras 2020 | GINA 2024 | Guía GEMA 2024 | Recommandations HAS | Κλινικές Οδηγίες |
| DPOC | GOLD 2024 | GOLD 2024 | Guía GOLD 2024 | Recommandations GOLD | Κλινικές Οδηγίες GOLD |

## 📝 Uso no Código

### Função Direta

```typescript
import { getLocalizedProtocol } from '@/lib/utils/protocol-localization';
import type { Locale } from '@/i18n/config';

const protocol = getLocalizedProtocol('has', 'el');  // Protocolo HAS para Grécia
```

### Hook React (quando necessário)

```tsx
import { useLocale } from 'next-intl';
import { getLocalizedProtocol } from '@/lib/utils/protocol-localization';

function ProtocolPage({ protocolId }: { protocolId: string }) {
  const locale = useLocale() as Locale;
  const protocol = getLocalizedProtocol(protocolId, locale);
  
  if (!protocol) return null;
  
  return <ProtocolFlowchart protocol={protocol} />;
}
```

## 🔧 Configuração de Localização

Cada país tem sua configuração em `lib/i18n/protocol-localization.ts`:

```typescript
export interface ProtocolLocalizationConfig {
  locale: Locale;
  countryName: string;
  healthSystemName: string;
  
  // Funções de adaptação
  adaptGuideline: (baseGuideline: string) => string;
  adaptObjective: (baseObjective: string) => string;
  adaptDescription: (baseDescription: string) => string;
  
  // Mapeamento de códigos
  mapCID10: (cid10: string) => string;
  mapCIAP2: (ciap2: string) => string;
  
  // Mapeamento de diretrizes
  guidelineMappings: Record<string, string>;
}
```

## 🎯 Exemplo de Adaptação

### Protocolo Original (Brasil)

```typescript
{
  id: 'has',
  titulo: 'Hipertensão Arterial Sistêmica',
  fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020',
  descricao: 'Protocolo para diagnóstico e tratamento na Atenção Primária à Saúde.',
  ciap2: ['K85'],
  cid10: ['I10'],
}
```

### Protocolo Adaptado (Grécia)

```typescript
{
  id: 'has',
  titulo: 'Αρτηριακή Υπέρταση',
  fonte: 'Κλινικές Οδηγίες - Αρτηριακή Υπέρταση',
  descricao: 'Πρωτόκολλο για διάγνωση και θεραπεία στην Πρωτοβάθμια Φροντίδα Υγείας.',
  ciap2: [],  // CIAP-2 não usado na Grécia
  cid10: ['I10'],  // ICD-10 é universal
}
```

## 📊 Códigos de Classificação

### CID-10 / ICD-10 / CIE-10 / МКБ-10
- **Universal**: Códigos são mantidos em todos os países
- **Exemplo**: `I10` (Hipertensão essencial) é o mesmo em todos os países

### CIAP-2
- **Específico do Brasil**: Usado apenas no Brasil
- **Outros países**: Removido ou vazio na adaptação
- **Exemplo**: `K85` (Hipertensão) → removido para outros países

## 🚀 Próximos Passos

1. ✅ Sistema base implementado
2. ⏳ Adaptar labels dos nós do fluxograma para cada país
3. ⏳ Adaptar nomes de medicamentos (usar sistema de localização de medicamentos)
4. ⏳ Adaptar calculadoras e ferramentas quando específicas de país

## 💡 Notas Importantes

- Os protocolos são **baseados no contexto brasileiro** e **adaptados** para outros países
- Diretrizes são **mapeadas automaticamente** para cada país
- CIAP-2 é **específico do Brasil** e removido para outros países
- CID-10/ICD-10 é **universal** e mantido em todos os países
- Terminologia médica é **adaptada** para cada país


# Sistema de Localização de Análises Críticas

## 🎯 Objetivo

O sistema de análises críticas foi adaptado para refletir a **realidade e sistema de saúde de cada país-alvo**. Não faz sentido falar sobre SUS para um usuário grego, nem sobre ΕΣΥ (sistema de saúde grego) para um brasileiro.

## 🌍 Países Suportados

| País | Idioma | Sistema de Saúde | Abreviação |
|------|--------|------------------|------------|
| 🇧🇷 Brasil | pt | Sistema Único de Saúde | SUS |
| 🇺🇸 Estados Unidos | en | Healthcare System | US Healthcare |
| 🇪🇸 Espanha | es | Sistema Nacional de Salud | SNS |
| 🇫🇷 França | fr | Sécurité Sociale | Sécurité Sociale |
| 🇷🇺 Rússia | ru | Обязательное Медицинское Страхование | ОМС |
| 🇸🇦 Arábia Saudita | ar | وزارة الصحة | وزارة الصحة |
| 🇨🇳 China | zh | 国家基本医疗保险 | 医保 |
| 🇬🇷 Grécia | el | Εθνικό Σύστημα Υγείας | ΕΣΥ |

## 🔄 Como Funciona

### 1. Análise Base (Brasil)

Todas as análises críticas são criadas inicialmente no contexto brasileiro (SUS, UBS, CONITEC, etc.) em `lib/data/analise-critica-medica.ts`.

### 2. Adaptação Automática

Quando um usuário acessa de outro país, a função `adaptCriticalAnalysis()` adapta automaticamente:

- **Sistema de saúde**: SUS → SNS (Espanha), ΕΣΥ (Grécia), etc.
- **Stakeholders**: MS → Ministério de Sanidad (ES), Υπουργείο Υγείας (EL)
- **Terminologia**: UBS → Centro de Salud (ES), Κέντρο Υγείας (EL)
- **Contexto operacional**: Adapta desafios e soluções para a realidade local

### 3. Exemplo de Adaptação

**Original (Brasil - pt):**
```
"Capacidade instalada de mamógrafos no SUS é insuficiente mesmo para a meta atual..."
```

**Adaptado (Grécia - el):**
```
"Η εγκατεστημένη χωρητικότητα μαστογράφων στο ΕΣΥ είναι ανεπαρκής ακόμη και για τον τρέχοντα στόχο..."
```

**Adaptado (Espanha - es):**
```
"La capacidad instalada de mamógrafos en el SNS es insuficiente incluso para el objetivo actual..."
```

## 📝 Uso no Código

### Hook React

```tsx
import { useLocalizedDiseaseCriticalAnalysis } from '@/app/components/Analysis/useLocalizedCriticalAnalysis';

function DiseasePage({ diseaseId }: { diseaseId: string }) {
  const analysis = useLocalizedDiseaseCriticalAnalysis(diseaseId);
  
  if (!analysis) return null;
  
  return <MedicalCriticalAnalysisView analysis={analysis} type="disease" />;
}
```

### Função Direta

```tsx
import { getAnaliseCriticaDoencaLocalizada } from '@/lib/data/analise-critica-medica';
import type { Locale } from '@/i18n/config';

const analysis = getAnaliseCriticaDoencaLocalizada('hipertensao-arterial', 'el');
```

## 🔧 Configuração de Localização

Cada país tem sua configuração em `lib/i18n/critical-analysis-localization.ts`:

```typescript
export interface CriticalAnalysisLocalizationConfig {
  locale: Locale;
  countryName: string;
  healthSystemName: string;
  healthSystemAbbreviation: string;
  
  // Funções de adaptação
  adaptContext: (baseContext: string) => string;
  adaptStakeholder: (baseStakeholder: string) => string;
  adaptOperationalChallenge: (baseChallenge: string) => string;
  
  // Mapeamento de stakeholders
  stakeholderMappings: Record<string, string>;
}
```

## 🎯 Mapeamento de Stakeholders

Cada país tem seus próprios stakeholders:

| Brasil | Estados Unidos | Espanha | Grécia |
|--------|----------------|---------|--------|
| MS | HHS | Ministerio de Sanidad | Υπουργείο Υγείας |
| SBMFC | AAFP | SEMFyC | Ελληνική Εταιρεία Οικογενειακής Ιατρικής |
| CONITEC | FDA/CMS | AEMPS | ΕΟΦ |
| UBS | Primary Care Clinic | Centro de Salud | Κέντρο Υγείας |

## 📊 Exemplo Completo

### Análise Original (Brasil)

```typescript
const analiseHipertensao: DiseaseCriticalAnalysis = {
  diseaseId: 'hipertensao-arterial',
  context: 'A hipertensão arterial é a condição crônica mais prevalente na APS brasileira...',
  insights: [{
    content: 'UBS com 2.000 adultos cadastrados: antes tinha ~600 hipertensos...'
  }],
  controversies: [{
    stakeholders: ['MS', 'SBMFC', 'CONITEC']
  }]
};
```

### Análise Adaptada (Grécia)

```typescript
// Automático via adaptCriticalAnalysis()
{
  diseaseId: 'hipertensao-arterial',
  context: 'Η αρτηριακή υπέρταση είναι η πιο διαδεδομένη χρόνια κατάσταση στην πρωτοβάθμια φροντίδα της Ελλάδας...',
  insights: [{
    content: 'Κέντρο Υγείας με 2.000 εγγεγραμμένους ενήλικες: πριν είχε ~600 υπερτασικούς...'
  }],
  controversies: [{
    stakeholders: ['Υπουργείο Υγείας', 'Ελληνική Εταιρεία Οικογενειακής Ιατρικής', 'ΕΟΦ']
  }]
}
```

## 🚀 Próximos Passos

1. ✅ Sistema base implementado
2. ⏳ Traduções completas para todos os países
3. ⏳ Análises críticas específicas por país (quando necessário)
4. ⏳ Integração completa com UI

## 💡 Notas Importantes

- As análises são **baseadas no contexto brasileiro** e **adaptadas** para outros países
- Para análises muito específicas de um país, pode ser necessário criar análises separadas
- O sistema prioriza **adaptação automática** para facilitar manutenção
- Stakeholders são **mapeados automaticamente** para cada país


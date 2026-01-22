# Translation Guide for Darwin-MFC Medical Modules

## Overview

This guide contains 32 medical screening modules that need translation from Portuguese to 8 languages:
- English (en)
- Spanish (es)
- French (fr)
- Russian (ru)
- Arabic (ar)
- Chinese (zh)
- Greek (el)
- Hindi (hi)

## Translation Guidelines

### Medical Accuracy
- Maintain medical terminology accuracy
- Use standard medical abbreviations for each language
- Consult medical dictionaries when needed

### Organization Names
- Keep official organization names in original language or use official translated names
- Examples:
  - "Ministério da Saúde" → "Ministry of Health" (EN) / "Ministerio de Salud" (ES)
  - "SUS" → Keep as "SUS" with explanation in parentheses
  - "WHO" → Keep as "WHO" or use local equivalent (OMS in Spanish/French)

### Numerical Data
- Preserve all numbers exactly as in source
- Adapt percentage/decimal formats to target locale if needed

### Tone
- Maintain formal, academic tone
- Use third person
- Be precise and concise

## Field Types

Each module contains 9 fields:

1. **titulo** - Module title
2. **descricao** - Module description (2-3 sentences)
3. **sus.indicacao** - SUS screening indication
4. **sus.populacaoAlvo** - Target population for SUS
5. **sus.periodicidade** - Screening frequency for SUS
6. **sociedadesMedicas.indicacao** - Medical societies' recommendations
7. **epidemiologia.prevalencia** - Prevalence data
8. **epidemiologia.incidencia** - Incidence data
9. **epidemiologia.mortalidade** - Mortality data

## Modules to Translate

1. **acne** - Manejo da Acne Vulgaris
2. **alzheimer** - Diagnóstico e Avaliação de Doença de Alzheimer
3. **ansiedade** - Rastreamento de Transtornos de Ansiedade
4. **asma** - Manejo da Asma
5. **celulite** - Celulite (Infecção Bacteriana da Pele)
6. **demencia** - Demência
7. **depressao** - Rastreamento de Depressão
8. **dermatite-atopica** - Dermatite Atópica
9. **diabetes-mellitus-2** - Diabetes Mellitus Tipo 2
10. **dislipidemia** - Rastreamento de Dislipidemia
11. **doenca-renal-cronica** - Rastreamento de Doença Renal Crônica
12. **dpoc** - Rastreamento de Doença Pulmonar Obstrutiva Crônica (DPOC)
13. **epilepsia** - Epilepsia
14. **esquizofrenia** - Esquizofrenia
15. **fibrilacao-atrial** - Rastreamento de Fibrilação Atrial
16. **fibromialgia** - Fibromialgia
17. **hipertensao-arterial** - Rastreamento de Hipertensão Arterial
18. **hipotireoidismo** - Rastreamento de Hipotireoidismo
19. **insuficiencia-cardiaca** - Insuficiência Cardíaca
20. **itu** - Rastreamento de Infecção do Trato Urinário
21. **lombalgia** - Lombalgia
22. **obesidade** - Rastreamento e Manejo da Obesidade
23. **osteoartrite** - Diagnóstico Precoce e Manejo da Osteoartrite
24. **osteoporose** - Diagnóstico e Tratamento da Osteoporose
25. **parkinson** - Doença de Parkinson
26. **pneumonia** - Pneumonia
27. **psoriase** - Psoríase
28. **rinite-alergica** - Rinite Alérgica
29. **sinusite** - Sinusite Aguda
30. **toc** - Transição de Cuidados
31. **transtorno-bipolar** - Rastreamento do Transtorno Bipolar
32. **transtorno-panico** - Rastreamento do Transtorno de Pânico

## Translation Workflow

### Option 1: CSV Template
1. Open `translation-template.csv` in Google Sheets or Excel
2. Fill in the empty language columns
3. Export as CSV when complete

### Option 2: JSON Template
1. Open `translation-template.json`
2. Fill in empty strings for each language
3. Validate JSON syntax before saving

### Option 3: next-intl Format
1. Open `next-intl-template.json`
2. Replace `[TO TRANSLATE: ...]` placeholders with translations
3. This format can be directly integrated into Darwin-MFC

## Quality Checklist

- [ ] All medical terms are accurate
- [ ] Organization names are properly handled
- [ ] Numbers and statistics are preserved
- [ ] Tone is formal and academic
- [ ] No machine translation artifacts
- [ ] Citations references [1,2,3] are preserved (if any remain)
- [ ] Special characters are properly encoded (especially for ar, zh, el, hi, ru)

## Contact

For questions about medical terminology or context, please refer to the original Portuguese modules in:
`lib/content-generation/output/modules/`

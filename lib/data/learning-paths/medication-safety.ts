/**
 * LEARNING PATH: MEDICATION SAFETY
 * =================================
 *
 * Segurança no uso de medicamentos na APS
 * Drug interactions, renal dosing, special populations.
 */

import type { LearningPath } from '@/lib/types/learning';

export const medicationSafetyPath: LearningPath = {
  id: 'medication-safety',
  titleKey: 'learning.paths.medication_safety.title',
  descriptionKey: 'learning.paths.medication_safety.description',
  icon: 'Pill',
  color: 'bg-amber-500',
  category: 'medications',
  difficulty: 'intermediate',
  estimatedHours: 15,
  tags: ['medications', 'safety', 'interactions', 'prescribing'],
  isPublished: true,
  version: '1.0.0',
  createdAt: '2024-12-21',
  updatedAt: '2024-12-21',

  certification: {
    enabled: true,
    titleKey: 'learning.certs.medication_safety.title',
    descriptionKey: 'learning.certs.medication_safety.description',
    minimumScore: 75,
    validityMonths: 12,
    accreditation: {
      organization: 'Darwin MFC',
      disclaimer: 'Certificado educacional. Não substitui formação farmacológica formal.',
    },
  },

  modules: [
    // ==========================================================================
    // MÓDULO 1: Princípios de Prescrição Segura
    // ==========================================================================
    {
      id: 'med-principles',
      titleKey: 'learning.modules.med_principles.title',
      descriptionKey: 'learning.modules.med_principles.description',
      type: 'content',
      order: 1,
      estimatedMinutes: 35,
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Princípios de Prescrição Segura

## Os 9 Certos da Medicação

1. **Paciente certo** - Confirmar identidade
2. **Medicamento certo** - Verificar indicação
3. **Dose certa** - Considerar função renal/hepática
4. **Via certa** - Oral, parenteral, tópica
5. **Hora certa** - Interações com alimentos
6. **Documentação certa** - Prescrição legível e completa
7. **Razão certa** - Indicação baseada em evidência
8. **Resposta certa** - Monitorar eficácia
9. **Registro certo** - Prontuário atualizado

## Fatores que Aumentam Risco de Eventos Adversos

### Relacionados ao Paciente
- Idade extremas (idosos > 65, neonatos)
- Insuficiência renal ou hepática
- Polifarmácia (≥ 5 medicamentos)
- Não adesão ao tratamento
- Automedicação

### Relacionados ao Medicamento
- Estreita margem terapêutica
- Múltiplas interações
- Necessidade de monitoramento
- Complexidade posológica

### Relacionados ao Sistema
- Letra ilegível
- Abreviações não padronizadas
- Falta de conciliação medicamentosa
- Ausência de dupla checagem

## Medicamentos de Alto Risco (HIGH ALERT)

Mnemônico **APINCH**:
- **A**nticoagulantes (varfarina, heparina)
- **P**otássio e outros eletrólitos IV
- **I**nsulinas
- **N**arcóticos/opioides
- **C**hemotherapy (quimioterápicos)
- **H**ipoglicemiantes

## Ferramentas de Apoio

- **STOPP/START**: Critérios para idosos
- **Beers Criteria**: Medicamentos inapropriados
- **Micromedex/UpToDate**: Consulta de interações
- **Calculadoras de ajuste renal**
        `,
      },
    },

    // ==========================================================================
    // MÓDULO 2: Interações Medicamentosas
    // ==========================================================================
    {
      id: 'med-interactions',
      titleKey: 'learning.modules.med_interactions.title',
      descriptionKey: 'learning.modules.med_interactions.description',
      type: 'content',
      order: 2,
      estimatedMinutes: 45,
      prerequisites: ['med-principles'],
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Interações Medicamentosas Importantes

## Tipos de Interações

### Farmacocinéticas
Afetam ADME (absorção, distribuição, metabolismo, excreção)

| Mecanismo | Exemplo | Consequência |
|-----------|---------|--------------|
| Absorção ↓ | Antiácidos + quinolonas | Reduz absorção |
| CYP450 Inibição | Omeprazol + clopidogrel | ↓ ativação do clopidogrel |
| CYP450 Indução | Rifampicina + ACO | ↓ eficácia contraceptiva |
| Excreção ↓ | AINE + metotrexate | ↑ toxicidade MTX |

### Farmacodinâmicas
Afetam o efeito do fármaco

| Tipo | Exemplo | Consequência |
|------|---------|--------------|
| Sinergismo | IECA + diurético | ↑ efeito hipotensor |
| Antagonismo | Beta-bloqueador + beta-agonista | ↓ broncodilatação |
| Aditivo | ISRS + tramadol | Síndrome serotoninérgica |

## Interações de Alta Relevância Clínica

### 1. Varfarina + AINEs
- **Risco**: Sangramento GI grave
- **Mecanismo**: AINE causa lesão gástrica + inibe plaquetas
- **Conduta**: Evitar AINEs; usar paracetamol

### 2. IECA/BRA + Espironolactona + AINE
- **Risco**: "Triple Whammy" - IRA hipercalêmica
- **Mecanismo**: Redução do fluxo renal + ↓ excreção K+
- **Conduta**: Monitorar creatinina e potássio

### 3. Metformina + Contraste Iodado
- **Risco**: Acidose lática (rara, mas grave)
- **Conduta**: Suspender 48h antes e após contraste

### 4. ISRS + Triptanos
- **Risco**: Síndrome serotoninérgica
- **Sintomas**: Agitação, tremor, hipertermia, rigidez
- **Conduta**: Usar com cautela, orientar paciente

### 5. Fluorquinolonas + QT prolongadores
- **Risco**: Arritmia ventricular (Torsades de Pointes)
- **Outros QT+**: Antipsicóticos, antiarrítmicos, macrolídeos
- **Conduta**: Evitar associação; fazer ECG se necessário
        `,
      },
    },

    {
      id: 'med-interactions-flashcards',
      titleKey: 'learning.modules.interactions_flashcards.title',
      descriptionKey: 'learning.modules.interactions_flashcards.description',
      type: 'flashcards',
      order: 3,
      estimatedMinutes: 20,
      prerequisites: ['med-interactions'],
      content: {
        type: 'flashcards',
        algorithm: 'sm2',
        cards: [
          {
            id: 'fc-1',
            frontKey: 'Qual o risco de associar AINE + IECA + Diurético?',
            backKey: '"Triple Whammy" - Insuficiência Renal Aguda',
            tags: ['interacoes', 'renal'],
          },
          {
            id: 'fc-2',
            frontKey: 'Por que evitar AINEs com Varfarina?',
            backKey: 'Aumenta risco de sangramento GI (lesão mucosa + inibição plaquetária)',
            tags: ['interacoes', 'anticoagulacao'],
          },
          {
            id: 'fc-3',
            frontKey: 'O que é síndrome serotoninérgica?',
            backKey: 'Excesso de serotonina: agitação, tremor, hipertermia, rigidez. Risco com ISRS + triptanos, tramadol, IMAO.',
            tags: ['interacoes', 'serotonina'],
          },
          {
            id: 'fc-4',
            frontKey: 'Rifampicina afeta anticoncepcionais. Como?',
            backKey: 'Induz CYP450 → metaboliza mais rápido o ACO → reduz eficácia contraceptiva',
            tags: ['interacoes', 'cyp450'],
          },
          {
            id: 'fc-5',
            frontKey: 'Qual cuidado com metformina e contraste iodado?',
            backKey: 'Suspender 48h antes e após. Risco de acidose lática (raro, mas grave).',
            tags: ['interacoes', 'contraste'],
          },
          {
            id: 'fc-6',
            frontKey: 'Omeprazol pode reduzir eficácia de qual antiagregante?',
            backKey: 'Clopidogrel. Omeprazol inibe CYP2C19, reduzindo ativação do clopidogrel.',
            tags: ['interacoes', 'cyp450'],
          },
          {
            id: 'fc-7',
            frontKey: 'O que o mnemônico APINCH representa?',
            backKey: 'Medicamentos de Alto Risco: Anticoagulantes, Potássio IV, Insulinas, Narcóticos, Chemotherapy, Hipoglicemiantes',
            tags: ['seguranca', 'alto-risco'],
          },
        ],
      },
    },

    // ==========================================================================
    // MÓDULO 3: Ajuste Renal de Medicamentos
    // ==========================================================================
    {
      id: 'med-renal-dosing',
      titleKey: 'learning.modules.renal_dosing.title',
      descriptionKey: 'learning.modules.renal_dosing.description',
      type: 'content',
      order: 4,
      estimatedMinutes: 40,
      prerequisites: ['med-principles'],
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Ajuste de Dose na Insuficiência Renal

## Estimativa da Função Renal

### Fórmula CKD-EPI (preferida)
- Mais precisa que Cockcroft-Gault
- Considera idade, sexo, creatinina, etnia

### Classificação DRC

| Estágio | TFG (mL/min/1,73m²) | Conduta |
|---------|---------------------|---------|
| G1 | ≥ 90 | Normal |
| G2 | 60-89 | Levemente reduzida |
| G3a | 45-59 | Moderada ↓, ajustar alguns |
| G3b | 30-44 | Moderada-grave, ajustar maioria |
| G4 | 15-29 | Grave, ajustar todos |
| G5 | < 15 | Falência, diálise |

## Medicamentos que Requerem Ajuste

### Antibióticos
| Medicamento | TFG < 30 | Observação |
|-------------|----------|------------|
| Amoxicilina | Dose 50% | Aumentar intervalo |
| Ciprofloxacino | Dose 50% | Evitar se TFG < 15 |
| Gentamicina | Dose por nível | Nefrotóxica |
| Nitrofurantoína | Contraindicado | Não atinge concentração urinária |

### Cardiovasculares
| Medicamento | TFG < 30 | Observação |
|-------------|----------|------------|
| Metformina | Contraindicada | Risco acidose lática |
| Enalapril | Dose 50% | Monitorar K+ |
| Espironolactona | Evitar | Hipercalemia |
| Digoxina | Dose 50% | Monitorar nível |

### Analgésicos
| Medicamento | TFG < 30 | Observação |
|-------------|----------|------------|
| AINEs | Evitar | Pioram função renal |
| Morfina | Dose ↓↓ | Metabólitos acumulam |
| Gabapentina | Dose proporcional | 100mg/dia se TFG < 15 |

## Medicamentos Contraindicados em DRC Avançada

- **Metformina**: TFG < 30
- **AINEs crônicos**: TFG < 30
- **Nitrofurantoína**: TFG < 40
- **Espironolactona**: TFG < 30 (relativo)
- **Alopurinol dose plena**: ajustar conforme TFG
        `,
      },
    },

    {
      id: 'med-renal-quiz',
      titleKey: 'learning.modules.renal_quiz.title',
      descriptionKey: 'learning.modules.renal_quiz.description',
      type: 'quiz',
      order: 5,
      estimatedMinutes: 15,
      prerequisites: ['med-renal-dosing'],
      passingScore: 70,
      content: {
        type: 'quiz',
        shuffleQuestions: true,
        shuffleOptions: true,
        showFeedback: true,
        allowRetry: true,
        questions: [
          {
            id: 'renal-q1',
            questionKey: 'Paciente com TFG de 25 mL/min. Qual medicamento é contraindicado?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Losartana', isCorrect: false },
              { id: 'b', textKey: 'Metformina', isCorrect: true, feedbackKey: 'Metformina é contraindicada com TFG < 30 pelo risco de acidose lática.' },
              { id: 'c', textKey: 'Anlodipino', isCorrect: false },
              { id: 'd', textKey: 'Sinvastatina', isCorrect: false },
            ],
            explanationKey: 'Metformina não deve ser usada se TFG < 30 mL/min.',
          },
          {
            id: 'renal-q2',
            questionKey: 'Qual antibiótico deve ser evitado em ITU se TFG < 40?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Fosfomicina', isCorrect: false },
              { id: 'b', textKey: 'Nitrofurantoína', isCorrect: true },
              { id: 'c', textKey: 'Amoxicilina', isCorrect: false },
              { id: 'd', textKey: 'Cefalexina', isCorrect: false },
            ],
            explanationKey: 'Nitrofurantoína não atinge concentração urinária adequada com TFG reduzida.',
          },
          {
            id: 'renal-q3',
            questionKey: 'Qual a fórmula preferida para estimar TFG?',
            type: 'single',
            difficulty: 'beginner',
            points: 10,
            options: [
              { id: 'a', textKey: 'Cockcroft-Gault', isCorrect: false },
              { id: 'b', textKey: 'MDRD', isCorrect: false },
              { id: 'c', textKey: 'CKD-EPI', isCorrect: true },
              { id: 'd', textKey: 'Creatinina sérica direta', isCorrect: false },
            ],
            explanationKey: 'CKD-EPI é mais precisa e recomendada atualmente.',
          },
        ],
      },
    },

    // ==========================================================================
    // MÓDULO 4: Medicamentos em Idosos
    // ==========================================================================
    {
      id: 'med-elderly',
      titleKey: 'learning.modules.med_elderly.title',
      descriptionKey: 'learning.modules.med_elderly.description',
      type: 'content',
      order: 6,
      estimatedMinutes: 35,
      prerequisites: ['med-principles'],
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Medicamentos em Idosos

## Alterações Farmacocinéticas no Envelhecimento

| Parâmetro | Alteração | Consequência |
|-----------|-----------|--------------|
| Absorção | ↓ motilidade GI | Pequeno impacto |
| Distribuição | ↑ gordura, ↓ água | ↑ meia-vida lipofílicos |
| Metabolismo | ↓ CYP450 | ↓ metabolização |
| Excreção | ↓ TFG | ↑ concentração |

## Princípios de Prescrição

> **"Start low, go slow, but GO!"**

1. Iniciar com doses baixas
2. Titular lentamente
3. Mas atingir dose terapêutica

## Critérios de Beers - Medicamentos a Evitar

### Alto Risco
| Classe | Exemplos | Problema |
|--------|----------|----------|
| Benzodiazepínicos | Diazepam, clonazepam | Quedas, confusão |
| Anticolinérgicos | Amitriptilina | Confusão, retenção |
| AINEs crônicos | Ibuprofeno | GI, renal, CV |
| Relaxantes musculares | Ciclobenzaprina | Sedação, anticolinérgico |

### Usar com Cautela
| Classe | Exemplos | Cuidado |
|--------|----------|---------|
| Hipoglicemiantes | Glibenclamida | Hipoglicemia grave |
| Antipsicóticos | Haloperidol | ↑ mortalidade em demência |
| Diuréticos de alça | Furosemida | Desequilíbrio eletrolítico |

## STOPP/START

### STOPP (Screening Tool of Older Persons' Prescriptions)
- Identificar medicamentos potencialmente inapropriados
- Exemplos: BZD > 4 semanas, AINE + anticoagulante

### START (Screening Tool to Alert to Right Treatment)
- Identificar omissões de prescrição
- Exemplos: Estatina após IAM, Vit D em osteoporose

## Desprescrição

### Quando Considerar
- Expectativa de vida limitada
- Mudança de objetivos terapêuticos
- Carga medicamentosa excessiva
- Eventos adversos

### Como Fazer
1. Identificar medicamentos candidatos
2. Priorizar (maior risco/menor benefício)
3. Planejar retirada gradual
4. Monitorar síndrome de abstinência
5. Reavaliar periodicamente
        `,
      },
    },

    // ==========================================================================
    // MÓDULO 5: Medicamentos na Gestação
    // ==========================================================================
    {
      id: 'med-pregnancy',
      titleKey: 'learning.modules.med_pregnancy.title',
      descriptionKey: 'learning.modules.med_pregnancy.description',
      type: 'content',
      order: 7,
      estimatedMinutes: 30,
      prerequisites: ['med-principles'],
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Medicamentos na Gestação

## Classificação de Risco (FDA - antiga, mas ainda referenciada)

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| A | Seguro (estudos controlados) | Ácido fólico, levotiroxina |
| B | Provavelmente seguro | Metformina, penicilinas |
| C | Risco não excluído | Muitos antibióticos |
| D | Evidência de risco | Fenitoína, lítio |
| X | Contraindicado | Isotretinoína, metotrexate |

## Medicamentos Seguros na Gestação

### Analgésicos
- **Paracetamol**: Primeira escolha
- AINEs: Evitar no 3º trimestre (fechamento ducto arterioso)
- Opioides: Usar com cautela (abstinência neonatal)

### Anti-hipertensivos
- **Metildopa**: Primeira linha
- **Nifedipino**: Segunda linha
- **Hidralazina**: Para crises
- ❌ IECA/BRA: Contraindicados (teratogênicos)

### Antibióticos
- ✅ Penicilinas, cefalosporinas, azitromicina
- ⚠️ Nitrofurantoína: Evitar próximo ao parto
- ❌ Tetraciclinas: Efeitos ósseos/dentários
- ❌ Fluorquinolonas: Cartilagem

### Diabetes Gestacional
- **Insulina**: Padrão-ouro
- **Metformina**: Alternativa (atravessa placenta)
- ❌ Sulfonilureias: Hipoglicemia neonatal

## Medicamentos Absolutamente Contraindicados

| Medicamento | Efeito |
|-------------|--------|
| Isotretinoína | Malformações graves |
| Metotrexate | Abortivo |
| Varfarina | Malformações (1º tri) |
| IECA/BRA | Oligoidrâmnio, IRA fetal |
| Estatinas | Teratogênico |
| Ácido valproico | Defeitos tubo neural |

## Amamentação - Princípios

- Maioria dos medicamentos é compatível
- Preferir medicamentos já estudados
- Consultar LactMed (base de dados gratuita)
- Considerar: dose relativa no leite < 10% é geralmente seguro
        `,
      },
    },

    // ==========================================================================
    // MÓDULO FINAL: Avaliação
    // ==========================================================================
    {
      id: 'med-final-assessment',
      titleKey: 'learning.modules.med_final.title',
      descriptionKey: 'learning.modules.med_final.description',
      type: 'quiz',
      order: 8,
      estimatedMinutes: 25,
      prerequisites: [
        'med-interactions-flashcards',
        'med-renal-quiz',
        'med-elderly',
        'med-pregnancy',
      ],
      passingScore: 75,
      content: {
        type: 'quiz',
        shuffleQuestions: true,
        shuffleOptions: true,
        showFeedback: true,
        allowRetry: true,
        maxAttempts: 2,
        questions: [
          {
            id: 'final-m1',
            questionKey: 'Idosa de 78 anos com insônia. Qual medicamento deve ser EVITADO?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Melatonina', isCorrect: false },
              { id: 'b', textKey: 'Diazepam', isCorrect: true },
              { id: 'c', textKey: 'Trazodona em baixa dose', isCorrect: false },
              { id: 'd', textKey: 'Higiene do sono', isCorrect: false },
            ],
            explanationKey: 'Benzodiazepínicos são alto risco em idosos (Beers) - quedas, confusão.',
          },
          {
            id: 'final-m2',
            questionKey: 'Gestante de 12 semanas com ITU. Qual antibiótico é primeira escolha?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Ciprofloxacino', isCorrect: false },
              { id: 'b', textKey: 'Nitrofurantoína', isCorrect: false },
              { id: 'c', textKey: 'Cefalexina', isCorrect: true },
              { id: 'd', textKey: 'Sulfametoxazol-trimetoprim', isCorrect: false },
            ],
            explanationKey: 'Cefalosporinas são seguras. Quinolonas são contraindicadas.',
          },
          {
            id: 'final-m3',
            questionKey: 'Qual associação representa o "Triple Whammy"?',
            type: 'single',
            difficulty: 'advanced',
            points: 20,
            options: [
              { id: 'a', textKey: 'ISRS + tramadol + triptano', isCorrect: false },
              { id: 'b', textKey: 'Varfarina + AAS + AINE', isCorrect: false },
              { id: 'c', textKey: 'IECA + diurético + AINE', isCorrect: true },
              { id: 'd', textKey: 'Metformina + glibenclamida + insulina', isCorrect: false },
            ],
            explanationKey: 'IECA + diurético + AINE = risco de IRA.',
          },
          {
            id: 'final-m4',
            questionKey: 'Paciente com TFG 20 mL/min precisa de analgesia. Qual opção?',
            type: 'single',
            difficulty: 'advanced',
            points: 20,
            options: [
              { id: 'a', textKey: 'Ibuprofeno 400mg 8/8h', isCorrect: false },
              { id: 'b', textKey: 'Morfina dose padrão', isCorrect: false },
              { id: 'c', textKey: 'Paracetamol 500-1000mg 6/6h', isCorrect: true },
              { id: 'd', textKey: 'Naproxeno 500mg 12/12h', isCorrect: false },
            ],
            explanationKey: 'AINEs pioram função renal. Paracetamol é seguro.',
          },
        ],
      },
    },
  ],
};

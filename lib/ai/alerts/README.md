# Clinical Alert Generation System - Darwin-MFC

A comprehensive clinical decision support system for generating real-time alerts based on patient clinical context, medications, and evidence-based rules.

## Overview

The alert system provides four integrated modules:

1. **Alert Rules** - Rule definitions and evaluation logic
2. **Alert Generator** - Core alert generation engine
3. **Consistency Checker** - Clinical data consistency validation
4. **Drug Interaction Alerts** - Specialized drug-drug interaction analysis

## Architecture

```
ClinicalContext
    ↓
    ├→ Alert Rules (alert-rules.ts)
    │   └→ Predefined rules (9 core rules)
    │
    ├→ Alert Generator (alert-generator.ts)
    │   ├→ Rule evaluation
    │   ├→ Deduplication
    │   └→ Severity sorting
    │
    ├→ Consistency Checker (consistency-checker.ts)
    │   ├→ Diagnosis ↔ Medication alignment
    │   ├→ Chronic disease management
    │   ├→ Drug-disease conflicts
    │   └→ Treatment completeness
    │
    └→ Drug Interactions (drug-interaction-alerts.ts)
        ├→ Pairwise interaction checking
        ├→ Dangerous combinations
        └→ Management recommendations

    ↓
ClinicalAlert[] + Reports
```

## Quick Start

### Basic Usage

```typescript
import { generateAlerts, ClinicalContext } from '@/lib/ai/alerts';

// Define patient clinical context
const context: ClinicalContext = {
  age: 72,
  sex: 'M',
  weight: 85,
  diagnoses: ['hypertension', 'type 2 diabetes', 'ckd stage 3'],
  symptoms: ['chest pain', 'dyspnea'],
  medications: [
    {
      medicationId: 'lisinopril',
      dose: '10mg',
      frequency: '1x/day',
      indication: 'hypertension'
    },
    {
      medicationId: 'metformin',
      dose: '1000mg',
      frequency: '2x/day',
      indication: 'diabetes'
    }
  ],
  allergies: [],
  labs: {
    tfg: 28, // eGFR
    glucose: 180,
    potassium: 5.8,
  },
  isElderly: true,
};

// Generate alerts
const alerts = generateAlerts(context);

// Use alerts
console.log(`Generated ${alerts.length} alerts`);
alerts.forEach(alert => {
  console.log(`[${alert.severity.toUpperCase()}] ${alert.title}`);
  console.log(`  ${alert.message}`);
  if (alert.action) console.log(`  Action: ${alert.action}`);
});
```

### Comprehensive Analysis

```typescript
import { runComprehensiveAnalysis } from '@/lib/ai/alerts';

const analysis = runComprehensiveAnalysis(context);

console.log(`Risk Score: ${analysis.riskScore}/100`);
console.log(`Critical Alerts: ${analysis.alertSummary.critical}`);
console.log(`Consistency Score: ${analysis.consistencyReport.overallScore}/100`);
console.log(`Drug Interactions: ${analysis.interactionReport.totalInteractions}`);

// Get recommendations
analysis.recommendations.forEach(rec => {
  console.log(`• ${rec}`);
});
```

## Core Modules

### 1. Alert Rules (`alert-rules.ts`)

Defines what conditions trigger alerts and how to generate them.

#### Built-in Rules

| Rule ID | Category | Severity | Description |
|---------|----------|----------|-------------|
| `renal-dosage-adjustment` | dosage | warning | Renal function-based dose adjustment |
| `red-flag-symptoms` | red-flag | critical | Critical symptom combinations (chest pain + dyspnea = ACS) |
| `absolute-contraindication` | contraindication | critical | Allergy contraindications |
| `abnormal-dosage` | dosage | warning | Doses exceeding maximum recommendations |
| `elderly-high-risk-medication` | monitoring | warning | High-risk meds for elderly (age 65+) |
| `pregnancy-contraindication` | contraindication | critical | FDA Category X/D in pregnancy |
| `breastfeeding-contraindication` | monitoring | warning | Incompatible with breastfeeding |
| `missing-monitoring` | missing-exam | warning | Missing labs for chronic conditions |
| `qt-prolongation-risk` | drug-interaction | warning | 2+ QT-prolonging medications |

#### Creating Custom Rules

```typescript
import { AlertRule, ClinicalContext } from '@/lib/ai/alerts';

const myCustomRule: AlertRule = {
  id: 'my-custom-rule',
  name: 'My Custom Alert Rule',
  severity: 'warning',
  category: 'monitoring',
  condition: (context: ClinicalContext) => {
    // Return true if alert should trigger
    return context.age > 80 && context.diagnoses.includes('heart failure');
  },
  message: (context: ClinicalContext) => {
    return `Very elderly patient (${context.age} years) with heart failure - enhanced monitoring recommended`;
  },
  action: (context: ClinicalContext) => {
    return 'Order BNP, echocardiogram, and consider cardiology referral';
  },
  evidence: 'ACC/AHA Heart Failure Guidelines',
  enabled: true
};

// Use custom rule
const alerts = generateAlerts(context, { rules: [myCustomRule] });
```

### 2. Alert Generator (`alert-generator.ts`)

Core engine for evaluating rules and generating alerts.

#### Functions

```typescript
// Main alert generation
generateAlerts(context, config?) → ClinicalAlert[]

// Get alerts by severity
getAlertsBySeverity(alerts, severity) → ClinicalAlert[]
getCriticalAlerts(alerts) → ClinicalAlert[]

// Check for critical alerts
hasCriticalAlerts(context) → boolean

// Get statistics
getAlertSummary(alerts) → AlertSummary

// Serialization
serializeAlerts(alerts) → string
deserializeAlerts(json) → ClinicalAlert[]

// Filtering
filterAlerts(alerts, filter) → ClinicalAlert[]
```

#### Configuration

```typescript
interface AlertGenerationConfig {
  rules?: AlertRule[];              // Custom rules
  includeInfo?: boolean;            // Include info-level alerts
  includeWarning?: boolean;         // Include warning alerts
  includeCritical?: boolean;        // Include critical alerts
  deduplicateByCategory?: boolean;  // Remove duplicate categories
  maxAlerts?: number;               // Max alerts to return (default: 10)
}
```

### 3. Consistency Checker (`consistency-checker.ts`)

Validates internal consistency of clinical data.

#### Issue Types

| Issue Type | Severity | Example |
|-----------|----------|---------|
| `diagnosis-medication-mismatch` | warning | Cardiovascular drugs without CV diagnosis |
| `missing-chronic-management` | warning | Hypertension without antihypertensive |
| `conflicting-medications` | warning | NSAIDs + ACE inhibitor |
| `drug-disease-interaction` | critical | NSAIDs in patient with CKD |
| `incomplete-treatment` | info | Antibiotic duration not specified |
| `missing-follow-up` | warning | No monitoring plan for chronic disease |

#### Usage

```typescript
import { checkConsistency, convertConsistencyToAlerts } from '@/lib/ai/alerts';

const report = checkConsistency(context);

console.log(`Consistency Score: ${report.overallScore}/100`);
console.log(`Issues Found: ${report.issues.length}`);

report.issues.forEach(issue => {
  console.log(`[${issue.severity}] ${issue.description}`);
  console.log(`Recommendation: ${issue.recommendation}`);
});

// Convert to clinical alerts
const consistencyAlerts = convertConsistencyToAlerts(report);
```

### 4. Drug Interaction Alerts (`drug-interaction-alerts.ts`)

Specialized analysis for drug-drug interactions.

#### Features

- **Bidirectional checking**: Evaluates interactions in both directions
- **Severity mapping**: Maps gravidade to alert severity
- **Management recommendations**: Suggests dose adjustments, monitoring, alternatives
- **Dangerous combinations**: Database of critical combinations

#### Usage

```typescript
import {
  DrugInteractionDetector,
  generateInteractionReport,
  checkDangerousCombinations
} from '@/lib/ai/alerts';

// Find all interactions
const interactions = DrugInteractionDetector.findInteractions(context.medications);

// Generate comprehensive report
const report = generateInteractionReport(context.medications);

console.log(`Total interactions: ${report.totalInteractions}`);
console.log(`Critical: ${report.critical}`);
console.log(`${report.summary}`);

// Check for dangerous combinations
const dangerous = checkDangerousCombinations(context.medications);
if (dangerous.length > 0) {
  console.warn('Dangerous drug combinations detected!');
}

// Get specific interaction management
const interaction = interactions[0];
const management = getInteractionManagementOptions(interaction);

if (management.avoidCombination) {
  console.log('This combination should be avoided');
} else if (management.doseAdjustment) {
  console.log('Dose adjustment recommended');
}
```

#### Dangerous Combinations Database

The system includes a built-in database of critical combinations:

- Warfarin + Aspirin (bleeding risk)
- Methotrexate + NSAIDs (toxicity)
- ACE inhibitor + Potassium supplement (hyperkalemia)
- Simvastatin + Clarithromycin (statin levels)
- Digoxin + Quinidine (toxicity)

## ClinicalContext Structure

```typescript
interface ClinicalContext {
  // Demographics
  age: number;
  sex?: 'M' | 'F';
  weight?: number;      // kg
  height?: number;      // cm

  // Clinical data
  diagnoses: string[];
  symptoms: string[];
  medications: MedicationContext[];
  allergies: string[];

  // Vital signs
  vitals?: {
    systolicBP?: number;
    diastolicBP?: number;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
  };

  // Lab values
  labs?: {
    tfg?: number;         // eGFR (mL/min/1.73m²)
    creatinine?: number;
    inr?: number;
    hemoglobin?: number;
    potassium?: number;
    glucose?: number;
    ast?: number;
    alt?: number;
    [key: string]: number | undefined;
  };

  // Special populations
  isPregnant?: boolean;
  isBreastfeeding?: boolean;
  isElderly?: boolean;  // Automatically set if age >= 65
}
```

## Clinical Alert Interface

```typescript
interface ClinicalAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  action?: string;           // Recommended action
  dismissible?: boolean;
}
```

## Advanced Features

### 1. Comprehensive Analysis

Combines all four modules into one unified analysis:

```typescript
const analysis = runComprehensiveAnalysis(context);

// Output includes:
// - All alerts (rule-based + interaction-based)
// - Consistency report
// - Drug interaction report
// - Overall risk score (0-100)
// - Compiled recommendations
```

### 2. Risk Scoring

Automatic risk assessment based on:
- Critical alerts (×15 points)
- Warning alerts (×5 points)
- Consistency issues (inverse of score)
- Drug interaction severity (critical ×10, warning ×3)

Result: 0-100 scale where higher = higher risk

### 3. Alert Deduplication

Automatically removes duplicate alerts from same category:

```typescript
const alerts = generateAlerts(context, {
  deduplicateByCategory: true  // Default: true
});
```

### 4. Export & Serialization

```typescript
// Export for storage/transmission
const json = serializeAlerts(alerts);
const restored = deserializeAlerts(json);

// Export analysis
const markdown = exportComprehensiveAnalysis(analysis, 'text');
const json = exportComprehensiveAnalysis(analysis, 'json');

// Export interactions
const csv = exportInteractionData(interactions, 'csv');
```

## Alert Scoring Algorithm

Alerts are sorted by:

1. **Severity** (Primary)
   - Critical > Warning > Info

2. **Score** (Secondary)
   - Base: Category score (contraindication: 10, red-flag: 9, etc.)
   - Boost: Age ≥75 (+1), Pregnant (+2), eGFR <15 (+2)
   - Penalty: Info level (-2)

3. **Timestamp** (Tertiary)
   - Newer alerts first

## Integration with Darwin-MFC

### 1. UI Integration

```typescript
// In React component
import { AlertsContainer, AlertBanner } from '@/lib/clinical-decision-support/alerts/clinical-alerts';
import { generateAlerts } from '@/lib/ai/alerts';

export function PatientAlertsPanel({ context }) {
  const [alerts, setAlerts] = useState<ClinicalAlert[]>([]);

  useEffect(() => {
    const generated = generateAlerts(context);
    setAlerts(generated);
  }, [context]);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <AlertsContainer alerts={alerts} onDismiss={handleDismiss} />
  );
}
```

### 2. SOAP Integration

```typescript
// After SOAP analysis
const soapAnalysis = extractSOAPData(recordText);
const context: ClinicalContext = {
  age: soapAnalysis.age,
  diagnoses: soapAnalysis.assessments,
  symptoms: soapAnalysis.subjective.complaints,
  medications: soapAnalysis.medications,
  // ... other fields
};

const alerts = generateAlerts(context);
```

### 3. Study Mode Integration

```typescript
// In study mode, provide additional educational alerts
import { DEFAULT_PROMPTS } from '@/lib/types/ai';

const educationalAlerts = generateAlerts(context, {
  includeInfo: true,  // Include educational level alerts
  maxAlerts: 15       // Show more alerts in educational context
});
```

## Best Practices

### 1. Provide Complete Context

```typescript
// ❌ Incomplete
const context = {
  age: 65,
  medications: [...],
  // Missing: diagnoses, labs, allergies
};

// ✅ Complete
const context = {
  age: 65,
  diagnoses: ['hypertension', 'type 2 diabetes'],
  medications: [...],
  allergies: ['penicillin'],
  labs: { tfg: 35, glucose: 180 },
  isElderly: true,
};
```

### 2. Handle Critical Alerts

```typescript
const alerts = generateAlerts(context);
const criticalAlerts = alerts.filter(a => a.severity === 'critical');

if (criticalAlerts.length > 0) {
  // Display prominently
  // Require acknowledgment
  // Log for audit trail
}
```

### 3. Regular Updates

```typescript
// Re-evaluate periodically as context changes
const unsubscribe = watchContext((newContext) => {
  const updatedAlerts = generateAlerts(newContext);
  displayAlerts(updatedAlerts);
});
```

### 4. Custom Rules for Local Protocols

```typescript
// Add your institution's specific rules
const institutionRules = [
  {
    id: 'our-protocol-uti',
    name: 'Our UTI Treatment Protocol',
    severity: 'info',
    category: 'monitoring',
    condition: (ctx) => ctx.diagnoses.includes('uti') && !ctx.medications.some(m => m.indication === 'uti'),
    message: () => 'No UTI antibiotic prescribed',
    action: () => 'Follow Our UTI Treatment Protocol v2.1',
  }
];

const alerts = generateAlerts(context, { rules: institutionRules });
```

## Performance Considerations

- **Time Complexity**: O(n×m) where n = rules, m = medications
- **Typical execution**: <50ms for standard context
- **Optimization**: Rules are evaluated short-circuit (condition fails = stop)

## Testing

```typescript
import { generateAlerts, hasCriticalAlerts } from '@/lib/ai/alerts';

describe('Alert System', () => {
  it('should detect renal impairment dosage issues', () => {
    const context = {
      age: 65,
      labs: { tfg: 25 },
      medications: [{
        medicationId: 'lisinopril',
        medication: medicamentoData['lisinopril']
      }],
      // ... other fields
    };

    const alerts = generateAlerts(context);
    expect(alerts.some(a => a.id === 'renal-dosage-adjustment')).toBe(true);
  });

  it('should not generate critical alerts for normal context', () => {
    const context = { /* healthy 40-year-old */ };
    expect(hasCriticalAlerts(context)).toBe(false);
  });
});
```

## Limitations & Future Work

### Current Limitations
- Rules are pattern-based, not AI-powered
- Drug interactions from static data only
- No temporal analysis (duration, progression)
- No patient-specific pharmacogenomics

### Future Enhancements
- Machine learning-based anomaly detection
- Real-time drug interaction database integration
- Pharmacogenomic variant checking
- Temporal trend analysis
- Multi-language alert messages
- Integration with EHR systems

## References

- **KDIGO**: Kidney Disease Improving Global Outcomes
- **Beers Criteria**: Potentially Inappropriate Medication Use in Older Adults
- **FDA PLLR**: Pregnancy and Lactation Labeling Rule
- **AzCERT**: Arizona Center for Education and Research on Therapeutics
- **Micromedex**: Drug interaction database
- **UpToDate**: Clinical evidence base

## License

Part of Darwin-MFC platform. Academic use with proper attribution.

/**
 * ALERT SYSTEM USAGE EXAMPLES
 * ============================
 *
 * Practical examples demonstrating how to use the clinical alert system
 * for various clinical scenarios.
 */

import {
  ClinicalContext,
  generateAlerts,
  getAlertSummary,
  checkConsistency,
  DrugInteractionDetector,
  generateInteractionReport,
  runComprehensiveAnalysis,
} from './index';

// =============================================================================
// EXAMPLE 1: ELDERLY PATIENT WITH HYPERTENSION AND RENAL IMPAIRMENT
// =============================================================================

export function example1_ElderlyCKDPatient() {
  const context: ClinicalContext = {
    age: 78,
    sex: 'M',
    weight: 82,
    isElderly: true,

    // Clinical presentation
    diagnoses: ['hypertension', 'chronic kidney disease stage 3b', 'benign prostatic hyperplasia'],
    symptoms: ['dyspnea on exertion', 'ankle edema'],
    allergies: ['sulfonamides'],

    // Current medications
    medications: [
      {
        medicationId: 'lisinopril',
        dose: '10mg',
        frequency: '1x/day',
        indication: 'hypertension and CKD protection',
      },
      {
        medicationId: 'amlodipine',
        dose: '5mg',
        frequency: '1x/day',
        indication: 'hypertension',
      },
      {
        medicationId: 'pravastatin',
        dose: '20mg',
        frequency: '1x/day',
        indication: 'dyslipidemia prevention',
      },
      {
        medicationId: 'doxazosina',
        dose: '2mg',
        frequency: '1x/day',
        indication: 'benign prostatic hyperplasia',
      },
    ],

    // Vital signs
    vitals: {
      systolicBP: 145,
      diastolicBP: 88,
      heartRate: 72,
    },

    // Lab values
    labs: {
      tfg: 38, // Stage 3b CKD
      creatinine: 1.8,
      potassium: 5.2, // Upper normal - concerning with ACE-I
      hemoglobin: 11.2, // Mild anemia (CKD-related)
    },
  };

  console.log('=== EXAMPLE 1: Elderly Patient with CKD ===\n');

  // Generate alerts
  const alerts = generateAlerts(context);
  const summary = getAlertSummary(alerts);

  console.log(`Alerts Generated: ${summary.total}`);
  console.log(`- Critical: ${summary.critical}`);
  console.log(`- Warnings: ${summary.warnings}`);
  console.log(`- Info: ${summary.info}\n`);

  alerts.forEach((alert) => {
    console.log(`[${alert.severity.toUpperCase()}] ${alert.title}`);
    console.log(`  Message: ${alert.message}`);
    if (alert.action) console.log(`  Action: ${alert.action}`);
    console.log();
  });

  // Check consistency
  const consistency = checkConsistency(context);
  console.log(
    `\nClinical Consistency Score: ${consistency.overallScore}/100`
  );
  console.log('Issues:');
  consistency.issues.forEach((issue) => {
    console.log(
      `  • [${issue.severity}] ${issue.description} - ${issue.recommendation}`
    );
  });
}

// =============================================================================
// EXAMPLE 2: PREGNANT PATIENT WITH DEPRESSION
// =============================================================================

export function example2_PregnantPatient() {
  const context: ClinicalContext = {
    age: 32,
    sex: 'F',
    isPregnant: true,
    weight: 68,

    diagnoses: ['major depressive disorder', 'gestational hypertension'],
    symptoms: ['mood depression', 'morning sickness'],
    allergies: [],

    // Medications
    medications: [
      {
        medicationId: 'paroxetina',
        dose: '20mg',
        frequency: '1x/day',
        indication: 'depression',
      },
      {
        medicationId: 'metildopa',
        dose: '250mg',
        frequency: '3x/day',
        indication: 'gestational hypertension',
      },
      {
        medicationId: 'acido-folico',
        dose: '5mg',
        frequency: '1x/day',
        indication: 'pregnancy supplementation',
      },
    ],

    labs: {
      hemoglobin: 10.8, // Pregnancy-related anemia
    },
  };

  console.log('\n=== EXAMPLE 2: Pregnant Patient with Depression ===\n');

  const alerts = generateAlerts(context);

  alerts.forEach((alert) => {
    console.log(`[${alert.severity.toUpperCase()}] ${alert.title}`);
    console.log(`  ${alert.message}`);
    if (alert.action) console.log(`  → ${alert.action}`);
    console.log();
  });
}

// =============================================================================
// EXAMPLE 3: DRUG INTERACTION ANALYSIS
// =============================================================================

export function example3_DrugInteractions() {
  const context: ClinicalContext = {
    age: 68,
    sex: 'M',
    weight: 90,

    diagnoses: ['atrial fibrillation', 'type 2 diabetes', 'osteoarthritis'],
    symptoms: ['joint pain'],
    allergies: [],

    medications: [
      {
        medicationId: 'warfarina',
        dose: '5mg',
        frequency: '1x/day',
        indication: 'atrial fibrillation',
      },
      {
        medicationId: 'aspirina',
        dose: '100mg',
        frequency: '1x/day',
        indication: 'cardiovascular protection',
      },
      {
        medicationId: 'ibuprofeno',
        dose: '400mg',
        frequency: '3x/day',
        indication: 'osteoarthritis pain',
      },
      {
        medicationId: 'metformina',
        dose: '1000mg',
        frequency: '2x/day',
        indication: 'diabetes',
      },
    ],
  };

  console.log('\n=== EXAMPLE 3: Drug Interaction Analysis ===\n');

  // Find all interactions
  const interactions = DrugInteractionDetector.findInteractions(
    context.medications
  );
  console.log(`Found ${interactions.length} drug interaction(s):\n`);

  interactions.forEach((interaction) => {
    console.log(`${interaction.drug1} ↔ ${interaction.drug2}`);
    console.log(`  Severity: ${interaction.severity}`);
    console.log(`  Effect: ${interaction.efeito}`);
    console.log(`  Management: ${interaction.conduta}`);
    console.log();
  });

  // Generate detailed report
  const report = generateInteractionReport(context.medications);
  console.log(`\nInteraction Report Summary:`);
  console.log(`${report.summary}`);
}

// =============================================================================
// EXAMPLE 4: COMPREHENSIVE CLINICAL ANALYSIS
// =============================================================================

export function example4_ComprehensiveAnalysis() {
  const context: ClinicalContext = {
    age: 75,
    sex: 'F',
    weight: 72,
    isElderly: true,

    diagnoses: [
      'hypertension',
      'type 2 diabetes',
      'heart failure',
      'atrial fibrillation',
      'chronic kidney disease',
    ],
    symptoms: ['dyspnea', 'fatigue'],
    allergies: ['penicillin', 'sulfonamides'],

    medications: [
      {
        medicationId: 'furosemida',
        dose: '40mg',
        frequency: '2x/day',
        indication: 'heart failure',
      },
      {
        medicationId: 'lisinopril',
        dose: '20mg',
        frequency: '1x/day',
        indication: 'heart failure, hypertension, CKD',
      },
      {
        medicationId: 'carvedilol',
        dose: '12.5mg',
        frequency: '2x/day',
        indication: 'heart failure, hypertension',
      },
      {
        medicationId: 'varfarina',
        dose: '5mg',
        frequency: '1x/day',
        indication: 'atrial fibrillation',
      },
      {
        medicationId: 'metformina',
        dose: '500mg',
        frequency: '2x/day',
        indication: 'diabetes',
      },
      {
        medicationId: 'atorvastatin',
        dose: '40mg',
        frequency: '1x/day',
        indication: 'dyslipidemia',
      },
    ],

    vitals: {
      systolicBP: 138,
      diastolicBP: 82,
      heartRate: 68,
    },

    labs: {
      tfg: 32,
      creatinine: 2.1,
      potassium: 5.4, // Elevated
      inr: 2.3, // Therapeutic
      hemoglobin: 10.5,
      glucose: 145,
      ast: 35,
      alt: 28,
    },
  };

  console.log('\n=== EXAMPLE 4: Comprehensive Clinical Analysis ===\n');

  const analysis = runComprehensiveAnalysis(context);

  // Overview
  console.log('ANALYSIS SUMMARY');
  console.log('================');
  console.log(`Generated: ${analysis.timestamp.toISOString()}`);
  console.log(`Risk Score: ${analysis.riskScore}/100`);
  console.log(`Total Alerts: ${analysis.alertSummary.total}`);
  console.log(`  • Critical: ${analysis.alertSummary.critical}`);
  console.log(`  • Warnings: ${analysis.alertSummary.warnings}`);
  console.log(`  • Info: ${analysis.alertSummary.info}`);
  console.log();

  // Critical alerts
  if (analysis.alertSummary.critical > 0) {
    console.log('⚠️  CRITICAL ALERTS');
    console.log('=================');
    analysis.alerts
      .filter((a) => a.severity === 'critical')
      .forEach((alert) => {
        console.log(`${alert.title}`);
        console.log(`  ${alert.message}`);
        if (alert.action) console.log(`  Action: ${alert.action}`);
      });
    console.log();
  }

  // Consistency issues
  console.log('CLINICAL CONSISTENCY CHECK');
  console.log('==========================');
  console.log(
    `Consistency Score: ${analysis.consistencyReport.overallScore}/100`
  );
  if (analysis.consistencyReport.issues.length > 0) {
    console.log('Issues found:');
    analysis.consistencyReport.issues.slice(0, 3).forEach((issue) => {
      console.log(`  • [${issue.severity}] ${issue.description}`);
    });
  }
  console.log();

  // Drug interactions
  console.log('DRUG INTERACTIONS');
  console.log('=================');
  console.log(`Total interactions: ${analysis.interactionReport.totalInteractions}`);
  console.log(
    `Summary: ${analysis.interactionReport.summary}`
  );
  console.log();

  // Recommendations
  console.log('RECOMMENDATIONS');
  console.log('===============');
  analysis.recommendations.forEach((rec) => {
    console.log(`• ${rec}`);
  });
}

// =============================================================================
// EXAMPLE 5: RED FLAG SYMPTOMS
// =============================================================================

export function example5_RedFlagSymptoms() {
  const context: ClinicalContext = {
    age: 58,
    sex: 'M',
    weight: 95,

    diagnoses: ['hypertension', 'anxiety'],
    symptoms: ['chest pain', 'dyspnea', 'dizziness'],
    allergies: [],

    medications: [
      {
        medicationId: 'metoprolol',
        dose: '100mg',
        frequency: '2x/day',
        indication: 'hypertension',
      },
      {
        medicationId: 'lorazepam',
        dose: '0.5mg',
        frequency: '2x/day',
        indication: 'anxiety',
      },
    ],

    vitals: {
      systolicBP: 165,
      diastolicBP: 95,
      heartRate: 95,
    },
  };

  console.log('\n=== EXAMPLE 5: Red Flag Symptoms ===\n');

  const alerts = generateAlerts(context);

  const critical = alerts.filter((a) => a.severity === 'critical');

  if (critical.length > 0) {
    console.log('🚨 CRITICAL ALERTS - IMMEDIATE EVALUATION REQUIRED 🚨\n');
    critical.forEach((alert) => {
      console.log(`${alert.title}`);
      console.log(`${alert.message}`);
      console.log(`⚠️  ${alert.action}\n`);
    });
  }
}

// =============================================================================
// RUN ALL EXAMPLES
// =============================================================================

export function runAllExamples() {
  example1_ElderlyCKDPatient();
  example2_PregnantPatient();
  example3_DrugInteractions();
  example4_ComprehensiveAnalysis();
  example5_RedFlagSymptoms();

  console.log('\n' + '='.repeat(60));
  console.log('All examples completed!');
}

// Export for testing
export default {
  example1_ElderlyCKDPatient,
  example2_PregnantPatient,
  example3_DrugInteractions,
  example4_ComprehensiveAnalysis,
  example5_RedFlagSymptoms,
  runAllExamples,
};

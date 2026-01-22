'use client';

import { useState } from 'react';
import { EvidenceCard } from './EvidenceCard';
import { DrugCard } from './DrugCard';
import { GuidelineComparisonMatrix } from './GuidelineComparisonMatrix';
import { InteractionAlert } from './InteractionAlert';
import { DensityToggle } from './DensityToggle';
import type { InfoDensity } from './DensityToggle';

/**
 * Component Showcase - Demonstrates SOTA+++ Medical Components
 * Used for design validation and documentation
 */
export function ComponentShowcase() {
  const [density, setDensity] = useState<InfoDensity>('comfortable');
  const [expandedEvidence, setExpandedEvidence] = useState(false);
  const [expandedDrug, setExpandedDrug] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          SOTA+++ Medical Components
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Phase 1: Design System & Core Components
        </p>

        {/* Density Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Information Density:
          </span>
          <DensityToggle value={density} onChange={setDensity} />
        </div>
      </div>

      {/* Evidence Card Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Evidence Card
        </h2>
        <EvidenceCard
          evidence={{
            level: 'rct',
            title: 'Breast Cancer Screening',
            description: 'Latest evidence on screening effectiveness',
            updated: new Date(),
          }}
          guidelines={[
            { guideline: 'SUS', status: 'full', details: 'SUS recommends biennial screening for women 50-69' },
            { guideline: 'USPSTF', status: 'partial', details: 'USPSTF recommends starting at age 40' },
            { guideline: 'NHS', status: 'full', details: 'NHS recommends triennial screening' },
            { guideline: 'WHO', status: 'full', details: 'WHO aligns with SUS recommendations' },
            { guideline: 'NP-NCD', status: 'partial', details: 'India guidelines under review' },
          ]}
          mainRecommendation="Mammography every 2 years for women aged 50-69 years without symptoms"
          referencesCount={12}
          relatedCount={8}
          isExpanded={expandedEvidence}
          onToggle={() => setExpandedEvidence(!expandedEvidence)}
          density={density}
        />
      </section>

      {/* Drug Card Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Drug Card
        </h2>
        <DrugCard
          name="Metformin"
          className="Biguanide | Antidiabetic"
          indication="Type 2 Diabetes Mellitus"
          dosing={{
            initial: '500-850mg 1x/day with meals',
            maintenance: '1500-2000mg/day in divided doses',
            maximum: '2550mg/day',
            special: 'Adjust for eGFR <45 mL/min; contraindicated at eGFR <30',
          }}
          interactions={[
            {
              severity: 'contraindicated',
              drug: 'Iodinated Contrast Media',
              mechanism: 'Risk of acute kidney injury and lactic acidosis',
              recommendation: 'Suspend 48h before/after contrast administration',
            },
            {
              severity: 'major',
              drug: 'Chronic Alcohol',
              mechanism: 'Enhanced hypoglycemic effect and lactic acidosis',
              recommendation: 'Monitor glucose closely and counsel on alcohol reduction',
            },
            {
              severity: 'moderate',
              drug: 'Cimetidine',
              mechanism: 'Increased metformin levels via reduced renal clearance',
              recommendation: 'May require dose reduction',
            },
          ]}
          contraindications={[
            'eGFR <30 mL/min/1.73m²',
            'Acute illness or sepsis',
            'Hepatic impairment (Child-Pugh A or higher)',
            'Recent myocardial infarction',
          ]}
          warnings={[
            'Monitor for vitamin B12 deficiency (annual measurement recommended)',
            'Educate on symptoms of lactic acidosis (muscle pain, difficulty breathing)',
            'Contraception counseling if applicable',
          ]}
          density={density}
          isExpanded={expandedDrug}
          onToggle={() => setExpandedDrug(!expandedDrug)}
          onQuickPrescribe={() => alert('Quick prescribe action')}
        />
      </section>

      {/* Interaction Alert Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Interaction Alerts
        </h2>
        <div className="space-y-3">
          <InteractionAlert
            severity="contraindicated"
            drug1="Metformin"
            drug2="Iodinated Contrast"
            mechanism="Risk of acute kidney injury and lactic acidosis"
            recommendation="Suspend metformin 48 hours before and after contrast administration"
            onDismiss={() => {}}
          />
          <InteractionAlert
            severity="major"
            drug1="Warfarin"
            drug2="Aspirin"
            mechanism="Both inhibit hemostasis; increased bleeding risk"
            recommendation="Avoid combination if possible. If necessary, monitor INR closely and educate on bleeding symptoms"
            onDismiss={() => {}}
          />
          <InteractionAlert
            severity="moderate"
            drug1="ACE Inhibitor"
            drug2="Potassium Supplement"
            mechanism="Both increase serum potassium levels"
            recommendation="Monitor serum potassium and consider dose adjustment"
            onDismiss={() => {}}
          />
        </div>
      </section>

      {/* Guideline Comparison Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Guideline Comparison Matrix
        </h2>
        <GuidelineComparisonMatrix
          title="Breast Cancer Screening Comparison"
          description="Comparative analysis of international screening guidelines"
          rows={[
            {
              aspect: 'Start Age',
              guidelines: {
                SUS: { value: '50 years', status: 'full' },
                USPSTF: { value: '40 years', status: 'partial', note: 'Updated 2024' },
                NHS: { value: '50 years', status: 'full' },
                WHO: { value: '50 years', status: 'full' },
                'NP-NCD': { value: '50 years', status: 'full' },
              },
            },
            {
              aspect: 'End Age',
              guidelines: {
                SUS: { value: '69 years', status: 'full' },
                USPSTF: { value: '74 years', status: 'partial' },
                NHS: { value: '71 years', status: 'partial' },
                WHO: { value: '69 years', status: 'full' },
                'NP-NCD': { value: '69 years', status: 'full' },
              },
            },
            {
              aspect: 'Interval',
              guidelines: {
                SUS: { value: 'Biennial (2 years)', status: 'full' },
                USPSTF: { value: 'Biennial (2 years)', status: 'full' },
                NHS: { value: 'Triennial (3 years)', status: 'divergence' },
                WHO: { value: 'Biennial (2 years)', status: 'full' },
                'NP-NCD': { value: 'Biennial (2 years)', status: 'full' },
              },
            },
            {
              aspect: 'Primary Method',
              guidelines: {
                SUS: { value: 'Mammography', status: 'full' },
                USPSTF: { value: 'Mammo + optional Tomosynthesis', status: 'partial' },
                NHS: { value: 'Mammography', status: 'full' },
                WHO: { value: 'Mammography', status: 'full' },
                'NP-NCD': { value: 'Mammography', status: 'full' },
              },
            },
          ]}
          density={density}
          showConvergence={true}
        />
      </section>

      {/* Design System Info */}
      <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
          🎨 SOTA+++ Design System
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>✅ <strong>Typography:</strong> Instrument Sans (Display), Source Serif 4 (Body), Inter (UI), JetBrains Mono (Data)</li>
          <li>✅ <strong>Colors:</strong> Clinical Blue (#0F4C81), Medical Teal (#0D9488), Evidence Hierarchy, Interaction Severity</li>
          <li>✅ <strong>Elevation:</strong> 5-level shadow system with glassmorphism effects</li>
          <li>✅ <strong>Components:</strong> EvidenceCard, DrugCard, ComparisonMatrix, InteractionAlert</li>
          <li>✅ <strong>Information Density:</strong> Comfortable, Compact, Clinical modes</li>
          <li>✅ <strong>Accessibility:</strong> WCAG 2.2 AAA compliant</li>
        </ul>
      </section>
    </div>
  );
}

export default ComponentShowcase;

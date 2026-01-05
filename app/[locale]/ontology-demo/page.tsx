'use client';

/**
 * ONTOLOGY PICKERS DEMO PAGE
 * ==========================
 *
 * Demo page to test all four ontology pickers:
 * - ConceptPicker (SNOMED-CT)
 * - LoincPicker (LOINC laboratory codes)
 * - OrdoPicker (ORDO rare diseases)
 * - PharmgkbPicker (Pharmacogenomics)
 */

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Stethoscope, FlaskConical, Dna, Check, Info, Activity } from 'lucide-react';
import { ConceptPicker, LoincPicker, OrdoPicker, PharmgkbPicker } from '@/app/components/Ontology';
import type { SnomedConceptSimple } from '@/lib/ontology/types/snomed-ct';
import type { LoincConceptMini } from '@/lib/ontology/types/loinc';
import type { OrdoConceptMini } from '@/lib/ontology/types/ordo';
import type { PharmacogeneMini } from '@/lib/ontology/types/pharmgkb';

export default function OntologyDemoPage() {
  // State for each picker
  const [snomedConcept, setSnomedConcept] = useState<SnomedConceptSimple | null>(null);
  const [loincConcept, setLoincConcept] = useState<LoincConceptMini | null>(null);
  const [ordoConcept, setOrdoConcept] = useState<OrdoConceptMini | null>(null);
  const [pharmgkbGene, setPharmgkbGene] = useState<PharmacogeneMini | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Ontology Pickers Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test the four ontology pickers integrated into Darwin-MFC: SNOMED-CT for clinical concepts,
              LOINC for laboratory codes, ORDO for rare diseases, and PharmGKB for pharmacogenomics.
            </p>
          </div>

          {/* Info Banner */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">Try searching for:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li><strong>SNOMED-CT:</strong> "diabetes", "hypertension", "asthma", "pneumonia"</li>
                  <li><strong>LOINC:</strong> "glucose", "hemoglobin", "creatinine", "cholesterol"</li>
                  <li><strong>ORDO:</strong> "cystic fibrosis", "gaucher", "huntington", "sickle cell"</li>
                  <li><strong>PharmGKB:</strong> "CYP2D6", "CYP2C19", "DPYD", "TPMT", "VKORC1"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pickers Grid */}
          <div className="space-y-8">
            {/* SNOMED-CT Picker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    SNOMED-CT Clinical Concepts
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Systematized Nomenclature of Medicine - Clinical Terms
                  </p>
                </div>
              </div>

              <ConceptPicker
                label="Select Diagnosis"
                value={snomedConcept}
                onChange={setSnomedConcept}
                placeholder="Search for clinical concepts..."
                helperText="Type at least 2 characters to search"
                showConceptId
                showFsn
              />

              {/* Selected Value Display */}
              {snomedConcept && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-700 dark:text-blue-300">Selected Concept:</p>
                      <p className="text-blue-600 dark:text-blue-400 mt-1">{snomedConcept.pt}</p>
                      <code className="text-xs text-blue-500/70 dark:text-blue-400/70 font-mono">
                        SCTID: {snomedConcept.conceptId}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* LOINC Picker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    LOINC Laboratory Codes
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Logical Observation Identifiers Names and Codes
                  </p>
                </div>
              </div>

              <LoincPicker
                label="Select Laboratory Test"
                value={loincConcept}
                onChange={setLoincConcept}
                placeholder="Search for laboratory tests..."
                helperText="Search by test name or LOINC code"
                showLoincCode
                showSystem
              />

              {/* Selected Value Display */}
              {loincConcept && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-700 dark:text-green-300">Selected Test:</p>
                      <p className="text-green-600 dark:text-green-400 mt-1">{loincConcept.longCommonName}</p>
                      <div className="flex gap-3 mt-1">
                        <code className="text-xs text-green-500/70 dark:text-green-400/70 font-mono">
                          LOINC: {loincConcept.loincNum}
                        </code>
                        {loincConcept.system && (
                          <span className="text-xs text-green-500/70 dark:text-green-400/70">
                            System: {loincConcept.system}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ORDO Picker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Dna className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ORDO Rare Diseases
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Orphanet Rare Disease Ontology
                  </p>
                </div>
              </div>

              <OrdoPicker
                label="Select Rare Disease"
                value={ordoConcept}
                onChange={setOrdoConcept}
                placeholder="Search for rare diseases..."
                helperText="Search by disease name or ORPHAcode"
                showOrphaCode
                showDiseaseType
              />

              {/* Selected Value Display */}
              {ordoConcept && (
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-purple-700 dark:text-purple-300">Selected Disease:</p>
                      <p className="text-purple-600 dark:text-purple-400 mt-1">{ordoConcept.label}</p>
                      <div className="flex gap-3 mt-1">
                        <code className="text-xs text-purple-500/70 dark:text-purple-400/70 font-mono">
                          ORPHA: {ordoConcept.orphaCode}
                        </code>
                        {ordoConcept.diseaseType && (
                          <span className="text-xs text-purple-500/70 dark:text-purple-400/70">
                            Type: {ordoConcept.diseaseType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PharmGKB Picker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    PharmGKB Pharmacogenomics
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pharmacogenomics Knowledge Base - Gene-Drug Interactions
                  </p>
                </div>
              </div>

              <PharmgkbPicker
                label="Select Pharmacogene"
                value={pharmgkbGene}
                onChange={setPharmgkbGene}
                placeholder="Search for pharmacogenes..."
                helperText="Search by gene symbol (e.g., CYP2D6, CYP2C19)"
                showCpicLevel
              />

              {/* Selected Value Display */}
              {pharmgkbGene && (
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">Selected Gene:</p>
                      <p className="text-emerald-600 dark:text-emerald-400 mt-1 font-bold">{pharmgkbGene.symbol}</p>
                      <p className="text-xs text-emerald-500/70 dark:text-emerald-400/70 mt-0.5">{pharmgkbGene.name}</p>
                      <div className="flex gap-3 mt-1">
                        <code className="text-xs text-emerald-500/70 dark:text-emerald-400/70 font-mono">
                          {pharmgkbGene.pharmgkbId}
                        </code>
                        {pharmgkbGene.cpicLevel && (
                          <span className="text-xs text-emerald-500/70 dark:text-emerald-400/70">
                            CPIC Level: {pharmgkbGene.cpicLevel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Selection Summary</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">SNOMED-CT</div>
                <div className="font-medium truncate">
                  {snomedConcept?.pt || <span className="text-gray-500">Not selected</span>}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">LOINC</div>
                <div className="font-medium truncate">
                  {loincConcept?.longCommonName || <span className="text-gray-500">Not selected</span>}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">ORDO</div>
                <div className="font-medium truncate">
                  {ordoConcept?.label || <span className="text-gray-500">Not selected</span>}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-300 mb-1">PharmGKB</div>
                <div className="font-medium truncate">
                  {pharmgkbGene?.symbol || <span className="text-gray-500">Not selected</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2 font-medium">Technical Details:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>SNOMED-CT: Uses IHTSDO Browser API (browser.ihtsdotools.org)</li>
              <li>LOINC: Local cache + search (50+ common lab tests)</li>
              <li>ORDO: Local cache + EBI OLS4 API (25+ rare diseases)</li>
              <li>PharmGKB: Local cache (18 core pharmacogenes, 25+ gene-drug pairs with CPIC guidelines)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

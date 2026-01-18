/**
 * FHIR Converter Examples
 *
 * Practical examples demonstrating how to use Darwin-MFC FHIR converters
 * for real-world healthcare data transformation scenarios
 *
 * These examples show:
 * - Converting diseases to FHIR Conditions
 * - Creating medication prescriptions as MedicationStatements
 * - Building complex FHIR bundles
 * - Handling bidirectional conversions
 * - Working with different detail levels
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

import {
  doencaToCondition,
  conditionToDoenca,
  medicamentoToMedication,
  medicamentoToMedicationStatement,
  medicationToMedicamento,
  BundleBuilder,
  createCollectionBundle,
  createTransactionBundle,
  validateBundle,
  extractResourcesFromBundle,
  filterResourcesByType,
} from './index';

// ============================================================================
// EXAMPLE 1: Convert Single Disease to FHIR Condition
// ============================================================================

/**
 * Example: Convert Hypertension disease data to FHIR Condition
 */
export function example1_ConvertDiseaseToCondition() {
  // Sample Doença object
  const hipertensao: Partial<Doenca> = {
    id: 'hipertensao',
    titulo: 'Hipertensão Arterial Sistêmica',
    cid10: ['I10'],
    cid11: ['BA00'],
    ciap2: ['K86'],
    snomedCT: '59621000',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Aumento persistente da pressão arterial sistêmica',
      criteriosDiagnosticos: [
        'PAS ≥ 140 mmHg',
        'PAD ≥ 90 mmHg',
        'Média de 3 medidas em 2 consultass',
      ],
      redFlags: ['Sinais de encefalopatia hipertensiva', 'AVC agudo'],
      classificacaoRisco: [
        {
          nivel: 'alto',
          criterios: ['PA ≥ 160/100 + lesão em órgão-alvo'],
          conduta: 'Tratamento urgente',
        },
      ],
      tratamentoPrimeiraLinha: {
        farmacologico: [
          'Enalapril',
          'Losartana',
          'Amlodipina',
          'Hidroclorotiazida',
        ],
        naoFarmacologico: ['Redução de sódio', 'Exercício físico', 'Perda de peso'],
      },
      metasTerapeuticas: ['Reduzir PA para <140/90 mmHg'],
      examesIniciais: ['ECG', 'Ureia', 'Creatinina', 'Proteinúria'],
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '24% da população brasileira',
        incidencia: '1-2% ao ano',
        mortalidade: 'Causa indireta de 7-8% das mortes',
        fatoresRisco: ['Idade', 'Sexo masculino', 'Sobrepeso', 'Sedentarismo'],
        citations: [],
      },
      quadroClinico: {
        sintomasPrincipais: ['Assintomática (maioria)', 'Cefaleia', 'Tontura'],
        sinaisExameFisico: [
          'PA elevada',
          'Sinais de crise hipertensiva',
        ],
        citations: [],
      },
      diagnostico: {
        criterios: ['PA ≥ 140/90 mmHg em 3 ocasiões'],
        diagnosticoDiferencial: [
          'Hipertensão secundária',
          'Hipertensão do avental branco',
        ],
        examesLaboratoriais: ['Bioquímica básica', 'Ureia', 'Creatinina'],
        citations: [],
      },
      tratamento: {
        objetivos: ['Reduzir PA', 'Prevenir complicações'],
        naoFarmacologico: {
          medidas: ['Redução de sódio', 'Exercício físico'],
          citations: [],
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'IECA',
              medicamentos: ['Enalapril 10-20 mg/dia'],
            },
          ],
          citations: [],
        },
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal inicialmente, depois trimestral',
        metasTerapeuticas: ['PA < 140/90 mmHg'],
        criteriosEncaminhamento: ['Hipertensão refratária'],
        citations: [],
      },
    },
    medicamentos: ['enalapril', 'losartana'],
    citations: [],
    lastUpdate: new Date().toISOString(),
  };

  // Convert to FHIR Condition
  const condition = doencaToCondition(hipertensao, {
    subjectId: 'Patient/patient-123',
    encounterId: 'Encounter/encounter-456',
    onsetDate: '2020-01-15T10:30:00Z',
    recorderId: 'Practitioner/doctor-789',
    detail: 'extended',
    includeNotes: true,
    includeEvidence: true,
  });

  return {
    condition,
    summary: {
      type: condition.resourceType,
      id: condition.id,
      clinicalStatus: condition.clinicalStatus?.text,
      verificationStatus: condition.verificationStatus?.text,
      codesCount: condition.code?.coding?.length || 0,
      hasEvidence: !!condition.evidence && condition.evidence.length > 0,
      hasNotes: !!condition.note && condition.note.length > 0,
    },
  };
}

// ============================================================================
// EXAMPLE 2: Create Medication Prescription
// ============================================================================

/**
 * Example: Convert Medication to MedicationStatement (prescription)
 */
export function example2_CreateMedicationPrescription() {
  // Sample Medicamento object (simplified)
  const amoxicilina: Medicamento = {
    id: 'amoxicilina-500',
    nomeGenerico: 'Amoxicilina',
    atcCode: 'J01CA04',
    rxNormCui: '6289',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      {
        forma: 'capsula',
        concentracao: '500 mg',
        disponivelSUS: true,
      },
    ],
    indicacoes: ['Infecção respiratória', 'Otite média aguda', 'Sinusite'],
    mecanismoAcao: 'Inibidor de síntese de parede celular bacteriana',
    posologias: [
      {
        indicacao: 'Infecção respiratória',
        adultos: {
          dose: '500 mg',
          frequencia: '3 vezes ao dia',
          doseMaxima: '1500 mg/dia',
          observacoes: 'Por 7-10 dias',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a penicilinas',
      'Mononucleose infecciosa',
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Diarréia',
        'Vômito',
        'Rash',
      ],
      graves: ['Anafiláxia', 'Síndrome de Stevens-Johnson'],
    },
    interacoes: [
      {
        medicamento: 'Metoprolol',
        gravidade: 'leve',
        efeito: 'Possível redução da absorção',
        conduta: 'Separar doses de 2-3 horas',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Passa em pequenas quantidades no leite',
    },
    doencasRelacionadas: ['otite', 'sinusite'],
    citations: [],
    lastUpdate: new Date().toISOString(),
  };

  // Create MedicationStatement (prescription)
  const statement = medicamentoToMedicationStatement(
    amoxicilina,
    {
      indicacao: 'Infecção respiratória',
      adultos: {
        dose: '500 mg',
        frequencia: '3 vezes ao dia',
      },
    } as any,
    {
      subjectId: 'Patient/patient-123',
      encounterId: 'Encounter/encounter-456',
      status: 'active',
      indication: 'Infecção respiratória aguda',
      prescriberId: 'Practitioner/doctor-789',
      effectiveDate: new Date().toISOString(),
      detail: 'extended',
    }
  );

  return {
    statement,
    summary: {
      type: statement.resourceType,
      status: statement.status,
      medication: statement.medicationCodeableConcept?.text,
      patientId: statement.subject?.reference,
      dosageCount: statement.dosage?.length || 0,
      hasIndicaton: !!statement.reasonCode && statement.reasonCode.length > 0,
    },
  };
}

// ============================================================================
// EXAMPLE 3: Build Complex Transaction Bundle
// ============================================================================

/**
 * Example: Create a complete transaction bundle with multiple resources
 * simulating a complete clinical encounter
 */
export function example3_CreateTransactionBundle() {
  // Simplified sample data
  const conditionData: Partial<Doenca> = {
    id: 'otite-123',
    titulo: 'Otite Média Aguda',
    cid10: ['H66.0'],
    ciap2: ['H71'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Inflamação aguda do ouvido médio',
      criteriosDiagnosticos: [
        'Otalgia',
        'Secreção auricular',
        'Febre',
      ],
      tratamentoPrimeiraLinha: {
        farmacologico: ['Amoxicilina'],
        naoFarmacologico: ['Analgesia', 'Repouso'],
      },
      redFlags: ['Meningite', 'Mastoidite'],
    },
    citations: [],
    lastUpdate: new Date().toISOString(),
  };

  // Create condition
  const condition = doencaToCondition(conditionData, {
    subjectId: 'Patient/patient-123',
    detail: 'extended',
  });

  // Create medication (using simplified data)
  const medicationData: Medicamento = {
    id: 'amoxicilina-500',
    nomeGenerico: 'Amoxicilina',
    atcCode: 'J01CA04',
    classeTerapeutica: 'antibiotico',
    rename: true,
    apresentacoes: [{ forma: 'capsula', concentracao: '500 mg', disponivelSUS: true }],
    indicacoes: [],
    mecanismoAcao: 'Antibiótico beta-lactâmico',
    posologias: [],
    contraindicacoes: [],
    efeitosAdversos: { comuns: [] },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: '' },
    doencasRelacionadas: [],
    citations: [],
    lastUpdate: new Date().toISOString(),
  };

  const medication = medicamentoToMedication(medicationData);

  // Create medication statement (prescription)
  const statement = medicamentoToMedicationStatement(
    medicationData,
    {
      indicacao: 'Otite Média Aguda',
      adultos: {
        dose: '500 mg',
        frequencia: '3 vezes ao dia',
      },
    } as any,
    {
      subjectId: 'Patient/patient-123',
      status: 'active',
      indication: 'Otite Média Aguda',
    }
  );

  // Build transaction bundle
  const bundle = createTransactionBundle(
    [
      {
        resource: condition,
        request: { method: 'POST', url: 'Condition' },
      },
      {
        resource: medication,
        request: { method: 'POST', url: 'Medication' },
      },
      {
        resource: statement,
        request: { method: 'POST', url: 'MedicationStatement' },
      },
    ],
    {
      id: `tx-${Date.now()}`,
    }
  );

  return {
    bundle,
    summary: {
      type: bundle.type,
      totalResources: bundle.total,
      entries: bundle.entry?.map((e) => ({
        resource: e.resource?.resourceType,
        request: e.request?.method,
      })),
      validationErrors: validateBundle(bundle),
    },
  };
}

// ============================================================================
// EXAMPLE 4: Build Collection Bundle
// ============================================================================

/**
 * Example: Create a simple collection bundle for exporting multiple diseases
 */
export function example4_CreateCollectionBundle() {
  const diseases: Partial<Doenca>[] = [
    {
      id: 'diabetes',
      titulo: 'Diabetes Mellitus',
      cid10: ['E11'],
      categoria: 'metabolico',
      quickView: {
        definicao: 'Doença metabólica crônica',
        criteriosDiagnosticos: ['Glicemia ≥ 126 mg/dL', 'HbA1c ≥ 6.5%'],
        tratamentoPrimeiraLinha: {
          farmacologico: ['Metformina'],
          naoFarmacologico: ['Dieta', 'Exercício'],
        },
        redFlags: [],
      },
      citations: [],
      lastUpdate: new Date().toISOString(),
    },
    {
      id: 'hipertensao',
      titulo: 'Hipertensão Arterial',
      cid10: ['I10'],
      categoria: 'cardiovascular',
      quickView: {
        definicao: 'Elevação persistente da PA',
        criteriosDiagnosticos: ['PAS ≥ 140 mmHg'],
        tratamentoPrimeiraLinha: {
          farmacologico: ['IECA'],
          naoFarmacologico: ['Redução de sódio'],
        },
        redFlags: [],
      },
      citations: [],
      lastUpdate: new Date().toISOString(),
    },
  ];

  // Convert all diseases to conditions
  const conditions = diseases.map((d) =>
    doencaToCondition(d, {
      subjectId: 'Patient/patient-123',
      detail: 'basic',
    })
  );

  // Create collection bundle
  const bundle = createCollectionBundle(conditions, {
    id: 'collection-diseases',
  });

  return {
    bundle,
    summary: {
      type: bundle.type,
      totalResources: bundle.total,
      resourceTypes: new Set(
        bundle.entry?.map((e) => e.resource?.resourceType)
      ),
    },
  };
}

// ============================================================================
// EXAMPLE 5: Bidirectional Conversion
// ============================================================================

/**
 * Example: Convert Doença to Condition and back to Doença
 * Demonstrates round-trip data transformation
 */
export function example5_BidirectionalConversion() {
  // Original data
  const originalDoenca: Partial<Doenca> = {
    id: 'asma',
    titulo: 'Asma Brônquica',
    cid10: ['J45'],
    ciap2: ['R96'],
    snomedCT: '195967001',
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Inflamação crônica das vias aéreas',
      criteriosDiagnosticos: [
        'Sibilância intermitente',
        'VEF1 reversível',
      ],
      tratamentoPrimeiraLinha: {
        farmacologico: ['Salbutamol'],
        naoFarmacologico: ['Evitar alérgenos'],
      },
      redFlags: ['Status asmático'],
    },
    citations: [],
    lastUpdate: new Date().toISOString(),
  };

  // Convert to FHIR Condition
  const condition = doencaToCondition(originalDoenca);

  // Convert back to Doença
  const recoveredDoenca = conditionToDoenca(condition);

  return {
    original: originalDoenca,
    condition,
    recovered: recoveredDoenca,
    preservedFields: {
      id: originalDoenca.id === recoveredDoenca.id,
      titulo: originalDoenca.titulo === recoveredDoenca.titulo,
      cid10: JSON.stringify(originalDoenca.cid10) === JSON.stringify(recoveredDoenca.cid10),
      ciap2: JSON.stringify(originalDoenca.ciap2) === JSON.stringify(recoveredDoenca.ciap2),
      categoria: originalDoenca.categoria === recoveredDoenca.categoria,
    },
  };
}

// ============================================================================
// EXAMPLE 6: Advanced Bundle Operations
// ============================================================================

/**
 * Example: Use BundleBuilder for complex operations
 */
export function example6_AdvancedBundleOperations() {
  // Sample resources
  const resources = [
    {
      resourceType: 'Condition' as const,
      id: 'cond-1',
    },
    {
      resourceType: 'Medication' as const,
      id: 'med-1',
    },
    {
      resourceType: 'MedicationStatement' as const,
      id: 'stmt-1',
    },
  ];

  // Use BundleBuilder
  const builder = new BundleBuilder({ id: 'custom-bundle' })
    .setType('searchset')
    .addResources(resources as any)
    .addLink('self', 'https://api.example.com/fhir/')
    .setMeta({
      lastUpdated: new Date().toISOString(),
    });

  const bundle = builder.build();

  // Validate and extract resources
  const validationErrors = validateBundle(bundle);
  const allResources = extractResourcesFromBundle(bundle);
  const conditions = filterResourcesByType(bundle, 'Condition');

  return {
    bundle,
    validation: {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    },
    analysis: {
      totalResources: allResources.length,
      resourceTypes: new Set(allResources.map((r) => r.resourceType)),
      conditionCount: conditions.length,
    },
  };
}

/**
 * Summary of Examples
 *
 * 1. Single disease to FHIR Condition with extended details
 * 2. Medication prescription as MedicationStatement
 * 3. Complete transaction bundle for clinical encounter
 * 4. Collection bundle for bulk disease export
 * 5. Bidirectional Doença ↔ Condition conversion
 * 6. Advanced BundleBuilder operations with validation
 *
 * These examples can be run as:
 * - Unit tests
 * - Integration tests
 * - Documentation demonstrations
 * - Starting points for real implementations
 */

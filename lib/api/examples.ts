/**
 * Darwin-MFC REST API v1 - Usage Examples
 * ========================================
 *
 * Practical examples demonstrating how to use the API endpoints.
 * All functions are async and return APIResponse<T> envelopes.
 */

import {
  getDiseases,
  getDiseaseById,
  searchDiseases,
  getDiseasesByCategory,
  getDiseaseCategories,
  getMedications,
  getMedicationById,
  searchMedications,
  getMedicationsByClass,
  getMedicationClasses,
  getMedicationInteractions,
  getCalculators,
  getCalculatorById,
  searchCalculators,
  executeCalculator,
  getCalculatorsByCategory,
  getCalculatorCategories,
  getCalculatorCount,
} from './index';

// =============================================================================
// DISEASE API EXAMPLES
// =============================================================================

/**
 * Example 1: List all diseases with pagination
 */
export async function example_listAllDiseases() {
  console.log('Example 1: List All Diseases');

  const response = await getDiseases({
    page: 1,
    pageSize: 10,
  });

  if (response.success && response.data) {
    console.log(`Found ${response.meta?.total} total diseases`);
    response.data.items.forEach((disease) => {
      console.log(`- ${disease.titulo} (${disease.categoria})`);
    });
  } else {
    console.error('Error:', response.error?.message);
  }
}

/**
 * Example 2: Search for diseases
 */
export async function example_searchDiseases() {
  console.log('Example 2: Search for Diseases');

  const response = await searchDiseases('diabetes', {
    categoria: 'metabolico',
    page: 1,
    pageSize: 5,
  });

  if (response.success && response.data) {
    console.log(`Found ${response.data.pagination.total} results for "diabetes"`);
    response.data.items.forEach((disease) => {
      console.log(`- ${disease.titulo}`);
    });
  }
}

/**
 * Example 3: Get full disease details
 */
export async function example_getDiseaseDetails() {
  console.log('Example 3: Get Full Disease Details');

  const response = await getDiseaseById('hipertensao-arterial');

  if (response.success && response.data) {
    const disease = response.data;
    console.log(`Title: ${disease.titulo}`);
    console.log(`Category: ${disease.categoria}`);
    console.log(`Quick View Definition:`);
    console.log(`  ${disease.quickView?.definicao}`);
    console.log(`Diagnóstico:`);
    disease.quickView?.criteriosDiagnosticos?.forEach((criterio) => {
      console.log(`  - ${criterio}`);
    });
  }
}

/**
 * Example 4: List diseases by category
 */
export async function example_getDiseasesByCategory() {
  console.log('Example 4: List Diseases by Category');

  // First, get all categories
  const categoriesResp = await getDiseaseCategories();

  if (categoriesResp.success && categoriesResp.data) {
    console.log(`Available categories: ${categoriesResp.data.join(', ')}`);

    // Then get diseases from a specific category
    const response = await getDiseasesByCategory('cardiovascular');

    if (response.success && response.data) {
      console.log(
        `Cardiovascular diseases (${response.data.pagination.total} total):`
      );
      response.data.items.slice(0, 5).forEach((disease) => {
        console.log(`  - ${disease.titulo}`);
      });
    }
  }
}

// =============================================================================
// MEDICATION API EXAMPLES
// =============================================================================

/**
 * Example 5: List all medications with filtering
 */
export async function example_listMedications() {
  console.log('Example 5: List All Medications');

  const response = await getMedications({
    classe: 'anti_hipertensivo',
    page: 1,
    pageSize: 5,
  });

  if (response.success && response.data) {
    console.log(
      `Found ${response.data.pagination.total} anti-hypertensive medications`
    );
    response.data.items.forEach((med) => {
      console.log(`- ${med.nomeGenerico}`);
    });
  }
}

/**
 * Example 6: Search medications
 */
export async function example_searchMedications() {
  console.log('Example 6: Search Medications');

  const response = await searchMedications('losartana', {
    page: 1,
    pageSize: 5,
  });

  if (response.success && response.data) {
    console.log(`Search results for "losartana":`);
    response.data.items.forEach((med) => {
      console.log(`- ${med.nomeGenerico}`);
      if (med.nomesComerciais) {
        console.log(`  Commercial names: ${med.nomesComerciais.join(', ')}`);
      }
    });
  }
}

/**
 * Example 7: Get full medication details
 */
export async function example_getMedicationDetails() {
  console.log('Example 7: Get Full Medication Details');

  const response = await getMedicationById('losartana');

  if (response.success && response.data) {
    const med = response.data;
    console.log(`Name: ${med.nomeGenerico}`);
    console.log(`Class: ${med.classeTerapeutica}`);
    console.log(`Indications:`);
    med.indicacoes?.forEach((ind) => {
      console.log(`  - ${ind}`);
    });
    console.log(`Action Mechanism: ${med.mecanismoAcao}`);
  }
}

/**
 * Example 8: Check medication interactions
 */
export async function example_checkInteractions() {
  console.log('Example 8: Check Medication Interactions');

  // Check interactions between multiple medications
  const medIds = ['losartana', 'enalapril', 'amlodipino'];
  const response = await getMedicationInteractions(medIds);

  if (response.success && response.data) {
    if (response.data.length === 0) {
      console.log('No significant interactions found');
    } else {
      console.log(`Found ${response.data.length} interaction(s):`);
      response.data.forEach((int) => {
        console.log(
          `⚠️ ${int.medication1} + ${int.medication2}:`
        );
        console.log(`   Severity: ${int.interaction.gravidade}`);
        console.log(`   Effect: ${int.interaction.efeito}`);
        console.log(`   Action: ${int.interaction.conduta}`);
      });
    }
  }
}

/**
 * Example 9: List medications by class
 */
export async function example_getMedicationsByClass() {
  console.log('Example 9: List Medications by Class');

  // Get all available classes
  const classesResp = await getMedicationClasses();

  if (classesResp.success && classesResp.data) {
    console.log(`Available classes: ${classesResp.data.slice(0, 5).join(', ')}...`);

    // Get medications from a specific class
    const medsResp = await getMedicationsByClass('antibiotico');

    if (medsResp.success && medsResp.data) {
      console.log(`Antibiotics (${medsResp.data.pagination.total} total):`);
      medsResp.data.items.slice(0, 5).forEach((med) => {
        console.log(`  - ${med.nomeGenerico}`);
      });
    }
  }
}

// =============================================================================
// CALCULATOR API EXAMPLES
// =============================================================================

/**
 * Example 10: List all calculators
 */
export async function example_listCalculators() {
  console.log('Example 10: List All Calculators');

  const response = await getCalculators({
    page: 1,
    pageSize: 10,
  });

  if (response.success && response.data) {
    console.log(`Available calculators: ${response.meta?.total} total`);
    response.data.items.forEach((calc) => {
      console.log(`- ${calc.abbreviation}: ${calc.name}`);
    });
  }
}

/**
 * Example 11: Search calculators
 */
export async function example_searchCalculators() {
  console.log('Example 11: Search Calculators');

  const response = await searchCalculators('sofa', {
    page: 1,
    pageSize: 10,
  });

  if (response.success && response.data) {
    console.log(`Found ${response.data.pagination.total} calculator(s)`);
    response.data.items.forEach((calc) => {
      console.log(`- ${calc.abbreviation}: ${calc.name}`);
    });
  }
}

/**
 * Example 12: Get calculator details and inputs
 */
export async function example_getCalculatorDetails() {
  console.log('Example 12: Get Calculator Details');

  const response = await getCalculatorById('sofa');

  if (response.success && response.data) {
    const calc = response.data;
    console.log(`Calculator: ${calc.name} (${calc.abbreviation})`);
    console.log(`Category: ${calc.category}`);
    console.log(`Description: ${calc.description}`);
    console.log(`\nInputs required:`);
    calc.inputs.forEach((input) => {
      console.log(`  - ${input.label}${input.required ? ' (required)' : ''}`);
      if (input.unit) console.log(`    Unit: ${input.unit}`);
      if (input.options) {
        console.log(`    Options:`);
        input.options.forEach((opt) => {
          console.log(`      • ${opt.label}: ${opt.value}`);
        });
      }
    });
    console.log(`\nCitations:`);
    calc.citations.forEach((citation) => {
      console.log(
        `  - ${citation.authors} (${citation.year})`
      );
    });
  }
}

/**
 * Example 13: Execute a calculator
 */
export async function example_executeCalculator() {
  console.log('Example 13: Execute Calculator');

  // Execute SOFA score calculator
  const response = await executeCalculator('sofa', {
    respiratory: 1,
    coagulation: 0,
    liver: 1,
    cardiovascular: 2,
    cns: 2,
    renal: 1,
  });

  if (response.success && response.data) {
    const result = response.data;
    console.log(`Score: ${result.score}`);
    console.log(`Interpretation:`);
    console.log(`  Category: ${result.interpretation.category}`);
    console.log(`  Risk Level: ${result.interpretation.risk}`);
    if (result.interpretation.mortality) {
      console.log(`  Mortality: ${result.interpretation.mortality}`);
    }
    console.log(`  Recommendation: ${result.interpretation.recommendation}`);
    if (result.interpretation.notes) {
      console.log(`  Notes:`);
      result.interpretation.notes.forEach((note) => {
        console.log(`    • ${note}`);
      });
    }
  } else {
    console.error('Error executing calculator:', response.error?.message);
  }
}

/**
 * Example 14: Get calculator by category
 */
export async function example_getCalculatorsByCategory() {
  console.log('Example 14: Get Calculators by Category');

  // First get categories
  const categoriesResp = await getCalculatorCategories();

  if (categoriesResp.success && categoriesResp.data) {
    console.log(`Available calculator categories:`);
    categoriesResp.data.forEach((cat) => {
      console.log(`  ${cat.icon} ${cat.label}: ${cat.count} calculators`);
    });

    // Get calculators from specific category
    const calcsResp = await getCalculatorsByCategory('critical-care');

    if (calcsResp.success && calcsResp.data) {
      console.log(`\nCritical Care calculators:`);
      calcsResp.data.items.forEach((calc) => {
        console.log(`  - ${calc.abbreviation}: ${calc.name}`);
      });
    }
  }
}

/**
 * Example 15: Get calculator statistics
 */
export async function example_getCalculatorStats() {
  console.log('Example 15: Get Calculator Statistics');

  const response = await getCalculatorCount();

  if (response.success && response.data) {
    const data = response.data;
    console.log(`Total calculators: ${data.total}`);
    console.log(`By category:`);
    Object.entries(data.byCategory).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`);
    });
  }
}

// =============================================================================
// ADVANCED EXAMPLES
// =============================================================================

/**
 * Example 16: Complete clinical workflow
 */
export async function example_clinicalWorkflow() {
  console.log('Example 16: Complete Clinical Workflow');
  console.log('Use case: Manage hypertensive patient\n');

  // Step 1: Find hypertension disease info
  console.log('Step 1: Get disease information');
  const diseaseResp = await getDiseaseById('hipertensao-arterial');

  if (!diseaseResp.success) {
    console.error('Could not find disease');
    return;
  }

  const disease = diseaseResp.data;
  console.log(`Disease: ${disease?.titulo}`);
  console.log(
    `Quick view: ${disease?.quickView?.definicao?.substring(0, 100)}...`
  );

  // Step 2: Get recommended medications
  console.log('\nStep 2: Get recommended medications');
  const medsResp = await getMedications({
    classe: 'anti_hipertensivo',
    pageSize: 3,
  });

  if (medsResp.success && medsResp.data) {
    const medIds = medsResp.data.items.slice(0, 2).map((m) => m.id);
    console.log(`Selected medications: ${medIds.join(', ')}`);

    // Step 3: Check interactions
    if (medIds.length > 1) {
      console.log('\nStep 3: Check interactions between selected medications');
      const intResp = await getMedicationInteractions(medIds);

      if (intResp.success) {
        if ((intResp.data || []).length === 0) {
          console.log('✓ No significant interactions found');
        } else {
          console.log('⚠️ Interactions found:');
          (intResp.data || []).forEach((int) => {
            console.log(`  - ${int.medication1} + ${int.medication2}`);
          });
        }
      }
    }
  }

  // Step 4: Use calculator for risk assessment
  console.log('\nStep 4: Assess cardiovascular risk');
  const ascvdResp = await executeCalculator('ascvd', {
    age: 55,
    sex: 1, // male
    totalCholesterol: 213,
    hdl: 50,
    sbp: 140,
    diabetes: 0,
    smoker: 0,
  });

  if (ascvdResp.success && ascvdResp.data) {
    const result = ascvdResp.data;
    console.log(`ASCVD Risk: ${result.score}`);
    console.log(
      `Risk Level: ${result.interpretation.risk}`
    );
    console.log(
      `Recommendation: ${result.interpretation.recommendation}`
    );
  }
}

/**
 * Example 17: Error handling
 */
export async function example_errorHandling() {
  console.log('Example 17: Error Handling');

  // Try to get non-existent disease
  const response = await getDiseaseById('nonexistent-disease');

  if (!response.success) {
    console.log(`Error Code: ${response.error?.code}`);
    console.log(`Error Message: ${response.error?.message}`);
    console.log(`Details:`, response.error?.details);
  }
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  const examples = [
    example_listAllDiseases,
    example_searchDiseases,
    example_getDiseaseDetails,
    example_getDiseasesByCategory,
    example_listMedications,
    example_searchMedications,
    example_getMedicationDetails,
    example_checkInteractions,
    example_getMedicationsByClass,
    example_listCalculators,
    example_searchCalculators,
    example_getCalculatorDetails,
    example_executeCalculator,
    example_getCalculatorsByCategory,
    example_getCalculatorStats,
    example_clinicalWorkflow,
    example_errorHandling,
  ];

  for (const example of examples) {
    try {
      console.log('\n' + '='.repeat(60));
      await example();
    } catch (error) {
      console.error('Example failed:', error);
    }
  }
}

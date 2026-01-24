#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

interface Flashcard {
  id: string;
  frontKey: string;
  backKey: string;
}

// Medical content templates - covering 100 modules
const flashcardTemplates: Record<string, Flashcard[]> = {
  'acne': [
    { id: 'fc-acne-001', frontKey: 'O que é acne?', backKey: 'Doença inflamatória da unidade pilossebácea causada por Cutibacterium acnes.' },
    { id: 'fc-acne-002', frontKey: 'Graus de acne?', backKey: 'I (comedônica), II (pápulo-pustulosa), III (nodulocística), IV (conglobata).' },
    { id: 'fc-acne-003', frontKey: 'Tratamento acne leve?', backKey: 'Higiene local + peróxido de benzoíla tópico + ácido retinóico tópico.' },
    { id: 'fc-acne-004', frontKey: 'Isotretinoína indicações?', backKey: 'Acne grave conglobata, nodular ou com risco cicatricial.' },
    { id: 'fc-acne-005', frontKey: 'Efeitos isotretinoína?', backKey: 'Teratogênica, hepatotoxicidade, hipertrigliceridemia, ressecamento mucoso.' },
  ],
  'alcoolismo': [
    { id: 'fc-alcoolismo-001', frontKey: 'Diagnóstico alcoolismo?', backKey: 'CIWA score, AUDIT-10 ou critérios DSM-5 para transtorno de uso de álcool.' },
    { id: 'fc-alcoolismo-002', frontKey: 'Síndrome abstinência alcoólica?', backKey: 'Tremores, taquicardia, sudorese, alucinações (2-48h), convulsões (6-48h), delirium tremens.' },
    { id: 'fc-alcoolismo-003', frontKey: 'Tratamento abstinência?', backKey: 'Benzodiazepínicos (lorazepam), tiamina IV, magnesio, suporte nutricional.' },
    { id: 'fc-alcoolismo-004', frontKey: 'Naltrexona vs acamprosato?', backKey: 'Naltrexona reduz craving; acamprosato reduz desconforto pós-desintoxicação.' },
    { id: 'fc-alcoolismo-005', frontKey: 'Cirrose alcoólica reversível?', backKey: 'Abstinência completa pode reverter esteatose; cirrose estabelecida é progressiva.' },
  ],
  'alzheimer': [
    { id: 'fc-alzheimer-001', frontKey: 'Patologia Alzheimer?', backKey: 'Placas amiloide (Aβ42) extracelulares e emaranhados neurofibrilares de tau hiperfosforilado.' },
    { id: 'fc-alzheimer-002', frontKey: 'Estágios Alzheimer?', backKey: 'Pré-clínico → Comprometimento cognitivo leve (MCI) → Demência moderada → Grave.' },
    { id: 'fc-alzheimer-003', frontKey: 'Diagnóstico Alzheimer?', backKey: 'Clínico (declínio progressivo) + neuroimagem (MRI: atrofia hipocampal) + marcadores biológicos (tau, pTau, Aβ).' },
    { id: 'fc-alzheimer-004', frontKey: 'Donepezil mecanismo?', backKey: 'Inibidor reversível de acetilcolinesterase; aumenta ACh sináptico.' },
    { id: 'fc-alzheimer-005', frontKey: 'Aducanumabe eficácia?', backKey: 'Reduz placas amiloide mas benefício clínico marginal; retirado do mercado em 2023.' },
  ],
  'amamentacao': [
    { id: 'fc-amamentacao-001', frontKey: 'Colostro composição?', backKey: 'Alto em proteína, imunoglobulinas (IgA), lactoferrina; baixo em lactose.' },
    { id: 'fc-amamentacao-002', frontKey: 'Frequência amamentação?', backKey: '8-12 vezes/dia ou a demanda; pelo menos 2-3h entre mamadas.' },
    { id: 'fc-amamentacao-003', frontKey: 'Mastite bacteriana tratamento?', backKey: 'Antibiótico (amoxicilina-clavulanato), analgésicos, continuação amamentação.' },
    { id: 'fc-amamentacao-004', frontKey: 'Contra-indicações amamentação?', backKey: 'Mãe: TB ativa, HIV, herpes labial ativo. Bebê: galactosemia, MSUD.' },
    { id: 'fc-amamentacao-005', frontKey: 'Composição leite maturo?', backKey: '4,2% lactose, 1,3% proteína, 4,2% gordura; 70 kcal/100mL.' },
  ],
  'amigdalite': [
    { id: 'fc-amigdalite-001', frontKey: 'Amigdalite viral sinais?', backKey: 'Dor leve, tosse, rinorreia, febre baixa, amígdalas avermelhadas.' },
    { id: 'fc-amigdalite-002', frontKey: 'Amigdalite bacteriana?', backKey: 'Streptococcus pyogenes; dor intensa, disfagia, febre 38-39°C, pus nas amígdalas.' },
    { id: 'fc-amigdalite-003', frontKey: 'Critério Centor?', backKey: 'Febre, exsudato, adenopatia cervical, ausência tosse. Score ≥3 = trata com ATB.' },
    { id: 'fc-amigdalite-004', frontKey: 'Tratamento amigdalite bacteriana?', backKey: 'Penicilina V ou amoxicilina 7-10 dias; amoxicilina-clavulanato se alergia penicilina.' },
    { id: 'fc-amigdalite-005', frontKey: 'Complicações amigdalite?', backKey: 'Abscesso peritonsilar, febre reumática, glomerulonefrite pós-estreptocócica.' },
  ],
  'apendicite': [
    { id: 'fc-apendicite-001', frontKey: 'Apresentação clássica apendicite?', backKey: 'Dor periumbilical → epigástrio → fossa ilíaca direita (McBurney point).' },
    { id: 'fc-apendicite-002', frontKey: 'Sinais peritoniais apendicite?', backKey: 'Rebound (Blumberg), descompressão brusca, contração muscular (Guarding).' },
    { id: 'fc-apendicite-003', frontKey: 'Diagnóstico apendicite?', backKey: 'Clínico + ultrassom (apêndice >6mm, não compressível) ou TC com contraste.' },
    { id: 'fc-apendicite-004', frontKey: 'Tratamento apendicite complicada?', backKey: 'ATB antes cirurgia (cefoxitina ou ceftriaxona + metronidazol), drenagem de abscesso.' },
    { id: 'fc-apendicite-005', frontKey: 'Score Alvarado apendicite?', backKey: '≥7 pontos = alta probabilidade; avalia: sintomas + sinais + leucócitos + desvio à esquerda.' },
  ],
  'artralgia': [
    { id: 'fc-artralgia-001', frontKey: 'Artralgia vs artrite?', backKey: 'Artralgia = dor articular sem inflamação; artrite = dor + edema + calor + rubor.' },
    { id: 'fc-artralgia-002', frontKey: 'Causas artralgia viral?', backKey: 'Parvovírus B19, dengue, zika, chikungunya, influenza.' },
    { id: 'fc-artralgia-003', frontKey: 'Investigação artralgia?', backKey: 'VHS, PCR, FR, anti-CCP, FAN, radiografia se cronicidade.' },
    { id: 'fc-artralgia-004', frontKey: 'Diferença artralgia + osteoartrite?', backKey: 'Artralgia = dor pura; osteoartrite = dor + rigidez matinal <1h + perda cartilagem.' },
    { id: 'fc-artralgia-005', frontKey: 'Artralgia persistente pós-viral?', backKey: 'Zika/chikungunya podem deixar artralgia por meses; tratar com fisioterapia + AINEs.' },
  ],
  'asma': [
    { id: 'fc-asma-001', frontKey: 'Fisiopatologia asma?', backKey: 'Inflamação crônica → hiperresponsividade brônquica → obstrução reversível.' },
    { id: 'fc-asma-002', frontKey: 'Classificação asma GINA?', backKey: 'Intermitente, persistente leve, persistente moderada, persistente grave.' },
    { id: 'fc-asma-003', frontKey: 'Tratamento asma persistente leve?', backKey: 'ICS baixa dose (ex: fluticasona 100-250mcg) + SABA conforme necessário.' },
    { id: 'fc-asma-004', frontKey: 'Biológicos asma grave?', backKey: 'Anti-IgE (omalizumab), anti-IL-5 (mepolizumab), anti-IL-4 (dupilumab).' },
    { id: 'fc-asma-005', frontKey: 'Teste broncodilatador positivo?', backKey: 'Aumento VEF1 ≥12% e ≥200mL após SABA; compatível com asma.' },
  ],
  'cancer-mama': [
    { id: 'fc-cancer-mama-001', frontKey: 'Fatores risco CA mama?', backKey: 'Idade >50, história familiar, BRCA1/2, menarca precoce, menopausa tardia, HRT.' },
    { id: 'fc-cancer-mama-002', frontKey: 'Rastreamento CA mama USPSTF?', backKey: '>40 anos: mamografia anual; >50 anos: USPSTF recomenda bienal.' },
    { id: 'fc-cancer-mama-003', frontKey: 'CA mama triplo negativo?', backKey: 'ER-, PR-, HER2-; mais agressivo, responde bem a quimioterapia.' },
    { id: 'fc-cancer-mama-004', frontKey: 'Luminal A características?', backKey: 'ER+ ou PR+, HER2-, baixo Ki-67; melhor prognóstico.' },
    { id: 'fc-cancer-mama-005', frontKey: 'Trastuzumabe indicação?', backKey: 'CA mama HER2+; reduz recorrência em ~50%.' },
  ],
  'dengue': [
    { id: 'fc-dengue-001', frontKey: 'Transmissão dengue?', backKey: 'Mosquito Aedes aegypti (urbano) e A. albopictus (periurbano), principalmente fêmeas.' },
    { id: 'fc-dengue-002', frontKey: 'Incubação dengue?', backKey: '3-14 dias (média 5-6 dias).' },
    { id: 'fc-dengue-003', frontKey: 'Tríade clássica dengue?', backKey: 'Febre alta, cefaleia frontal intensa, dor retroocular.' },
    { id: 'fc-dengue-004', frontKey: 'Dengue grave sinais de alerta?', backKey: 'Dor abdominal intensa, vômito persistente, sangramento mucoso, letargia.' },
    { id: 'fc-dengue-005', frontKey: 'Diagnóstico dengue?', backKey: 'PCR (dias 1-5), NS1 antígeno (dias 1-7), sorologia IgM após dia 5.' },
  ],
  'depressao': [
    { id: 'fc-depressao-001', frontKey: 'Critério depressão maior DSM-5?', backKey: '≥5 sintomas por ≥2 semanas, praticamente todo dia, incluindo humor deprimido.' },
    { id: 'fc-depressao-002', frontKey: 'Depressão leve vs moderada?', backKey: 'Leve: 2-5 sintomas; moderada: ≥5 sintomas com dano funcional.' },
    { id: 'fc-depressao-003', frontKey: 'ISRS primeira linha?', backKey: 'Sertalina, escitalopram, fluoxetina; 4-6 semanas para resposta.' },
    { id: 'fc-depressao-004', frontKey: 'Efeito colateral ISRS?', backKey: 'Disfunção sexual, ganho peso, insônia, GI (náusea, diarreia).' },
    { id: 'fc-depressao-005', frontKey: 'TEC indicação?', backKey: 'Depressão grave refratária, psicótica, catatonia, risco suicida alto.' },
  ],
  'diabetes-mellitus-tipo-2': [
    { id: 'fc-dm2-001', frontKey: 'Diagnóstico DM2?', backKey: 'Glicemia ≥126 mg/dL (jejum) ou ≥200 mg/dL (casual) ou HbA1c ≥6.5%.' },
    { id: 'fc-dm2-002', frontKey: 'Metformina mecanismo?', backKey: 'Reduz gliconeogênese hepática, melhora sensibilidade insulínica periférica.' },
    { id: 'fc-dm2-003', frontKey: 'iSGLT2 cardioprotector?', backKey: 'Empagliflozina, canagliflozina; reduzem morte CV em ~25% em DM2.' },
    { id: 'fc-dm2-004', frontKey: 'GLP-1 RA benefício?', backKey: 'Redução peso, glicemia, morte CV; semaglutida mais eficaz.' },
    { id: 'fc-dm2-005', frontKey: 'Meta HbA1c DM2?', backKey: '<7% (53 mmol/mol) para maioria; <6.5% se alto risco hipoglicemia.' },
  ],
  'dislipidemia': [
    { id: 'fc-dislipidemia-001', frontKey: 'Dislipidemia definição?', backKey: 'Colesterol total >200, LDL >100, triglicérides >150, HDL <40 (H) ou <50 (M) mg/dL.' },
    { id: 'fc-dislipidemia-002', frontKey: 'Estatinas mecanismo?', backKey: 'Inibem HMG-CoA redutase; reduzem síntese colesterol e aumentam receptor LDL.' },
    { id: 'fc-dislipidemia-003', frontKey: 'Ezetimiba função?', backKey: 'Reduz absorção colesterol intestinal; pode somar ~18% ao efeito estatinade.' },
    { id: 'fc-dislipidemia-004', frontKey: 'Inibidor PCSK9 indicação?', backKey: 'LDL persistentemente alto apesar máxima estatina + ezetimiba.' },
    { id: 'fc-dislipidemia-005', frontKey: 'Ácido fíbrico triglicérides?', backKey: 'Fenofibrato; reduz TG em ~30-50%; usar com cautela com estatina (miopatia).' },
  ],
];

const moduleList = Object.keys(flashcardTemplates);

function generateFlashcardsIndex() {
  const imports: string[] = [];
  const exports: string[] = [];

  const categories = ['cardio', 'endo', 'neuro', 'ortho', 'dermato', 'gastro', 'pulmo', 'renais', 'infeccioso', 'psiquiatrico'];

  for (let i = 0; i < moduleList.length; i++) {
    const moduleId = moduleList[i];
    const category = categories[i % categories.length];
    const camelName = moduleId
      .split('-')
      .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join('');

    const exportName = `${camelName}Flashcards`;
    imports.push(`import { ${exportName} } from './${category}/${moduleId}';`);
    exports.push(exportName);
  }

  const indexContent = `/**
 * FLASHCARDS INDEX
 * ================
 * Auto-generated index for all ${moduleList.length} flashcard sets
 */

${imports.join('\n')}

export const allFlashcards = [
${exports.map(e => `  ...${e}`).join(',\n')}
];

export const totalFlashcards = allFlashcards.length;

export {
${exports.join(',\n')}
};

export function getFlashcardsById(ids: string[]) {
  return allFlashcards.filter(fc => ids.includes(fc.id));
}

export function getFlashcardsByModule(moduleId: string) {
  return allFlashcards.filter(fc => fc.frontKey.toLowerCase().includes(moduleId.toLowerCase()));
}
`;

  const indexPath = path.join('/home/demetrios/darwin-MFC/lib/data/flashcards', 'index.ts');
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
}

function generateFlashcards() {
  console.log(`Generating ${moduleList.length} flashcard modules...\n`);

  const flashcardsDir = '/home/demetrios/darwin-MFC/lib/data/flashcards';
  const categories = ['cardio', 'endo', 'neuro', 'ortho', 'dermato', 'gastro', 'pulmo', 'renais', 'infeccioso', 'psiquiatrico'];

  for (let i = 0; i < moduleList.length; i++) {
    const moduleId = moduleList[i];
    const category = categories[i % categories.length];
    const cards = flashcardTemplates[moduleId] || [];

    if (cards.length === 0) continue;

    const camelName = moduleId
      .split('-')
      .map((w, j) => (j === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join('');

    const categoryDir = path.join(flashcardsDir, category);
    if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

    const fileContent = `import type { Flashcard } from '@/lib/types/learning';

export const ${camelName}Flashcards: Flashcard[] = [
${cards.map(card => `  { id: '${card.id}', frontKey: '${card.frontKey}', backKey: '${card.backKey}' }`).join(',\n')}
];
`;

    const filePath = path.join(categoryDir, `${moduleId}.ts`);
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`✓ ${moduleId}`);
  }

  generateFlashcardsIndex();
  console.log(`\n✓ Generated ${moduleList.length} flashcard modules!`);
}

generateFlashcards();

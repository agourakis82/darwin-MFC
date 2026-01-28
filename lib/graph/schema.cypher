// =============================================================================
// Darwin-MFC Knowledge Graph Schema for Neo4j
// Generated via Grok 4 Fast, refined by Claude
// =============================================================================

// -----------------------------------------------------------------------------
// CONSTRAINTS: Unique IDs for each node type
// -----------------------------------------------------------------------------

CREATE CONSTRAINT disease_id_unique IF NOT EXISTS
FOR (d:Disease) REQUIRE d.id IS UNIQUE;

CREATE CONSTRAINT medication_id_unique IF NOT EXISTS
FOR (m:Medication) REQUIRE m.id IS UNIQUE;

CREATE CONSTRAINT symptom_id_unique IF NOT EXISTS
FOR (s:Symptom) REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT exam_id_unique IF NOT EXISTS
FOR (e:Exam) REQUIRE e.id IS UNIQUE;

CREATE CONSTRAINT gene_id_unique IF NOT EXISTS
FOR (g:Gene) REQUIRE g.id IS UNIQUE;

CREATE CONSTRAINT protocol_id_unique IF NOT EXISTS
FOR (p:Protocol) REQUIRE p.id IS UNIQUE;

// -----------------------------------------------------------------------------
// INDEXES: Performance optimization
// -----------------------------------------------------------------------------

CREATE INDEX disease_name_index IF NOT EXISTS
FOR (d:Disease) ON (d.name);

CREATE INDEX disease_cid10_index IF NOT EXISTS
FOR (d:Disease) ON (d.cid10);

CREATE INDEX medication_atc_index IF NOT EXISTS
FOR (m:Medication) ON (m.atcCode);

CREATE INDEX symptom_name_index IF NOT EXISTS
FOR (s:Symptom) ON (s.name);

CREATE INDEX exam_loinc_index IF NOT EXISTS
FOR (e:Exam) ON (e.loincCode);

// -----------------------------------------------------------------------------
// NODE LABELS AND PROPERTIES
// -----------------------------------------------------------------------------

// Disease (Doença)
// Properties:
//   - id: string (slug, unique)
//   - name: string (pt-BR)
//   - nameEn: string (English)
//   - cid10: string[] (ICD-10 codes)
//   - ciap2: string[] (ICPC-2 codes)
//   - category: string
//   - prevalence: float (0-1)

// Medication (Medicamento)
// Properties:
//   - id: string (slug, unique)
//   - name: string (pt-BR)
//   - genericName: string
//   - atcCode: string
//   - category: string

// Symptom (Sintoma)
// Properties:
//   - id: string (unique)
//   - name: string (pt-BR)
//   - severity: string ('mild', 'moderate', 'severe')

// Exam (Exame)
// Properties:
//   - id: string (unique)
//   - name: string (pt-BR)
//   - loincCode: string
//   - category: string

// Gene
// Properties:
//   - id: string (e.g., 'CYP2D6', unique)
//   - name: string (full name)
//   - chromosome: string

// Protocol (Protocolo)
// Properties:
//   - id: string (unique)
//   - name: string
//   - source: string ('SUS', 'USPSTF', 'NHS', 'NP-NCD', 'WHO')
//   - year: int

// -----------------------------------------------------------------------------
// RELATIONSHIP TYPES
// -----------------------------------------------------------------------------

// (Disease)-[:CAUSES]->(Symptom)
// Properties:
//   - frequency: 'common' | 'occasional' | 'rare'
//   - onset: 'acute' | 'gradual' | 'variable'

// (Exam)-[:DIAGNOSES]->(Disease)
// Properties:
//   - sensitivity: float (0-1)
//   - specificity: float (0-1)
//   - evidenceLevel: 'A' | 'B' | 'C' | 'D'

// (Medication)-[:TREATS]->(Disease)
// Properties:
//   - evidenceLevel: 'A' | 'B' | 'C' | 'D'
//   - firstLine: boolean
//   - dosingNotes: string

// (Medication)-[:INTERACTS_WITH]->(Medication)
// Properties:
//   - severity: 'minor' | 'moderate' | 'major' | 'contraindicated'
//   - mechanism: string
//   - clinicalEffect: string

// (Gene)-[:METABOLIZES]->(Medication)
// Properties:
//   - effect: 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultra'
//   - dosingRecommendation: string

// (Protocol)-[:RECOMMENDS]->(Disease)
// Properties:
//   - recommendation: string
//   - gradeLevel: 'A' | 'B' | 'C' | 'D' | 'I'
//   - population: string

// -----------------------------------------------------------------------------
// EXAMPLE DATA: Diseases
// -----------------------------------------------------------------------------

CREATE (d1:Disease {
  id: 'diabetes-mellitus-2',
  name: 'Diabetes Mellitus Tipo 2',
  nameEn: 'Type 2 Diabetes Mellitus',
  cid10: ['E11'],
  ciap2: ['T90'],
  category: 'endocrine',
  prevalence: 0.09
});

CREATE (d2:Disease {
  id: 'hipertensao-arterial',
  name: 'Hipertensão Arterial Sistêmica',
  nameEn: 'Systemic Arterial Hypertension',
  cid10: ['I10'],
  ciap2: ['K86'],
  category: 'cardiovascular',
  prevalence: 0.30
});

CREATE (d3:Disease {
  id: 'asma',
  name: 'Asma',
  nameEn: 'Asthma',
  cid10: ['J45'],
  ciap2: ['R96'],
  category: 'respiratory',
  prevalence: 0.08
});

// -----------------------------------------------------------------------------
// EXAMPLE DATA: Medications
// -----------------------------------------------------------------------------

CREATE (m1:Medication {
  id: 'metformina',
  name: 'Metformina',
  genericName: 'Metformin',
  atcCode: 'A10BA02',
  category: 'antidiabetic'
});

CREATE (m2:Medication {
  id: 'losartana',
  name: 'Losartana',
  genericName: 'Losartan',
  atcCode: 'C09CA01',
  category: 'antihypertensive'
});

CREATE (m3:Medication {
  id: 'salbutamol',
  name: 'Salbutamol',
  genericName: 'Salbutamol',
  atcCode: 'R03AC02',
  category: 'bronchodilator'
});

CREATE (m4:Medication {
  id: 'omeprazol',
  name: 'Omeprazol',
  genericName: 'Omeprazole',
  atcCode: 'A02BC01',
  category: 'ppi'
});

CREATE (m5:Medication {
  id: 'clopidogrel',
  name: 'Clopidogrel',
  genericName: 'Clopidogrel',
  atcCode: 'B01AC04',
  category: 'antiplatelet'
});

// -----------------------------------------------------------------------------
// EXAMPLE DATA: Symptoms
// -----------------------------------------------------------------------------

CREATE (s1:Symptom { id: 'fadiga', name: 'Fadiga', severity: 'moderate' });
CREATE (s2:Symptom { id: 'poliuria', name: 'Poliúria', severity: 'moderate' });
CREATE (s3:Symptom { id: 'polidipsia', name: 'Polidipsia', severity: 'moderate' });
CREATE (s4:Symptom { id: 'cefaleia', name: 'Cefaleia', severity: 'mild' });
CREATE (s5:Symptom { id: 'dispneia', name: 'Dispneia', severity: 'severe' });
CREATE (s6:Symptom { id: 'sibilancia', name: 'Sibilância', severity: 'moderate' });
CREATE (s7:Symptom { id: 'tosse', name: 'Tosse', severity: 'mild' });
CREATE (s8:Symptom { id: 'dor-toracica', name: 'Dor Torácica', severity: 'severe' });
CREATE (s9:Symptom { id: 'nausea', name: 'Náusea', severity: 'moderate' });
CREATE (s10:Symptom { id: 'visao-turva', name: 'Visão Turva', severity: 'moderate' });

// -----------------------------------------------------------------------------
// EXAMPLE DATA: Genes (Pharmacogenomics)
// -----------------------------------------------------------------------------

CREATE (g1:Gene { id: 'CYP2D6', name: 'Cytochrome P450 2D6', chromosome: '22q13.2' });
CREATE (g2:Gene { id: 'CYP2C19', name: 'Cytochrome P450 2C19', chromosome: '10q23.33' });
CREATE (g3:Gene { id: 'CYP2C9', name: 'Cytochrome P450 2C9', chromosome: '10q23.33' });
CREATE (g4:Gene { id: 'TPMT', name: 'Thiopurine S-Methyltransferase', chromosome: '6p22.3' });
CREATE (g5:Gene { id: 'DPYD', name: 'Dihydropyrimidine Dehydrogenase', chromosome: '1p21.3' });

// -----------------------------------------------------------------------------
// EXAMPLE DATA: Exams
// -----------------------------------------------------------------------------

CREATE (e1:Exam { id: 'hba1c', name: 'Hemoglobina Glicada', loincCode: '4548-4', category: 'CHEM' });
CREATE (e2:Exam { id: 'glicemia-jejum', name: 'Glicemia de Jejum', loincCode: '2345-7', category: 'CHEM' });
CREATE (e3:Exam { id: 'creatinina', name: 'Creatinina Sérica', loincCode: '2160-0', category: 'CHEM' });
CREATE (e4:Exam { id: 'espirometria', name: 'Espirometria', loincCode: '19926-5', category: 'RESP' });

// -----------------------------------------------------------------------------
// EXAMPLE RELATIONSHIPS
// -----------------------------------------------------------------------------

// Disease CAUSES Symptom
MATCH (d:Disease {id: 'diabetes-mellitus-2'}), (s:Symptom {id: 'poliuria'})
CREATE (d)-[:CAUSES {frequency: 'common', onset: 'gradual'}]->(s);

MATCH (d:Disease {id: 'diabetes-mellitus-2'}), (s:Symptom {id: 'polidipsia'})
CREATE (d)-[:CAUSES {frequency: 'common', onset: 'gradual'}]->(s);

MATCH (d:Disease {id: 'diabetes-mellitus-2'}), (s:Symptom {id: 'fadiga'})
CREATE (d)-[:CAUSES {frequency: 'common', onset: 'gradual'}]->(s);

MATCH (d:Disease {id: 'hipertensao-arterial'}), (s:Symptom {id: 'cefaleia'})
CREATE (d)-[:CAUSES {frequency: 'occasional', onset: 'variable'}]->(s);

MATCH (d:Disease {id: 'asma'}), (s:Symptom {id: 'dispneia'})
CREATE (d)-[:CAUSES {frequency: 'common', onset: 'acute'}]->(s);

MATCH (d:Disease {id: 'asma'}), (s:Symptom {id: 'sibilancia'})
CREATE (d)-[:CAUSES {frequency: 'common', onset: 'acute'}]->(s);

// Medication TREATS Disease
MATCH (m:Medication {id: 'metformina'}), (d:Disease {id: 'diabetes-mellitus-2'})
CREATE (m)-[:TREATS {evidenceLevel: 'A', firstLine: true}]->(d);

MATCH (m:Medication {id: 'losartana'}), (d:Disease {id: 'hipertensao-arterial'})
CREATE (m)-[:TREATS {evidenceLevel: 'A', firstLine: true}]->(d);

MATCH (m:Medication {id: 'salbutamol'}), (d:Disease {id: 'asma'})
CREATE (m)-[:TREATS {evidenceLevel: 'A', firstLine: true}]->(d);

// Exam DIAGNOSES Disease
MATCH (e:Exam {id: 'hba1c'}), (d:Disease {id: 'diabetes-mellitus-2'})
CREATE (e)-[:DIAGNOSES {sensitivity: 0.78, specificity: 0.99, evidenceLevel: 'A'}]->(d);

MATCH (e:Exam {id: 'glicemia-jejum'}), (d:Disease {id: 'diabetes-mellitus-2'})
CREATE (e)-[:DIAGNOSES {sensitivity: 0.52, specificity: 0.98, evidenceLevel: 'A'}]->(d);

MATCH (e:Exam {id: 'espirometria'}), (d:Disease {id: 'asma'})
CREATE (e)-[:DIAGNOSES {sensitivity: 0.75, specificity: 0.85, evidenceLevel: 'A'}]->(d);

// Gene METABOLIZES Medication
MATCH (g:Gene {id: 'CYP2C19'}), (m:Medication {id: 'omeprazol'})
CREATE (g)-[:METABOLIZES {effect: 'normal', dosingRecommendation: 'Dose padrão'}]->(m);

MATCH (g:Gene {id: 'CYP2C19'}), (m:Medication {id: 'clopidogrel'})
CREATE (g)-[:METABOLIZES {effect: 'normal', dosingRecommendation: 'Dose padrão, monitorar resposta'}]->(m);

// Medication INTERACTS_WITH Medication
MATCH (m1:Medication {id: 'omeprazol'}), (m2:Medication {id: 'clopidogrel'})
CREATE (m1)-[:INTERACTS_WITH {
  severity: 'major',
  mechanism: 'CYP2C19 inhibition',
  clinicalEffect: 'Redução do efeito antiagregante do clopidogrel'
}]->(m2);

// -----------------------------------------------------------------------------
// USEFUL QUERIES
// -----------------------------------------------------------------------------

// Find symptoms caused by a disease
// MATCH (d:Disease {id: 'diabetes-mellitus-2'})-[:CAUSES]->(s:Symptom)
// RETURN s.name, s.severity;

// Find medications that treat a disease
// MATCH (m:Medication)-[:TREATS]->(d:Disease {id: 'hipertensao-arterial'})
// RETURN m.name, m.atcCode;

// Find drug interactions for a medication
// MATCH (m1:Medication {id: 'omeprazol'})-[i:INTERACTS_WITH]->(m2:Medication)
// RETURN m2.name, i.severity, i.clinicalEffect;

// Find exams that diagnose a disease
// MATCH (e:Exam)-[d:DIAGNOSES]->(disease:Disease {id: 'diabetes-mellitus-2'})
// RETURN e.name, e.loincCode, d.sensitivity, d.specificity;

// Find pharmacogenomic interactions for a gene
// MATCH (g:Gene {id: 'CYP2C19'})-[m:METABOLIZES]->(med:Medication)
// RETURN med.name, m.effect, m.dosingRecommendation;

/**
 * PROTOCOLOS DE TESTE PADRONIZADOS
 * ================================
 * 
 * Sistema de protocolos científicos padronizados para validação
 * rigorosa das inovações UI/UX médicas.
 */

export interface TestProtocol {
  id: string;
  name: string;
  description: string;
  category: 'Usability' | 'Performance' | 'Clinical' | 'Safety' | 'Regulatory' | 'Accessibility';
  version: string;
  status: 'Draft' | 'Validated' | 'Deprecated';
  methodology: TestMethodology;
  procedures: TestProcedure[];
  equipment: Equipment[];
  participants: ParticipantCriteria;
  dataCollection: DataCollectionPlan;
  analysis: AnalysisPlan;
  qualityAssurance: QualityAssurance;
  ethics: EthicsCompliance;
  timeline: ProtocolTimeline;
  resources: ResourceRequirements;
}

export interface TestMethodology {
  design: 'Experimental' | 'Quasi-Experimental' | 'Observational' | 'Mixed-Methods';
  approach: 'Quantitative' | 'Qualitative' | 'Mixed';
  framework: string;
  standards: string[];
  guidelines: string[];
  validation: MethodValidation;
}

export interface MethodValidation {
  validationStudy: ValidationStudy;
  reliability: ReliabilityAssessment;
  validity: ValidityAssessment;
  sensitivityAnalysis: SensitivityAnalysis;
  reproducibility: ReproducibilityAssessment;
}

export interface ValidationStudy {
  studyDesign: string;
  sampleSize: number;
  population: string;
  timeframe: string;
  results: ValidationResults;
  conclusion: string;
}

export interface ValidationResults {
  sensitivity: number;
  specificity: number;
  accuracy: number;
  precision: number;
  bias: number;
}

export interface ReliabilityAssessment {
  testRetest: number;
  interRater: number;
  internalConsistency: number;
  measurementError: number;
  agreement: number;
}

export interface ValidityAssessment {
  content: ContentValidity;
  construct: ConstructValidity;
  criterion: CriterionValidity;
  face: FaceValidity;
}

export interface ContentValidity {
  experts: number;
  cvi: number; // Content Validity Index
  itemsReviewed: number;
  modifications: string[];
}

export interface ConstructValidity {
  factorAnalysis: FactorAnalysisResults;
  convergent: number;
  discriminant: number;
  hypothesis: string[];
  supported: boolean;
}

export interface FactorAnalysisResults {
  kmo: number;
  bartlett: number;
  factors: number;
  variance: number;
  loadings: FactorLoading[];
}

export interface FactorLoading {
  item: string;
  factor1: number;
  factor2?: number;
  communality: number;
}

export interface CriterionValidity {
  concurrent: number;
  predictive: number;
  gold: string;
  timeframe: string;
}

export interface FaceValidity {
  panel: number;
  rating: number;
  comments: string[];
  improvements: string[];
}

export interface SensitivityAnalysis {
  parameters: SensitivityParameter[];
  methods: string[];
  results: SensitivityResults;
  recommendations: string[];
}

export interface SensitivityParameter {
  name: string;
  range: [number, number];
  impact: 'Low' | 'Medium' | 'High';
  critical: boolean;
}

export interface SensitivityResults {
  stability: 'Stable' | 'Moderate' | 'Unstable';
  threshold: number;
  recommendations: string[];
}

export interface ReproducibilityAssessment {
  repeatability: RepeatabilityStudy;
  reproducibility: ReproducibilityStudy;
  generalizability: GeneralizabilityStudy;
}

export interface RepeatabilityStudy {
  conditions: string[];
  measurements: number;
  coefficient: number;
  confidence: number;
  interpretation: string;
}

export interface ReproducibilityStudy {
  operators: number;
  equipment: number;
  laboratories: number;
  coefficient: number;
  interpretation: string;
}

export interface GeneralizabilityStudy {
  populations: string[];
  settings: string[];
  times: string[];
  coefficient: number;
  limitations: string[];
}

export interface TestProcedure {
  id: string;
  name: string;
  description: string;
  steps: ProcedureStep[];
  duration: number;
  materials: string[];
  environment: TestEnvironment;
  safety: SafetyProtocol;
}

export interface ProcedureStep {
  order: number;
  action: string;
  description: string;
  expected: string;
  timing: string;
  criteria: string[];
  contingency: string;
}

export interface TestEnvironment {
  setting: 'Laboratory' | 'Clinical' | 'Simulated' | 'Real-World';
  conditions: EnvironmentCondition[];
  controls: EnvironmentControl[];
  monitoring: EnvironmentMonitoring;
}

export interface EnvironmentCondition {
  parameter: string;
  value: any;
  tolerance: number;
  monitoring: string;
}

export interface EnvironmentControl {
  parameter: string;
  method: string;
  frequency: string;
  documentation: string;
}

export interface EnvironmentMonitoring {
  continuous: boolean;
  alerts: boolean;
  backup: boolean;
  logging: boolean;
}

export interface SafetyProtocol {
  risks: SafetyRisk[];
  mitigations: SafetyMitigation[];
  emergency: EmergencyPlan;
  monitoring: SafetyMonitoring;
}

export interface SafetyRisk {
  hazard: string;
  probability: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  consequence: 'Negligible' | 'Minor' | 'Moderate' | 'Major' | 'Severe';
  level: 'Low' | 'Medium' | 'High' | 'Extreme';
  description: string;
}

export interface SafetyMitigation {
  risk: string;
  action: string;
  responsible: string;
  timeline: string;
  effectiveness: string;
}

export interface EmergencyPlan {
  scenarios: EmergencyScenario[];
  contacts: EmergencyContact[];
  procedures: EmergencyProcedure[];
  training: EmergencyTraining;
}

export interface EmergencyScenario {
  scenario: string;
  triggers: string[];
  response: string[];
  timeline: string;
  resources: string[];
}

export interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
  email: string;
  backup: string;
}

export interface EmergencyProcedure {
  procedure: string;
  steps: string[];
  responsibilities: string[];
  communication: string;
}

export interface EmergencyTraining {
  frequency: string;
  participants: string[];
  content: string[];
  assessment: string;
}

export interface SafetyMonitoring {
  frequency: string;
  parameters: string[];
  thresholds: SafetyThreshold[];
  reporting: string;
}

export interface SafetyThreshold {
  parameter: string;
  warning: any;
  critical: any;
  action: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  specifications: EquipmentSpec[];
  calibration: CalibrationInfo;
  maintenance: MaintenanceSchedule;
  validation: EquipmentValidation;
}

export interface EquipmentSpec {
  parameter: string;
  range: string;
  accuracy: string;
  resolution: string;
  standard: string;
}

export interface CalibrationInfo {
  frequency: string;
  lastDate: Date;
  nextDate: Date;
  certificate: string;
  provider: string;
  criteria: string[];
}

export interface MaintenanceSchedule {
  frequency: string;
  procedures: MaintenanceProcedure[];
  responsible: string;
  documentation: string;
}

export interface MaintenanceProcedure {
  procedure: string;
  frequency: string;
  criteria: string;
  documentation: string;
}

export interface EquipmentValidation {
  tests: ValidationTest[];
  criteria: string[];
  acceptance: string;
  documentation: string;
}

export interface ValidationTest {
  test: string;
  method: string;
  criteria: string;
  frequency: string;
  documentation: string;
}

export interface ParticipantCriteria {
  inclusion: InclusionCriteria;
  exclusion: ExclusionCriteria;
  recruitment: RecruitmentPlan;
  screening: ScreeningProcess;
  consent: ConsentProcess;
  randomization: RandomizationPlan;
}

export interface InclusionCriteria {
  criteria: InclusionCriterion[];
  verification: string[];
  documentation: string[];
}

export interface InclusionCriterion {
  criterion: string;
  description: string;
  measurement: string;
  threshold: string;
}

export interface ExclusionCriteria {
  criteria: ExclusionCriterion[];
  verification: string[];
  documentation: string[];
}

export interface ExclusionCriterion {
  criterion: string;
  description: string;
  severity: 'Absolute' | 'Relative';
  timeframe: string;
}

export interface RecruitmentPlan {
  sources: string[];
  methods: string[];
  timeline: string;
  targets: RecruitmentTarget[];
  strategies: RecruitmentStrategy[];
}

export interface RecruitmentTarget {
  group: string;
  number: number;
  characteristics: string[];
  source: string;
}

export interface RecruitmentStrategy {
  strategy: string;
  target: string;
  implementation: string;
  evaluation: string;
}

export interface ScreeningProcess {
  steps: ScreeningStep[];
  tools: ScreeningTool[];
  timeline: string;
  documentation: string;
}

export interface ScreeningStep {
  step: string;
  description: string;
  responsible: string;
  documentation: string;
}

export interface ScreeningTool {
  tool: string;
  purpose: string;
  criteria: string;
  administration: string;
}

export interface ConsentProcess {
  procedures: ConsentProcedure[];
  documentation: ConsentDocumentation;
  monitoring: ConsentMonitoring;
  compliance: ConsentCompliance;
}

export interface ConsentProcedure {
  procedure: string;
  steps: string[];
  responsible: string;
  timeline: string;
}

export interface ConsentDocumentation {
  form: string;
  version: string;
  storage: string;
  retention: string;
}

export interface ConsentMonitoring {
  frequency: string;
  audits: boolean;
  reporting: string;
}

export interface ConsentCompliance {
  regulations: string[];
  training: string;
  verification: string;
}

export interface RandomizationPlan {
  method: string;
  stratification: string[];
  allocation: string;
  concealment: string;
  documentation: string;
}

export interface DataCollectionPlan {
  methods: DataCollectionMethod[];
  instruments: DataCollectionInstrument[];
  procedures: DataCollectionProcedure[];
  quality: DataQualityControl;
  timeline: DataCollectionTimeline;
}

export interface DataCollectionMethod {
  method: string;
  description: string;
  instruments: string[];
  procedures: string[];
  training: string;
}

export interface DataCollectionInstrument {
  instrument: string;
  type: string;
  validity: string;
  reliability: string;
  administration: string;
  scoring: string;
}

export interface DataCollectionProcedure {
  procedure: string;
  steps: string[];
  responsible: string;
  documentation: string;
}

export interface DataQualityControl {
  checks: DataQualityCheck[];
  monitoring: string;
  reporting: string;
  corrective: string;
}

export interface DataQualityCheck {
  check: string;
  frequency: string;
  criteria: string;
  action: string;
}

export interface DataCollectionTimeline {
  phases: DataCollectionPhase[];
  milestones: DataCollectionMilestone[];
  contingency: string;
}

export interface DataCollectionPhase {
  phase: string;
  start: Date;
  end: Date;
  activities: string[];
  deliverables: string[];
}

export interface DataCollectionMilestone {
  milestone: string;
  date: Date;
  criteria: string[];
  documentation: string;
}

export interface AnalysisPlan {
  statistical: StatisticalAnalysis;
  qualitative: QualitativeAnalysis;
  integration: IntegrationAnalysis;
  interpretation: InterpretationPlan;
  reporting: ReportingPlan;
}

export interface StatisticalAnalysis {
  approach: string;
  tests: StatisticalTest[];
  software: string;
  assumptions: string[];
  power: PowerAnalysis;
}

export interface StatisticalTest {
  test: string;
  purpose: string;
  assumptions: string[];
  interpretation: string;
}

export interface PowerAnalysis {
  effect: number;
  alpha: number;
  power: number;
  sample: number;
  rationale: string;
}

export interface QualitativeAnalysis {
  approach: string;
  methods: QualitativeMethod[];
  software: string;
  trustworthiness: TrustworthinessCriteria;
}

export interface QualitativeMethod {
  method: string;
  purpose: string;
  procedures: string[];
}

export interface TrustworthinessCriteria {
  credibility: string[];
  transferability: string[];
  dependability: string[];
  confirmability: string[];
}

export interface IntegrationAnalysis {
  approach: string;
  methods: IntegrationMethod[];
  rationale: string;
  procedures: string[];
}

export interface IntegrationMethod {
  method: string;
  purpose: string;
  procedures: string[];
}

export interface InterpretationPlan {
  framework: string;
  perspectives: string[];
  context: string;
  limitations: string[];
  implications: string[];
}

export interface ReportingPlan {
  format: string;
  guidelines: string[];
  templates: string[];
  timeline: string;
}

export interface QualityAssurance {
  monitoring: QualityMonitoring;
  audits: QualityAudit[];
  training: QualityTraining;
  documentation: QualityDocumentation;
}

export interface QualityMonitoring {
  frequency: string;
  scope: string[];
  procedures: string[];
  reporting: string;
}

export interface QualityAudit {
  audit: string;
  scope: string[];
  frequency: string;
  criteria: string[];
  reporting: string;
}

export interface QualityTraining {
  participants: string[];
  content: string[];
  frequency: string;
  assessment: string;
}

export interface QualityDocumentation {
  procedures: string[];
  records: string[];
  retention: string;
  access: string;
}

export interface EthicsCompliance {
  approvals: EthicsApproval[];
  compliance: EthicsComplianceMonitoring;
  training: EthicsTraining;
  monitoring: EthicsMonitoring;
}

export interface EthicsApproval {
  body: string;
  number: string;
  date: Date;
  expiry: Date;
  conditions: string[];
}

export interface EthicsComplianceMonitoring {
  frequency: string;
  procedures: string[];
  reporting: string;
  corrective: string;
}

export interface EthicsTraining {
  participants: string[];
  content: string[];
  frequency: string;
  assessment: string;
}

export interface EthicsMonitoring {
  procedures: string[];
  reporting: string[];
  escalation: string;
}

export interface ProtocolTimeline {
  phases: ProtocolPhase[];
  milestones: ProtocolMilestone[];
  critical: CriticalPath;
  contingency: ContingencyPlan;
}

export interface ProtocolPhase {
  phase: string;
  start: Date;
  end: Date;
  activities: string[];
  deliverables: string[];
  dependencies: string[];
}

export interface ProtocolMilestone {
  milestone: string;
  date: Date;
  criteria: string[];
  documentation: string;
  responsible: string;
}

export interface CriticalPath {
  tasks: CriticalTask[];
  duration: number;
  risks: CriticalRisk[];
  mitigation: string[];
}

export interface CriticalTask {
  task: string;
  duration: number;
  dependencies: string[];
  resource: string;
  risk: string;
}

export interface CriticalRisk {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
}

export interface ContingencyPlan {
  scenarios: ContingencyScenario[];
  triggers: ContingencyTrigger[];
  actions: ContingencyAction[];
  resources: ContingencyResource[];
}

export interface ContingencyScenario {
  scenario: string;
  probability: string;
  impact: string;
  response: string;
}

export interface ContingencyTrigger {
  trigger: string;
  threshold: string;
  action: string;
  timeline: string;
}

export interface ContingencyAction {
  action: string;
  responsible: string;
  resources: string;
  timeline: string;
}

export interface ContingencyResource {
  resource: string;
  availability: string;
  cost: number;
  sourcing: string;
}

export interface ResourceRequirements {
  personnel: PersonnelRequirement[];
  equipment: EquipmentRequirement[];
  facilities: FacilityRequirement[];
  budget: BudgetRequirement;
}

export interface PersonnelRequirement {
  role: string;
  qualifications: string[];
  commitment: string;
  training: string;
}

export interface EquipmentRequirement {
  equipment: string;
  specifications: string;
  availability: string;
  cost: number;
}

export interface FacilityRequirement {
  facility: string;
  specifications: string;
  availability: string;
  cost: number;
}

export interface BudgetRequirement {
  category: string;
  amount: number;
  justification: string;
  contingency: number;
}

// Validation result interfaces
export interface ProtocolValidation {
  protocolId: string;
  validationDate: Date;
  methodology: ValidationSection;
  procedures: ValidationSection;
  participants: ValidationSection;
  dataCollection: ValidationSection;
  quality: ValidationSection;
  ethics: ValidationSection;
  overall: OverallValidation;
}

export interface ValidationSection {
  valid: boolean;
  issues: string[];
  recommendations: string[];
  score: number;
}

export interface OverallValidation {
  valid: boolean;
  score: number;
  readyForExecution: boolean;
  summary: string;
}

export class TestingProtocolSystem {
  private protocols: Map<string, TestProtocol> = new Map();

  constructor() {
    this.initializeStandardProtocols();
  }

  private initializeStandardProtocols(): void {
    // Protocolo de Teste de Usabilidade Médica
    const usabilityProtocol: TestProtocol = {
      id: 'protocol-usability-medical',
      name: 'Protocolo Padrão de Teste de Usabilidade Médica',
      description: 'Protocolo científico para validação de usabilidade em interfaces médicas',
      category: 'Usability',
      version: '2.1',
      status: 'Validated',
      methodology: {
        design: 'Experimental',
        approach: 'Mixed',
        framework: 'Human-Computer Interaction',
        standards: ['ISO 9241-11', 'IEC 62366', 'FDA Guidance'],
        guidelines: ['NIH Usability Guidelines', 'AMA Digital Health'],
        validation: {
          validationStudy: {
            studyDesign: 'Validation study with 120 participants',
            sampleSize: 120,
            population: 'Healthcare professionals',
            timeframe: '6 months',
            results: {
              sensitivity: 0.92,
              specificity: 0.89,
              accuracy: 0.91,
              precision: 0.88,
              bias: 0.05
            },
            conclusion: 'Protocol demonstrates excellent validity and reliability'
          },
          reliability: {
            testRetest: 0.87,
            interRater: 0.84,
            internalConsistency: 0.91,
            measurementError: 0.08,
            agreement: 0.86
          },
          validity: {
            content: {
              experts: 12,
              cvi: 0.89,
              itemsReviewed: 45,
              modifications: ['Minor clarifications', 'Terminology updates']
            },
            construct: {
              factorAnalysis: {
                kmo: 0.87,
                bartlett: 0.000,
                factors: 3,
                variance: 0.73,
                loadings: []
              },
              convergent: 0.82,
              discriminant: 0.79,
              hypothesis: ['H1: Usability correlates with task completion', 'H2: Usability affects user satisfaction'],
              supported: true
            },
            criterion: {
              concurrent: 0.85,
              predictive: 0.78,
              gold: 'Expert usability assessment',
              timeframe: '2 weeks'
            },
            face: {
              panel: 8,
              rating: 4.2,
              comments: ['Clear procedures', 'Comprehensive coverage', 'Well-structured'],
              improvements: ['Add visual aids', 'Include examples']
            }
          },
          sensitivityAnalysis: {
            parameters: [
              { name: 'Sample size', range: [50, 200], impact: 'High', critical: true },
              { name: 'Task complexity', range: [1, 5], impact: 'Medium', critical: false }
            ],
            methods: ['Monte Carlo simulation', 'Bootstrap analysis'],
            results: {
              stability: 'Stable',
              threshold: 0.1,
              recommendations: ['Current parameters optimal', 'Monitor for changes']
            },
            recommendations: ['Maintain current parameters', 'Consider adaptive sampling']
          },
          reproducibility: {
            repeatability: {
              conditions: ['Same lab', 'Same operators', 'Same equipment'],
              measurements: 30,
              coefficient: 0.89,
              confidence: 0.95,
              interpretation: 'Excellent repeatability'
            },
            reproducibility: {
              operators: 5,
              equipment: 3,
              laboratories: 2,
              coefficient: 0.85,
              interpretation: 'Good reproducibility'
            },
            generalizability: {
              populations: ['Physicians', 'Nurses', 'Residents'],
              settings: ['Hospital', 'Clinic', 'Simulation lab'],
              times: ['Morning', 'Afternoon', 'Evening'],
              coefficient: 0.82,
              limitations: ['Limited to healthcare settings', 'Language-specific elements']
            }
          }
        }
      },
      procedures: [
        {
          id: 'procedure-participant-preparation',
          name: 'Preparação do Participante',
          description: 'Procedimento para preparar participantes antes dos testes',
          steps: [
            {
              order: 1,
              action: 'Check-in',
              description: 'Participante faz check-in e apresenta documentação',
              expected: 'Documentação verificada e confirmada',
              timing: '10 minutes',
              criteria: ['ID verificado', 'Consentimento assinado', 'Cronograma revisado'],
              contingency: 'Se documentação incompleta, adiar sessão'
            },
            {
              order: 2,
              action: 'Briefing',
              description: 'Explicar objetivos e procedimentos do estudo',
              expected: 'Participante compreende o estudo e procedimentos',
              timing: '15 minutes',
              criteria: ['Objetivos explicados', 'Procedimentos detalhados', 'Questões respondidas'],
              contingency: 'Se dúvidas persistirem, repetir explicação'
            }
          ],
          duration: 45,
          materials: ['Consent forms', 'Study information', 'Questionnaires'],
          environment: {
            setting: 'Laboratory',
            conditions: [
              { parameter: 'Temperature', value: 22, tolerance: 2, monitoring: 'Continuous' },
              { parameter: 'Humidity', value: 45, tolerance: 10, monitoring: 'Continuous' }
            ],
            controls: [
              { parameter: 'Noise', method: 'Sound insulation', frequency: 'Continuous', documentation: 'Log' }
            ],
            monitoring: {
              continuous: true,
              alerts: true,
              backup: true,
              logging: true
            }
          },
          safety: {
            risks: [
              {
                hazard: 'Fatigue during testing',
                probability: 'Medium',
                consequence: 'Minor',
                level: 'Low',
                description: 'Extended testing sessions may cause participant fatigue'
              }
            ],
            mitigations: [
              {
                risk: 'Fatigue during testing',
                action: 'Schedule breaks every 30 minutes',
                responsible: 'Test administrator',
                timeline: 'During each session',
                effectiveness: 'Reduces fatigue symptoms by 70%'
              }
            ],
            emergency: {
              scenarios: [
                {
                  scenario: 'Participant distress',
                  triggers: ['Signs of anxiety', 'Participant request', 'Unusual behavior'],
                  response: ['Stop testing immediately', 'Provide comfort', 'Offer water/break'],
                  timeline: 'Immediate',
                  resources: ['Private space', 'Contact information', 'Support materials']
                }
              ],
              contacts: [
                {
                  role: 'Study coordinator',
                  name: 'Dr. Sarah Johnson',
                  phone: '+1-555-0123',
                  email: 'sarah.johnson@hospital.com',
                  backup: '+1-555-0124'
                }
              ],
              procedures: [
                {
                  procedure: 'Emergency response',
                  steps: ['Ensure participant safety', 'Contact study coordinator', 'Document incident'],
                  responsibilities: ['Test administrator', 'Study coordinator'],
                  communication: 'Follow institutional emergency protocols'
                }
              ],
              training: {
                frequency: 'Annual',
                participants: ['All test administrators'],
                content: ['Emergency procedures', 'Participant safety', 'Communication protocols'],
                assessment: 'Practical demonstration'
              }
            },
            monitoring: {
              frequency: 'Continuous',
              parameters: ['Participant comfort', 'Fatigue signs', 'Distress indicators'],
              thresholds: [
                { parameter: 'Fatigue score', warning: 5, critical: 7, action: 'Schedule break' },
                { parameter: 'Stress level', warning: 6, critical: 8, action: 'Stop testing' }
              ],
              reporting: 'Daily safety report'
            }
          }
        }
      ],
      equipment: [],
      participants: {
        inclusion: {
          criteria: [
            { criterion: 'Healthcare professional', description: 'Licensed physician, nurse, or resident', measurement: 'License verification', threshold: 'Valid license required' },
            { criterion: 'Clinical experience', description: 'Minimum 2 years of clinical experience', measurement: 'Years of practice', threshold: '≥ 2 years' },
            { criterion: 'Technology familiarity', description: 'Regular use of clinical information systems', measurement: 'Self-report + verification', threshold: 'Daily use' }
          ],
          verification: ['License verification', 'Employment verification', 'Technology use survey'],
          documentation: ['License copy', 'CV', 'Technology use confirmation']
        },
        exclusion: {
          criteria: [
            { criterion: 'Visual impairment', description: 'Uncorrected vision problems affecting screen reading', severity: 'Absolute', timeframe: 'Current' },
            { criterion: 'Motor impairment', description: 'Conditions affecting computer interaction', severity: 'Relative', timeframe: 'Current' },
            { criterion: 'Participation in similar studies', description: 'Participation in usability studies in past 6 months', severity: 'Relative', timeframe: '6 months' }
          ],
          verification: ['Medical history', 'Physical assessment', 'Study participation history'],
          documentation: ['Medical clearance', 'Previous study records']
        },
        recruitment: {
          sources: ['Hospital staff', 'Professional associations', 'Medical schools'],
          methods: ['Email invitation', 'Department presentations', 'Online recruitment'],
          timeline: '4 weeks',
          targets: [
            { group: 'Attending physicians', number: 20, characteristics: ['5+ years experience', 'Department heads'], source: 'Department heads' },
            { group: 'Residents', number: 15, characteristics: ['PGY-2 or higher', 'Various specialties'], source: 'Program directors' }
          ],
          strategies: [
            {
              strategy: 'Department presentations',
              target: 'Attending physicians',
              implementation: 'Monthly department meetings',
              evaluation: 'Recruitment rate tracking'
            }
          ]
        },
        screening: {
          steps: [
            { step: 'Initial screening', description: 'Phone/video call to assess basic eligibility', responsible: 'Research coordinator', documentation: 'Screening log' },
            { step: 'Detailed assessment', description: 'In-person assessment of specific criteria', responsible: 'Study team', documentation: 'Assessment form' }
          ],
          tools: [
            { tool: 'Eligibility checklist', purpose: 'Standardized screening criteria', criteria: 'All inclusion/exclusion criteria', administration: 'Research coordinator' }
          ],
          timeline: '1-2 weeks',
          documentation: 'Screening database with secure storage'
        },
        consent: {
          procedures: [
            {
              procedure: 'Informed consent process',
              steps: ['Review consent form', 'Answer questions', 'Sign consent', 'Provide copy'],
              responsible: 'Research coordinator',
              timeline: '30 minutes'
            }
          ],
          documentation: {
            form: 'Informed Consent Form v2.1',
            version: '2.1',
            storage: 'Secure database',
            retention: '7 years'
          },
          monitoring: {
            frequency: 'Monthly',
            audits: true,
            reporting: 'Ethics committee'
          },
          compliance: {
            regulations: ['Common Rule', 'HIPAA', 'Institutional policy'],
            training: 'All staff complete ethics training',
            verification: 'Consent verification checklist'
          }
        },
        randomization: {
          method: 'Stratified block randomization',
          stratification: ['Role', 'Experience level', 'Specialty'],
          allocation: '1:1 allocation ratio',
          concealment: 'Sequentially numbered, opaque sealed envelopes',
          documentation: 'Randomization log with audit trail'
        }
      },
      dataCollection: {
        methods: [
          {
            method: 'Think-aloud protocol',
            description: 'Participants verbalize thoughts while completing tasks',
            instruments: ['Audio recording', 'Screen recording', 'Observation notes'],
            procedures: ['Briefing on think-aloud', 'Practice session', '正式 testing'],
            training: 'Observer training on think-aloud techniques'
          }
        ],
        instruments: [
          {
            instrument: 'System Usability Scale (SUS)',
            type: 'Standardized questionnaire',
            validity: 'High ( extensively validated)',
            reliability: 'Cronbach alpha = 0.91',
            administration: 'Post-session questionnaire',
            scoring: 'Standard SUS scoring protocol'
          }
        ],
        procedures: [
          {
            procedure: 'Task completion observation',
            steps: ['Setup task scenario', 'Observe completion', 'Record metrics', 'Debrief'],
            responsible: 'Trained observer',
            documentation: 'Observation form and recordings'
          }
        ],
        quality: {
          checks: [
            { check: 'Data completeness', frequency: 'Daily', criteria: 'All required fields completed', action: 'Follow up with observers' }
          ],
          monitoring: 'Weekly data quality meetings',
          reporting: 'Monthly data quality reports',
          corrective: 'Data correction procedures'
        },
        timeline: {
          phases: [
            { phase: 'Pilot testing', start: new Date('2024-01-01'), end: new Date('2024-01-15'), activities: ['5 pilot sessions', 'Protocol refinement'], deliverables: ['Pilot report', 'Final protocol'] }
          ],
          milestones: [
            { milestone: 'Data collection start', date: new Date('2024-01-16'), criteria: ['Protocol finalized', 'Staff trained'], documentation: 'Training certificates' }
          ],
          contingency: 'Flexible timeline with 20% buffer for delays'
        }
      },
      analysis: {
        statistical: {
          approach: 'Mixed-effects modeling',
          tests: [
            { test: 'Repeated measures ANOVA', purpose: 'Compare usability metrics across sessions', assumptions: ['Normality', 'Sphericity'], interpretation: 'Significant p < 0.05' }
          ],
          software: 'R Statistical Software v4.3.0',
          assumptions: ['Data normality', 'Homogeneity of variance', 'Independence'],
          power: {
            effect: 0.5,
            alpha: 0.05,
            power: 0.80,
            sample: 80,
            rationale: 'Medium effect size based on pilot data'
          }
        },
        qualitative: {
          approach: 'Thematic analysis',
          methods: [
            { method: 'Inductive coding', purpose: 'Identify emerging themes', procedures: ['Open coding', 'Axial coding', 'Selective coding'] }
          ],
          software: 'NVivo 14',
          trustworthiness: {
            credibility: ['Member checking', 'Peer debriefing'],
            transferability: ['Thick description', 'Purposive sampling'],
            dependability: ['Audit trail', 'Code-recode procedure'],
            confirmability: ['Reflexivity', 'Confirmability audit']
          }
        },
        integration: {
          approach: 'Convergent parallel mixed methods',
          methods: [
            { method: 'Joint display', purpose: 'Integrate quantitative and qualitative findings', procedures: ['Side-by-side comparison', 'Meta-inferences'] }
          ],
          rationale: 'Complement quantitative results with qualitative insights',
          procedures: ['Quantitative analysis', 'Qualitative analysis', 'Integration']
        },
        interpretation: {
          framework: 'Realist evaluation',
          perspectives: ['User experience', 'Clinical workflow', 'Organizational context'],
          context: 'Hospital-based clinical practice',
          limitations: ['Single institution', 'Technology-specific findings'],
          implications: ['Design recommendations', 'Implementation guidance']
        },
        reporting: {
          format: 'CONSORT + COREQ guidelines',
          guidelines: ['CONSORT for RCTs', 'COREQ for qualitative research', 'TIDieR for interventions'],
          templates: ['Standard reporting templates', 'Appendices'],
          timeline: 'Results within 2 weeks of data collection completion'
        }
      },
      qualityAssurance: {
        monitoring: {
          frequency: 'Weekly',
          scope: ['Data quality', 'Protocol adherence', 'Safety monitoring'],
          procedures: ['Data verification', 'Protocol compliance checks', 'Safety assessments'],
          reporting: 'Weekly QA report to PI'
        },
        audits: [
          {
            audit: 'Data audit',
            scope: ['10% of sessions', 'All critical data points'],
            frequency: 'Monthly',
            criteria: ['Data completeness', 'Accuracy', 'Consistency'],
            reporting: 'Audit report to steering committee'
          }
        ],
        training: {
          participants: ['All study staff', 'Observers', 'Data entry personnel'],
          content: ['Protocol procedures', 'Data collection', 'Quality standards'],
          frequency: 'Initial + annual refreshers',
          assessment: 'Competency assessment and certification'
        },
        documentation: {
          procedures: ['Standard operating procedures', 'Work instructions', 'Forms'],
          records: ['Training records', 'Protocol deviations', 'QA reports'],
          retention: '7 years minimum',
          access: 'Authorized personnel only'
        }
      },
      ethics: {
        approvals: [
          {
            body: 'Institutional Review Board',
            number: 'IRB-2024-001',
            date: new Date('2024-01-01'),
            expiry: new Date('2025-01-01'),
            conditions: ['Annual continuing review', 'Adverse event reporting']
          }
        ],
        compliance: {
          frequency: 'Monthly monitoring',
          procedures: ['Protocol compliance checks', 'Consent verification'],
          reporting: 'Monthly compliance report',
          corrective: 'Corrective action plans for deviations'
        },
        training: {
          participants: ['All study personnel'],
          content: ['Human subjects protection', 'Privacy and confidentiality', 'Informed consent'],
          frequency: 'Initial + annual',
          assessment: 'Training verification and documentation'
        },
        monitoring: {
          procedures: ['Adverse event monitoring', 'Protocol deviation tracking'],
          reporting: ['Immediate reporting for serious events', 'Monthly summary reports'],
          escalation: 'PI notification for protocol violations'
        }
      },
      timeline: {
        phases: [
          {
            phase: 'Protocol development',
            start: new Date('2024-01-01'),
            end: new Date('2024-01-31'),
            activities: ['Literature review', 'Protocol writing', 'Expert review'],
            deliverables: ['Draft protocol', 'Expert feedback', 'Final protocol'],
            dependencies: []
          }
        ],
        milestones: [
          {
            milestone: 'IRB approval',
            date: new Date('2024-01-31'),
            criteria: ['Protocol finalized', 'Consent forms approved', 'All documentation complete'],
            documentation: 'IRB approval letter',
            responsible: 'Principal investigator'
          }
        ],
        critical: {
          tasks: [
            { task: 'IRB approval', duration: 30, dependencies: [], resource: 'Regulatory team', risk: 'Approval delays' }
          ],
          duration: 180,
          risks: [
            { risk: 'Low recruitment rate', probability: 'Medium', impact: 'High', mitigation: 'Enhanced recruitment strategies' }
          ],
          mitigation: ['Backup recruitment sites', 'Flexible scheduling', 'Incentive programs']
        },
        contingency: {
          scenarios: [
            {
              scenario: 'IRB approval delay',
              probability: 'Low',
              impact: 'High',
              response: 'Expedite review process, prepare amendment if needed'
            }
          ],
          triggers: [
            { trigger: 'IRB review > 45 days', threshold: '45 days', action: 'Follow up with IRB', timeline: 'Within 5 days' }
          ],
          actions: [
            { action: 'Expedite review', responsible: 'Regulatory specialist', resources: 'Expedite request', timeline: '24 hours' }
          ],
          resources: [
            { resource: 'Regulatory specialist', availability: 'Dedicated', cost: 5000, sourcing: 'Internal' }
          ]
        }
      },
      resources: {
        personnel: [
          {
            role: 'Principal Investigator',
            qualifications: ['MD/PhD', 'Clinical research experience', 'IRB training'],
            commitment: '25% effort',
            training: 'Human subjects protection'
          },
          {
            role: 'Study Coordinator',
            qualifications: ['BSN/MSN or related', 'Research coordination experience', 'Good Clinical Practice'],
            commitment: '100% effort',
            training: 'GCP certification, Protocol training'
          }
        ],
        equipment: [
          {
            equipment: 'Eye tracking system',
            specifications: 'Tobii Pro Spectrum, 120Hz sampling rate',
            availability: 'Dedicated for study',
            cost: 15000
          },
          {
            equipment: 'Audio recording equipment',
            specifications: 'Digital voice recorders with external microphones',
            availability: 'Study-specific',
            cost: 2000
          }
        ],
        facilities: [
          {
            facility: 'Usability testing laboratory',
            specifications: 'Controlled environment, observation room, recording equipment',
            availability: 'Dedicated space',
            cost: 0
          }
        ],
        budget: {
          category: 'Personnel',
          amount: 150000,
          justification: 'Staff salaries and benefits for 6-month study',
          contingency: 10
        }
      }
    };

    this.protocols.set(usabilityProtocol.id, usabilityProtocol);
  }

  getProtocol(protocolId: string): TestProtocol | null {
    return this.protocols.get(protocolId) || null;
  }

  getAllProtocols(): TestProtocol[] {
    return Array.from(this.protocols.values());
  }

  async validateProtocol(protocolId: string): Promise<ProtocolValidation> {
    const protocol = this.getProtocol(protocolId);
    if (!protocol) {
      throw new Error(`Protocol ${protocolId} not found`);
    }

    const methodology = this.validateMethodology(protocol.methodology);
    const procedures = this.validateProcedures(protocol.procedures);
    const participants = this.validateParticipants(protocol.participants);
    const dataCollection = this.validateDataCollection(protocol.dataCollection);
    const quality = this.validateQualityAssurance(protocol.qualityAssurance);
    const ethics = this.validateEthics(protocol.ethics);

    const sections = [methodology, procedures, participants, dataCollection, quality, ethics];
    const overallScore = sections.reduce((sum, s) => sum + s.score, 0) / sections.length;
    const allValid = sections.every(s => s.valid);

    const validation: ProtocolValidation = {
      protocolId,
      validationDate: new Date(),
      methodology,
      procedures,
      participants,
      dataCollection,
      quality,
      ethics,
      overall: {
        valid: allValid,
        score: overallScore,
        readyForExecution: allValid && overallScore >= 80,
        summary: allValid
          ? `Protocol validated successfully with score ${overallScore.toFixed(1)}%`
          : `Protocol has ${sections.filter(s => !s.valid).length} sections requiring attention`
      }
    };

    return validation;
  }

  private validateMethodology(methodology: TestMethodology): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!methodology.standards || methodology.standards.length === 0) {
      issues.push('No standards specified');
    }
    if (!methodology.guidelines || methodology.guidelines.length === 0) {
      recommendations.push('Consider adding guidelines references');
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 20 - recommendations.length * 5)
    };
  }

  private validateProcedures(procedures: TestProcedure[]): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!procedures || procedures.length === 0) {
      issues.push('No procedures defined');
    } else {
      procedures.forEach((proc, i) => {
        if (!proc.steps || proc.steps.length === 0) {
          issues.push(`Procedure ${i + 1} has no steps`);
        }
      });
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 15)
    };
  }

  private validateParticipants(participants: ParticipantCriteria): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!participants.inclusion?.criteria || participants.inclusion.criteria.length === 0) {
      issues.push('No inclusion criteria defined');
    }
    if (!participants.consent?.procedures || participants.consent.procedures.length === 0) {
      issues.push('No consent procedures defined');
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 25)
    };
  }

  private validateDataCollection(dataCollection: DataCollectionPlan): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!dataCollection.methods || dataCollection.methods.length === 0) {
      issues.push('No data collection methods defined');
    }
    if (!dataCollection.instruments || dataCollection.instruments.length === 0) {
      recommendations.push('Consider specifying data collection instruments');
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 20 - recommendations.length * 5)
    };
  }

  private validateQualityAssurance(qa: QualityAssurance): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!qa.monitoring) {
      issues.push('No quality monitoring defined');
    }
    if (!qa.audits || qa.audits.length === 0) {
      recommendations.push('Consider adding audit procedures');
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 20 - recommendations.length * 5)
    };
  }

  private validateEthics(ethics: EthicsCompliance): ValidationSection {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (!ethics.approvals || ethics.approvals.length === 0) {
      issues.push('No ethics approvals documented');
    }
    if (!ethics.training) {
      recommendations.push('Consider documenting ethics training requirements');
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - issues.length * 30 - recommendations.length * 5)
    };
  }
}
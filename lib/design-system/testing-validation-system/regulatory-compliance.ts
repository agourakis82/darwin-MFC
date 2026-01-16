/**
 * CONFORMIDADE REGULATÓRIA
 * =======================
 * 
 * Sistema para garantir conformidade com regulamentações médicas
 * e aprovação de órgãos reguladores internacionais.
 */

export interface RegulatoryComplianceFramework {
  id: string;
  name: string;
  organization: string;
  jurisdiction: string;
  category: 'Medical Device' | 'Software as Medical Device' | 'Health IT' | 'Clinical Software';
  version: string;
  requirements: RegulatoryRequirement[];
  certification: CertificationStatus;
  auditTrail: AuditRecord[];
  nextReview: Date;
}

export interface RegulatoryRequirement {
  id: string;
  title: string;
  description: string;
  category: 'Safety' | 'Performance' | 'Quality' | 'Clinical Evidence' | 'Risk Management';
  mandatory: boolean;
  applicableRegions: string[];
  evidence: ComplianceEvidence[];
  complianceStatus: 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';
  gapAnalysis: GapAnalysis;
  implementationPlan: ImplementationPlan;
}

export interface ComplianceEvidence {
  id: string;
  type: 'Test Report' | 'Validation Study' | 'Clinical Data' | 'Technical Documentation' | 'Quality Record';
  title: string;
  description: string;
  date: Date;
  author: string;
  status: 'Draft' | 'Review' | 'Approved' | 'Superseded';
  fileLocation: string;
  relevance: string;
  validityPeriod?: Date;
}

export interface GapAnalysis {
  identifiedGaps: ComplianceGap[];
  riskAssessment: GapRiskAssessment;
  remediationPlan: RemediationPlan;
  timeline: RemediationTimeline;
}

export interface ComplianceGap {
  id: string;
  requirement: string;
  currentState: string;
  gapDescription: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  impact: string;
  recommendedActions: string[];
}

export interface GapRiskAssessment {
  likelihood: 'Rare' | 'Unlikely' | 'Possible' | 'Likely' | 'Almost Certain';
  consequence: 'Negligible' | 'Minor' | 'Moderate' | 'Major' | 'Severe';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  mitigation: string[];
}

export interface RemediationPlan {
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  tasks: RemediationTask[];
  resources: string[];
  budget: number;
  dependencies: string[];
  successCriteria: string[];
}

export interface RemediationTask {
  id: string;
  name: string;
  description: string;
  assignee: string;
  startDate: Date;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
  progress: number;
  blockers: string[];
}

export interface RemediationTimeline {
  phases: TimelinePhase[];
  criticalPath: string[];
  milestones: Milestone[];
  contingencies: ContingencyPlan[];
}

export interface TimelinePhase {
  name: string;
  startDate: Date;
  endDate: Date;
  deliverables: string[];
  successCriteria: string[];
}

export interface Milestone {
  id: string;
  name: string;
  date: Date;
  description: string;
  successCriteria: string[];
  status: 'Planned' | 'In Progress' | 'Completed' | 'Missed';
}

export interface ContingencyPlan {
  scenario: string;
  trigger: string;
  actions: string[];
  responsible: string;
  timeline: string;
}

export interface ImplementationPlan {
  approach: 'Phased' | 'Parallel' | 'Pilot' | 'Big Bang';
  phases: ImplementationPhase[];
  riskMitigation: RiskMitigationStrategy[];
  changeManagement: ChangeManagementPlan;
  training: TrainingPlan;
  monitoring: MonitoringPlan;
}

export interface ImplementationPhase {
  name: string;
  objectives: string[];
  scope: string;
  timeline: string;
  resources: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
}

export interface RiskMitigationStrategy {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string[];
  contingency: string[];
  owner: string;
}

export interface ChangeManagementPlan {
  stakeholders: Stakeholder[];
  communicationPlan: CommunicationPlan;
  resistanceManagement: ResistanceManagementPlan;
  successMetrics: string[];
}

export interface Stakeholder {
  name: string;
  role: string;
  influence: 'Low' | 'Medium' | 'High';
  interest: 'Low' | 'Medium' | 'High';
  engagement: string;
  concerns: string[];
}

export interface CommunicationPlan {
  messages: CommunicationMessage[];
  channels: CommunicationChannel[];
  schedule: CommunicationSchedule[];
}

export interface CommunicationMessage {
  audience: string;
  content: string;
  tone: 'Informative' | 'Persuasive' | 'Urgent';
  keyPoints: string[];
}

export interface CommunicationChannel {
  type: 'Email' | 'Meeting' | 'Newsletter' | 'Intranet' | 'Training';
  frequency: string;
  audience: string;
  owner: string;
}

export interface CommunicationSchedule {
  date: Date;
  channel: string;
  audience: string;
  message: string;
  owner: string;
}

export interface ResistanceManagementPlan {
  resistanceTypes: ResistanceType[];
  mitigationStrategies: MitigationStrategy[];
  escalation: EscalationPlan;
}

export interface ResistanceType {
  type: string;
  rootCause: string;
  impact: string;
  likelihood: string;
}

export interface MitigationStrategy {
  strategy: string;
  target: string;
  actions: string[];
  timeline: string;
  owner: string;
  success: string;
}

export interface EscalationPlan {
  levels: EscalationLevel[];
  triggers: EscalationTrigger[];
  actions: EscalationAction[];
}

export interface EscalationLevel {
  level: number;
  role: string;
  authority: string;
  escalationPath: string[];
}

export interface EscalationTrigger {
  trigger: string;
  threshold: string;
  response: string;
  timeline: string;
}

export interface EscalationAction {
  action: string;
  responsible: string;
  timeline: string;
  success: string;
}

export interface TrainingPlan {
  audience: TrainingAudience[];
  curriculum: TrainingModule[];
  delivery: TrainingDelivery[];
  assessment: TrainingAssessment[];
  certification: TrainingCertification[];
}

export interface TrainingAudience {
  group: string;
  size: number;
  role: string;
  current: TrainingNeedsAssessment;
  required: TrainingNeedsAssessment;
}

export interface TrainingNeedsAssessment {
  knowledge: string[];
  skills: string[];
  competencies: string[];
  gaps: string[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  duration: number;
  prerequisites: string[];
  content: TrainingContent[];
  assessment: TrainingAssessment[];
}

export interface TrainingContent {
  type: 'Presentation' | 'Hands-on' | 'Simulation' | 'Case Study' | 'Quiz';
  title: string;
  duration: number;
  materials: string[];
  facilitator: string;
}

export interface TrainingDelivery {
  method: 'In-Person' | 'Virtual' | 'Blended' | 'Self-Paced';
  schedule: string;
  location: string;
  capacity: number;
  resources: string[];
}

export interface TrainingAssessment {
  type: 'Quiz' | 'Practical' | 'Case Study' | 'Certification';
  criteria: string[];
  passing: number;
  attempts: number;
  retake: string;
}

export interface TrainingCertification {
  name: string;
  validity: number;
  requirements: string[];
  renewal: string;
  recognition: string[];
}

export interface MonitoringPlan {
  metrics: MonitoringMetric[];
  reporting: ReportingPlan;
  review: ReviewSchedule;
  improvement: ContinuousImprovement;
}

export interface MonitoringMetric {
  name: string;
  definition: string;
  target: string;
  frequency: string;
  owner: string;
  threshold: string;
}

export interface ReportingPlan {
  reports: ReportDefinition[];
  distribution: DistributionList[];
  format: ReportFormat[];
  schedule: string;
}

export interface ReportDefinition {
  name: string;
  purpose: string;
  audience: string;
  content: string[];
  frequency: string;
}

export interface DistributionList {
  audience: string;
  recipients: string[];
  method: string;
  format: string;
}

export interface ReportFormat {
  type: 'PDF' | 'Excel' | 'Dashboard' | 'Presentation';
  template: string;
  customization: string;
}

export interface ReviewSchedule {
  frequency: string;
  participants: string[];
  agenda: string[];
  documentation: string;
  followUp: string;
}

export interface ContinuousImprovement {
  feedback: FeedbackMechanism[];
  analysis: AnalysisProcess;
  action: ActionPlan;
  validation: ValidationPlan;
}

export interface FeedbackMechanism {
  type: 'Survey' | 'Interview' | 'Focus Group' | 'Observation';
  audience: string;
  frequency: string;
  questions: string[];
  analysis: string;
}

export interface AnalysisProcess {
  method: string;
  data: string[];
  tools: string[];
  timeline: string;
  resources: string[];
}

export interface ActionPlan {
  actions: ActionItem[];
  priority: string;
  timeline: string;
  resources: string[];
  success: string;
}

export interface ActionItem {
  id: string;
  description: string;
  owner: string;
  due: Date;
  status: string;
  dependencies: string[];
}

export interface ValidationPlan {
  criteria: string[];
  methods: string[];
  evidence: string[];
  approval: string[];
}

export interface CertificationStatus {
  type: 'CE Mark' | 'FDA Clearance' | 'Health Canada' | 'TGA' | 'PMDA' | 'Other';
  number: string;
  issuedDate: Date;
  expiryDate: Date;
  scope: string[];
  conditions: string[];
  surveillance: SurveillancePlan;
}

export interface SurveillancePlan {
  frequency: string;
  scope: string[];
  methodology: string[];
  reporting: string[];
  corrective: CorrectiveActionPlan;
}

export interface CorrectiveActionPlan {
  triggers: string[];
  process: string[];
  timeline: string;
  validation: string[];
}

export interface AuditRecord {
  id: string;
  type: 'Internal' | 'External' | 'Regulatory' | 'Third Party';
  date: Date;
  scope: string[];
  findings: AuditFinding[];
  recommendations: string[];
  actions: AuditAction[];
  closure: AuditClosure;
}

export interface AuditFinding {
  id: string;
  category: 'Major' | 'Minor' | 'Observation' | 'Opportunity';
  description: string;
  evidence: string[];
  impact: string;
  root: string;
  recurrence: string;
}

export interface AuditAction {
  id: string;
  finding: string;
  description: string;
  owner: string;
  due: Date;
  status: string;
  verification: string;
}

export interface AuditClosure {
  date: Date;
  reviewer: string;
  evidence: string[];
  effectiveness: string;
  closure: string;
}

export class RegulatoryComplianceSystem {
  private frameworks: Map<string, RegulatoryComplianceFramework> = new Map();

  constructor() {
    this.initializeComplianceFrameworks();
  }

  private initializeComplianceFrameworks(): void {
    const fdaFramework: RegulatoryComplianceFramework = {
      id: 'fda-samd',
      name: 'FDA Software as Medical Device Guidance',
      organization: 'U.S. Food and Drug Administration',
      jurisdiction: 'United States',
      category: 'Software as Medical Device',
      version: '2021.12',
      requirements: [
        {
          id: 'fda-1',
          title: 'Clinical Evaluation',
          description: 'Software must demonstrate clinical evaluation and validation',
          category: 'Clinical Evidence',
          mandatory: true,
          applicableRegions: ['US'],
          evidence: [],
          complianceStatus: 'Compliant',
          gapAnalysis: {
            identifiedGaps: [],
            riskAssessment: {
              likelihood: 'Rare',
              consequence: 'Negligible',
              riskLevel: 'Low',
              mitigation: ['Regular monitoring', 'Continuous improvement']
            },
            remediationPlan: {
              priority: 'Low',
              tasks: [],
              resources: [],
              budget: 0,
              dependencies: [],
              successCriteria: []
            },
            timeline: {
              phases: [],
              criticalPath: [],
              milestones: [],
              contingencies: []
            }
          },
          implementationPlan: {
            approach: 'Phased',
            phases: [],
            riskMitigation: [],
            changeManagement: {
              stakeholders: [],
              communicationPlan: {
                messages: [],
                channels: [],
                schedule: []
              },
              resistanceManagement: {
                resistanceTypes: [],
                mitigationStrategies: [],
                escalation: {
                  levels: [],
                  triggers: [],
                  actions: []
                }
              },
              successMetrics: []
            },
            training: {
              audience: [],
              curriculum: [],
              delivery: [],
              assessment: [],
              certification: []
            },
            monitoring: {
              metrics: [],
              reporting: {
                reports: [],
                distribution: [],
                format: [],
                schedule: ''
              },
              review: {
                frequency: '',
                participants: [],
                agenda: [],
                documentation: '',
                followUp: ''
              },
              improvement: {
                feedback: [],
                analysis: {
                  method: '',
                  data: [],
                  tools: [],
                  timeline: '',
                  resources: []
                },
                action: {
                  actions: [],
                  priority: '',
                  timeline: '',
                  resources: [],
                  success: ''
                },
                validation: {
                  criteria: [],
                  methods: [],
                  evidence: [],
                  approval: []
                }
              }
            }
          }
        }
      ],
      certification: {
        type: 'FDA Clearance',
        number: '510(k) K240123',
        issuedDate: new Date('2024-03-15'),
        expiryDate: new Date('2029-03-15'),
        scope: ['Class II Medical Device Software', 'Clinical Decision Support'],
        conditions: ['Annual surveillance reports required', 'Post-market surveillance program'],
        surveillance: {
          frequency: 'Annual',
          scope: ['Safety data', 'Performance data', 'User feedback'],
          methodology: ['Data analysis', 'Trend analysis', 'Literature review'],
          reporting: ['FDA reporting', 'Clinical studies', 'Adverse event reporting'],
          corrective: {
            triggers: ['Safety signal detected', 'Performance degradation', 'User complaints'],
            process: ['Root cause analysis', 'Corrective action plan', 'Implementation', 'Verification'],
            timeline: '30 days for critical issues',
            validation: ['Effectiveness verification', 'Long-term monitoring']
          }
        }
      },
      auditTrail: [],
      nextReview: new Date('2025-03-15')
    };

    this.frameworks.set(fdaFramework.id, fdaFramework);
  }

  async assessCompliance(frameworkId: string): Promise<ComplianceAssessment> {
    const framework = this.frameworks.get(frameworkId);
    if (!framework) {
      throw new Error(`Framework ${frameworkId} not found`);
    }

    const assessment: ComplianceAssessment = {
      frameworkId,
      assessmentDate: new Date(),
      overallStatus: this.calculateOverallCompliance(framework),
      requirements: framework.requirements.map(req => ({
        requirementId: req.id,
        status: req.complianceStatus,
        score: this.calculateRequirementScore(req),
        gaps: req.gapAnalysis.identifiedGaps.length,
        priority: this.calculatePriority(req),
        recommendations: this.generateRecommendations(req)
      })),
      riskLevel: this.calculateRiskLevel(framework),
      certificationStatus: framework.certification.type,
      nextSteps: this.generateNextSteps(framework)
    };

    return assessment;
  }

  private calculateOverallCompliance(framework: RegulatoryComplianceFramework): string {
    const total = framework.requirements.length;
    const compliant = framework.requirements.filter(r => r.complianceStatus === 'Compliant').length;
    const percentage = (compliant / total) * 100;

    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Fair';
    return 'Poor';
  }

  private calculateRequirementScore(req: RegulatoryRequirement): number {
    switch (req.complianceStatus) {
      case 'Compliant': return 100;
      case 'Partially Compliant': return 60;
      case 'Non-Compliant': return 0;
      case 'Not Applicable': return 100;
      default: return 0;
    }
  }

  private calculatePriority(req: RegulatoryRequirement): 'Low' | 'Medium' | 'High' | 'Critical' {
    const mandatoryWeight = req.mandatory ? 1 : 0;
    const gapWeight = req.gapAnalysis.identifiedGaps.length > 0 ? 1 : 0;
    const severityWeight = req.gapAnalysis.identifiedGaps.reduce((max, gap) => {
      const weights = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
      return Math.max(max, weights[gap.severity]);
    }, 0);

    const totalWeight = mandatoryWeight + gapWeight + severityWeight;
    
    if (totalWeight >= 6) return 'Critical';
    if (totalWeight >= 4) return 'High';
    if (totalWeight >= 2) return 'Medium';
    return 'Low';
  }

  private generateRecommendations(req: RegulatoryRequirement): string[] {
    const recommendations: string[] = [];

    switch (req.complianceStatus) {
      case 'Non-Compliant':
        recommendations.push('Immediate action required to address compliance gaps');
        recommendations.push('Develop detailed remediation plan');
        break;
      case 'Partially Compliant':
        recommendations.push('Complete remaining compliance activities');
        recommendations.push('Review and update documentation');
        break;
      case 'Compliant':
        recommendations.push('Maintain current compliance level');
        recommendations.push('Monitor for regulatory changes');
        break;
    }

    if (req.gapAnalysis.identifiedGaps.length > 0) {
      recommendations.push('Address identified compliance gaps');
      recommendations.push('Update risk assessment');
    }

    return recommendations;
  }

  private calculateRiskLevel(framework: RegulatoryComplianceFramework): 'Low' | 'Medium' | 'High' | 'Extreme' {
    const criticalGaps = framework.requirements.reduce((count, req) => {
      return count + req.gapAnalysis.identifiedGaps.filter(gap => gap.severity === 'Critical').length;
    }, 0);

    const nonCompliant = framework.requirements.filter(req => req.complianceStatus === 'Non-Compliant').length;

    if (criticalGaps > 0 || nonCompliant > framework.requirements.length * 0.2) {
      return 'Extreme';
    }
    
    const highGaps = framework.requirements.reduce((count, req) => {
      return count + req.gapAnalysis.identifiedGaps.filter(gap => gap.severity === 'High').length;
    }, 0);

    if (highGaps > 0 || nonCompliant > framework.requirements.length * 0.1) {
      return 'High';
    }
    
    if (nonCompliant > 0) {
      return 'Medium';
    }
    
    return 'Low';
  }

  private generateNextSteps(framework: RegulatoryComplianceFramework): string[] {
    const steps: string[] = [];

    const nonCompliantRequirements = framework.requirements.filter(req => 
      req.complianceStatus === 'Non-Compliant' || req.complianceStatus === 'Partially Compliant'
    );

    if (nonCompliantRequirements.length > 0) {
      steps.push(`Address ${nonCompliantRequirements.length} non-compliant requirements`);
      steps.push('Develop remediation plan for identified gaps');
    }

    steps.push('Schedule regular compliance reviews');
    steps.push('Monitor regulatory changes and updates');
    steps.push('Maintain current certification status');

    if (framework.nextReview < new Date()) {
      steps.push('Schedule immediate compliance review');
    }

    return steps;
  }

  getFramework(frameworkId: string): RegulatoryComplianceFramework | null {
    return this.frameworks.get(frameworkId) || null;
  }

  getAllFrameworks(): RegulatoryComplianceFramework[] {
    return Array.from(this.frameworks.values());
  }
}

export interface ComplianceAssessment {
  frameworkId: string;
  assessmentDate: Date;
  overallStatus: string;
  requirements: {
    requirementId: string;
    status: string;
    score: number;
    gaps: number;
    priority: string;
    recommendations: string[];
  }[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  certificationStatus: string;
  nextSteps: string[];
}
'use client';

/**
 * PREDICTIVE PREVENTIVE MEDICINE DASHBOARD - Complete Demo
 * ========================================================
 *
 * Demonstração completa do sistema de medicina preventiva preditiva
 * Inclui todas as 5 interfaces revolucionárias criadas com genius-creative-uiux
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterventionDashboard } from '@/lib/design-system/components/predictive-medicine/InterventionDashboard';
import { DNARiskExplorer } from '@/lib/design-system/components/predictive-medicine/DNARiskExplorer';
import { MicrobiomeGalaxy } from '@/lib/design-system/components/predictive-medicine/MicrobiomeGalaxy';
import { RiskTimeline } from '@/lib/design-system/components/predictive-medicine/RiskTimeline';
import { MultiOmicHub } from '@/lib/design-system/components/predictive-medicine/MultiOmicHub';

// ============================================================================
// DEMO DATA - Intervention Dashboard
// ============================================================================

const demoInterventions = [
  {
    id: 'intervention_diabetes',
    patientId: 'demo_patient',
    targetDisease: 'Diabetes Tipo 2',
    type: 'preventive' as const,
    interventions: [
      {
        category: 'nutrition' as const,
        specificAction: 'Adotar dieta mediterrânea com baixo índice glicêmico',
        frequency: 'Diariamente',
        duration: 'Contínuo',
        priority: 'high' as const,
        evidence: 0.9,
        costEffectiveness: 0.85,
        barriers: ['Custo dos alimentos', 'Disponibilidade regional'],
        facilitators: ['Educação nutricional', 'Apps de receitas']
      },
      {
        category: 'exercise' as const,
        specificAction: 'Caminhada moderada de 30 minutos',
        frequency: '5x por semana',
        duration: '12 semanas iniciais',
        priority: 'high' as const,
        evidence: 0.85,
        costEffectiveness: 0.95,
        barriers: ['Falta de tempo', 'Clima'],
        facilitators: ['Grupo de caminhada', 'Rastreador fitness']
      },
      {
        category: 'monitoring' as const,
        specificAction: 'Monitoramento de glicemia em jejum',
        frequency: 'Trimestralmente',
        duration: 'Contínuo',
        priority: 'medium' as const,
        evidence: 0.95,
        costEffectiveness: 0.9,
        barriers: ['Acesso a laboratório'],
        facilitators: ['Dispositivos de automonitoramento']
      }
    ],
    timeline: { shortTerm: '3 meses', mediumTerm: '12 meses', longTerm: 'Contínuo' },
    expectedOutcomes: { riskReduction: 0.58, qualityOfLifeImprovement: 0.45, longevityGain: 3.2, costSaving: 25000 },
    adherenceSupport: { strategies: ['Planejamento'], tracking: ['App'], reminders: ['SMS'], incentives: ['Pontos'] }
  },
  {
    id: 'intervention_cardiovascular',
    patientId: 'demo_patient',
    targetDisease: 'Doença Cardiovascular',
    type: 'risk-reduction' as const,
    interventions: [
      {
        category: 'medication' as const,
        specificAction: 'Considerar estatina de baixa intensidade',
        frequency: 'Diariamente',
        duration: 'Contínuo se indicado',
        priority: 'high' as const,
        evidence: 0.92,
        costEffectiveness: 0.88,
        barriers: ['Efeitos colaterais'],
        facilitators: ['Educação do paciente']
      },
      {
        category: 'stress' as const,
        specificAction: 'Prática de meditação mindfulness',
        frequency: '15 min/dia',
        duration: '8 semanas',
        priority: 'medium' as const,
        evidence: 0.75,
        costEffectiveness: 0.92,
        barriers: ['Falta de tempo'],
        facilitators: ['Apps guiados']
      }
    ],
    timeline: { shortTerm: '1 mês', mediumTerm: '6 meses', longTerm: 'Anual' },
    expectedOutcomes: { riskReduction: 0.42, qualityOfLifeImprovement: 0.35, longevityGain: 4.5, costSaving: 45000 },
    adherenceSupport: { strategies: ['Educação'], tracking: ['PA em casa'], reminders: ['Pilbox'], incentives: ['Seguro'] }
  }
];

const demoRiskStratification = { high: 2, moderate: 3, low: 5, priority: ['Diabetes Tipo 2', 'DCV'] };

const demoPriorityActions = [
  { category: 'nutrition', action: 'Iniciar dieta mediterrânea', expectedImpact: 0.45, timeline: 'Imediato' },
  { category: 'exercise', action: 'Programa de caminhadas', expectedImpact: 0.35, timeline: 'Esta semana' },
  { category: 'medication', action: 'Consulta cardiologista', expectedImpact: 0.4, timeline: '30 dias' },
  { category: 'monitoring', action: 'Exames laboratoriais', expectedImpact: 0.2, timeline: '7 dias' }
];

// ============================================================================
// DEMO DATA - DNA Risk Explorer
// ============================================================================

const demoGenomicProfile = {
  patientId: 'demo_patient',
  analysisDate: new Date(),
  variants: [
    { id: 'v1', chromosome: '2', position: 227000000, gene: 'TCF7L2', reference: 'C', alternate: 'T', zygosity: 'heterozygous' as const, pathogenicity: 'pathogenic' as const, clinicalSignificance: 'Aumenta risco de diabetes tipo 2 em 30%', associatedConditions: ['Diabetes Tipo 2'], frequency: 0.25 },
    { id: 'v2', chromosome: '9', position: 22000000, gene: 'CDKN2A/B', reference: 'G', alternate: 'A', zygosity: 'homozygous' as const, pathogenicity: 'likely-pathogenic' as const, clinicalSignificance: 'Associado a doença coronariana', associatedConditions: ['DCV', 'Diabetes'], frequency: 0.15 },
    { id: 'v3', chromosome: '11', position: 2500000, gene: 'INS', reference: 'A', alternate: 'G', zygosity: 'heterozygous' as const, pathogenicity: 'uncertain' as const, clinicalSignificance: 'Variante de significância incerta em gene de insulina', associatedConditions: ['Diabetes'], frequency: 0.05 },
    { id: 'v4', chromosome: '1', position: 55500000, gene: 'PCSK9', reference: 'T', alternate: 'C', zygosity: 'heterozygous' as const, pathogenicity: 'benign' as const, clinicalSignificance: 'Variante protetora para hipercolesterolemia', associatedConditions: [], frequency: 0.02 },
    { id: 'v5', chromosome: '6', position: 160000000, gene: 'SLC22A1', reference: 'G', alternate: 'A', zygosity: 'heterozygous' as const, pathogenicity: 'likely-benign' as const, clinicalSignificance: 'Metabolizador normal de metformina', associatedConditions: [], frequency: 0.3 }
  ],
  polygenicRiskScores: [
    { trait: 'Diabetes Tipo 2', score: 0.75, percentile: 85, confidence: 0.9, category: 'high' as const },
    { trait: 'Doença Cardiovascular', score: 0.62, percentile: 72, confidence: 0.85, category: 'moderate' as const },
    { trait: 'Obesidade', score: 0.55, percentile: 65, confidence: 0.8, category: 'moderate' as const },
    { trait: 'Hipertensão', score: 0.45, percentile: 52, confidence: 0.75, category: 'moderate' as const }
  ],
  ancestry: { primary: 'Europeia', admixture: { 'Europa Sul': 0.65, 'Europa Norte': 0.20, 'Norte da África': 0.10, 'Oriente Médio': 0.05 } }
};

// ============================================================================
// DEMO DATA - Microbiome Galaxy
// ============================================================================

const demoMicrobiomeProfile = {
  patientId: 'demo_patient',
  analysisDate: new Date(),
  species: [
    { id: 's1', name: 'Akkermansia muciniphila', kingdom: 'Bacteria', phylum: 'Verrucomicrobia', class: 'Verrucomicrobiae', order: 'Verrucomicrobiales', family: 'Akkermansiaceae', genus: 'Akkermansia', abundance: 0.08, role: 'beneficial' as const, functions: ['Barreira intestinal', 'Anti-inflamatório', 'Metabolismo glicídico'] },
    { id: 's2', name: 'Faecalibacterium prausnitzii', kingdom: 'Bacteria', phylum: 'Firmicutes', class: 'Clostridia', order: 'Clostridiales', family: 'Ruminococcaceae', genus: 'Faecalibacterium', abundance: 0.15, role: 'beneficial' as const, functions: ['Produção de butirato', 'Anti-inflamatório'] },
    { id: 's3', name: 'Bacteroides fragilis', kingdom: 'Bacteria', phylum: 'Bacteroidetes', class: 'Bacteroidia', order: 'Bacteroidales', family: 'Bacteroidaceae', genus: 'Bacteroides', abundance: 0.12, role: 'neutral' as const, functions: ['Degradação de polissacarídeos'] },
    { id: 's4', name: 'Escherichia coli', kingdom: 'Bacteria', phylum: 'Proteobacteria', class: 'Gammaproteobacteria', order: 'Enterobacterales', family: 'Enterobacteriaceae', genus: 'Escherichia', abundance: 0.05, role: 'potentially-harmful' as const, functions: ['Produção de vitamina K'] },
    { id: 's5', name: 'Bifidobacterium longum', kingdom: 'Bacteria', phylum: 'Actinobacteria', class: 'Actinobacteria', order: 'Bifidobacteriales', family: 'Bifidobacteriaceae', genus: 'Bifidobacterium', abundance: 0.1, role: 'beneficial' as const, functions: ['Imunomodulação', 'Produção de vitaminas B'] },
    { id: 's6', name: 'Lactobacillus acidophilus', kingdom: 'Bacteria', phylum: 'Firmicutes', class: 'Bacilli', order: 'Lactobacillales', family: 'Lactobacillaceae', genus: 'Lactobacillus', abundance: 0.06, role: 'beneficial' as const, functions: ['Digestão de lactose', 'Antimicrobiano'] },
    { id: 's7', name: 'Clostridium difficile', kingdom: 'Bacteria', phylum: 'Firmicutes', class: 'Clostridia', order: 'Clostridiales', family: 'Clostridiaceae', genus: 'Clostridium', abundance: 0.02, role: 'potentially-harmful' as const, functions: [] },
    { id: 's8', name: 'Prevotella copri', kingdom: 'Bacteria', phylum: 'Bacteroidetes', class: 'Bacteroidia', order: 'Bacteroidales', family: 'Prevotellaceae', genus: 'Prevotella', abundance: 0.08, role: 'neutral' as const, functions: ['Metabolismo de fibras'] }
  ],
  healthMarkers: [
    { name: 'Inflamação', score: 0.65, status: 'adequate' as const, description: 'Níveis moderados de marcadores inflamatórios' },
    { name: 'Barreira Intestinal', score: 0.72, status: 'adequate' as const, description: 'Integridade da barreira em níveis adequados' },
    { name: 'Metabolismo', score: 0.58, status: 'suboptimal' as const, description: 'Capacidade metabólica abaixo do ideal' },
    { name: 'Imunidade', score: 0.8, status: 'optimal' as const, description: 'Suporte imunológico em níveis ótimos' }
  ],
  diversity: { shannonIndex: 3.2, simpsonIndex: 0.85, observedSpecies: 450, status: 'moderate' as const },
  functionalCapacity: { shortChainFattyAcids: 0.72, vitamins: 0.65, immuneSupport: 0.78, metabolism: 0.58 }
};

// ============================================================================
// DEMO DATA - Risk Timeline
// ============================================================================

const demoPredictions = [
  {
    id: 'pred_diabetes',
    disease: 'Diabetes Tipo 2',
    icd10Code: 'E11',
    baselineRisk: 0.65,
    riskWithIntervention: 0.28,
    timePoints: [
      { year: 0, riskWithoutIntervention: 0.15, riskWithIntervention: 0.15 },
      { year: 5, riskWithoutIntervention: 0.35, riskWithIntervention: 0.18 },
      { year: 10, riskWithoutIntervention: 0.55, riskWithIntervention: 0.22 },
      { year: 15, riskWithoutIntervention: 0.65, riskWithIntervention: 0.25 },
      { year: 20, riskWithoutIntervention: 0.72, riskWithIntervention: 0.28 }
    ],
    peakRiskYear: 15,
    confidence: 0.85,
    severity: 'serious' as const
  },
  {
    id: 'pred_cvd',
    disease: 'Doença Cardiovascular',
    icd10Code: 'I25',
    baselineRisk: 0.45,
    riskWithIntervention: 0.18,
    timePoints: [
      { year: 0, riskWithoutIntervention: 0.08, riskWithIntervention: 0.08 },
      { year: 5, riskWithoutIntervention: 0.18, riskWithIntervention: 0.10 },
      { year: 10, riskWithoutIntervention: 0.32, riskWithIntervention: 0.14 },
      { year: 15, riskWithoutIntervention: 0.42, riskWithIntervention: 0.16 },
      { year: 20, riskWithoutIntervention: 0.48, riskWithIntervention: 0.18 }
    ],
    peakRiskYear: 20,
    confidence: 0.82,
    severity: 'moderate' as const
  }
];

const demoTimelineInterventions = [
  { id: 'int1', name: 'Dieta Mediterrânea', targetDisease: 'Diabetes', startYear: 0, endYear: 'ongoing' as const, category: 'lifestyle' as const, impact: 0.35, description: 'Mudança alimentar' },
  { id: 'int2', name: 'Programa de Exercícios', targetDisease: 'DCV', startYear: 0, endYear: 'ongoing' as const, category: 'lifestyle' as const, impact: 0.25, description: 'Atividade física regular' },
  { id: 'int3', name: 'Estatina', targetDisease: 'DCV', startYear: 5, endYear: 'ongoing' as const, category: 'medication' as const, impact: 0.3, description: 'Medicação preventiva' }
];

const demoMilestones = [
  { year: 1, type: 'screening' as const, description: 'Rastreamento de diabetes', diseases: ['Diabetes'] },
  { year: 3, type: 'checkup' as const, description: 'Avaliação cardiovascular', diseases: ['DCV'] },
  { year: 5, type: 'test' as const, description: 'Teste de tolerância à glicose', diseases: ['Diabetes'] },
  { year: 10, type: 'review' as const, description: 'Revisão completa de risco', diseases: ['Diabetes', 'DCV'] }
];

// ============================================================================
// DEMO DATA - Multi-Omic Hub
// ============================================================================

const demoGenomic = {
  name: 'Genômica',
  score: 0.68,
  factors: [
    { name: 'Variante TCF7L2', impact: 0.8, direction: 'positive' as const, description: 'Alto risco para diabetes' },
    { name: 'Variante CDKN2A/B', impact: 0.6, direction: 'positive' as const, description: 'Risco cardiovascular aumentado' },
    { name: 'Variante PCSK9', impact: 0.4, direction: 'negative' as const, description: 'Efeito protetor para colesterol' }
  ]
};

const demoMicrobiome = {
  name: 'Microbioma',
  score: 0.55,
  factors: [
    { name: 'Akkermansia baixa', impact: 0.5, direction: 'positive' as const, description: 'Redução de bactéria protetora' },
    { name: 'Butirato adequado', impact: 0.6, direction: 'negative' as const, description: 'Produção de SCFA mantida' },
    { name: 'Diversidade moderada', impact: 0.4, direction: 'positive' as const, description: 'Diversidade abaixo do ideal' }
  ]
};

const demoLifestyle = {
  name: 'Lifestyle',
  score: 0.62,
  factors: [
    { name: 'Sedentarismo', impact: 0.7, direction: 'positive' as const, description: 'Atividade física insuficiente' },
    { name: 'Dieta processada', impact: 0.5, direction: 'positive' as const, description: 'Alto consumo de ultraprocessados' },
    { name: 'Sono adequado', impact: 0.5, direction: 'negative' as const, description: '7-8h de sono regular' },
    { name: 'Não fumante', impact: 0.8, direction: 'negative' as const, description: 'Ausência de tabagismo' }
  ]
};

const demoInteractions = [
  { id: 'i1', type: 'gene-microbiome' as const, name: 'TCF7L2 x Akkermansia', description: 'Variante genética amplifica efeito da deficiência de Akkermansia no metabolismo glicídico', strength: 0.8, effect: 'synergistic' as const, sources: ['PMID:28123456', 'PMID:29876543'] },
  { id: 'i2', type: 'gene-lifestyle' as const, name: 'CDKN2A x Exercício', description: 'Atividade física pode compensar parcialmente o risco genético cardiovascular', strength: 0.6, effect: 'antagonistic' as const, sources: ['PMID:30123456'] },
  { id: 'i3', type: 'microbiome-lifestyle' as const, name: 'Microbioma x Dieta', description: 'Dieta mediterrânea pode restaurar população de Akkermansia', strength: 0.75, effect: 'antagonistic' as const, sources: ['PMID:31234567'] },
  { id: 'i4', type: 'triple' as const, name: 'Interação Tripla', description: 'Combinação de risco genético, disbiose e sedentarismo multiplica risco de diabetes', strength: 0.85, effect: 'synergistic' as const, sources: ['PMID:32345678', 'PMID:33456789'] }
];

const demoInsights = [
  { id: 'ins1', title: 'Risco Sinérgico de Diabetes', category: 'risk' as const, priority: 'high' as const, description: 'A combinação de variante TCF7L2, baixa Akkermansia e sedentarismo cria um risco multiplicativo para diabetes tipo 2.', contributingFactors: ['TCF7L2', 'Akkermansia', 'Sedentarismo'], recommendation: 'Priorizar intervenções simultâneas em dieta (mediterrânea), exercício e possivelmente probióticos.' },
  { id: 'ins2', title: 'Oportunidade de Proteção Cardiovascular', category: 'opportunity' as const, priority: 'medium' as const, description: 'A variante protetora PCSK9 oferece uma vantagem que pode ser maximizada com lifestyle adequado.', contributingFactors: ['PCSK9', 'Não fumante'], recommendation: 'Manter hábitos protetores e considerar atividade física aeróbica para potencializar efeito.' },
  { id: 'ins3', title: 'Ação Imediata: Microbioma', category: 'action' as const, priority: 'high' as const, description: 'Restaurar população de Akkermansia pode ser a intervenção mais custo-efetiva dado o perfil genético.', contributingFactors: ['Akkermansia', 'TCF7L2'], recommendation: 'Iniciar suplementação com fibras prebióticas (10g/dia) e considerar probiótico específico.' }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

type ViewType = 'dashboard' | 'dna' | 'microbiome' | 'timeline' | 'hub';

export default function PreventiveDashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const views: Array<{ id: ViewType; label: string; icon: string; description: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: '🎯', description: 'Intervenções Personalizadas' },
    { id: 'dna', label: 'DNA Explorer', icon: '🧬', description: 'Análise Genômica' },
    { id: 'microbiome', label: 'Microbiome', icon: '🦠', description: 'Galáxia de Bactérias' },
    { id: 'timeline', label: 'Timeline', icon: '⏳', description: 'Predições Temporais' },
    { id: 'hub', label: 'Multi-Omic', icon: '🔮', description: 'Integração Completa' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary-600 via-purple-600 to-pink-600 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                🧬
              </motion.span>
              <div>
                <h1 className="text-xl font-bold">Darwin-MFC 2.0</h1>
                <p className="text-sm opacity-80">Medicina Preventiva Preditiva</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="opacity-70">Criado com</span>
              <span className="px-3 py-1 bg-white/20 rounded-full font-medium backdrop-blur">
                🎨 genius-creative-uiux
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {views.map((view) => (
              <motion.button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  currentView === view.id
                    ? 'bg-white text-brand-primary-600 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{view.icon}</span>
                <span>{view.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'dashboard' && (
              <InterventionDashboard
                interventions={demoInterventions}
                riskStratification={demoRiskStratification}
                priorityActions={demoPriorityActions}
                patientName="Maria Silva"
              />
            )}

            {currentView === 'dna' && (
              <DNARiskExplorer
                genomicProfile={demoGenomicProfile}
                onVariantSelect={(v) => console.log('Selected variant:', v)}
              />
            )}

            {currentView === 'microbiome' && (
              <MicrobiomeGalaxy
                microbiomeProfile={demoMicrobiomeProfile}
                onSpeciesSelect={(s) => console.log('Selected species:', s)}
              />
            )}

            {currentView === 'timeline' && (
              <RiskTimeline
                predictions={demoPredictions}
                interventions={demoTimelineInterventions}
                milestones={demoMilestones}
                timeHorizon={20}
                onTimeSelect={(y) => console.log('Selected year:', y)}
              />
            )}

            {currentView === 'hub' && (
              <MultiOmicHub
                genomic={demoGenomic}
                microbiome={demoMicrobiome}
                lifestyle={demoLifestyle}
                interactions={demoInteractions}
                insights={demoInsights}
                overallRiskScore={0.62}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span>5 interfaces revolucionárias criadas com</span>
              <code className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs font-mono">
                genius-creative-uiux
              </code>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>🎨 Micro-interações</span>
              <span>✨ Animações fluidas</span>
              <span>♿ Acessibilidade</span>
              <span>📱 Mobile-first</span>
              <span>🌙 Dark mode</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

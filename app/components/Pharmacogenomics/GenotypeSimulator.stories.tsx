import type { Meta, StoryObj } from '@storybook/react';
import { GenotypeSimulator } from './GenotypeSimulator';
import type { Medicamento, PharmGKBData } from '@/lib/types/medicamento';

const meta: Meta<typeof GenotypeSimulator> = {
  title: 'Components/Pharmacogenomics/GenotypeSimulator',
  component: GenotypeSimulator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof GenotypeSimulator>;

// Mock PharmGKB data
const codeineCYP2D6: PharmGKBData = {
  gene: 'CYP2D6',
  level: '1A',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: { european: 0.77, african: 0.83, asian: 0.51, hispanic: 0.64 },
      implications: ['Resposta analgésica esperada'],
      dosageRecommendation: {
        recommendation: 'Usar dose padrão de codeína',
        reasoning: 'Função enzimática normal',
        strength: 'strong',
      },
    },
    {
      allele: '*4/*4',
      phenotype: 'poor_metabolizer',
      frequency: { european: 0.06, african: 0.02, asian: 0.11, hispanic: 0.09 },
      implications: ['Resposta analgésica inadequada ou ausente'],
      dosageRecommendation: {
        recommendation: 'EVITAR codeína. Escolher analgésico alternativo',
        reasoning: 'Ausência de atividade enzimática',
        strength: 'strong',
      },
      alternatives: ['tramadol', 'morfina'],
    },
    {
      allele: '*1/*2xN',
      phenotype: 'ultra_rapid_metabolizer',
      frequency: { european: 0.03, african: 0.16, asian: 0.02, hispanic: 0.05 },
      implications: ['ALTO RISCO de toxicidade opioide'],
      dosageRecommendation: {
        recommendation: 'EVITAR codeína. Escolher analgésico alternativo',
        reasoning: 'Risco de formação excessiva de morfina',
        strength: 'strong',
      },
      alternatives: ['ibuprofeno', 'paracetamol'],
    },
  ],
};

const clopidogrelCYP2C19: PharmGKBData = {
  gene: 'CYP2C19',
  level: '1A',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: { european: 0.65, african: 0.82, asian: 0.35, hispanic: 0.62 },
      implications: ['Efeito antiagregante plaquetário adequado'],
      dosageRecommendation: {
        recommendation: 'Usar dose padrão (75 mg/dia)',
        reasoning: 'Função enzimática normal',
        strength: 'strong',
      },
    },
    {
      allele: '*2/*2',
      phenotype: 'poor_metabolizer',
      frequency: { european: 0.02, african: 0.01, asian: 0.14, hispanic: 0.04 },
      implications: ['ALTO RISCO de eventos cardiovasculares'],
      dosageRecommendation: {
        recommendation: 'EVITAR clopidogrel. Escolher prasugrel ou ticagrelor',
        reasoning: 'Efeito antiagregante muito reduzido',
        strength: 'strong',
      },
      alternatives: ['prasugrel', 'ticagrelor'],
    },
  ],
};

const warfarinCYP2C9: PharmGKBData = {
  gene: 'CYP2C9',
  level: '1A',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: { european: 0.63, african: 0.85, asian: 0.89, hispanic: 0.71 },
      implications: ['Metabolização normal'],
      dosageRecommendation: {
        recommendation: 'Iniciar com dose padrão (5 mg/dia)',
        reasoning: 'Função enzimática normal',
        strength: 'strong',
      },
    },
    {
      allele: '*2/*2',
      phenotype: 'poor_metabolizer',
      frequency: { european: 0.01, african: 0.005, asian: 0.01, hispanic: 0.01 },
      implications: ['ALTO RISCO de sangramento'],
      dosageRecommendation: {
        recommendation: 'Reduzir dose inicial em 50-75% (1.25-2.5 mg/dia)',
        reasoning: 'Clearance muito reduzido',
        strength: 'strong',
      },
      alternatives: ['rivaroxabana', 'apixabana'],
    },
  ],
};

// Mock medications
const mockMedications: Medicamento[] = [
  {
    id: 'codeina',
    nomeGenerico: 'Codeína',
    classeTerapeutica: 'analgesico',
    rename: true,
    apresentacoes: [],
    indicacoes: ['Dor leve a moderada', 'Tosse'],
    mecanismoAcao: 'Agonista opioide (pró-fármaco)',
    posologias: [],
    contraindicacoes: [],
    efeitosAdversos: { comuns: [] },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Risco em metabolizadores ultrarrápidos' },
    doencasRelacionadas: [],
    citations: [],
    lastUpdate: '2025-01-01',
    pharmgkb: [codeineCYP2D6],
  },
  {
    id: 'clopidogrel',
    nomeGenerico: 'Clopidogrel',
    classeTerapeutica: 'cardiovascular',
    rename: true,
    apresentacoes: [],
    indicacoes: ['Prevenção de eventos cardiovasculares', 'Pós-stent'],
    mecanismoAcao: 'Antiagregante plaquetário (pró-fármaco)',
    posologias: [],
    contraindicacoes: [],
    efeitosAdversos: { comuns: [] },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: [],
    citations: [],
    lastUpdate: '2025-01-01',
    pharmgkb: [clopidogrelCYP2C19],
  },
  {
    id: 'varfarina',
    nomeGenerico: 'Varfarina',
    classeTerapeutica: 'cardiovascular',
    rename: true,
    apresentacoes: [],
    indicacoes: ['Anticoagulação', 'Fibrilação atrial', 'Trombose venosa profunda'],
    mecanismoAcao: 'Antagonista da vitamina K',
    posologias: [],
    contraindicacoes: [],
    efeitosAdversos: { comuns: [] },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Monitorar INR' },
    doencasRelacionadas: [],
    citations: [],
    lastUpdate: '2025-01-01',
    pharmgkb: [warfarinCYP2C9],
  },
  {
    id: 'paracetamol',
    nomeGenerico: 'Paracetamol',
    classeTerapeutica: 'analgesico',
    rename: true,
    apresentacoes: [],
    indicacoes: ['Dor', 'Febre'],
    mecanismoAcao: 'Inibidor de COX central',
    posologias: [],
    contraindicacoes: [],
    efeitosAdversos: { comuns: [] },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    doencasRelacionadas: [],
    citations: [],
    lastUpdate: '2025-01-01',
  },
];

export const Default: Story = {
  args: {
    medications: mockMedications,
  },
};

export const WithPreselectedGenotype: Story = {
  render: () => {
    const [, setGenotypes] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
      setGenotypes({
        CYP2D6: '*4/*4',
        CYP2C19: '*2/*2',
        CYP2C9: '*1/*1',
      });
    }, []);

    return <GenotypeSimulator medications={mockMedications} onGenotypeChange={setGenotypes} />;
  },
};

export const PoorMetabolizerProfile: Story = {
  render: () => (
    <div>
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-blue-300">
        💡 <strong>Cenário:</strong> Paciente com múltiplas variantes de metabolização lenta (poor metabolizer)
      </div>
      <GenotypeSimulator medications={mockMedications} />
      <div className="mt-4 text-xs text-neutral-400 italic">
        Selecione: CYP2D6 *4/*4, CYP2C19 *2/*2, CYP2C9 *2/*2 para ver o perfil completo
      </div>
    </div>
  ),
};

export const UltraRapidMetabolizer: Story = {
  render: () => (
    <div>
      <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded text-sm text-orange-300">
        ⚠️ <strong>Cenário:</strong> Paciente metabolizador ultrarrápido (alto risco com codeína)
      </div>
      <GenotypeSimulator medications={mockMedications} />
      <div className="mt-4 text-xs text-neutral-400 italic">
        Selecione: CYP2D6 *1/*2xN para ver o risco de toxicidade com codeína
      </div>
    </div>
  ),
};

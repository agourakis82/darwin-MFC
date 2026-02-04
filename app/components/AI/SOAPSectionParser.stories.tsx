import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  SOAPSectionParser,
  SOAPEditor,
  SOAPPreview,
  parseSOAPText,
  type ParsedSOAP,
} from './SOAPSectionParser';

const sampleSOAPText = `S: Paciente refere dor torácica há 2 dias, piora aos esforços. Nega febre. Histórico de HAS há 5 anos.

O: PA 140/90 mmHg, FC 88 bpm, FR 18 irpm, SatO2 97% AA. Ausculta cardíaca: RCR 2T BNF sem sopros. Pulmões limpos.

A: Angina instável (I20.0). Hipertensão arterial sistêmica estágio 1 (I10).

P: Solicito ECG de repouso e troponina. Prescrevo AAS 100mg 1x/dia. Nitrato SL se dor. Retorno em 7 dias ou antes se piora.`;

const sampleSOAPTextNoHeaders = `Paciente masculino, 65 anos, refere dor precordial tipo aperto há 3 horas. Piora aos esforços. Sudorese fria.

PA 160/100, FC 95, FR 22. Ausculta: B3 presente. Estertores em bases. ECG com supra ST em V1-V4.

IAM com supra de ST anterior. Killip II. HAS descompensada.

AAS 300mg stat. Clopidogrel 300mg. Heparina. Encaminhar para hemodinâmica urgente.`;

const meta = {
  title: 'AI/SOAPSectionParser',
  component: SOAPSectionParser,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    text: { control: 'text' },
    onSectionsChange: { action: 'sections changed' },
    onSectionClick: { action: 'section clicked' },
    editable: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    showConfidence: { control: 'boolean' },
    compact: { control: 'boolean' },
    autoParse: { control: 'boolean' },
  },
} satisfies Meta<typeof SOAPSectionParser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: sampleSOAPText,
    editable: false,
    showLabels: true,
    showConfidence: false,
    compact: false,
    autoParse: true,
  },
};

export const WithExplicitHeaders: Story = {
  args: {
    ...Default.args,
    text: sampleSOAPText,
    showConfidence: true,
  },
};

export const HeuristicParsing: Story = {
  args: {
    ...Default.args,
    text: sampleSOAPTextNoHeaders,
    showConfidence: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Automatic section detection when no explicit S/O/A/P headers are present.',
      },
    },
  },
};

export const EditableMode: Story = {
  args: {
    ...Default.args,
    editable: true,
  },
};

export const CompactView: Story = {
  args: {
    ...Default.args,
    compact: true,
  },
};

export const WithoutLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};

export const ManualParseControl: Story = {
  args: {
    ...Default.args,
    autoParse: false,
  },
};

export const ClickableSections: Story = {
  args: {
    ...Default.args,
    onSectionClick: undefined, // Will use action
  },
};

// SOAPEditor story
export const FullEditor: StoryObj<typeof SOAPEditor> = {
  render: () => {
    const EditorWrapper = () => {
      const [parsed, setParsed] = useState<ParsedSOAP | undefined>();

      return (
        <div className="space-y-4">
          <SOAPEditor
            initialText={sampleSOAPText}
            onChange={setParsed}
            onSave={(p) => console.log('Saved:', p)}
            showToolbar={true}
          />
          {parsed && (
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h4 className="font-medium mb-2">Parsed Output:</h4>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(parsed, null, 2)}
              </pre>
            </div>
          )}
        </div>
      );
    };

    return <EditorWrapper />;
  },
};

export const EditorWithoutToolbar: StoryObj<typeof SOAPEditor> = {
  render: () => (
    <SOAPEditor
      initialText={sampleSOAPText}
      showToolbar={false}
    />
  ),
};

export const EmptyEditor: StoryObj<typeof SOAPEditor> = {
  render: () => (
    <SOAPEditor
      initialText=""
      showToolbar={true}
    />
  ),
};

// SOAPPreview story
export const PreviewComponent: StoryObj<typeof SOAPPreview> = {
  render: () => {
    const parsed = parseSOAPText(sampleSOAPText);
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Full Preview (100 chars)</h3>
          <SOAPPreview parsed={parsed} maxLength={100} />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Short Preview (50 chars)</h3>
          <SOAPPreview parsed={parsed} maxLength={50} />
        </div>
      </div>
    );
  },
};

// Complex SOAP note
export const ComplexSOAPNote: Story = {
  args: {
    text: `S: Paciente feminina, 45 anos, G3P2A1, refere sangramento vaginal irregular há 2 meses, associado a dor pélvica em cólica. Última menstruação há 45 dias. Nega febre, corrimento ou sintomas urinários. Antecedentes: DM2 em uso de metformina 850mg 2x/dia, hipotireoidismo em uso de levotiroxina 75mcg/dia. Menarca aos 12 anos, ciclos regulares até 2 meses atrás.

O: BEG, corada, hidratada. PA 130/85 mmHg, FC 78 bpm. Abdome: RHA+, flácido, dor à palpação em hipogástrio. Exame especular: colo de aspecto normal, sangramento de origem uterina. Toque vaginal: útero aumentado de volume, compatível com 10 semanas, móvel, anexos livres.

A: 1. Sangramento uterino anormal - investigar miomatose vs hiperplasia endometrial
   2. DM2 controlado
   3. Hipotireoidismo em tratamento

P: 1. Solicito USG transvaginal, beta-HCG, hemograma, TSH, glicemia jejum
   2. Manter metformina e levotiroxina
   3. Retorno em 7 dias com exames
   4. Orientações sobre sinais de alarme`,
    editable: true,
    showLabels: true,
    showConfidence: true,
    compact: false,
    autoParse: true,
  },
};

// Pediatric SOAP note
export const PediatricNote: Story = {
  args: {
    text: `S: Mãe refere que lactente de 8 meses apresenta febre há 2 dias (máx 39°C), irritabilidade, recusa alimentar e tosse produtiva. Nega vômitos ou diarreia. Vacinação em dia. Frequenta creche.

O: Regular estado geral, choroso ao exame. T 38.5°C, FR 45 irpm, FC 140 bpm, SatO2 95% AA. Oroscopia: hiperemia de orofaringe, sem exsudato. Otoscopia: MT opaca, abaulada à D. Ausculta pulmonar: MV+ com estertores subcrepitantes difusos.

A: Otite média aguda + Bronquiolite viral

P: Amoxicilina 50mg/kg/dia 8/8h por 10 dias. Antitérmico se febre. Hidratação oral. Reavaliação em 48-72h. Orientações sobre sinais de alarme respiratório.`,
    editable: false,
    showLabels: true,
    showConfidence: true,
    autoParse: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Info, Pill, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: 'Components/Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const InfoPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
          <Info size={16} />
          More info
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-200">Glucose Level</h3>
          <p className="text-sm text-neutral-400">
            Normal fasting glucose: 70-100 mg/dL. This patient&apos;s level is elevated.
          </p>
          <p className="text-xs text-neutral-500 mt-3">
            Reference: ADA Clinical Practice Guidelines 2024
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DrugInteractionPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded text-white text-sm font-medium transition-colors flex items-center gap-2">
          <AlertCircle size={14} />
          Interaction
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <h3 className="font-semibold text-yellow-400">Drug Interaction</h3>
          <div className="text-sm text-neutral-300">
            <p className="mb-2">
              <strong>Warfarin + Aspirin</strong>
            </p>
            <p className="text-neutral-400 mb-2">
              Increased bleeding risk when combined. Monitor INR more frequently.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded text-xs">
              <strong>Recommendation:</strong> Use acetaminophen as alternative pain reliever
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const MedicationDetailsPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
          <Pill size={16} />
          Metformin
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-200">Metformin 500mg</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-neutral-400">Class</p>
              <p className="text-neutral-200 font-medium">Biguanide</p>
            </div>
            <div>
              <p className="text-neutral-400">Route</p>
              <p className="text-neutral-200 font-medium">Oral</p>
            </div>
            <div>
              <p className="text-neutral-400">Common Dose</p>
              <p className="text-neutral-200 font-medium">500-2000 mg/day</p>
            </div>
            <div>
              <p className="text-neutral-400">Frequency</p>
              <p className="text-neutral-200 font-medium">2-3 times daily</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded">
            <p className="text-xs text-blue-300">
              <strong>Contraindication:</strong> Renal impairment (CrCl &lt; 30 mL/min)
            </p>
          </div>

          <a href="#" className="text-xs text-blue-400 hover:text-blue-300">
            View full prescribing information →
          </a>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CitationPreviewPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-blue-400 hover:text-blue-300 underline text-sm">
          [1]
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-neutral-200">
            Efficacy of intensive blood-pressure lowering in patients with diabetes
          </p>
          <p className="text-neutral-400">
            Action to Control Cardiovascular Risk in Diabetes Study Group (ACCORD)
          </p>
          <div className="text-xs text-neutral-500 space-y-1">
            <p><strong>Journal:</strong> N Engl J Med. 2010;362(17):1575-1585</p>
            <p><strong>PMID:</strong> 20228401</p>
            <p><strong>Evidence:</strong> GRADE High (RCT)</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 p-2 rounded text-xs">
            <p className="text-green-300">
              1,234 citations · Journal IF: 72.4 · Highly cited (top 1%)
            </p>
          </div>

          <a href="https://pubmed.ncbi.nlm.nih.gov/20228401" className="text-xs text-blue-400 hover:text-blue-300 block">
            View on PubMed →
          </a>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SymptomDetailsPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <span className="px-2 py-1 bg-neutral-700 rounded text-sm text-neutral-200 cursor-help hover:bg-neutral-600 transition-colors">
          Dyspnea
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-200">Dyspnea</h3>
          <p className="text-sm text-neutral-400">
            Shortness of breath or difficulty breathing. Can be associated with cardiac or pulmonary conditions.
          </p>

          <div className="mt-3 space-y-1 text-xs">
            <p className="text-neutral-500"><strong>CIAP-2:</strong> R06</p>
            <p className="text-neutral-500"><strong>Common causes:</strong></p>
            <ul className="text-neutral-400 list-disc list-inside">
              <li>Pneumonia</li>
              <li>Heart failure</li>
              <li>Asthma/COPD</li>
              <li>Pulmonary embolism</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const LabReferenceRangePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-red-400 hover:text-red-300 underline text-sm font-medium">
          125 mg/dL ↑
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-200">Glucose Level</h3>

          <div className="bg-neutral-700/50 p-3 rounded space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Normal (fasting)</span>
              <span className="text-green-400">70-100 mg/dL</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Patient value</span>
              <span className="text-red-400 font-medium">125 mg/dL</span>
            </div>
          </div>

          <p className="text-xs text-yellow-300 bg-yellow-500/10 p-2 rounded">
            ⚠️ Elevated fasting glucose. Consider repeat test and diabetes screening.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

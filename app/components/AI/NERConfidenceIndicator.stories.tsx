import type { Meta, StoryObj } from '@storybook/react';
import { NERConfidenceIndicator, SourceBadge, type ConfidenceSource } from './NERConfidenceIndicator';

const meta = {
  title: 'AI/NERConfidenceIndicator',
  component: NERConfidenceIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    confidence: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    source: { control: 'select', options: ['biobert', 'regex', 'hybrid'] },
    mode: { control: 'select', options: ['badge', 'bar', 'ring', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showPercentage: { control: 'boolean' },
    showSource: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof NERConfidenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    confidence: 0.85,
    source: 'biobert',
    mode: 'badge',
    size: 'md',
    showPercentage: true,
    showSource: true,
    showTooltip: true,
    animated: true,
  },
};

export const VeryHighConfidence: Story = {
  args: {
    ...Default.args,
    confidence: 0.95,
  },
};

export const HighConfidence: Story = {
  args: {
    ...Default.args,
    confidence: 0.78,
  },
};

export const MediumConfidence: Story = {
  args: {
    ...Default.args,
    confidence: 0.55,
  },
};

export const LowConfidence: Story = {
  args: {
    ...Default.args,
    confidence: 0.35,
  },
};

export const VeryLowConfidence: Story = {
  args: {
    ...Default.args,
    confidence: 0.15,
  },
};

export const BarMode: Story = {
  args: {
    ...Default.args,
    mode: 'bar',
    confidence: 0.72,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const RingMode: Story = {
  args: {
    ...Default.args,
    mode: 'ring',
    confidence: 0.82,
  },
};

export const MinimalMode: Story = {
  args: {
    ...Default.args,
    mode: 'minimal',
    confidence: 0.88,
  },
};

export const BioBERTSource: Story = {
  args: {
    ...Default.args,
    source: 'biobert',
  },
};

export const RegexSource: Story = {
  args: {
    ...Default.args,
    source: 'regex',
  },
};

export const HybridSource: Story = {
  args: {
    ...Default.args,
    source: 'hybrid',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const WithoutPercentage: Story = {
  args: {
    ...Default.args,
    showPercentage: false,
  },
};

export const WithoutSource: Story = {
  args: {
    ...Default.args,
    showSource: false,
  },
};

export const WithoutTooltip: Story = {
  args: {
    ...Default.args,
    showTooltip: false,
  },
};

export const NotAnimated: Story = {
  args: {
    ...Default.args,
    animated: false,
    mode: 'bar',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// All modes comparison
export const AllModes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Badge Mode</h3>
        <div className="flex gap-4">
          <NERConfidenceIndicator confidence={0.92} mode="badge" source="biobert" />
          <NERConfidenceIndicator confidence={0.65} mode="badge" source="regex" />
          <NERConfidenceIndicator confidence={0.35} mode="badge" source="hybrid" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Bar Mode</h3>
        <div className="space-y-2 w-64">
          <NERConfidenceIndicator confidence={0.92} mode="bar" />
          <NERConfidenceIndicator confidence={0.65} mode="bar" />
          <NERConfidenceIndicator confidence={0.35} mode="bar" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ring Mode</h3>
        <div className="flex gap-4">
          <NERConfidenceIndicator confidence={0.92} mode="ring" />
          <NERConfidenceIndicator confidence={0.65} mode="ring" />
          <NERConfidenceIndicator confidence={0.35} mode="ring" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Minimal Mode</h3>
        <div className="flex gap-4">
          <NERConfidenceIndicator confidence={0.92} mode="minimal" />
          <NERConfidenceIndicator confidence={0.65} mode="minimal" />
          <NERConfidenceIndicator confidence={0.35} mode="minimal" />
        </div>
      </div>
    </div>
  ),
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Badge Sizes</h3>
        <div className="flex items-center gap-4">
          <NERConfidenceIndicator confidence={0.85} mode="badge" size="sm" source="biobert" />
          <NERConfidenceIndicator confidence={0.85} mode="badge" size="md" source="biobert" />
          <NERConfidenceIndicator confidence={0.85} mode="badge" size="lg" source="biobert" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ring Sizes</h3>
        <div className="flex items-end gap-4">
          <NERConfidenceIndicator confidence={0.85} mode="ring" size="sm" />
          <NERConfidenceIndicator confidence={0.85} mode="ring" size="md" />
          <NERConfidenceIndicator confidence={0.85} mode="ring" size="lg" />
        </div>
      </div>
    </div>
  ),
};

// SourceBadge standalone
export const SourceBadgeStories: StoryObj<typeof SourceBadge> = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Source Badges</h3>
      <div className="flex gap-4">
        <SourceBadge source="biobert" />
        <SourceBadge source="regex" />
        <SourceBadge source="hybrid" />
      </div>
      <h3 className="text-lg font-semibold mt-6">Sizes</h3>
      <div className="flex items-center gap-4">
        <SourceBadge source="biobert" size="sm" />
        <SourceBadge source="biobert" size="md" />
        <SourceBadge source="biobert" size="lg" />
      </div>
      <h3 className="text-lg font-semibold mt-6">Icon Only</h3>
      <div className="flex gap-4">
        <SourceBadge source="biobert" showLabel={false} />
        <SourceBadge source="regex" showLabel={false} />
        <SourceBadge source="hybrid" showLabel={false} />
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TreeView, TreeNode } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/Data Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const icdHierarchy: TreeNode[] = [
  {
    id: 'A',
    label: 'A - Certain infectious and parasitic diseases',
    children: [
      {
        id: 'A00',
        label: 'A00 - Cholera',
        children: [
          { id: 'A001', label: 'A001 - Cholera with minor complications' },
          { id: 'A009', label: 'A009 - Cholera, unspecified' },
        ],
      },
      {
        id: 'A01',
        label: 'A01 - Typhoid and paratyphoid fevers',
      },
    ],
  },
  {
    id: 'B',
    label: 'B - Certain infectious and parasitic diseases (continued)',
    children: [
      {
        id: 'B15',
        label: 'B15 - Hepatitis A',
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <TreeView
        nodes={icdHierarchy}
        selectedIds={selectedIds}
        onSelect={(id) => setSelectedIds([id])}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-200 mb-2">Selected: {selectedIds.join(', ')}</h3>
        </div>
        <TreeView
          nodes={icdHierarchy}
          selectedIds={selectedIds}
          onMultiSelect={setSelectedIds}
          multiSelect
        />
      </div>
    );
  },
};

export const Expandable: Story = {
  render: () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(['A']);
    return (
      <TreeView
        nodes={icdHierarchy}
        expandedIds={expandedIds}
        onToggleExpand={(id) => {
          setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
        }}
      />
    );
  },
};

export const DefaultExpanded: Story = {
  render: () => (
    <TreeView
      nodes={icdHierarchy}
      defaultExpanded={true}
    />
  ),
};

export const SearchFilter: Story = {
  render: () => {
    const [searchFilter, setSearchFilter] = useState('');
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search diseases..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-500"
        />
        <TreeView
          nodes={icdHierarchy}
          searchFilter={searchFilter}
          defaultExpanded={searchFilter.length > 0}
        />
      </div>
    );
  },
};

export const ATCMedications: Story = {
  render: () => {
    const atcHierarchy: TreeNode[] = [
      {
        id: 'A',
        label: 'A - Alimentary tract and metabolism',
        children: [
          {
            id: 'A01',
            label: 'A01 - Stomatological preparations',
          },
          {
            id: 'A02',
            label: 'A02 - Drugs for acid related disorders',
            children: [
              { id: 'A02A', label: 'A02A - Antacids' },
              { id: 'A02B', label: 'A02B - Acid-suppressing drugs' },
            ],
          },
        ],
      },
      {
        id: 'C',
        label: 'C - Cardiovascular system',
        children: [
          {
            id: 'C01',
            label: 'C01 - Cardiac therapy',
          },
          {
            id: 'C02',
            label: 'C02 - Antihypertensives',
            children: [
              { id: 'C02A', label: 'C02A - Vasodilators' },
              { id: 'C02B', label: 'C02B - Sympatholytics' },
            ],
          },
        ],
      },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-200">Selected Medications:</h3>
          <p className="text-xs text-neutral-400">{selectedIds.join(', ') || 'None'}</p>
        </div>
        <TreeView
          nodes={atcHierarchy}
          selectedIds={selectedIds}
          onMultiSelect={setSelectedIds}
          multiSelect
          defaultExpanded={false}
        />
      </div>
    );
  },
};

export const CIAP2Codes: Story = {
  render: () => {
    const ciapHierarchy: TreeNode[] = [
      {
        id: 'A',
        label: 'A - General and unspecified',
        children: [
          { id: 'A01', label: 'A01 - Abdominal pain' },
          { id: 'A02', label: 'A02 - Constipation' },
          { id: 'A03', label: 'A03 - Diarrhea' },
        ],
      },
      {
        id: 'D',
        label: 'D - Digestive',
        children: [
          { id: 'D01', label: 'D01 - Abdominal pain' },
          { id: 'D02', label: 'D02 - Dyspepsia' },
          { id: 'D03', label: 'D03 - Flatulence/gas' },
        ],
      },
      {
        id: 'K',
        label: 'K - Cardiovascular',
        children: [
          { id: 'K01', label: 'K01 - Palpitations' },
          { id: 'K02', label: 'K02 - Chest pain' },
        ],
      },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-200">ICPC-2 Classification</h3>
        <TreeView
          nodes={ciapHierarchy}
          selectedIds={selectedIds}
          onSelect={(id) => setSelectedIds([id])}
          defaultExpanded={false}
        />
      </div>
    );
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <div className="p-3 rounded bg-neutral-800">
          <p className="text-sm text-neutral-300">
            Selected Items: {selectedIds.length > 0 ? selectedIds.join(', ') : 'None'}
          </p>
        </div>
        <TreeView
          nodes={icdHierarchy}
          selectedIds={selectedIds}
          onMultiSelect={setSelectedIds}
          multiSelect
          defaultExpanded={true}
        />
      </div>
    );
  },
};

export const DisabledNodes: Story = {
  render: () => {
    const disabledHierarchy: TreeNode[] = [
      {
        id: 'A',
        label: 'A - Available diseases',
        children: [
          {
            id: 'A00',
            label: 'A00 - Cholera',
          },
          {
            id: 'A01',
            label: 'A01 - Typhoid (Disabled)',
            disabled: true,
          },
        ],
      },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <TreeView
        nodes={disabledHierarchy}
        selectedIds={selectedIds}
        onSelect={(id) => setSelectedIds([id])}
      />
    );
  },
};

export const DeepHierarchy: Story = {
  render: () => {
    const deepHierarchy: TreeNode[] = [
      {
        id: '1',
        label: 'Level 1 - Diseases',
        children: [
          {
            id: '1-1',
            label: 'Level 2 - Infectious',
            children: [
              {
                id: '1-1-1',
                label: 'Level 3 - Bacterial',
                children: [
                  {
                    id: '1-1-1-1',
                    label: 'Level 4 - Gram Negative',
                    children: [
                      { id: '1-1-1-1-1', label: 'Level 5 - E. coli' },
                      { id: '1-1-1-1-2', label: 'Level 5 - Salmonella' },
                    ],
                  },
                  {
                    id: '1-1-1-2',
                    label: 'Level 4 - Gram Positive',
                  },
                ],
              },
              {
                id: '1-1-2',
                label: 'Level 3 - Viral',
              },
            ],
          },
          {
            id: '1-2',
            label: 'Level 2 - Chronic',
          },
        ],
      },
    ];

    return (
      <TreeView
        nodes={deepHierarchy}
        defaultExpanded={false}
      />
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search ICD codes..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm"
        />
        <div className="text-xs text-neutral-400">
          {selectedIds.length > 0 ? `Selected: ${selectedIds.join(', ')}` : 'No selection'}
        </div>
        <TreeView
          nodes={icdHierarchy}
          selectedIds={selectedIds}
          onSelect={(id) => setSelectedIds([id])}
          searchFilter={searchFilter}
          defaultExpanded={searchFilter.length > 0}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const generateLargeTree = (): TreeNode[] => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: `category-${i}`,
        label: `Category ${i + 1}`,
        children: Array.from({ length: 5 }, (_, j) => ({
          id: `item-${i}-${j}`,
          label: `Item ${i + 1}.${j + 1}`,
          children: Array.from({ length: 3 }, (_, k) => ({
            id: `subitem-${i}-${j}-${k}`,
            label: `Subitem ${i + 1}.${j + 1}.${k + 1}`,
          })),
        })),
      }));
    };

    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setExpandedIds([])}
          className="px-3 py-1 rounded bg-neutral-800 text-xs text-neutral-300 hover:bg-neutral-700"
        >
          Collapse All
        </button>
        <TreeView
          nodes={generateLargeTree()}
          expandedIds={expandedIds}
          onToggleExpand={(id) => {
            setExpandedIds((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            );
          }}
        />
      </div>
    );
  },
};

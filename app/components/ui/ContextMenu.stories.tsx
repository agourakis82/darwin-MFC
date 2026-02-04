import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
import { Download, Share2, Trash2, Edit, Copy, Eye } from 'lucide-react';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/Navigation/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const TableRow: Story = {
  render: () => (
    <ContextMenu
      items={[
        { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => alert('View') },
        { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => alert('Edit') },
        { id: 'copy', label: 'Copy', icon: <Copy size={16} />, onClick: () => alert('Copy') },
        { id: 'divider', label: '', divider: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => alert('Delete') },
      ]}
    >
      <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-lg cursor-context-menu text-center">
        Right-click on this area
      </div>
    </ContextMenu>
  ),
};

export const MedicationCard: Story = {
  render: () => (
    <ContextMenu
      items={[
        { id: 'view', label: 'View Details', icon: <Eye size={16} /> },
        { id: 'interactions', label: 'Check Interactions', onClick: () => alert('Check Interactions') },
        { id: 'similar', label: 'Similar Drugs', onClick: () => alert('Similar Drugs') },
        { id: 'divider', label: '', divider: true },
        { id: 'print', label: 'Print Info', onClick: () => alert('Print') },
        { id: 'share', label: 'Share', icon: <Share2 size={16} />, onClick: () => alert('Share') },
      ]}
    >
      <div className="p-6 bg-neutral-800 border-2 border-neutral-700 rounded-lg cursor-context-menu">
        <h3 className="font-semibold text-neutral-200 mb-2">Metformin 500mg</h3>
        <p className="text-sm text-neutral-400">Right-click for options</p>
      </div>
    </ContextMenu>
  ),
};

export const LabResult: Story = {
  render: () => (
    <ContextMenu
      items={[
        { id: 'detail', label: 'View Details', onClick: () => alert('Details') },
        { id: 'history', label: 'View History', onClick: () => alert('History') },
        { id: 'trend', label: 'Trend Analysis', onClick: () => alert('Trend') },
        { id: 'compare', label: 'Compare with Previous', onClick: () => alert('Compare') },
        { id: 'divider', label: '', divider: true },
        { id: 'print', label: 'Print Report', onClick: () => alert('Print') },
        { id: 'export', label: 'Export', icon: <Download size={16} />, onClick: () => alert('Export') },
      ]}
    >
      <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-lg cursor-context-menu">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-neutral-400">Glucose</p>
            <p className="text-lg font-semibold text-neutral-200">125 mg/dL</p>
          </div>
          <span className="text-xs text-yellow-500 font-semibold">High</span>
        </div>
        <p className="text-xs text-neutral-500 mt-2">Right-click for actions</p>
      </div>
    </ContextMenu>
  ),
};

export const PatientMenu: Story = {
  render: () => (
    <ContextMenu
      items={[
        { id: 'open', label: 'Open Patient Record' },
        { id: 'view-labs', label: 'View Lab Results' },
        { id: 'view-meds', label: 'View Medications' },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'referral',
          label: 'Create Referral',
          submenu: [
            { id: 'cardio', label: 'Cardiology', onClick: () => alert('Referral: Cardiology') },
            { id: 'endo', label: 'Endocrinology', onClick: () => alert('Referral: Endocrinology') },
            { id: 'neuro', label: 'Neurology', onClick: () => alert('Referral: Neurology') },
          ],
        },
        { id: 'schedule', label: 'Schedule Appointment', onClick: () => alert('Schedule') },
        { id: 'divider2', label: '', divider: true },
        { id: 'export', label: 'Export Records', icon: <Download size={16} /> },
      ]}
    >
      <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-lg cursor-context-menu text-center">
        <h4 className="font-semibold text-neutral-200 mb-2">Patient: John Doe</h4>
        <p className="text-sm text-neutral-400">Right-click for patient actions</p>
      </div>
    </ContextMenu>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <ContextMenu
      items={[
        { id: 'edit', label: 'Edit', icon: <Edit size={16} /> },
        { id: 'copy', label: 'Copy', icon: <Copy size={16} /> },
        { id: 'paste', label: 'Paste', icon: <Copy size={16} />, disabled: true },
        { id: 'divider', label: '', divider: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, disabled: true },
      ]}
    >
      <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-lg cursor-context-menu text-center">
        Right-click for menu (some options disabled)
      </div>
    </ContextMenu>
  ),
};

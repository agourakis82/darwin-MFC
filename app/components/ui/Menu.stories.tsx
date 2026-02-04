import type { Meta, StoryObj } from '@storybook/react';
import { Menu, VerticalMenu } from './Menu';
import { Download, Share2, Trash2, Edit, Copy, Settings } from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const DropdownDefault: Story = {
  render: () => (
    <Menu
      trigger="Actions"
      items={[
        { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => alert('Edit') },
        { id: 'copy', label: 'Duplicate', icon: <Copy size={16} />, onClick: () => alert('Copy') },
        { id: 'share', label: 'Share', icon: <Share2 size={16} />, onClick: () => alert('Share') },
        { id: 'divider', label: '', divider: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => alert('Delete') },
      ]}
    />
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <Menu
      trigger="Export"
      items={[
        {
          id: 'export',
          label: 'Export',
          icon: <Download size={16} />,
          submenu: [
            { id: 'pdf', label: 'As PDF', onClick: () => alert('Export PDF') },
            { id: 'csv', label: 'As CSV', onClick: () => alert('Export CSV') },
            { id: 'json', label: 'As JSON', onClick: () => alert('Export JSON') },
          ],
        },
        {
          id: 'share',
          label: 'Share',
          icon: <Share2 size={16} />,
          submenu: [
            { id: 'email', label: 'Via Email', onClick: () => alert('Share Email') },
            { id: 'link', label: 'Copy Link', onClick: () => alert('Copy Link') },
          ],
        },
      ]}
    />
  ),
};

export const MedicalMenu: Story = {
  render: () => (
    <Menu
      trigger="Patient Actions"
      items={[
        {
          id: 'view',
          label: 'View Record',
          description: 'Complete medical history',
          onClick: () => alert('View Record'),
        },
        {
          id: 'labs',
          label: 'Lab Results',
          description: 'Recent lab values',
          submenu: [
            { id: 'recent', label: 'Recent Results', onClick: () => alert('Recent Labs') },
            { id: 'trend', label: 'Trend Analysis', onClick: () => alert('Trend') },
            { id: 'compare', label: 'Compare with Previous', onClick: () => alert('Compare') },
          ],
        },
        { id: 'divider', label: '', divider: true },
        {
          id: 'refer',
          label: 'Refer to Specialist',
          description: 'Create referral',
          onClick: () => alert('Create Referral'),
        },
        { id: 'schedule', label: 'Schedule Follow-up', onClick: () => alert('Schedule') },
        { id: 'divider2', label: '', divider: true },
        { id: 'print', label: 'Print', onClick: () => alert('Print') },
      ]}
    />
  ),
};

export const VerticalMenuDefault: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <VerticalMenu
        items={[
          { id: 'home', label: 'Home', icon: <Settings size={16} /> },
          {
            id: 'medical',
            label: 'Medical Data',
            submenu: [
              { id: 'drugs', label: 'Medications', onClick: () => alert('Medications') },
              { id: 'diseases', label: 'Diseases', onClick: () => alert('Diseases') },
              { id: 'labs', label: 'Lab Values', onClick: () => alert('Lab Values') },
            ],
          },
          {
            id: 'tools',
            label: 'Tools',
            submenu: [
              { id: 'calc', label: 'Calculators', onClick: () => alert('Calculators') },
              { id: 'protocol', label: 'Protocols', onClick: () => alert('Protocols') },
              { id: 'cases', label: 'Clinical Cases', onClick: () => alert('Cases') },
            ],
          },
          { id: 'divider', label: '', divider: true },
          { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
        ]}
      />
    </div>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu
      trigger="Options"
      items={[
        { id: 'edit', label: 'Edit', icon: <Edit size={16} /> },
        { id: 'copy', label: 'Copy', icon: <Copy size={16} /> },
        { id: 'paste', label: 'Paste', icon: <Copy size={16} />, disabled: true },
        { id: 'divider', label: '', divider: true },
        { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, disabled: true },
      ]}
    />
  ),
};

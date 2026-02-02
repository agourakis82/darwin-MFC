import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoResults: Story = {
  render: () => (
    <EmptyState
      variant="no-results"
      title="No medications found"
      description="Try adjusting your search filters or clearing your search query"
    />
  ),
};

export const NoResultsWithAction: Story = {
  render: () => (
    <EmptyState
      variant="no-results"
      title="No medications found"
      description="Try adjusting your search filters"
      action={{
        label: "Clear Filters",
        onClick: () => alert('Filters cleared'),
      }}
    />
  ),
};

export const NoData: Story = {
  render: () => (
    <EmptyState
      variant="no-data"
      title="No lab results available"
      description="When you request lab tests, results will appear here"
    />
  ),
};

export const NoDataWithAction: Story = {
  render: () => (
    <EmptyState
      variant="no-data"
      title="No patients in your list"
      description="Start by adding a new patient to track their medical information"
      action={{
        label: "Add Patient",
        onClick: () => alert('Add patient dialog opened'),
      }}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <EmptyState
      variant="error"
      title="Unable to load data"
      description="An error occurred while fetching the information. Please try again."
      action={{
        label: "Retry",
        onClick: () => alert('Retrying...'),
      }}
    />
  ),
};

export const ErrorWithSecondary: Story = {
  render: () => (
    <EmptyState
      variant="error"
      title="Connection error"
      description="We couldn't reach the server. Check your connection and try again."
      action={{
        label: "Retry",
        onClick: () => alert('Retrying...'),
      }}
      secondaryAction={{
        label: "Contact Support",
        onClick: () => alert('Opening support contact...'),
      }}
    />
  ),
};

export const Offline: Story = {
  render: () => (
    <EmptyState
      variant="offline"
      title="You're offline"
      description="Check your internet connection to access this feature"
    />
  ),
};

export const OfflineWithAction: Story = {
  render: () => (
    <EmptyState
      variant="offline"
      title="No internet connection"
      description="Offline mode is limited. Some features may not be available."
      action={{
        label: "Reconnect",
        onClick: () => alert('Attempting to reconnect...'),
      }}
    />
  ),
};

export const SmallSize: Story = {
  render: () => (
    <EmptyState
      size="sm"
      variant="no-data"
      title="No data"
      description="Nothing to display"
    />
  ),
};

export const MediumSize: Story = {
  render: () => (
    <EmptyState
      size="md"
      variant="no-results"
      title="No medications found"
      description="Try adjusting your search filters or clearing your search query"
    />
  ),
};

export const LargeSize: Story = {
  render: () => (
    <EmptyState
      size="lg"
      variant="no-data"
      title="No patients in your database"
      description="Start by importing patient data or manually adding patients one by one"
      action={{
        label: "Import Patients",
        onClick: () => alert('Import dialog opened'),
      }}
    />
  ),
};

export const MedicalUseNoResults: Story = {
  render: () => (
    <EmptyState
      variant="no-results"
      title="No diseases match your search"
      description="Try searching with different keywords or browse the disease categories"
      action={{
        label: "Browse Categories",
        onClick: () => alert('Browse categories'),
      }}
    />
  ),
};

export const MedicalUseNoDiagnosis: Story = {
  render: () => (
    <EmptyState
      variant="no-data"
      title="No diagnoses recorded"
      description="Add a diagnosis from the screening program or enter a custom diagnosis"
      action={{
        label: "Add Diagnosis",
        onClick: () => alert('Add diagnosis dialog'),
      }}
    />
  ),
};

export const MedicalUseLabResults: Story = {
  render: () => (
    <EmptyState
      variant="no-data"
      title="No lab results yet"
      description="Request lab tests to see results once they're available from the laboratory"
      action={{
        label: "Request Tests",
        onClick: () => alert('Lab request form opened'),
      }}
    />
  ),
};

export const ErrorLoadingProtocol: Story = {
  render: () => (
    <EmptyState
      variant="error"
      title="Could not load clinical protocol"
      description="The protocol you're looking for is temporarily unavailable. Please try again later."
      action={{
        label: "Go Back",
        onClick: () => alert('Going back...'),
      }}
      secondaryAction={{
        label: "View Other Protocols",
        onClick: () => alert('Viewing protocols list...'),
      }}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">No Results</h3>
        <EmptyState
          variant="no-results"
          title="No results found"
          size="sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">No Data</h3>
        <EmptyState
          variant="no-data"
          title="No data available"
          size="sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">Error</h3>
        <EmptyState
          variant="error"
          title="Error loading data"
          size="sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">Offline</h3>
        <EmptyState
          variant="offline"
          title="You're offline"
          size="sm"
        />
      </div>
    </div>
  ),
};

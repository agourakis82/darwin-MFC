import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        onFilesChange={setFiles}
        multiple
      />
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        onFilesChange={setFiles}
        multiple={false}
      />
    );
  },
};

export const PDFOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        accept="application/pdf"
        onFilesChange={setFiles}
        multiple
      />
    );
  },
};

export const ImageOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        accept="image/*"
        onFilesChange={setFiles}
        multiple
      />
    );
  },
};

export const MedicalDocuments: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        accept="application/pdf,.doc,.docx"
        onFilesChange={setFiles}
        multiple
      />
    );
  },
};

export const MaxSize1MB: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        onFilesChange={setFiles}
        maxSize={1024 * 1024}
        multiple
      />
    );
  },
};

export const MaxSize10MB: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        onFilesChange={setFiles}
        maxSize={10 * 1024 * 1024}
        multiple
      />
    );
  },
};

export const MedicalLabs: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-100">Upload Lab Results</h3>
        <FileUpload
          accept="application/pdf,image/*"
          maxSize={5 * 1024 * 1024}
          onFilesChange={setFiles}
          multiple
        />
        {files.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-neutral-800 border border-neutral-700">
            <p className="text-sm font-medium text-neutral-200 mb-2">Uploaded Files ({files.length}):</p>
            <ul className="space-y-1">
              {files.map((file, idx) => (
                <li key={idx} className="text-xs text-neutral-400">
                  • {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const MedicationPhoto: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-100">Upload Medication Photo</h3>
        <p className="text-sm text-neutral-400">Take a photo of the medication bottle for identification</p>
        <FileUpload
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          onFilesChange={setFiles}
          multiple={false}
        />
      </div>
    );
  },
};

export const DocumentScanning: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-100">Scan Medical Documents</h3>
        <p className="text-sm text-neutral-400">Upload scanned copies of prescriptions, referrals, or test results</p>
        <FileUpload
          accept="application/pdf,image/*,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFilesChange={setFiles}
          multiple
        />
        {files.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30">
            <p className="text-sm font-medium text-success">✓ {files.length} document(s) ready for review</p>
          </div>
        )}
      </div>
    );
  },
};

export const BulkImport: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-100">Bulk Import Patients</h3>
        <FileUpload
          accept=".csv,.xlsx"
          maxSize={50 * 1024 * 1024}
          onFilesChange={setFiles}
          multiple={false}
        />
        <p className="text-xs text-neutral-400">
          Supported formats: CSV, XLSX (Max 50MB)
        </p>
      </div>
    );
  },
};

export const RestrictedFormats: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <FileUpload
        accept=".jpg,.jpeg,.png,.gif"
        maxSize={5 * 1024 * 1024}
        onFilesChange={setFiles}
        multiple
      />
    );
  },
};

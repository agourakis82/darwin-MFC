'use client';

import * as React from 'react';
import { Upload, X, File, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  onFilesChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

/**
 * FileUpload Component - Drag & drop file upload with preview and progress
 *
 * @example
 * <FileUpload
 *   label="Upload medical documents"
 *   accept=".pdf,.doc,.docx"
 *   maxSize={10 * 1024 * 1024}
 *   onUpload={handleUpload}
 * />
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      label,
      accept,
      multiple = false,
      maxSize = 5 * 1024 * 1024, // 5MB default
      required = false,
      disabled = false,
      error,
      helpText,
      onFilesChange,
      onUpload,
    },
    ref
  ) => {
    const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`;
      }
      return null;
    };

    const handleFiles = async (files: FileList | null) => {
      if (!files) return;

      const newFiles: UploadedFile[] = [];
      const validFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validationError = validateFile(file);

        if (validationError) {
          newFiles.push({
            file,
            progress: 0,
            status: 'error',
            error: validationError,
          });
        } else {
          newFiles.push({
            file,
            progress: 0,
            status: 'pending',
          });
          validFiles.push(file);
        }
      }

      if (!multiple && newFiles.length > 0) {
        setUploadedFiles([newFiles[0]]);
        onFilesChange?.([newFiles[0].file]);
      } else {
        setUploadedFiles((prev) => [...prev, ...newFiles]);
        onFilesChange?.([...uploadedFiles.map((f) => f.file), ...validFiles]);
      }

      // Trigger upload if handler provided
      if (onUpload && validFiles.length > 0) {
        await handleUpload(validFiles, newFiles);
      }
    };

    const handleUpload = async (files: File[], newFiles: UploadedFile[]) => {
      try {
        await onUpload?.(files);
        // Update status to success
        setUploadedFiles((prev) =>
          prev.map((f) =>
            newFiles.some((nf) => nf.file === f.file)
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
      } catch (err) {
        // Update status to error
        setUploadedFiles((prev) =>
          prev.map((f) =>
            newFiles.some((nf) => nf.file === f.file)
              ? { ...f, status: 'error', error: String(err) }
              : f
          )
        );
      }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setIsDragActive(true);
      } else if (e.type === 'dragleave') {
        setIsDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (!disabled) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const removeFile = (index: number) => {
      setUploadedFiles((prev) => {
        const newFiles = prev.filter((_, i) => i !== index);
        onFilesChange?.(newFiles.map((f) => f.file));
        return newFiles;
      });
    };

    return (
      <div ref={ref} className="flex flex-col gap-3">
        {label && (
          <label className="text-sm font-medium text-neutral-200">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            // Layout
            'relative border-2 border-dashed rounded-lg p-8',
            // Styling
            'bg-neutral-800/50',
            'transition-colors duration-200',
            // States
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-neutral-700 hover:border-neutral-600',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-neutral-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-200">
                Drag and drop your files here
              </p>
              <p className="text-xs text-neutral-400">
                or{' '}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={disabled}
                  className="text-primary hover:underline"
                >
                  click to browse
                </button>
              </p>
            </div>
            {accept && (
              <p className="text-xs text-neutral-500">
                Accepted formats: {accept}
              </p>
            )}
            <p className="text-xs text-neutral-500">
              Max file size: {formatFileSize(maxSize)}
            </p>
          </div>
        </div>

        {/* File list */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            {uploadedFiles.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700"
              >
                <File className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-200 truncate">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {formatFileSize(item.file.size)}
                  </p>
                </div>

                {item.status === 'success' && (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                )}
                {item.status === 'error' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-danger">{item.error}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-danger hover:text-danger/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {item.status === 'uploading' && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400">
                      {item.progress}%
                    </span>
                  </div>
                )}
                {item.status === 'pending' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-neutral-400 hover:text-neutral-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-danger">{error}</p>}
        {helpText && !error && (
          <p className="text-xs text-neutral-400">{helpText}</p>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export default FileUpload;

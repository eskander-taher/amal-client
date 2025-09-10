'use client';

import React, { useRef, useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import type { MediaRecord, CloudinaryUploadResponse } from '@/types';

interface MediaUploaderProps {
  onUploadComplete: (media: MediaRecord) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  tags?: string[];
  maxSizeBytes?: number;
  allowedTypes?: string[];
  accept?: string;
  multiple?: boolean;
  className?: string;
  buttonText?: string;
  showProgress?: boolean;
}

export default function MediaUploader({
  onUploadComplete,
  onUploadError,
  folder = 'uploads',
  tags = [],
  maxSizeBytes = 10 * 1024 * 1024, // 10MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'],
  accept = 'image/*,video/*',
  multiple = false,
  className = '',
  buttonText = 'Upload Media',
  showProgress = true,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const { upload, isUploading, error, progress, reset } = useCloudinaryUpload({
    maxSizeBytes,
    allowedTypes,
    onSuccess: (result: CloudinaryUploadResponse) => {
      const mediaRecord: MediaRecord = {
        public_id: result.public_id,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
        format: result.format,
        resource_type: result.resource_type as 'image' | 'video' | 'raw' | 'auto',
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        folder: result.folder,
        tags: tags,
        created_at: new Date(),
      };
      onUploadComplete(mediaRecord);
    },
    onError: (errorMsg: string) => {
      onUploadError?.(errorMsg);
    },
  });

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // For now, handle single file
    
    try {
      await upload({
        file,
        folder,
        tags,
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const resetUploader = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleInputChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? openFileDialog : undefined}
      >
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              {allowedTypes.map(type => type.split('/')[1]).join(', ')} up to{' '}
              {Math.round(maxSizeBytes / 1024 / 1024)}MB
            </p>
          </div>
          {!isUploading && (
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && isUploading && (
        <div className="mt-3">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">{progress}% uploaded</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          <div className="flex justify-between items-start">
            <span>{error}</span>
            <button
              type="button"
              onClick={resetUploader}
              className="ml-2 text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Media Preview Component
interface MediaPreviewProps {
  media: MediaRecord[];
  onRemove?: (index: number) => void;
  className?: string;
}

export function MediaPreview({ media, onRemove, className = '' }: MediaPreviewProps) {
  if (media.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {media.map((item, index) => (
        <div key={item.public_id} className="border rounded-lg p-3 bg-gray-50">
          <div className="aspect-video bg-gray-200 rounded mb-2 overflow-hidden">
            {item.resource_type === 'image' ? (
              <img
                src={item.secure_url}
                alt={item.original_filename}
                className="w-full h-full object-cover"
              />
            ) : item.resource_type === 'video' ? (
              <video
                src={item.secure_url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">{item.format.toUpperCase()}</span>
              </div>
            )}
          </div>
          <p className="text-sm font-medium truncate" title={item.original_filename}>
            {item.original_filename}
          </p>
          <p className="text-xs text-gray-500">
            {item.format} • {Math.round(item.bytes / 1024)} KB
            {item.width && item.height && ` • ${item.width}×${item.height}`}
          </p>
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-2 text-red-600 text-sm hover:text-red-800 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

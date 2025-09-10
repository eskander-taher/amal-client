'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useCloudinaryMultiUpload } from '@/hooks/useCloudinaryUpload';
import type { MediaRecord } from '@/types';

interface MultipleImageUploaderProps {
  onUploadComplete: (media: MediaRecord[]) => void;
  onUploadError?: (errors: string[]) => void;
  onProgressUpdate?: (progress: number[]) => void;
  folder?: string;
  tags?: string[];
  maxFiles?: number;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  className?: string;
  existingMedia?: MediaRecord[];
}

export default function MultipleImageUploader({
  onUploadComplete,
  onUploadError,
  onProgressUpdate,
  folder = 'uploads',
  tags = [],
  maxFiles = 10,
  maxSizeBytes = 5 * 1024 * 1024, // 5MB per file
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = '',
  existingMedia = [],
}: MultipleImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { uploadMultiple, isUploading, errors, progress, results, reset } = useCloudinaryMultiUpload({
    maxSizeBytes,
    allowedTypes,
  });

  const handleFileSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const totalFiles = existingMedia.length + selectedFiles.length + fileArray.length;
    
    if (totalFiles > maxFiles) {
      onUploadError?.([`Maximum ${maxFiles} files allowed. You have ${existingMedia.length} existing and trying to add ${fileArray.length} more.`]);
      return;
    }

    setSelectedFiles(prev => [...prev, ...fileArray]);
  }, [existingMedia.length, selectedFiles.length, maxFiles, onUploadError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
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

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    try {
      const uploadParams = selectedFiles.map(() => ({
        folder,
        tags,
      }));

      const uploadResults = await uploadMultiple(selectedFiles, uploadParams);
      
      const mediaRecords: MediaRecord[] = uploadResults.map(result => ({
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
      }));

      onUploadComplete(mediaRecords);
      setSelectedFiles([]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const clearAll = () => {
    setSelectedFiles([]);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update progress callback
  React.useEffect(() => {
    if (onProgressUpdate && progress.length > 0) {
      onProgressUpdate(progress);
    }
  }, [progress, onProgressUpdate]);

  // Update error callback
  React.useEffect(() => {
    if (onUploadError && errors.length > 0) {
      onUploadError(errors);
    }
  }, [errors, onUploadError]);

  return (
    <div className={`space-y-4 ${className}`}>
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
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          accept={allowedTypes.join(',')}
          multiple
          className="hidden"
        />

        <div className="space-y-3">
          <div className="mx-auto w-16 h-16 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isUploading ? 'Uploading images...' : 'Drop images here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Up to {maxFiles} images, {Math.round(maxSizeBytes / 1024 / 1024)}MB each
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported: {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                disabled={isUploading}
                className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Clear All
              </button>
              <button
                onClick={uploadFiles}
                disabled={isUploading || selectedFiles.length === 0}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
              </button>
            </div>
          </div>

          {/* File List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {/* File Preview */}
                <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  {/* Progress Bar */}
                  {isUploading && progress[index] !== undefined && (
                    <div className="mt-1">
                      <div className="bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${progress[index] || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{progress[index] || 0}%</p>
                    </div>
                  )}
                  
                  {/* Error Display */}
                  {errors[index] && (
                    <p className="text-xs text-red-600 mt-1">{errors[index]}</p>
                  )}
                </div>

                {/* Remove Button */}
                {!isUploading && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Remove file"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Summary */}
      {existingMedia.length > 0 && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p>
            📁 Current: {existingMedia.length} files | 
            📤 Selected: {selectedFiles.length} files | 
            📊 Total: {existingMedia.length + selectedFiles.length} / {maxFiles}
          </p>
        </div>
      )}
    </div>
  );
}

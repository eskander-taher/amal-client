'use client';

import React, { useState, useRef } from 'react';
import { useCloudinaryUpload, useCloudinaryMultiUpload } from '@/hooks/useCloudinaryUpload';
import type { CloudinaryUploadResponse, MediaRecord } from '@/types';

interface FormData {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  featured: boolean;
}

export default function CloudinaryUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    featured: false,
  });
  
  const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Single file upload hook
  const singleUpload = useCloudinaryUpload({
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'],
    onSuccess: (result) => {
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
        tags: [],
        created_at: new Date(),
      };
      setUploadedMedia(prev => [...prev, mediaRecord]);
    },
    onError: (error) => {
      console.error('Single upload error:', error);
    },
  });

  // Multiple file upload hook
  const multiUpload = useCloudinaryMultiUpload({
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSingleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await singleUpload.upload({
        file,
        folder: 'news-articles',
        tags: ['news', 'article'],
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const results = await multiUpload.uploadMultiple(
        files,
        files.map(() => ({
          folder: 'news-articles',
          tags: ['news', 'article'],
        }))
      );

      const mediaRecords: MediaRecord[] = results.map(result => ({
        public_id: result.public_id,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
        format: result.format,
        resource_type: result.resource_type as 'image' | 'video' | 'raw' | 'auto',
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        folder: result.folder,
        tags: [],
        created_at: new Date(),
      }));

      setUploadedMedia(prev => [...prev, ...mediaRecords]);
    } catch (error) {
      console.error('Multiple upload failed:', error);
    }
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        media: uploadedMedia,
      };

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create news article');
      }

      const result = await response.json();
      console.log('News article created:', result);
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        featured: false,
      });
      setUploadedMedia([]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Create News Article with Media</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Featured Article</span>
          </label>
        </div>

        {/* Media Upload Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Media Upload</h3>
          
          {/* Single File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Single File
            </label>
            <input
              type="file"
              onChange={handleSingleFileUpload}
              accept="image/*,video/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {singleUpload.isUploading && (
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${singleUpload.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{singleUpload.progress}% uploaded</p>
              </div>
            )}
            {singleUpload.error && (
              <p className="text-red-600 text-sm mt-1">{singleUpload.error}</p>
            )}
          </div>

          {/* Multiple File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Multiple Files
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMultipleFileUpload}
              accept="image/*,video/*"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {multiUpload.isUploading && (
              <div className="mt-2 space-y-2">
                {multiUpload.progress.map((progress, index) => (
                  <div key={index}>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">File {index + 1}: {progress}%</p>
                  </div>
                ))}
              </div>
            )}
            {multiUpload.errors.length > 0 && (
              <div className="mt-2 space-y-1">
                {multiUpload.errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">File {index + 1}: {error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Uploaded Media Preview */}
          {uploadedMedia.length > 0 && (
            <div className="mb-6">
              <h4 className="text-md font-medium mb-3">Uploaded Media ({uploadedMedia.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedMedia.map((media, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <div className="aspect-video bg-gray-200 rounded mb-2 overflow-hidden">
                      {media.resource_type === 'image' ? (
                        <img
                          src={media.secure_url}
                          alt={media.original_filename}
                          className="w-full h-full object-cover"
                        />
                      ) : media.resource_type === 'video' ? (
                        <video
                          src={media.secure_url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500">{media.format.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{media.original_filename}</p>
                    <p className="text-xs text-gray-500">
                      {media.format} • {Math.round(media.bytes / 1024)} KB
                      {media.width && media.height && ` • ${media.width}×${media.height}`}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="mt-2 text-red-600 text-sm hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Section */}
        <div className="border-t pt-6">
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              News article created successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || singleUpload.isUploading || multiUpload.isUploading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Article...' : 'Create News Article'}
          </button>
        </div>
      </form>
    </div>
  );
}

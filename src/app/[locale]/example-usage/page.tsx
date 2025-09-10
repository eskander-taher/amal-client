'use client';

import React, { useState } from 'react';
import MediaUploader, { MediaPreview } from '@/components/MediaUploader';
import type { MediaRecord } from '@/types';

export default function ExampleUsagePage() {
  const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleMediaUpload = (media: MediaRecord) => {
    setUploadedMedia(prev => [...prev, media]);
    setMessage({ type: 'success', text: 'Media uploaded successfully!' });
  };

  const handleUploadError = (error: string) => {
    setMessage({ type: 'error', text: error });
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        ...formData,
        media: uploadedMedia,
        author: 'Example User',
        category: 'technology',
        tags: ['example', 'demo'],
        content: formData.description, // Using description as content for simplicity
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
        throw new Error(error.error || 'Failed to submit');
      }

      const result = await response.json();
      setMessage({ type: 'success', text: 'Form submitted successfully!' });
      
      // Reset form
      setFormData({ title: '', description: '' });
      setUploadedMedia([]);
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cloudinary Upload Example
          </h1>
          <p className="text-gray-600 mb-8">
            This example demonstrates how to use the Cloudinary upload flow with direct client-to-Cloudinary uploads.
          </p>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a title..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a description..."
                />
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Media</h3>
              
              <MediaUploader
                onUploadComplete={handleMediaUpload}
                onUploadError={handleUploadError}
                folder="example-uploads"
                tags={['example', 'demo']}
                buttonText="Choose Files"
                className="w-full"
              />

              {/* Media Preview */}
              {uploadedMedia.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">
                    Uploaded Media ({uploadedMedia.length})
                  </h4>
                  <MediaPreview
                    media={uploadedMedia}
                    onRemove={removeMedia}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>

          {/* Usage Instructions */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="prose text-gray-600">
              <ol className="space-y-2">
                <li>1. <strong>Upload Media:</strong> Select or drag files into the upload area</li>
                <li>2. <strong>Client → Cloudinary:</strong> Files are uploaded directly to Cloudinary using signed uploads</li>
                <li>3. <strong>Get URLs:</strong> Receive secure_url and public_id from Cloudinary</li>
                <li>4. <strong>Submit Form:</strong> Send form data + media URLs to your API</li>
                <li>5. <strong>Save to DB:</strong> Store the complete record in MongoDB</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-semibold text-blue-900 mb-2">Environment Variables Required:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <code>CLOUDINARY_CLOUD_NAME</code></li>
                  <li>• <code>CLOUDINARY_API_KEY</code></li>
                  <li>• <code>CLOUDINARY_API_SECRET</code></li>
                  <li>• <code>MONGODB_URI</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

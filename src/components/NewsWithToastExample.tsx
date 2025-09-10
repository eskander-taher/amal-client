'use client';

import React, { useState } from 'react';
import { useCreateNews, useNewsList, useDeleteNews } from '@/hooks/useNews';
import { useCloudinaryUploadWithSignature } from '@/hooks/useCloudinaryQuery';
import { showToast, toastPromise, toastMessages } from '@/lib/toast';
import type { MediaRecord } from '@/types';

// Example component showing toast integration with TanStack Query
export default function NewsWithToastExample() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);

  // TanStack Query hooks with built-in toast notifications
  const createNews = useCreateNews();
  const deleteNews = useDeleteNews();
  const uploadMutation = useCloudinaryUploadWithSignature();
  const { data: newsData, isLoading } = useNewsList({ limit: 5 });

  // Handle file upload with toast promise
  const handleFileUpload = async () => {
    if (!selectedFile) {
      showToast.error('Please select a file first');
      return;
    }

    try {
      // Using toastPromise for upload with loading state
      const result = await toastPromise(
        uploadMutation.mutateAsync({
          file: selectedFile,
          folder: 'example-uploads',
          tags: ['example'],
        }),
        {
          loading: `📤 Uploading "${selectedFile.name}"...`,
          success: (data) => `✅ "${data.original_filename}" uploaded successfully!`,
          error: (error) => `❌ Upload failed: ${error.message}`,
        }
      );

      setUploadedMedia(prev => [...prev, result]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      showToast.error('Please fill in all required fields');
      return;
    }

    try {
      // Create news article - toast handled in hook
      await createNews.mutateAsync({
        title,
        description,
        content: description, // Using description as content for simplicity
        media: uploadedMedia,
        author: 'Example User',
        category: 'technology',
        tags: ['example'],
        featured: false,
        published: true,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setUploadedMedia([]);
    } catch (error) {
      // Error toast handled in hook
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (id: string, title: string) => {
    // Custom confirmation toast
    const confirmToast = showToast.info(
      `Are you sure you want to delete "${title}"?`,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-yellow-50 border-l-4 border-yellow-400',
      }
    );

    // You could implement a proper confirmation modal here
    // For this example, we'll just proceed with deletion
    setTimeout(async () => {
      showToast.dismiss(confirmToast);
      
      try {
        await deleteNews.mutateAsync(id);
      } catch (error) {
        // Error toast handled in hook
      }
    }, 2000);
  };

  // Manual toast examples
  const showExampleToasts = () => {
    showToast.success('🎉 This is a success message!');
    
    setTimeout(() => {
      showToast.info('ℹ️ This is an info message!');
    }, 1000);
    
    setTimeout(() => {
      showToast.error('❌ This is an error message!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">News with Toast Integration Example</h1>
        
        {/* Example Toast Buttons */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Toast Examples</h3>
          <button
            onClick={showExampleToasts}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Show Example Toasts
          </button>
        </div>

        {/* Upload Section */}
        <div className="mb-8 p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">File Upload (with Toast Progress)</h3>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept="image/*"
              className="flex-1"
            />
            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || uploadMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          
          {/* Uploaded Media Preview */}
          {uploadedMedia.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Uploaded Files:</h4>
              <div className="space-y-2">
                {uploadedMedia.map((media, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <img src={media.secure_url} alt={media.original_filename} className="w-12 h-12 object-cover rounded" />
                    <span className="text-sm">{media.original_filename}</span>
                    <button
                      onClick={() => {
                        setUploadedMedia(prev => prev.filter((_, i) => i !== index));
                        showToast.success(toastMessages.media.deleteSuccess(media.original_filename));
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create News Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 border rounded-lg">
          <h3 className="font-semibold">Create News Article (with Toast Feedback)</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter article title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter article description..."
            />
          </div>
          
          <button
            type="submit"
            disabled={createNews.isPending}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {createNews.isPending ? 'Creating...' : 'Create Article'}
          </button>
        </form>

        {/* News List */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Recent Articles (with Toast Actions)</h3>
          
          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading articles...</p>
            </div>
          )}
          
          {newsData?.data && newsData.data.length === 0 && (
            <p className="text-gray-600 text-center py-4">No articles found. Create one above!</p>
          )}
          
          {newsData?.data && newsData.data.length > 0 && (
            <div className="space-y-3">
              {newsData.data.map((article) => (
                <div key={article._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-1">{article.description}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      By {article.author} • {new Date(article.publishedAt).toLocaleDateString()}
                      {article.media.length > 0 && ` • ${article.media.length} media files`}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(article._id, article.title)}
                    disabled={deleteNews.isPending}
                    className="ml-4 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toast Integration Benefits */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">🎉 Toast Integration Benefits</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ <strong>Automatic feedback</strong> - Success/error toasts show automatically</li>
            <li>✅ <strong>Consistent UX</strong> - All operations use the same toast style</li>
            <li>✅ <strong>Progress tracking</strong> - Upload progress with loading toasts</li>
            <li>✅ <strong>Error handling</strong> - Clear error messages for users</li>
            <li>✅ <strong>Non-blocking</strong> - Toasts don't interrupt user workflow</li>
            <li>✅ <strong>Customizable</strong> - Different durations and styles per operation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

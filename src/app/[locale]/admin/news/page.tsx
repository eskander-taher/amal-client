'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPage from '@/components/admin/AdminPage';
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from '@/hooks/useNews';
import type { News } from '@/types/news';
import type { BreadcrumbItem } from '@/types';

export default function AdminNewsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Content Management', href: '/admin' },
    { label: 'News Articles', current: true },
  ];

  const { data: news = [], isLoading, error } = useNews();
  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      // Get Cloudinary signature using axios
      const signatureResponse = await axios.post('/api/media/signature', {
        folder: 'news',
        tags: ['news'],
      });

      const signatureData = signatureResponse.data;

      // Upload to Cloudinary using axios
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signatureData.api_key);
      formData.append('timestamp', signatureData.timestamp);
      formData.append('signature', signatureData.signature);
      formData.append('folder', 'news');
      formData.append('tags', 'news');

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return uploadResponse.data.secure_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // Upload image only when form is submitted
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      // Validate that we have an image URL
      if (!imageUrl) {
        alert('Please select an image');
        return;
      }

      const newsData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      if (editingNews) {
        await updateNews.mutateAsync({ id: editingNews._id!, data: newsData });
      } else {
        await createNews.mutateAsync(newsData);
      }

      // Reset form only after successful submission
      setFormData({ title: '', description: '', image: '' });
      setImageFile(null);
      setIsFormOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Failed to save news article');
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      image: newsItem.image,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await deleteNews.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Failed to delete news article');
      }
    }
  };

  const handleCancel = () => {
    // Clean up object URL if it exists
    if (imageFile) {
      URL.revokeObjectURL(URL.createObjectURL(imageFile));
    }
    
    setFormData({ title: '', description: '', image: '' });
    setImageFile(null);
    setIsFormOpen(false);
    setEditingNews(null);
  };

  const actions = (
    <button
      onClick={() => setIsFormOpen(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add News
    </button>
  );

  return (
    <AdminLayout
      title="News Management"
      description="Manage your news articles"
      breadcrumbs={breadcrumbs}
    >
      <AdminPage
        title="News Articles"
        description="Create and manage news articles with simple form"
        actions={actions}
      >
        <div className="p-6">
          {/* Simple Form */}
          {isFormOpen && (
            <div className="mb-8 bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingNews ? 'Edit News Article' : 'Create New News Article'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter news title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter news description..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image *
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required={!editingNews && !formData.image}
                    />
                    
                    {/* Preview selected file (not yet uploaded) */}
                    {imageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Selected file (will upload on save):</p>
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}
                    
                    {/* Show current image if editing and no new file selected */}
                    {formData.image && !imageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Current image:</p>
                        <img
                          src={formData.image}
                          alt="Current"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={createNews.isPending || updateNews.isPending || uploading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
{uploading ? (
                      <>
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                        Uploading & Saving...
                      </>
                    ) : createNews.isPending || updateNews.isPending ? (
                      <>
                        Saving...
                      </>
                    ) : (
                      <>
                        {editingNews ? 'Update Article' : 'Create Article'}
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* News List */}
          <div className="bg-white border rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">News Articles</h3>
            </div>

            {isLoading && (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <span className="mt-2 text-gray-600">Loading news...</span>
              </div>
            )}

            {error && (
              <div className="p-6 text-red-600 bg-red-50">
                Error loading news: {error.message}
              </div>
            )}

            {news && news.length === 0 && !isLoading && (
              <div className="p-6 text-center text-gray-500">
                No news articles found. Create your first article!
              </div>
            )}

            {news && news.length > 0 && (
              <div className="divide-y divide-gray-200">
                {news.map((item) => (
                  <div key={item._id} className="p-6 flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Image Thumbnail */}
                      <div className="flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{item.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {item.createdAt && (
                            <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                          )}
                          {item.updatedAt && item.updatedAt !== item.createdAt && (
                            <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id!)}
                        disabled={deleteNews.isPending}
                        className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminPage>
    </AdminLayout>
  );
}

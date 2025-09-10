'use client';

import React, { useState } from 'react';
import MediaUploader, { MediaPreview } from '@/components/MediaUploader';
import MultipleImageUploader from '@/components/MultipleImageUploader';
import ImageGallery, { ImageGalleryCompact } from '@/components/ImageGallery';
import { useNewsList, useCreateNews } from '@/hooks/useNews';
import type { MediaRecord } from '@/types';

interface NewsArticle {
  _id: string;
  title: string;
  description: string;
  content: string;
  media: MediaRecord[];
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  featured: boolean;
  published: boolean;
}

const categories = [
  'technology',
  'business',
  'health',
  'sports',
  'entertainment',
  'politics',
  'science',
  'travel',
  'food',
  'lifestyle'
];

export default function NewsAdminPage() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    featured: false,
    published: true,
  });
  
  const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
  
  // List state
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');

  // TanStack Query hooks
  const createNewsMutation = useCreateNews();
  const { 
    data: newsData, 
    isLoading, 
    error: fetchError,
    refetch 
  } = useNewsList({
    page: currentPage,
    limit: 6,
    category: filterCategory || undefined,
    featured: filterFeatured ?? undefined,
  });

  // Extract data from TanStack Query
  const articles = newsData?.data || [];
  const totalPages = newsData?.pagination.pages || 1;

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

  const handleMediaUpload = (media: MediaRecord) => {
    setUploadedMedia(prev => [...prev, media]);
  };

  const handleUploadError = (error: string) => {
    // Error handling is now done in the hooks with toast notifications
    console.error('Upload error:', error);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        media: uploadedMedia,
      };

      await createNewsMutation.mutateAsync(payload);
      
      // Reset form - success toast is handled in the hook
      setFormData({
        title: '',
        description: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        featured: false,
        published: true,
      });
      setUploadedMedia([]);
      
      // Switch to list tab to see the new article
      setActiveTab('list');
      setCurrentPage(1);

    } catch (error) {
      // Error toast is handled in the hook
      console.error('Submit error:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (category: string, featured: boolean | null) => {
    setFilterCategory(category);
    setFilterFeatured(featured);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
              <p className="text-gray-600 mt-1">Create and manage news articles</p>
            </div>
            
            {/* Tabs */}
            <div className="px-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'create'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Create Article
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'list'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Articles List
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
          {/* Toast notifications handle success/error messages now */}

            {/* Create Tab */}
            {activeTab === 'create' && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Article Information</h3>
                  
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
                        placeholder="Enter article title..."
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
                        placeholder="Enter author name..."
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
                      placeholder="Enter a brief description..."
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
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the full article content..."
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
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
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

                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured Article</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Publish Immediately</span>
                    </label>
                  </div>
                </div>

                {/* Media Upload Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Media Upload</h3>
                  
                  {/* Multiple Image Uploader */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium text-gray-700">Upload Multiple Images</h4>
                      <span className="text-sm text-gray-500">
                        {uploadedMedia.length} / 10 files
                      </span>
                    </div>
                    
                    <MultipleImageUploader
                      onUploadComplete={(newMedia) => {
                        setUploadedMedia(prev => [...prev, ...newMedia]);
                        // Success toast is handled in the component/hook
                      }}
                      onUploadError={(errors) => {
                        // Error toast is handled in the component/hook
                        console.error('Multiple upload errors:', errors);
                      }}
                      folder="news-articles"
                      tags={['news', 'article']}
                      maxFiles={10}
                      existingMedia={uploadedMedia}
                      className="w-full"
                    />
                  </div>

                  {/* Alternative: Single File Upload */}
                  <div className="border-t pt-4">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Or Upload Single Files</h4>
                    <MediaUploader
                      onUploadComplete={handleMediaUpload}
                      onUploadError={handleUploadError}
                      folder="news-articles"
                      tags={['news', 'article']}
                      buttonText="Upload Single File"
                      className="w-full"
                    />
                  </div>

                  {/* Media Gallery Preview */}
                  {uploadedMedia.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-gray-900">
                          Uploaded Media ({uploadedMedia.length})
                        </h4>
                        <button
                          onClick={() => setUploadedMedia([])}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Clear All
                        </button>
                      </div>
                      
                      {/* Image Gallery for multiple images */}
                      {uploadedMedia.filter(m => m.resource_type === 'image').length > 1 ? (
                        <ImageGallery
                          media={uploadedMedia}
                          className="w-full"
                          maxHeight="300px"
                        />
                      ) : (
                        <MediaPreview
                          media={uploadedMedia}
                          onRemove={removeMedia}
                          className="w-full"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t">
                  <button
                    type="submit"
                    disabled={createNewsMutation.isPending}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createNewsMutation.isPending ? 'Creating Article...' : 'Create Article'}
                  </button>
                </div>
              </form>
            )}

            {/* List Tab */}
            {activeTab === 'list' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => handleFilterChange(e.target.value, filterFeatured)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterFeatured === null ? '' : filterFeatured.toString()}
                      onChange={(e) => handleFilterChange(filterCategory, e.target.value === '' ? null : e.target.value === 'true')}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Articles</option>
                      <option value="true">Featured Only</option>
                      <option value="false">Non-Featured</option>
                    </select>
                  </div>

                  <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Refresh
                  </button>
                </div>

                {/* Articles Grid */}
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading articles...</span>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No articles found</p>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create First Article
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <div key={article._id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        {/* Article Image */}
                        {article.media.length > 0 && (
                          <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                            <ImageGalleryCompact 
                              media={article.media}
                              className="w-full h-full"
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                          {/* Status Badges */}
                          <div className="flex gap-2 mb-2">
                            {article.featured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              article.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {article.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {article.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {article.description}
                          </p>

                          {/* Meta Info */}
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>By {article.author}</p>
                            <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                            {article.media.length > 0 && (
                              <p>{article.media.length} media file{article.media.length !== 1 ? 's' : ''}</p>
                            )}
                          </div>

                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {article.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {article.tags.length > 3 && (
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 pt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

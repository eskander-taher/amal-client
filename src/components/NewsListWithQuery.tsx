'use client';

import React from 'react';
import { useNewsList, useFeaturedNews, useLatestNews } from '@/hooks/useNews';
import ImageGallery, { ImageGalleryCompact } from './ImageGallery';

// Example component showing TanStack Query benefits
export function FeaturedNewsSection() {
  const { data, isLoading, error } = useFeaturedNews(3);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Failed to load featured news
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Featured News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.data.map((article) => (
          <div key={article._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {article.media.length > 0 && (
              <div className="aspect-video">
                <ImageGalleryCompact media={article.media} />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{article.author}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example with pagination and filters
export function NewsListWithFilters() {
  const [page, setPage] = React.useState(1);
  const [category, setCategory] = React.useState('');
  
  const { data, isLoading, error, isFetching } = useNewsList({
    page,
    limit: 6,
    category: category || undefined,
    published: true,
  });

  const categories = ['technology', 'business', 'health', 'sports', 'entertainment'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1); // Reset to first page when filtering
          }}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        
        {isFetching && (
          <div className="text-sm text-blue-600">Refreshing...</div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          Error loading news: {error.message}
        </div>
      )}

      {/* Articles Grid */}
      {data && !isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((article) => (
              <article key={article._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {article.media.length > 0 && (
                  <div className="aspect-video">
                    <ImageGalleryCompact media={article.media} />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                    {article.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {article.author}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  
                  {article.media.length > 1 && (
                    <div className="mt-2 text-xs text-gray-500">
                      📸 {article.media.filter(m => m.resource_type === 'image').length} images
                      {article.media.filter(m => m.resource_type === 'video').length > 0 && 
                        ` • 🎥 ${article.media.filter(m => m.resource_type === 'video').length} videos`
                      }
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {data.pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {page} of {data.pagination.pages}
              </span>
              
              <button
                onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))}
                disabled={page === data.pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Example showing real-time updates
export function LiveNewsCounter() {
  const { data } = useLatestNews(1);
  
  return (
    <div className="bg-blue-50 p-3 rounded-lg">
      <p className="text-sm text-blue-800">
        📰 Latest: {data?.data[0]?.title || 'Loading...'} 
        {data?.data[0] && (
          <span className="text-blue-600 ml-2">
            ({new Date(data.data[0].publishedAt).toLocaleTimeString()})
          </span>
        )}
      </p>
    </div>
  );
}

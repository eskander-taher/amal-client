'use client';

import React from 'react';
import ImageGallery from './ImageGallery';
import type { MediaRecord } from '@/types';

interface NewsDetailViewProps {
  article: {
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
    createdAt: string;
  };
  className?: string;
}

export default function NewsDetailView({ article, className = '' }: NewsDetailViewProps) {
  const images = article.media.filter(m => m.resource_type === 'image');
  const videos = article.media.filter(m => m.resource_type === 'video');
  
  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {article.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              ⭐ Featured
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {article.category}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            article.published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {article.published ? '✅ Published' : '📝 Draft'}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.media.length > 0 && (
            <>
              <span>•</span>
              <span>{article.media.length} media file{article.media.length !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
      </header>

      {/* Media Gallery */}
      {images.length > 0 && (
        <section className="mb-8">
          <ImageGallery 
            media={article.media} 
            className="w-full"
            maxHeight="500px"
            showThumbnails={images.length > 1}
          />
          
          {/* Media Caption */}
          {images.length > 1 && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              📸 {images.length} images in this article
            </p>
          )}
        </section>
      )}

      {/* Content */}
      <section className="mb-8">
        <div className="prose prose-lg max-w-none">
          {/* Description as lead */}
          <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
            {article.description}
          </p>
          
          {/* Main content */}
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎥 Videos ({videos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div key={video.public_id} className="bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={video.secure_url}
                  controls
                  className="w-full h-auto"
                  poster={video.secure_url.replace(/\.[^/.]+$/, '.jpg')} // Try to get thumbnail
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900">{video.original_filename}</p>
                  <p className="text-xs text-gray-500">
                    {video.format.toUpperCase()} • {Math.round(video.bytes / 1024 / 1024)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {article.tags.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Media Details */}
      {article.media.length > 0 && (
        <section className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📁 Media Details ({article.media.length} files)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.media.map((media, index) => (
              <div key={media.public_id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
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
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {media.original_filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {media.resource_type.toUpperCase()} • {media.format.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.round(media.bytes / 1024)} KB
                      {media.width && media.height && ` • ${media.width} × ${media.height}`}
                    </p>
                    {media.tags && media.tags.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Tags: {media.tags.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

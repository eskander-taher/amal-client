'use client';

import React, { useState } from 'react';
import type { MediaRecord } from '@/types';

interface ImageGalleryProps {
  media: MediaRecord[];
  className?: string;
  showThumbnails?: boolean;
  maxHeight?: string;
}

export default function ImageGallery({ 
  media, 
  className = '', 
  showThumbnails = true,
  maxHeight = '400px'
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter only images
  const images = media.filter(item => item.resource_type === 'image');
  
  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Display */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: maxHeight }}>
        <img
          src={currentImage.secure_url}
          alt={currentImage.original_filename}
          className="w-full h-full object-cover"
        />
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.public_id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-blue-500 opacity-100' 
                  : 'border-gray-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.secure_url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Image Info */}
      <div className="text-sm text-gray-600">
        <p className="font-medium">{currentImage.original_filename}</p>
        <p>
          {currentImage.width && currentImage.height && `${currentImage.width} × ${currentImage.height} • `}
          {currentImage.format.toUpperCase()} • {Math.round(currentImage.bytes / 1024)} KB
        </p>
      </div>
    </div>
  );
}

// Compact version for cards
export function ImageGalleryCompact({ media, className = '' }: { media: MediaRecord[], className?: string }) {
  const images = media.filter(item => item.resource_type === 'image');
  
  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <img
        src={images[0].secure_url}
        alt={images[0].original_filename}
        className="w-full h-full object-cover"
      />
      
      {/* Multiple Images Indicator */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
          +{images.length - 1} more
        </div>
      )}
    </div>
  );
}

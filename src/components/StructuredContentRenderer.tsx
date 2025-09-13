'use client';

import React from 'react';
import Image from 'next/image';
import type { ContentBlock, StructuredContent } from '@/types/content';

interface StructuredContentRendererProps {
  content: StructuredContent;
  className?: string;
}

interface ContentBlockRendererProps {
  block: ContentBlock;
}

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ block }) => {
  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  const getImageSizeClass = (size?: string) => {
    switch (size) {
      case 'small': return 'max-w-sm';
      case 'medium': return 'max-w-md';
      case 'large': return 'max-w-2xl';
      case 'full': return 'w-full';
      default: return 'max-w-md';
    }
  };

  const getImageAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'left': return 'mr-auto';
      case 'right': return 'ml-auto';
      case 'center': return 'mx-auto';
      default: return 'mx-auto';
    }
  };

  switch (block.type) {
    case 'paragraph':
      return (
        <div className="prose-paragraph mb-4">
          <p className="text-gray-800 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case 'image':
      if (!block.url) return null;
      
      return (
        <figure className="prose-image mb-6 mx-auto">
          <Image
            src={block.url}
            alt={block.alt || ''}
            width={800}
            height={600}
            className="rounded-lg shadow-sm w-full h-auto"
          />
        </figure>
      );

    case 'gallery':
      if (!block.images || block.images.length === 0) return null;
      
      return (
        <div className="prose-gallery mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {block.images.map((image, index) => (
              <figure key={index}>
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-sm w-full h-auto"
                />
              </figure>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default function StructuredContentRenderer({ 
  content, 
  className = '' 
}: StructuredContentRendererProps) {
  if (!content || !content.blocks || content.blocks.length === 0) {
    return (
      <div className={`structured-content-empty ${className}`}>
        <p className="text-gray-500 text-center py-8">
          No content available
        </p>
      </div>
    );
  }

  return (
    <article className={`structured-content prose max-w-none ${className}`}>
      {content.blocks.map((block) => (
        <ContentBlockRenderer key={block.id} block={block} />
      ))}
    </article>
  );
}

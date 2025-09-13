'use client';

import React, { useState, useCallback } from 'react';
import { 
  Plus, 
  Type, 
  Image, 
  Video, 
  List, 
  Quote, 
  Minus, 
  GripVertical, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Images,
  Separator
} from 'lucide-react';
// Simple UUID generator
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
import type { ContentBlock, StructuredContent, ContentBlockTemplate } from '@/types/content';
import MediaUploader from './MediaUploader';
import type { MediaRecord } from '@/types';

interface StructuredContentEditorProps {
  initialContent?: StructuredContent;
  onContentChange?: (content: StructuredContent) => void;
  className?: string;
}

// Block templates for the add menu
const blockTemplates: ContentBlockTemplate[] = [
  {
    type: 'paragraph',
    label: 'Paragraph',
    icon: 'Type',
    description: 'Add a paragraph of text',
    defaultData: { content: '' }
  },
  {
    type: 'image',
    label: 'Image',
    icon: 'Image',
    description: 'Add a single image',
    defaultData: { url: '', alt: '' }
  },
  {
    type: 'gallery',
    label: 'Gallery',
    icon: 'Images',
    description: 'Add multiple images',
    defaultData: { images: [] }
  }
];

export default function StructuredContentEditor({
  initialContent,
  onContentChange,
  className = ''
}: StructuredContentEditorProps) {
  const [content, setContent] = useState<StructuredContent>(
    initialContent || {
      blocks: [],
      version: '1.0',
      created_at: new Date(),
      updated_at: new Date()
    }
  );

  const [showAddMenu, setShowAddMenu] = useState<number | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);

  const updateContent = useCallback((newContent: StructuredContent) => {
    const updatedContent = {
      ...newContent,
      updated_at: new Date()
    };
    setContent(updatedContent);
    onContentChange?.(updatedContent);
  }, [onContentChange]);

  const addBlock = (type: string, afterIndex: number = -1) => {
    const template = blockTemplates.find(t => t.type === type);
    if (!template) return;

    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      ...template.defaultData
    } as ContentBlock;

    const newBlocks = [...content.blocks];
    const insertIndex = afterIndex + 1;
    newBlocks.splice(insertIndex, 0, newBlock);

    updateContent({
      ...content,
      blocks: newBlocks
    });

    setShowAddMenu(null);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...content.blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    
    updateContent({
      ...content,
      blocks: newBlocks
    });
  };

  const removeBlock = (index: number) => {
    const newBlocks = content.blocks.filter((_, i) => i !== index);
    updateContent({
      ...content,
      blocks: newBlocks
    });
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...content.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    
    updateContent({
      ...content,
      blocks: newBlocks
    });
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <textarea
            value={block.content || ''}
            onChange={(e) => updateBlock(index, { content: e.target.value })}
            placeholder="Enter paragraph text..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        );

      case 'image':
        return (
          <div className="space-y-3">
            {!block.url ? (
              <MediaUploader
                onUploadComplete={(media: MediaRecord) => {
                  updateBlock(index, {
                    url: media.secure_url,
                    alt: media.original_filename
                  });
                }}
                folder="news-content"
                tags={['news', 'content']}
                accept="image/*"
                buttonText="Upload Image"
              />
            ) : (
              <div className="space-y-2">
                <img
                  src={block.url}
                  alt={block.alt || ''}
                  className="max-w-full h-auto rounded border"
                  style={{ maxHeight: '300px' }}
                />
                <button
                  onClick={() => updateBlock(index, { url: '', alt: '' })}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}
            
            <input
              type="text"
              value={block.alt || ''}
              onChange={(e) => updateBlock(index, { alt: e.target.value })}
              placeholder="Alt text..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(block.images || []).map((image, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={image.url}
                    alt={image.alt || ''}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    onClick={() => {
                      const newImages = (block.images || []).filter((_, i) => i !== imgIndex);
                      updateBlock(index, { images: newImages });
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <MediaUploader
              onUploadComplete={(media: MediaRecord) => {
                const newImage = {
                  url: media.secure_url,
                  alt: media.original_filename
                };
                const currentImages = block.images || [];
                updateBlock(index, { images: [...currentImages, newImage] });
              }}
              folder="news-content"
              tags={['news', 'gallery']}
              accept="image/*"
              buttonText="Add Image to Gallery"
            />
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-100 rounded text-center text-gray-500">
            Block type "{block.type}" not implemented
          </div>
        );
    }
  };

  return (
    <div className={`structured-content-editor ${className}`}>
      <div className="space-y-4">
        {content.blocks.map((block, index) => (
          <div key={block.id} className="relative group">
            {/* Block Container */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white hover:border-gray-300 transition-colors">
              {/* Block Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {block.type}
                  </span>
                </div>
                <button
                  onClick={() => removeBlock(index)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  title="Remove block"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              {/* Block Editor */}
              {renderBlockEditor(block, index)}
            </div>

            {/* Add Block Button */}
            <div className="flex justify-center mt-2">
              <div className="relative">
                <button
                  onClick={() => setShowAddMenu(showAddMenu === index ? null : index)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-full border border-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Block</span>
                </button>

                {/* Add Block Menu */}
                {showAddMenu === index && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      {blockTemplates.map((template) => (
                        <button
                          key={template.type}
                          onClick={() => addBlock(template.type, index)}
                          className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded"
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            {template.type === 'paragraph' && <Type className="w-4 h-4" />}
                            {template.type === 'image' && <Image className="w-4 h-4" />}
                            {template.type === 'gallery' && <Images className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{template.label}</div>
                            <div className="text-xs text-gray-500">{template.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Initial Add Block (when no blocks exist) */}
        {content.blocks.length === 0 && (
          <div className="text-center py-12">
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(-1)}
                className="inline-flex items-center space-x-2 px-6 py-3 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Block</span>
              </button>

              {showAddMenu === -1 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {blockTemplates.map((template) => (
                      <button
                        key={template.type}
                        onClick={() => addBlock(template.type, -1)}
                        className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          {template.type === 'paragraph' && <Type className="w-4 h-4" />}
                          {template.type === 'image' && <Image className="w-4 h-4" />}
                          {template.type === 'gallery' && <Images className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{template.label}</div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showAddMenu !== null && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowAddMenu(null)}
        />
      )}
    </div>
  );
}

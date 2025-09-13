// Structured content types for news articles

export interface BaseContentBlock {
  id: string; // Unique identifier for each block
  type: string;
}

export interface ParagraphBlock extends BaseContentBlock {
  type: 'paragraph';
  content: string; // Plain text or simple HTML (bold, italic, etc.)
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface HeadingBlock extends BaseContentBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large' | 'full';
}

export interface GalleryBlock extends BaseContentBlock {
  type: 'gallery';
  images: {
    url: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }[];
  layout?: 'grid' | 'carousel' | 'masonry';
  columns?: number;
}

export interface VideoBlock extends BaseContentBlock {
  type: 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
  autoplay?: boolean;
  controls?: boolean;
}

export interface ListBlock extends BaseContentBlock {
  type: 'list';
  listType: 'ordered' | 'unordered';
  items: string[];
}

export interface QuoteBlock extends BaseContentBlock {
  type: 'quote';
  content: string;
  author?: string;
  source?: string;
}

export interface DividerBlock extends BaseContentBlock {
  type: 'divider';
  style?: 'line' | 'dots' | 'asterisks';
}

export interface EmbedBlock extends BaseContentBlock {
  type: 'embed';
  embedType: 'youtube' | 'twitter' | 'instagram' | 'custom';
  url: string;
  embedCode?: string;
}

// Union type for all content blocks
export type ContentBlock = 
  | ParagraphBlock 
  | HeadingBlock 
  | ImageBlock 
  | GalleryBlock 
  | VideoBlock 
  | ListBlock 
  | QuoteBlock 
  | DividerBlock 
  | EmbedBlock;

// Main structured content type
export interface StructuredContent {
  blocks: ContentBlock[];
  version: string; // For content migration/compatibility
  created_at: Date;
  updated_at: Date;
}

// Helper types for the editor
export interface ContentBlockTemplate {
  type: string;
  label: string;
  icon: string;
  description: string;
  defaultData: Partial<ContentBlock>;
}

// Content validation types
export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}


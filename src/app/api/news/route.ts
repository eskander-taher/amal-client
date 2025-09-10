import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import type { MediaRecord } from '@/types';

// News schema with media support
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: [{
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
    original_filename: { type: String, required: true },
    format: { type: String, required: true },
    resource_type: { 
      type: String, 
      enum: ['image', 'video', 'raw', 'auto'], 
      required: true 
    },
    width: Number,
    height: Number,
    bytes: { type: Number, required: true },
    folder: String,
    tags: [String],
    created_at: { type: Date, default: Date.now },
  }],
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

// Create or get the model
const News = mongoose.models.News || mongoose.model('News', NewsSchema);

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      title,
      description,
      content,
      media = [], // Array of MediaRecord objects from Cloudinary
      author,
      category,
      tags = [],
      featured = false,
      published = true,
    } = body;

    // Validate required fields
    if (!title || !description || !content || !author || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, content, author, category' },
        { status: 400 }
      );
    }

    // Validate media array structure
    if (media.length > 0) {
      for (const mediaItem of media) {
        if (!mediaItem.public_id || !mediaItem.secure_url || !mediaItem.resource_type) {
          return NextResponse.json(
            { error: 'Invalid media format. Each media item must have public_id, secure_url, and resource_type' },
            { status: 400 }
          );
        }
      }
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let slugExists = await News.findOne({ slug });
    let counter = 1;
    
    while (slugExists) {
      slug = `${generateSlug(title)}-${counter}`;
      slugExists = await News.findOne({ slug });
      counter++;
    }

    // Process media array to ensure proper format
    const processedMedia: MediaRecord[] = media.map((item: any) => ({
      public_id: item.public_id,
      secure_url: item.secure_url,
      original_filename: item.original_filename || 'unknown',
      format: item.format || 'unknown',
      resource_type: item.resource_type,
      width: item.width,
      height: item.height,
      bytes: item.bytes || 0,
      folder: item.folder,
      tags: Array.isArray(item.tags) ? item.tags : [],
      created_at: new Date(),
    }));

    // Create news article
    const newsArticle = new News({
      title,
      description,
      content,
      media: processedMedia,
      author,
      category,
      tags: Array.isArray(tags) ? tags : [],
      featured,
      published,
      publishedAt: published ? new Date() : null,
      slug,
    });

    const savedArticle = await newsArticle.save();

    return NextResponse.json({
      message: 'News article created successfully',
      data: savedArticle,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating news article:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof mongoose.Error.MongooseError && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const published = searchParams.get('published') !== 'false'; // Default to true

    // Build query
    const query: any = { published };
    if (category) query.category = category;
    if (featured) query.featured = true;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get articles with pagination
    const articles = await News.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await News.countDocuments(query);

    return NextResponse.json({
      data: articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

// GET - Fetch all news
export async function GET() {
  try {
    await dbConnect();
    
    const news = await News.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST - Create new news
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title, description, image } = body;

    // Validate required fields
    if (!title || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, image' },
        { status: 400 }
      );
    }

    // Create news article
    const newsArticle = new News({
      title,
      description,
      image,
    });

    const savedArticle = await newsArticle.save();

    return NextResponse.json({
      success: true,
      message: 'News article created successfully',
      data: savedArticle,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}

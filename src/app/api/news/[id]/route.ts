import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import News from '@/models/News';

// GET - Fetch single news item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    const newsItem = await News.findById(id).lean();

    if (!newsItem) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newsItem,
    });
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news article' },
      { status: 500 }
    );
  }
}

// PUT - Update news item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, image } = body;

    // Validate required fields
    if (!title || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, image' },
        { status: 400 }
      );
    }

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News article updated successfully',
      data: updatedNews,
    });

  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news article' },
      { status: 500 }
    );
  }
}

// DELETE - Delete news item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json(
        { success: false, error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news article' },
      { status: 500 }
    );
  }
}

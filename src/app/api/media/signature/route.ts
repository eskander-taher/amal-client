import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import type { CloudinarySignatureResponse } from '@/types';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { folder, tags, eager, transformation } = body;

    // Generate timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Build upload parameters
    const params: Record<string, any> = {
      timestamp,
    };

    // Add optional parameters
    if (folder) params.folder = folder;
    if (tags && Array.isArray(tags)) params.tags = tags.join(',');
    if (eager) params.eager = eager;
    if (transformation) params.transformation = transformation;

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!);

    const response: CloudinarySignatureResponse = {
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY!,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}

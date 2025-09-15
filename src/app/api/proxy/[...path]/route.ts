import { NextRequest, NextResponse } from 'next/server';

const SERVER_URL = 'http://91.200.84.227'; // Your VPS server (nginx handles port routing)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join('/');
  const searchParams = request.nextUrl.searchParams;
  
  try {
    const response = await fetch(`${SERVER_URL}/${path}?${searchParams}`, {
      method: 'GET',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join('/');
  
  try {
    // Get the content type to determine how to handle the body
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    let headers: Record<string, string> = {
      'Authorization': request.headers.get('Authorization') || '',
    };
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (for file uploads)
      body = await request.formData();
      // Don't set Content-Type header, let fetch set it with boundary
    } else {
      // Handle JSON
      body = JSON.stringify(await request.json());
      headers = { ...headers, 'Content-Type': 'application/json' };
    }

    const response = await fetch(`${SERVER_URL}/${path}`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('POST proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join('/');
  
  try {
    // Get the content type to determine how to handle the body
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    let headers: Record<string, string> = {
      'Authorization': request.headers.get('Authorization') || '',
    };
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (for file uploads)
      body = await request.formData();
      // Don't set Content-Type header, let fetch set it with boundary
    } else {
      // Handle JSON
      body = JSON.stringify(await request.json());
      headers = { ...headers, 'Content-Type': 'application/json' };
    }

    const response = await fetch(`${SERVER_URL}/${path}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('PUT proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await params;
  const path = pathArray.join('/');
  
  try {
    const response = await fetch(`${SERVER_URL}/${path}`, {
      method: 'DELETE',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

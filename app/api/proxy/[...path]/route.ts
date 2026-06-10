import { NextRequest, NextResponse } from 'next/server';

// Use env var so local dev hits localhost and production hits 127.0.0.1
// Set BACKEND_URL=http://localhost:8000 in .env.local for local dev
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathString = path.join('/');
  const url = `${BACKEND_URL}/${pathString}`;

  console.log(`[PROXY GET] ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`[PROXY GET] Status: ${response.status}`);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      // Return as-is for non-JSON responses (like file downloads)
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: response.headers,
      });
    }
  } catch (error: any) {
    console.error('[PROXY GET] Error:', error.message);
    return NextResponse.json(
      { error: `Proxy request failed: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathString = path.join('/');
  const url = `${BACKEND_URL}/${pathString}`;

  console.log(`[PROXY POST] ${url}`);

  try {
    const formData = await request.formData();
    console.log(`[PROXY POST] FormData keys:`, Array.from(formData.keys()));

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log(`[PROXY POST] Status: ${response.status}`);

    // Try to parse as JSON
    const text = await response.text();
    console.log(`[PROXY POST] Response:`, text.substring(0, 200));

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      // Not JSON, return as text
      return new NextResponse(text, {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error: any) {
    console.error('[PROXY POST] Error:', error.message, error.stack);
    return NextResponse.json(
      { error: `Proxy request failed: ${error.message}` },
      { status: 500 }
    );
  }
}

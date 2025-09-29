import { NextRequest, NextResponse } from 'next/server';
import { post } from '@/lib/api';
import { requireSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await requireSession();
    const body = await request.json();
    
    const response = await post('/jobs', body, undefined);
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { message: 'Failed to create job' },
      { status: 500 }
    );
  }
} 
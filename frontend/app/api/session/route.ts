import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = getSession(cookieStore);
    
    if (!session) {
      return NextResponse.json({ authenticated: false });
    }
    
    return NextResponse.json({
      authenticated: true,
      user: session,
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
} 
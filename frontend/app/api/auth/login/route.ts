import { NextRequest, NextResponse } from 'next/server';
import { post } from '@/lib/api';
import { createToken } from '@/lib/auth';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Authenticate with FastAPI
    const authResponse = await post<AuthResponse>('/auth/login', { email, password });
    
    // Create JWT token for our app
    const token = createToken({
      id: authResponse.user.id,
      email: authResponse.user.email,
      role: authResponse.user.role,
    });

    // Set httpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    );
  }
} 
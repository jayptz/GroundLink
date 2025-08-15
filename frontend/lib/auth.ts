import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { post } from './api';

export interface Session {
  id: string;
  role: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Session management
export function getSession(cookies: Awaited<ReturnType<typeof import('next/headers').cookies>>): Session | null {
  try {
    const token = cookies.get('jwt')?.value;
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET) as Session;
    return decoded;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const cookieStore = await cookies();
  const session = getSession(cookieStore);
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

// Token management
export function createToken(payload: Session): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): Session | null {
  try {
    return jwt.verify(token, JWT_SECRET) as Session;
  } catch {
    return null;
  }
}

// Authentication operations
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse | null> {
  try {
    const response = await post<AuthResponse>('/auth/login', credentials);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    // Call logout endpoint if available
    await post('/auth/logout', {});
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
}

export async function validateSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    
    if (!token) {
      return null;
    }
    
    const session = verifyToken(token);
    if (!session) {
      return null;
    }
    
    // Optionally validate with backend
    try {
      await post('/auth/validate', {}, token);
      return session;
    } catch {
      return null;
    }
  } catch (error) {
    console.error('Session validation failed:', error);
    return null;
  }
}

// Authentication state helpers
export function isAuthenticated(session: Session | null): boolean {
  return session !== null;
}

export function hasRole(session: Session | null, role: string): boolean {
  return session?.role === role;
}

export function isSupervisor(session: Session | null): boolean {
  return hasRole(session, 'supervisor');
}

export function isWorker(session: Session | null): boolean {
  return hasRole(session, 'worker');
} 
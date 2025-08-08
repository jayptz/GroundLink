import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export interface Session {
  id: string;
  role: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
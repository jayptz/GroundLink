'use client';

import Link from 'next/link';
import { Session } from '@/lib/auth';

interface NavigationProps {
  session: Session | null;
}

export default function Navigation({ session }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            GroundLink
          </Link>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600">
                  {session.role} • {session.email}
                </span>
                <Link 
                  href="/dashboard" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/jobs" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Jobs
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button 
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
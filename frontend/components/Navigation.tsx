'use client';
import Link from 'next/link';
import { Session } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Home, Briefcase, Github } from 'lucide-react';
import { Dock, DockIcon } from "@/components/ui/dock";

interface NavigationProps {
  session: Session | null;
}

export default function Navigation({ session }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // Show "GroundLink" for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Show dock after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Transparent Navbar - Only after loading */}
      {isLoaded && (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10 transition-all duration-1000 ease-in-out">
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo - Top Left */}
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-600 transition-colors">
              Ground<span className='text-orange-400'>Link</span>
            </Link>
            
            {/* GitHub Icon - Top Right */}
            <a 
              href="https://github.com/jayptz/groundlink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-blue-600 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </nav>
      )}

      {/* Magic UI Dock - Only shows when scrolled */}
      {isScrolled && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
          <Dock className="bg-black/80 backdrop-blur-md border border-gray-700/50">
          <DockIcon>
            <Link href="/" className="flex items-center justify-center w-full h-full">
              <Home className="w-5 h-5 text-white" />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href="/dashboard" className="flex items-center justify-center w-full h-full">
              <Briefcase className="w-5 h-5 text-white" />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href="/jobs" className="flex items-center justify-center w-full h-full">
              <Briefcase className="w-5 h-5 text-white" />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href="/login" className="flex items-center justify-center w-full h-full">
              <User className="w-5 h-5 text-white" />
            </Link>
          </DockIcon>
          </Dock>
        </div>
      )}
    </>
  );
}
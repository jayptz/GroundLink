'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import LightRays from '@/components/LightRays';
import { ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // Show "GroundLink" for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-black relative">
      {!isLoaded ? (
        /* Loading State - Just GroundLink */
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-6xl font-bold text-white animate-in">
            Ground<span className='text-gray-400'>Link</span>
          </div>
        </div>
      ) : (
        /* Main content - centered */
        <div className="fixed bottom-4 left-4 z-50 transition-all duration-1000 ease-in-out">
          <div className="text-left duration-1000">
            <h1 className="text-4xl font-bold text-white mb-4">
            </h1>
          </div>
        </div>
      )}
      
      {/* GroundLink - Bottom Right (only after loading) */}
      {isLoaded && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              <span className="text-blue-600">Ground</span><span className="text-orange-400">Link</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              AI <span className='text-blue-600'>agent</span> for around the <span className='text-orange-400'>House</span> and <br/> <span className="text-orange-400">Construction</span> needs .
            </p>
            <Link href='\login' className="">
            <InteractiveHoverButton className=''>Sign up</InteractiveHoverButton>
            </Link>
          </div>
        </div>
      )}

      {/* Scroll Down Indicator */}
      {isLoaded && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors cursor-pointer" />
        </div>
      )}
    </div>
  );
}

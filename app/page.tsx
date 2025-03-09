'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <Image 
            src="/logo.png" 
            alt="WannaBook" 
            width={300} 
            height={40} 
            priority
            className="mx-auto"
          />
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <p className="text-gray-600">
            Sign in to manage finances
          </p>
        </div>

        {/* Action Button */}
        <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <Link 
              href="/api/auth/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign In
            </Link>
        </div>
      </div>
    </div>
  );
}

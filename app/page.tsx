'use client';

import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

interface UserResponse {
  isAuthenticated: boolean;
  user?: {
    name?: string;
    email?: string;
  };
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, isLoading } = useSWR<UserResponse>('/api/auth/me', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 60000,
    keepPreviousData: true
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8">
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
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const isAuthenticated = data?.isAuthenticated ?? false;
  const userName = data?.user?.name;

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
          <h2 className="text-2xl text-gray-700 mb-2">
            {isAuthenticated 
              ? `Welcome back, ${userName || 'User'}!`
              : 'Welcome to WannaBook'}
          </h2>
          <p className="text-gray-600">
            {isAuthenticated 
              ? 'Manage your bookings and schedule'
              : 'Sign in to manage your bookings'}
          </p>
        </div>

        {/* Action Button */}
        <div>
          {isAuthenticated ? (
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link 
              href="/api/auth/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

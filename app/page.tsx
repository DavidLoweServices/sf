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
  const { data } = useSWR<UserResponse>('/api/auth/me', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 60000,
    keepPreviousData: true
  });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
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
            {data?.isAuthenticated 
              ? `Welcome back, ${data.user?.name || 'User'}!`
              : 'Welcome to WannaBook'}
          </h2>
          <p className="text-gray-600">
            {data?.isAuthenticated 
              ? 'Manage your finances'
              : 'Sign in to manage your finances'}
          </p>
        </div>

        {/* Action Button */}
        <div>
          {data?.isAuthenticated ? (
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

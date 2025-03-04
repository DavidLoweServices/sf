"use client";

import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

interface User {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface UserResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UserProfileButton() {
  const { data, error, isLoading } = useSWR<UserResponse>('/api/auth/me', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (isLoading) {
    return (
      <div className="p-3 border-t border-gray-200 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-2 w-32 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.isAuthenticated || !data?.user) {
    return (
      <div className="p-3 border-t border-gray-200">
        <Link 
          href="/api/auth/login?returnTo=/dashboard"
          className="flex items-center space-x-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-2 rounded-md"
        >
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            ?
          </div>
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  const userData = data.user;
  // Generate initials for avatar fallback
  const initials = userData.name 
    ? userData.name.charAt(0).toUpperCase() 
    : userData.email 
      ? userData.email.charAt(0).toUpperCase()
      : '?';

  return (
    <div className="p-3 border-t border-gray-200">
      <Link href="/dashboard/profile" className="block">
        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
          {userData.picture ? (
            <Image 
              width={36}
              height={36}
              src={userData.picture} 
              alt={userData.name || 'User'} 
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userData.name || 'User'}
            </p>
            {userData.email && (
              <p className="text-xs text-gray-500 truncate">
                {userData.email}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
} 
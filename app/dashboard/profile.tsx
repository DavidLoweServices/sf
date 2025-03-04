'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  nickname?: string;
  updated_at?: string;
  email_verified?: boolean;
}

interface UserResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        setUserResponse(data);
        
        if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch user profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserProfile();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Profile</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-600">Loading profile information...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : !userResponse?.isAuthenticated || !userResponse?.user ? (
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <h2 className="text-lg font-medium text-yellow-800 mb-3">You are not logged in</h2>
            <p className="text-yellow-700 mb-4">Please log in to view your profile information.</p>
            <Link 
              href="/api/auth/login?returnTo=/dashboard/profile"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col items-center text-center mb-5">
                  {userResponse.user.picture ? (
                    <Image 
                      src={userResponse.user.picture} 
                      alt={userResponse.user.name || 'User'} 
                      width={100}
                      height={100}
                      className="rounded-full border-2 border-gray-200 mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                      <span className="text-2xl text-gray-600">
                        {userResponse.user.name?.charAt(0) || userResponse.user.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold">{userResponse.user.name || 'Anonymous User'}</h2>
                  <p className="text-gray-600 mb-1">{userResponse.user.email || 'No email provided'}</p>
                  {userResponse.user.nickname && (
                    <p className="text-gray-500 text-sm">@{userResponse.user.nickname}</p>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <Link 
                    href="/api/auth/logout?returnTo=/"
                    className="w-full block text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Account Details */}
            <div className="md:col-span-2">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-5">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Account Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                    <span className="text-gray-600">User ID</span>
                    <span className="font-mono text-sm truncate">{userResponse.user.sub}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Email</span>
                    <span>{userResponse.user.email || 'Not provided'}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Email Verified</span>
                    <span>
                      {userResponse.user.email_verified === true ? (
                        <span className="text-green-600">Yes ✓</span>
                      ) : (
                        <span className="text-red-600">No ✗</span>
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Last Updated</span>
                    <span>
                      {userResponse.user.updated_at ? (
                        new Date(userResponse.user.updated_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                      ) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Raw Profile Data for Debugging */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Complete Profile Data</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px] text-xs">
                  {JSON.stringify(userResponse.user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 
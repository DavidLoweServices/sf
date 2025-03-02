'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const user = userResponse?.user;
  
  return (
    <div>
      {user ? (
        <div>
          <div className="flex items-center gap-4 mb-4">
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name || 'User'} 
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{user.name || 'Anonymous User'}</h2>
              <p className="text-gray-600">{user.email || 'No email provided'}</p>
            </div>
          </div>
          <Link 
            href="/api/auth/logout?returnTo=/"
            className="text-blue-600 hover:underline"
          >
            Logout
          </Link>
        </div>
      ) : (
        <Link 
          href="/api/auth/login?returnTo=/dashboard"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      )}
    </div>
  );
} 
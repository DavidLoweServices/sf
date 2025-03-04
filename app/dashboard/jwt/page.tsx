'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface JwtHeader {
  alg: string;
  typ: string;
  kid?: string;
}

interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
}

interface TokenData {
  idToken?: string;
  accessToken?: string;
  decodedIdToken?: DecodedJwt;
  decodedAccessToken?: DecodedJwt;
  error?: string;
}

export default function JwtDebugPage() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to decode a JWT without verification
  const decodeJwt = (token: string): DecodedJwt | undefined => {
    try {
      if (!token) return undefined;
      
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.warn('Invalid token format (not 3 parts):', parts.length);
        return undefined;
      }
      
      // Parse the base64-encoded parts
      const headerBase64 = parts[0];
      const payloadBase64 = parts[1];
      
      // Base64 decode (accounting for URL-safe base64)
      const parseBase64 = (str: string) => {
        try {
          // Add padding if needed (important for base64 decoding)
          const padded = str.padEnd(str.length + (4 - str.length % 4) % 4, '=');
          // Handle URL-safe base64 characters
          const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
          // Decode
          return atob(base64);
        } catch (e) {
          console.error('Base64 decode error:', e);
          return '{}';
        }
      };
      
      // Parse JSON after decoding
      const parseJsonSafely = (str: string) => {
        try {
          return JSON.parse(str);
        } catch (e) {
          console.error('JSON parse error:', e);
          return {};
        }
      };
      
      return {
        header: parseJsonSafely(parseBase64(headerBase64)) as JwtHeader,
        payload: parseJsonSafely(parseBase64(payloadBase64)) as JwtPayload
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return undefined;
    }
  };

  useEffect(() => {
    async function fetchTokenData() {
      try {
        // First try with debug=true
        const response = await fetch('/api/auth/me?debug=true');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        if (!data.isAuthenticated) {
          setTokenData({ error: 'Not authenticated' });
          return;
        }
        
        if (!data.tokens) {
          setTokenData({ error: 'No tokens found in response' });
          return;
        }
        
        // Decode tokens
        const result: TokenData = {
          idToken: data.tokens.idToken,
          accessToken: data.tokens.accessToken,
        };
        
        if (data.tokens.idToken) {
          result.decodedIdToken = decodeJwt(data.tokens.idToken);
        }
        
        if (data.tokens.accessToken) {
          result.decodedAccessToken = decodeJwt(data.tokens.accessToken);
        }
        
        setTokenData(result);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setTokenData({ error: error instanceof Error ? error.message : 'Unknown error' });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTokenData();
  }, []);

  const formatJson = (obj: JwtHeader | JwtPayload | Record<string, unknown>) => {
    if (!obj) return '{}';
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return '{}';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">JWT Debug</h1>
        
        {isLoading ? (
          <div>Loading token data...</div>
        ) : tokenData?.error ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
            {tokenData.error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* ID Token Section */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-3 text-gray-800">ID Token</h2>
              
              {tokenData?.idToken ? (
                <>
                  <div className="mb-4">
                    <h3 className="text-base font-medium mb-2 text-gray-700">Raw Token</h3>
                    <div className="bg-gray-100 p-3 rounded overflow-auto max-h-40 text-xs font-mono text-black">
                      {tokenData.idToken}
                    </div>
                  </div>
                  
                  {tokenData.decodedIdToken && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-base font-medium mb-2 text-gray-700">Header</h3>
                        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40 text-xs text-black">
                          {formatJson(tokenData.decodedIdToken.header)}
                        </pre>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2 text-gray-700">Payload</h3>
                        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 text-xs text-black">
                          {formatJson(tokenData.decodedIdToken.payload)}
                        </pre>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-600">No ID token available</div>
              )}
            </div>
            
            {/* Access Token Section */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-3 text-gray-800">Access Token</h2>
              
              {tokenData?.accessToken ? (
                <>
                  <div className="mb-4">
                    <h3 className="text-base font-medium mb-2 text-gray-700">Raw Token</h3>
                    <div className="bg-gray-100 p-3 rounded overflow-auto max-h-40 text-xs font-mono text-black">
                      {tokenData.accessToken}
                    </div>
                  </div>
                  
                  {tokenData.decodedAccessToken && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-base font-medium mb-2 text-gray-700">Header</h3>
                        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40 text-xs text-black">
                          {formatJson(tokenData.decodedAccessToken.header)}
                        </pre>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2 text-gray-700">Payload</h3>
                        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 text-xs text-black">
                          {formatJson(tokenData.decodedAccessToken.payload)}
                        </pre>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-600">No access token available</div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 
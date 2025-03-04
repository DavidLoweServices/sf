/**
 * Utility for making authenticated fetch requests to external APIs
 * Automatically handles JWT retrieval and adds authorization headers
 */

// Cache the JWT token to avoid multiple API calls
let cachedJwt: string | null = null;
let jwtExpiration: number | null = null;

/**
 * Fetches the JWT token from the authentication API
 * @returns Promise with the JWT token
 */
async function getJwtToken(): Promise<string> {
  // If we have a cached token that's not expired, use it
  const now = Date.now();
  if (cachedJwt && jwtExpiration && now < jwtExpiration) {
    return cachedJwt;
  }

  // Otherwise, fetch a new token
  try {
    const response = await fetch('/api/auth/me?debug=true');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch authentication: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.isAuthenticated) {
      throw new Error('Not authenticated');
    }
    
    // Try to get a token from various possible locations
    let token: string | null = null;
    
    if (data.tokens?.accessToken) {
      token = data.tokens.accessToken;
    } else if (data.tokens?.idToken) {
      token = data.tokens.idToken;
    } else if (data.jwt) {
      token = data.jwt;
    }
    
    if (!token) {
      throw new Error('No JWT token found in the authentication response');
    }
    
    // Cache the token
    cachedJwt = token;
    
    // Set expiration (default to 1 hour if we can't determine it)
    try {
      // Try to decode the token to get the expiration time
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        // exp is in seconds, convert to milliseconds and subtract 5 minutes as buffer
        jwtExpiration = payload.exp * 1000 - 5 * 60 * 1000;
      } else {
        // Default to 1 hour expiration
        jwtExpiration = now + 60 * 60 * 1000;
      }
    } catch (e) {
      // If decoding fails, default to 1 hour expiration
      jwtExpiration = now + 60 * 60 * 1000;
    }
    
    return token;
  } catch (error) {
    // Clear the cache on error
    cachedJwt = null;
    jwtExpiration = null;
    throw error;
  }
}

/**
 * Makes an authenticated fetch request to an API
 * @param url The URL to fetch
 * @param options Optional fetch options
 * @returns Promise with the fetch response
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    const jwt = await getJwtToken();
    
    // Add authorization header
    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${jwt}`);
    
    // Make the authenticated request
    return fetch(url, {
      ...options,
      headers
    });
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

/**
 * Clears the JWT token cache
 * Call this when logging out or when the token needs to be refreshed
 */
export function clearAuthCache(): void {
  cachedJwt = null;
  jwtExpiration = null;
} 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the current path
  const { pathname } = request.nextUrl;
  
  // Skip middleware for Auth0 API routes to prevent redirect loops
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  
  // Check if the user has an Auth0 session cookie
  const hasAuthSession = request.cookies.has('appSession');
  
  // If accessing dashboard without authentication, redirect to Auth0 login
  if (!hasAuthSession) {
    // Get the current URL to redirect back after login
    const returnTo = encodeURIComponent(request.url);
    
    // Redirect to Auth0 login
    return NextResponse.redirect(new URL(`/api/auth/login?returnTo=${returnTo}`, request.url));
  }
  
  // User is authenticated, allow access
  return NextResponse.next();
}

// Only run middleware on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', "/"],
}; 
import { handleAuth } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

// Modified to work with NextJS App Router and Auth0
export async function GET(req: NextRequest) {
  try {
    // Create the Auth0 handler
    const auth0Handler = handleAuth();
    
    // Extract the auth0 param from the URL path
    const url = new URL(req.url);
    const pathname = url.pathname;
    const param = pathname.replace('/api/auth/', '');
    
    // Match the route to the appropriate Auth0 handler
    if (param === 'login') {
      const loginUrl = `${url.origin}/api/auth/callback`;
      const returnTo = url.searchParams.get('returnTo') || '/dashboard';
      
      // Redirect to Auth0 login with API audience
      return NextResponse.redirect(
        `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
        `response_type=code&` +
        `client_id=${process.env.AUTH0_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(loginUrl)}&` +
        `scope=openid profile email&` +
        `audience=${encodeURIComponent('https://bmx/api')}&` +
        `state=${encodeURIComponent(JSON.stringify({ returnTo }))}`
      );
    } 
    else if (param === 'callback') {
      // For the callback, we'll use the Auth0 SDK directly
      try {
        return auth0Handler(req);
      } catch (error) {
        console.error('Auth0 callback error:', error);
        return NextResponse.redirect(new URL('/api/auth-debug?error=callback_error', req.url));
      }
    } 
    else if (param === 'logout') {
      // Handle logout
      const returnTo = url.searchParams.get('returnTo') || '/';
      return NextResponse.redirect(
        `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
        `client_id=${process.env.AUTH0_CLIENT_ID}&` +
        `returnTo=${encodeURIComponent(`${url.origin}${returnTo}`)}`
      );
    } 
    
    // Default to letting Auth0 handle it
    return auth0Handler(req);
  } catch (error) {
    console.error('Auth0 route error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Also handle POST requests
export async function POST(req: NextRequest) {
  // Just use the GET handler for simplicity
  return GET(req);
}
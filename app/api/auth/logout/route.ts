import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const returnTo = url.searchParams.get('returnTo') || '/';
    
    // Create response that redirects to Auth0 logout
    const response = NextResponse.redirect(
      `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
      `client_id=${process.env.AUTH0_CLIENT_ID}&` +
      `returnTo=${encodeURIComponent(`${url.origin}${returnTo}`)}`
    );
    
    // Clear the session cookie
    response.cookies.set('appSession', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'lax',
    });
    
    // Also clear the venue selection cookie
    response.cookies.set('selectedVenue', '', {
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    // If logout fails, at least clear the cookie and redirect
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('appSession', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'lax',
    });
    
    // Also clear the venue selection cookie in the error case
    response.cookies.set('selectedVenue', '', {
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return response;
  }
} 
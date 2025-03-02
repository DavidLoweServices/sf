import { NextRequest, NextResponse } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

// PKCE callback handler
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    
    // Extract code and state from query parameters
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!code) {
      throw new Error('No code parameter received');
    }
    
    // Parse the state to get returnTo
    const stateObj = state ? JSON.parse(decodeURIComponent(state)) : { returnTo: '/dashboard' };
    const returnTo = stateObj.returnTo || '/dashboard';
    
    // Exchange code for tokens
    const tokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        code,
        redirect_uri: `${url.origin}/api/auth/callback`,
      }).toString(),
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error || 'Unknown error'}`);
    }
    
    const tokens = await tokenResponse.json();
    
    // Create our session cookie
    const response = NextResponse.redirect(new URL(returnTo, url.origin));
    
    // Store the session data as JSON
    const sessionData = {
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    };
    
    // Set secure HTTP-only cookie with session data
    response.cookies.set('appSession', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
    });
    
    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    
    // Redirect to home with error message
    const errorMessage = encodeURIComponent((error instanceof Error) ? error.message : 'Unknown error');
    return NextResponse.redirect(new URL(`/?error=${errorMessage}`, req.url));
  }
} 
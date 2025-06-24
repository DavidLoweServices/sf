import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = req.cookies.get('appSession');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
    
    // Parse the session data
    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch {
      // Backward compatibility for old format (just the ID token)
      sessionData = { idToken: sessionCookie.value };
    }
    
    // Get the ID token
    const idToken = sessionData.idToken;
    if (!idToken) {
      throw new Error('No ID token found in session');
    }
    
    // Simple decode of JWT without verification (for basic profile info)
    // In production, you should verify the token signature
    const tokenParts = idToken.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    // Decode the payload
    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    
    // Check if this is a debug request
    const url = new URL(req.url);
    const debug = url.searchParams.get('debug') === 'true';
    
    // Return user profile info and token info
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
      tokens: {
        // Always include access token (needed for API calls)
        accessToken: sessionData.accessToken,
        // Only include ID token in debug mode (for security)
        ...(debug ? {
          idToken: sessionData.idToken,
        } : {}),
        expiresAt: sessionData.expiresAt,
      }
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
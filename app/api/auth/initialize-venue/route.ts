import { NextRequest, NextResponse } from 'next/server';

// Function to decode JWT token
const decodeJwt = (token: string) => {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid token format (not 3 parts):', parts.length);
      return null;
    }
    
    // Parse the base64-encoded parts
    const payloadBase64 = parts[1];
    
    // Base64 decode (accounting for URL-safe base64)
    // Add padding if needed (important for base64 decoding)
    const padded = payloadBase64.padEnd(payloadBase64.length + (4 - payloadBase64.length % 4) % 4, '=');
    // Handle URL-safe base64 characters
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    // Decode
    const jsonPayload = atob(base64);
    
    // Parse JSON
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    // Check if we already have a venue selected
    const existingVenue = req.cookies.get('selectedVenue');
    
    if (existingVenue?.value) {
      // If venue already selected, return it
      return NextResponse.json({
        success: true,
        venue: JSON.parse(existingVenue.value),
        message: 'Venue already initialized'
      });
    }
    
    // Get the session cookie
    const sessionCookie = req.cookies.get('appSession');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' }, 
        { status: 401 }
      );
    }
    
    // Parse the session data
    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid session data' }, 
        { status: 400 }
      );
    }
    
    // Get the access token
    const accessToken = sessionData.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'No access token found in session' }, 
        { status: 400 }
      );
    }
    
    // Decode the token to get venue data
    const decodedToken = decodeJwt(accessToken);
    
    if (!decodedToken || !decodedToken["app.venues"] || !Array.isArray(decodedToken["app.venues"]) || decodedToken["app.venues"].length === 0) {
      return NextResponse.json(
        { success: false, message: 'No venues found in token' }, 
        { status: 404 }
      );
    }
    
    // Get the first venue as default
    const defaultVenue = decodedToken["app.venues"][0];
    
    // Create response with the venue
    const response = NextResponse.json({
      success: true,
      venue: defaultVenue,
      message: 'Venue initialized successfully'
    });
    
    // Set the venue in a cookie for server-side access and in sessionStorage for client-side
    response.cookies.set('selectedVenue', JSON.stringify(defaultVenue), {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;
  } catch (error) {
    console.error('Error initializing venue:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 
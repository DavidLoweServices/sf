import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get the venue from the request body
    const body = await req.json();
    
    if (!body.venue || !body.venue.venueid || !body.venue.name) {
      return NextResponse.json(
        { success: false, message: 'Invalid venue data' }, 
        { status: 400 }
      );
    }
    
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Venue updated successfully'
    });
    
    // Update the venue cookie
    response.cookies.set('selectedVenue', JSON.stringify(body.venue), {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;
  } catch (error) {
    console.error('Error updating venue:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 
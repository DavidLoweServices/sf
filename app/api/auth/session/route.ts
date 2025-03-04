import { NextResponse } from 'next/server';

export async function GET() {
  // Return an empty session object
  return NextResponse.json({ user: null, expires: null });
} 
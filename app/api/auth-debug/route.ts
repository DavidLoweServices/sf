import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    auth0Config: {
      secret: process.env.AUTH0_SECRET ? 'Set (length: ' + process.env.AUTH0_SECRET.length + ')' : 'Missing',
      baseUrl: process.env.AUTH0_BASE_URL || 'Missing',
      issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL || 'Missing',
      clientId: process.env.AUTH0_CLIENT_ID || 'Missing',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ? 'Set (length: ' + process.env.AUTH0_CLIENT_SECRET.length + ')' : 'Missing',
    },
    nodeEnv: process.env.NODE_ENV
  });
} 
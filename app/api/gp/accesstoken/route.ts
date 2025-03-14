import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    // Global Payments credentials
    const appId = 'afGG1rZhgZnLG6qHuURkL2EUOMHGSCXB';
    const key = 'DhBCV62WeAdc0jYd';
    
    // Generate a nonce (UUID v4)
    const nonce = crypto.randomUUID();
    
    // Create the secret: SHA512 hash of key + nonce
    const secret = crypto.createHash('sha512').update(nonce+key).digest('hex');
    
    // Make the request to Global Payments API
    const response = await fetch('https://apis.sandbox.globalpay.com/ucp/accesstoken', {
      method: 'POST',
      headers: {
        'X-GP-Version': '2021-03-22',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
        secret: secret,
        grant_type: 'client_credentials',
        nonce: nonce
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Global Payments API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get access token', details: errorData },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Return the access token and other data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error obtaining Global Payments access token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
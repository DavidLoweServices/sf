'use client';

import { SessionProvider } from 'next-auth/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }}
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </Auth0Provider>
  );
} 
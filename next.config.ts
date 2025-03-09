import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns  : [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;


// <meta http-equiv="Content-Security-Policy" content="">

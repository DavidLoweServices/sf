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
            value: "default-src 'self' data: gap: * 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; script-src 'self' * 'unsafe-inline' 'unsafe-eval';",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;


// <meta http-equiv="Content-Security-Policy" content="">

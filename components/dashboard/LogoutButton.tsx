"use client";

import { Button } from '@/components/ui/button';

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function LogoutButton() {
  return (
    <div className="p-3">
      <a href="/api/auth/logout?returnTo=/">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogoutIcon />
          <span className="ml-2">Logout</span>
        </Button>
      </a>
    </div>
  );
} 
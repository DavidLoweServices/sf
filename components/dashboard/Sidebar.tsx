"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserProfileButton from "@/components/dashboard/UserProfileButton";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { XIcon } from "lucide-react";

// Improved JWT decoding function based on JwtDebugPage
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

// Simple SVG icons to replace Lucide icons
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Venue: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Business: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M8 17h2a2 2 0 0 0 2-2v-2H8zm8-12h-2a2 2 0 0 0-2 2v2h4zM8 7h4V5a2 2 0 0 0-2-2H8zm0 10h4v2a2 2 0 0 1-2 2H8z" />
      <rect width="16" height="16" x="4" y="4" rx="2" />
    </svg>
  ),
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface Venue {
  name: string;
  prefix: string | null;
  venueid: string;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname() || "";
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesOpen, setVenuesOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVenuesOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (venuesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [venuesOpen]);

  // Save selected venue to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedVenue) {
      sessionStorage.setItem('selectedVenue', JSON.stringify(selectedVenue));
    }
  }, [selectedVenue]);

  // Fetch venues from JWT payload
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        // Check if we have a saved venue selection first
        const savedVenue = sessionStorage.getItem('selectedVenue');
        let initialSelectedVenue: Venue | null = null;
        
        if (savedVenue) {
          try {
            initialSelectedVenue = JSON.parse(savedVenue) as Venue;
            setSelectedVenue(initialSelectedVenue);
            console.log('Restored venue selection from session:', initialSelectedVenue);
          } catch (e) {
            console.error('Error parsing saved venue:', e);
            sessionStorage.removeItem('selectedVenue');
          }
        }
        
        // Get the token from cookies or sessionStorage
        const response = await fetch('/api/auth/me?debug=true');
        const data = await response.json();
        
        // Add debug logging
        console.log('Auth data received:', {
          isAuthenticated: data.isAuthenticated,
          hasUser: !!data.user,
          hasTokens: !!data.tokens,
        });
        
        if (data.isAuthenticated && data.tokens?.accessToken) {
          const decodedToken = decodeJwt(data.tokens.accessToken);
          console.log('Decoded token payload:', decodedToken);
          
          // Check for app.venues in the decoded token
          if (decodedToken && decodedToken["app.venues"] && Array.isArray(decodedToken["app.venues"])) {
            console.log('Found venues in app.venues:', decodedToken["app.venues"]);
            const venuesList = decodedToken["app.venues"];
            setVenues(venuesList);
            
            // If we already have a selected venue from session, verify it exists in the venues list
            if (initialSelectedVenue) {
              const venueExists = venuesList.some(v => v.venueid === initialSelectedVenue!.venueid);
              if (!venueExists && venuesList.length > 0) {
                // If saved venue doesn't exist in the list, select the first venue
                setSelectedVenue(venuesList[0]);
              }
            } else if (venuesList.length > 0) {
              // No saved venue, select the first one
              setSelectedVenue(venuesList[0]);
            }
            
            setVenuesOpen(false);
          } else {
            console.log('No venues found in expected location, using example venues');
            // If no venues found, provide example venues for testing
            const exampleVenues = [
              { 
                name: "Example Venue 1", 
                prefix: "EX1", 
                venueid: "venue-1" 
              },
              { 
                name: "Example Venue 2", 
                prefix: "EX2", 
                venueid: "venue-2" 
              }
            ];
            setVenues(exampleVenues);
            
            // If no saved venue or it doesn't match any example venues
            if (!initialSelectedVenue || !exampleVenues.some(v => v.venueid === initialSelectedVenue.venueid)) {
              setSelectedVenue(exampleVenues[0]);
            }
            
            setVenuesOpen(false);
          }
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  // Handle venue selection
  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setVenuesOpen(false);
    // Save to sessionStorage (also handled by the useEffect)
    sessionStorage.setItem('selectedVenue', JSON.stringify(venue));
    console.log('Selected venue:', venue);
    
    // Optional: Dispatch a custom event that other components can listen for
    const venueChangeEvent = new CustomEvent('venueChange', { 
      detail: { venue } 
    });
    window.dispatchEvent(venueChangeEvent);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Icons.Dashboard />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Icons.Settings />,
    }
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-screen w-60 flex-col bg-white border-r border-gray-200 text-gray-800 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative",
          "overflow-hidden"
        )}
      >
        {/* Logo and toggle button */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 relative">
          <div className="w-full flex md:justify-center pl-1 md:pl-0">
              <Image 
                src="/logo.png" 
                alt="Dashboard Logo" 
                width={150} 
                height={40} 
                className="max-w-[120px] md:max-w-[140px] h-auto"
                priority
              />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-900 md:hidden absolute right-3"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <Icons.ChevronLeft />
            ) : (
              <Icons.ChevronRight />
            )}
          </Button>
        </div>

        {/* Business/Venue Selector - Stripe style */}
        <div className="px-3 py-3 border-b border-gray-200">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setVenuesOpen(!venuesOpen)}
              className={`w-full flex items-center justify-between text-left rounded-lg px-3 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 transition-colors ${venuesOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}`}
              aria-expanded={venuesOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center">

                <span className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
                  {selectedVenue?.name || 'Select Venue'}
                </span>
              </div>
              <div className={`text-gray-400 transform transition-transform duration-200 ${venuesOpen ? 'rotate-180' : ''}`}>
                <Icons.ChevronDown />
              </div>
            </button>
            
            {/* Dropdown panel */}
            {venuesOpen && (
              <div 
                className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[320px] overflow-y-auto py-1 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wider border-b border-gray-100 mb-1">
                  Your venues
                </div>
                
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <button 
                      key={venue.venueid} 
                      className={`w-full flex items-center px-3 py-2.5 hover:bg-gray-50 text-left transition-colors ${
                        selectedVenue?.venueid === venue.venueid 
                          ? 'bg-blue-50' 
                          : ''
                      }`}
                      onClick={() => handleVenueSelect(venue)}
                    >
     
                      <span className={`text-sm font-medium ${
                        selectedVenue?.venueid === venue.venueid 
                          ? 'text-blue-700' 
                          : 'text-gray-800'
                      }`}>
                        {venue.name}
                      </span>
                      {selectedVenue?.venueid === venue.venueid && (
                        <svg className="ml-auto h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-600">
                    No venues available
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2 pt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-md px-3 py-2 text-sm",
                      isActive 
                        ? "bg-blue-500 text-white font-medium" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex-shrink-0 mt-auto">
          {/* User Profile Button */}
          <UserProfileButton />
          {/* Logout Button */}
          <LogoutButton />
        </div>
      </aside>
    </>
  );
} 
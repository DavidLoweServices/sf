"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserProfileButton from "@/components/dashboard/UserProfileButton";
import LogoutButton from "@/components/dashboard/LogoutButton";
import {  ChevronLeft, 
          ChevronRight, 
          ChevronDown, 
          LayoutDashboard, 
          Settings, 
          BadgePoundSterling,
          HandCoins,
          CreditCard,
          Wallet } from 'lucide-react';

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
    <LayoutDashboard className="h-5 w-5" />
  ),
  Settings: () => (
    <Settings className="h-5 w-5" />
  ),
  ChevronLeft: () => (
    <ChevronLeft className="h-5 w-5" />
  ),
  ChevronRight: () => (
    <ChevronRight className="h-5 w-5" />
  ),
  ChevronDown: () => (
    <ChevronDown className="h-5 w-5" />
  ),
  Payouts: () => (
    <HandCoins className="h-5 w-5" />
  ),
  Transactions: () => (
    <BadgePoundSterling className="h-5 w-5" />
  ),
  Connect: () => (
    <CreditCard className="h-5 w-5" />
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

interface StripeCapabilities {
  payoutsEnabled: boolean;
  paymentsEnabled: boolean;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname() || "";
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesOpen, setVenuesOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [stripeCapabilities, setStripeCapabilities] = useState<StripeCapabilities | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch Stripe capabilities when selected venue changes
  useEffect(() => {
    const fetchStripeCapabilities = async () => {
      if (!selectedVenue) return;
      
      try {
        // Check session storage first
        const savedCapabilities = sessionStorage.getItem(`stripeCapabilities_${selectedVenue.venueid}`);
        if (savedCapabilities) {
          try {
            const parsedCapabilities = JSON.parse(savedCapabilities);
            setStripeCapabilities(parsedCapabilities);
            return; // Exit early if we found valid capabilities in session storage
          } catch (e) {
            console.error('Error parsing saved capabilities:', e);
            sessionStorage.removeItem(`stripeCapabilities_${selectedVenue.venueid}`);
          }
        }

        // If no valid capabilities in session storage, fetch from API
        const response = await fetch(`/api/stripeconnect?venueId=${selectedVenue.venueid}`);
        if (!response.ok) return;
        
        const data = await response.json();
        if (data.capabilities) {
          setStripeCapabilities(data.capabilities);
          // Save to session storage
          sessionStorage.setItem(`stripeCapabilities_${selectedVenue.venueid}`, JSON.stringify(data.capabilities));
        }
      } catch (error) {
        console.error('Error fetching Stripe capabilities:', error);
      }
    };

    fetchStripeCapabilities();

    // Listen for onboarding complete event
    const handleOnboardingComplete = (event: CustomEvent) => {
      if (selectedVenue) {
        setStripeCapabilities(event.detail.capabilities);
      }
    };

    window.addEventListener('onboardingComplete', handleOnboardingComplete as EventListener);
    return () => {
      window.removeEventListener('onboardingComplete', handleOnboardingComplete as EventListener);
    };
  }, [selectedVenue]);

  // Clear capabilities when venue changes
  useEffect(() => {
    if (selectedVenue) {
      // Clear capabilities for other venues to prevent stale data
      venues.forEach(venue => {
        if (venue.venueid !== selectedVenue.venueid) {
          sessionStorage.removeItem(`stripeCapabilities_${venue.venueid}`);
        }
      });
    }
  }, [selectedVenue, venues]);

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
        const response = await fetch('/api/auth/me');
        const data = await response.json();

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
    
    // Redirect to dashboard page
    window.location.href = '/dashboard';
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: <BadgePoundSterling className="h-5 w-5" />,
      showIf: () => stripeCapabilities?.paymentsEnabled === true
    },
    {
      name: "Payouts",
      href: "/dashboard/payouts",
      icon: <HandCoins className="h-5 w-5" />,
      showIf: () => stripeCapabilities?.payoutsEnabled === true
    },
    {
      name: "Stripe Onboard",
      href: "/dashboard/connect",
      icon: <CreditCard className="h-5 w-5" />,
      showIf: () => stripeCapabilities && !stripeCapabilities.payoutsEnabled && !stripeCapabilities.paymentsEnabled
    },
    {
      name: "Stripe Account",
      href: "/dashboard/stripeaccount",
      icon: <Wallet className="h-5 w-5" />,
      showIf: () => stripeCapabilities?.paymentsEnabled === true
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    }
  ];

  // Filter nav items based on conditions
  const filteredNavItems = navItems.filter(item => {
    if (!item.showIf) return true;
    return item.showIf();
  });

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
            {filteredNavItems.map((item) => {
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
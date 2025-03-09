'use client';

import { useState, useEffect } from 'react';

// Define the Venue interface 
interface Venue {
  name: string;
  prefix: string | null;
  venueid: string;
}

/**
 * Custom hook to access the currently selected venue
 * 
 * @returns {Object} The selected venue and a function to change it
 */
export function useSelectedVenue() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initializeVenue = async () => {
      try {
        // First check sessionStorage
        const savedVenue = sessionStorage.getItem('selectedVenue');
        if (savedVenue) {
          setSelectedVenue(JSON.parse(savedVenue));
          setIsLoading(false);
          return;
        }

        // If no saved venue, fetch venues and set the first one
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.isAuthenticated && data.tokens?.accessToken) {
          const decodedToken = decodeJwt(data.tokens.accessToken);
          
          if (decodedToken && decodedToken["app.venues"] && Array.isArray(decodedToken["app.venues"])) {
            const venuesList = decodedToken["app.venues"];
            if (venuesList.length > 0) {
              const firstVenue = venuesList[0];
              setSelectedVenue(firstVenue);
              sessionStorage.setItem('selectedVenue', JSON.stringify(firstVenue));
            }
          }
        }
      } catch (err) {
        console.error('Error initializing venue:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeVenue();

    // Listen for venue change events
    const handleVenueChange = (event: CustomEvent<{ venue: Venue }>) => {
      setSelectedVenue(event.detail.venue);
    };
    
    window.addEventListener('venueChange', handleVenueChange as EventListener);
    
    return () => {
      window.removeEventListener('venueChange', handleVenueChange as EventListener);
    };
  }, []);
  
  // Function to change the selected venue
  const changeVenue = (venue: Venue) => {
    sessionStorage.setItem('selectedVenue', JSON.stringify(venue));
    setSelectedVenue(venue);
    
    // Dispatch event to notify other components using this hook
    const venueChangeEvent = new CustomEvent('venueChange', { 
      detail: { venue } 
    });
    window.dispatchEvent(venueChangeEvent);
    
    // Also update the cookie for server-side access
    fetch('/api/auth/update-venue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ venue }),
    }).catch(error => {
      console.error('Error updating venue cookie:', error);
    });
  };
  
  return { selectedVenue, changeVenue, isLoading };
}

// JWT decoding helper function
function decodeJwt(token: string) {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid token format (not 3 parts):', parts.length);
      return null;
    }
    
    const payloadBase64 = parts[1];
    const padded = payloadBase64.padEnd(payloadBase64.length + (4 - payloadBase64.length % 4) % 4, '=');
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
} 
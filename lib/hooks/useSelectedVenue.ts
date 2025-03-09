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
  
  // Initialize from session storage or cookie
  useEffect(() => {
    // Get initial venue from sessionStorage
    const savedVenue = sessionStorage.getItem('selectedVenue');
    if (savedVenue) {
      try {
        setSelectedVenue(JSON.parse(savedVenue));
      } catch (e) {
        console.error('Error parsing saved venue:', e);
      }
    }
    setIsLoading(false);

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
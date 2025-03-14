'use client';

import { useState, useEffect } from 'react';

interface Venue {
  name: string;
  prefix: string | null;
  venueid: string;
}

export function useSelectedVenue() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the selected venue from sessionStorage on component mount
    const savedVenue = sessionStorage.getItem('selectedVenue');
    
    if (savedVenue) {
      try {
        const venue = JSON.parse(savedVenue) as Venue;
        setSelectedVenue(venue);
        console.log('Hook: Retrieved venue from sessionStorage:', venue);
      } catch (e) {
        console.error('Hook: Error parsing saved venue:', e);
      }
    }
    
    setIsLoading(false);

    // Listen for venue change events
    const handleVenueChange = (event: CustomEvent) => {
      const { venue } = event.detail;
      setSelectedVenue(venue);
      console.log('Hook: Venue changed via event:', venue);
    };

    window.addEventListener('venueChange', handleVenueChange as EventListener);

    return () => {
      window.removeEventListener('venueChange', handleVenueChange as EventListener);
    };
  }, []);

  return { selectedVenue, isLoading };
} 
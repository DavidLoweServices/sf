'use client';

import { useSelectedVenue } from '@/lib/hooks/useSelectedVenue';

/**
 * A component that displays information about the currently selected venue
 * This demonstrates how to access the selected venue from any component
 */
export default function VenueInfo() {
  const { selectedVenue } = useSelectedVenue();
  
  if (!selectedVenue) {
    return (
      <div className="p-4 text-gray-500 border border-gray-200 rounded-md bg-gray-50">
        No venue selected
      </div>
    );
  }
  
  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Current Venue</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-500">Name:</div>
        <div className="font-medium">{selectedVenue.name}</div>
        
        <div className="text-gray-500">ID:</div>
        <div className="font-medium">{selectedVenue.venueid}</div>
        
        <div className="text-gray-500">Prefix:</div>
        <div className="font-medium">{selectedVenue.prefix || 'None'}</div>
      </div>
    </div>
  );
} 
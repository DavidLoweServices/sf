'use client';

import { useState, useEffect } from 'react';
import { useSelectedVenue } from '@/lib/hooks/useSelectedVenue';
import { authFetch } from '@/lib/utils/authFetch';

interface VenueSetting {
  name: string;
  value: string;
}

interface VenueSettingsResponse {
  succeeded: boolean;
  data: {
    id: string;
    venueid: string;
    venueSettings: VenueSetting[];
  };
}

export default function VenueSettingsDebug() {
  const { selectedVenue, isLoading } = useSelectedVenue();
  const [venueSettings, setVenueSettings] = useState<VenueSettingsResponse | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ryftSubAccountID, setRyftSubAccountID] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenueSettings() {
      if (!selectedVenue) return;
      
      try {
        setIsLoadingSettings(true);
        setError(null);
        
        const response = await authFetch(`https://dev-api.wannabook.online/venuesettings/${selectedVenue.venueid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch venue settings: ${response.statusText}`);
        }
        
        const data: VenueSettingsResponse = await response.json();
        setVenueSettings(data);
        
        // Find RyftSubAccountID in venue settings
        if (data.succeeded && data.data && Array.isArray(data.data.venueSettings)) {
          const ryftSetting = data.data.venueSettings.find(
            setting => setting.name === 'RyftSubAccountID'
          );
          
          setRyftSubAccountID(ryftSetting?.value || null);
        }
      } catch (err) {
        console.error('Error fetching venue settings:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoadingSettings(false);
      }
    }
    
    fetchVenueSettings();
  }, [selectedVenue]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium mb-3 text-gray-800">Venue Settings Debug</h2>
      
      {isLoading ? (
        <p className="text-sm text-gray-600">Loading venue information...</p>
      ) : !selectedVenue ? (
        <p className="text-sm text-red-600">No venue selected. Please select a venue first.</p>
      ) : (
        <div>
          <div className="mb-4 text-sm">
            <p><strong>Current Venue:</strong> {selectedVenue.name}</p>
            <p><strong>Venue ID:</strong> {selectedVenue.venueid}</p>
            {ryftSubAccountID && (
              <p><strong>Ryft SubAccount ID:</strong> {ryftSubAccountID}</p>
            )}
          </div>
          
          {isLoadingSettings ? (
            <p className="text-sm text-gray-600">Loading venue settings...</p>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
              {error}
            </div>
          ) : venueSettings ? (
            <div>
              <h3 className="text-md font-medium mb-2 text-gray-700">API Response:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px] text-xs">
                {JSON.stringify(venueSettings, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No settings data available.</p>
          )}
        </div>
      )}
    </div>
  );
} 
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Compass, Layers, Sparkles } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { CommunityMap } from '../components/map/CommunityMap';

export const CommunityMapPage = () => {
  const { id } = useParams();
  const { destinations, places } = useDestinations();
  const [selectedDestId, setSelectedDestId] = useState(id || 'ooty');

  const destination = destinations.find((d) => d.id === selectedDestId) || destinations[0];
  const destPlaces = places.filter((p) => p.destinationId === destination.id);

  return (
    <div className="space-y-6">
      {/* Header & Destination Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Layers className="h-7 w-7 text-brand-600" />
            Live Community Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time visual map with color-coded safety, crowd, and recommendation pins
          </p>
        </div>

        {/* Destination Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Destination:
          </span>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm focus:border-brand-500 focus:outline-none"
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Map Component */}
      <div className="rounded-3xl overflow-hidden shadow-elevated">
        <CommunityMap
          places={destPlaces}
          center={[destination.coordinates.lat, destination.coordinates.lng]}
          zoom={12}
          destinationName={destination.name}
          className="h-[650px]"
        />
      </div>
    </div>
  );
};

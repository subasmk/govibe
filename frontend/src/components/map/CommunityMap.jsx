import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Star,
  Users2,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Rating } from '../common/Rating';
import { TrustScore } from '../common/TrustScore';
import { Badge } from '../common/Badge';

// Helper to create custom color-coded map pin HTML icons
const createCustomIcon = (status, name) => {
  let color = '#0284c7'; // blue default
  let ring = '#bae6fd';
  let badgeText = 'Popular';

  if (status === 'green') {
    color = '#10b981'; // green
    ring = '#a7f3d0';
    badgeText = 'Top Pick';
  } else if (status === 'yellow') {
    color = '#f59e0b'; // yellow
    ring = '#fde68a';
    badgeText = 'Mixed';
  } else if (status === 'red') {
    color = '#f43f5e'; // red
    ring = '#fecdd3';
    badgeText = 'Concern';
  }

  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
      <div style="background: ${color}; color: white; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.25); white-space: nowrap; border: 2px solid white; display: flex; align-items: center; gap: 4px;">
        <span style="width: 6px; height: 6px; border-radius: 9999px; background: white;"></span>
        ${name}
      </div>
      <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid ${color}; margin-top: -1px;"></div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-map-pin',
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// Component to dynamically re-center map when destination changes
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export const CommunityMap = ({
  places = [],
  center = [11.4102, 76.6950],
  zoom = 12,
  destinationName = "Ooty",
  className = "h-[500px]"
}) => {
  const [filter, setFilter] = useState('all'); // all, green, yellow, red, blue
  const [selectedPlace, setSelectedPlace] = useState(null);

  const filteredPlaces = places.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="relative flex flex-col rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-soft">
      {/* Map Header & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white z-20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-600 text-white">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{destinationName} Interactive Community Map</h3>
            <p className="text-[11px] text-slate-400">Color-coded markers based on recent traveller feedback</p>
          </div>
        </div>

        {/* Legend / Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-colors ${
              filter === 'all' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All ({places.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('green')}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              filter === 'green' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Recommended
          </button>
          <button
            type="button"
            onClick={() => setFilter('yellow')}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              filter === 'yellow' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Mixed Reports
          </button>
          <button
            type="button"
            onClick={() => setFilter('red')}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              filter === 'red' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            Community Concern
          </button>
          <button
            type="button"
            onClick={() => setFilter('blue')}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              filter === 'blue' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-sky-400 hover:bg-slate-700'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Popular
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className={`relative w-full ${className}`}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <RecenterMap center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.coordinates.lat, place.coordinates.lng]}
              icon={createCustomIcon(place.status, place.name)}
              eventHandlers={{
                click: () => setSelectedPlace(place)
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="w-64 p-3 font-sans">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs font-bold text-slate-900">{place.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {place.trustScore}/100 Trust
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Rating value={place.rating} size="sm" showNumber={true} />
                    <span className="text-[10px] text-slate-400">({place.recentExperiencesCount} recent)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 italic mb-2">
                    "{place.latestReport}"
                  </p>
                  <Link
                    to={`/place/${place.id}`}
                    className="block text-center rounded-lg bg-brand-600 py-1 text-[11px] font-bold text-white hover:bg-brand-700"
                  >
                    View Place Insights
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Selected Place Bottom Drawer for Quick Inspection */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-elevated border border-slate-200 z-30 animate-scaleUp">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedPlace.name}</h4>
                <p className="text-[11px] text-slate-500">{selectedPlace.location}</p>
              </div>
              <TrustScore score={selectedPlace.trustScore} size="sm" />
            </div>

            <div className="flex items-center justify-between mb-3 text-xs">
              <Rating value={selectedPlace.rating} count={selectedPlace.totalRatings} size="sm" />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedPlace.currentCrowd === 'Low' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                Crowd: {selectedPlace.currentCrowd}
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-700 border border-slate-100 mb-3">
              <strong className="text-slate-900">Latest Report: </strong>
              <span>{selectedPlace.latestReport}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlace(null)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Close
              </button>
              <Link
                to={`/place/${selectedPlace.id}`}
                className="inline-flex items-center gap-1 rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-sm"
              >
                <span>Full Community Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

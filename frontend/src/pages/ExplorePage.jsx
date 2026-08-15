import React, { useState } from 'react';
import { Search, Filter, Compass, Star, MapPin, Sparkles } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { DestinationCard } from '../components/cards/DestinationCard';

export const ExplorePage = () => {
  const { destinations } = useDestinations();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const categories = [
    'All',
    'Nature',
    'Adventure',
    'Family',
    'Photography',
    'Food',
    'Budget',
    'Tea Gardens',
    'Beach'
  ];

  const filteredDestinations = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (d.categories && d.categories.includes(selectedCategory));

    const matchesRating = d.rating >= minRating;

    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <Compass className="h-7 w-7 text-brand-600" />
          Explore Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Discover hill stations, coastal towns, and cultural hotspots backed by verified traveller communities
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute inset-y-0 left-3.5 my-auto h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by destination name, state, or keywords (e.g. Ooty, Nilgiris)..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {/* Min Rating Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0">
              Min Rating:
            </span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              <option value="0">All Ratings</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="4.5">4.5+ ⭐</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredDestinations.length} Destinations
          </p>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Compass className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No destinations found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search keywords or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

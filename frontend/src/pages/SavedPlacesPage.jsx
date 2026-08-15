import React, { useState } from 'react';
import { Bookmark, MapPin, Sparkles, Compass } from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { useDestinations } from '../context/DestinationContext';
import { PlaceCard } from '../components/cards/PlaceCard';
import { ExperienceCard } from '../components/cards/ExperienceCard';

export const SavedPlacesPage = () => {
  const { savedPlaces, savedPosts } = useSaved();
  const { places, posts } = useDestinations();
  const [tab, setTab] = useState('places'); // places, posts

  const bookmarkedPlaces = places.filter((p) => savedPlaces.includes(p.id));
  const bookmarkedPosts = posts.filter((p) => savedPosts.includes(p.id));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <Bookmark className="h-7 w-7 text-rose-500 fill-rose-500" />
          Saved Places & Experiences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Your bookmarked tourist spots, travel logs, and itinerary references
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab('places')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            tab === 'places'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Saved Places ({bookmarkedPlaces.length})
        </button>

        <button
          type="button"
          onClick={() => setTab('posts')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            tab === 'posts'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Saved Experiences ({bookmarkedPosts.length})
        </button>
      </div>

      {/* Content */}
      {tab === 'places' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPlaces.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <h3 className="text-base font-bold text-slate-900 mb-1">No saved places yet</h3>
              <p className="text-xs text-slate-500">
                Click the bookmark icon on any tourist spot to save it for your trip.
              </p>
            </div>
          ) : (
            bookmarkedPlaces.map((pl) => <PlaceCard key={pl.id} place={pl} />)
          )}
        </div>
      )}

      {tab === 'posts' && (
        <div className="space-y-6">
          {bookmarkedPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <h3 className="text-base font-bold text-slate-900 mb-1">No saved experiences yet</h3>
              <p className="text-xs text-slate-500">
                Bookmark useful community posts for offline reference while travelling.
              </p>
            </div>
          ) : (
            bookmarkedPosts.map((post) => <ExperienceCard key={post.id} post={post} />)
          )}
        </div>
      )}
    </div>
  );
};

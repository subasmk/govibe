import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Compass, MapPin, Sparkles, HelpCircle, Users, ArrowRight } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { DestinationCard } from '../components/cards/DestinationCard';
import { PlaceCard } from '../components/cards/PlaceCard';
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { QuestionCard } from '../components/cards/QuestionCard';
import { TripGroupCard } from '../components/cards/TripGroupCard';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { destinations, places, posts, questions, tripGroups } = useDestinations();

  const [activeFilter, setActiveFilter] = useState('all'); // all, destinations, places, posts, questions, groups

  const q = query.toLowerCase().trim();

  const matchedDestinations = destinations.filter(
    (d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
  );

  const matchedPlaces = places.filter(
    (p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const matchedPosts = posts.filter(
    (post) =>
      post.placeName?.toLowerCase().includes(q) ||
      post.content?.toLowerCase().includes(q) ||
      post.tags?.some((t) => t.toLowerCase().includes(q))
  );

  const matchedQuestions = questions.filter(
    (item) => item.question.toLowerCase().includes(q) || (item.details && item.details.toLowerCase().includes(q))
  );

  const matchedGroups = tripGroups.filter(
    (g) => g.title.toLowerCase().includes(q) || g.destinationName.toLowerCase().includes(q)
  );

  const totalResults =
    matchedDestinations.length +
    matchedPlaces.length +
    matchedPosts.length +
    matchedQuestions.length +
    matchedGroups.length;

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Found <strong>{totalResults}</strong> community items matching your search query
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Results', count: totalResults },
          { id: 'destinations', label: 'Destinations', count: matchedDestinations.length },
          { id: 'places', label: 'Places & Spots', count: matchedPlaces.length },
          { id: 'posts', label: 'Experiences', count: matchedPosts.length },
          { id: 'questions', label: 'Questions', count: matchedQuestions.length },
          { id: 'groups', label: 'Trip Groups', count: matchedGroups.length }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeFilter === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="space-y-10">
        {/* Destinations Group */}
        {(activeFilter === 'all' || activeFilter === 'destinations') && matchedDestinations.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="h-5 w-5 text-brand-600" />
              Destinations ({matchedDestinations.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedDestinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </section>
        )}

        {/* Places Group */}
        {(activeFilter === 'all' || activeFilter === 'places') && matchedPlaces.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Places & Spots ({matchedPlaces.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedPlaces.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          </section>
        )}

        {/* Experience Posts Group */}
        {(activeFilter === 'all' || activeFilter === 'posts') && matchedPosts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Community Experience Posts ({matchedPosts.length})
            </h2>
            <div className="space-y-6">
              {matchedPosts.map((post) => (
                <ExperienceCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Questions Group */}
        {(activeFilter === 'all' || activeFilter === 'questions') && matchedQuestions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-600" />
              Questions & Discussions ({matchedQuestions.length})
            </h2>
            <div className="space-y-4">
              {matchedQuestions.map((q) => (
                <QuestionCard key={q.id} questionItem={q} />
              ))}
            </div>
          </section>
        )}

        {/* Trip Groups */}
        {(activeFilter === 'all' || activeFilter === 'groups') && matchedGroups.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-600" />
              Trip Groups ({matchedGroups.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedGroups.map((g) => (
                <TripGroupCard key={g.id} group={g} />
              ))}
            </div>
          </section>
        )}

        {totalResults === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Search className="mx-auto h-10 w-10 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No community results found</h3>
            <p className="text-xs text-slate-500">Try searching for destinations like "Ooty", "Coorg" or spots like "Avalanche Lake".</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Search,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Clock,
  Plus
} from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { DestinationCard } from '../components/cards/DestinationCard';
import { PlaceCard } from '../components/cards/PlaceCard';
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { SafetyReportCard } from '../components/cards/SafetyReportCard';
import { Button } from '../components/common/Button';

export const HomePage = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const openCreatePost = outletContext?.openCreatePost;
  const openAIChat = outletContext?.openAIChat;

  const { destinations, places, posts, safetyReports } = useDestinations();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDestination, setFilterDestination] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const filteredPosts = posts.filter(
    (p) => filterDestination === 'all' || p.destinationId === filterDestination
  );

  const topRecommendedPlaces = places.filter(
    (p) => p.status === 'green' || p.trustScore >= 90
  );

  return (
    <div className="space-y-10">
      {/* Hero Search Discovery Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-6 sm:p-10 text-white shadow-elevated">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-brand-300 mb-4 border border-white/15">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span>Community-Verified Real-Time Insights</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Where do you want to explore?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Get accurate insights from travellers who reached your destination this week.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations, places, or recent experiences (e.g. Ooty, Avalanche Lake)..."
              className="w-full rounded-2xl border-0 bg-white/95 pl-12 pr-28 py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 shadow-lg focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/30"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700 transition-colors"
            >
              Explore
            </button>
          </form>

          {/* Quick Destination Pill Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
            <span className="text-[11px] font-semibold text-slate-400">Popular:</span>
            {['Ooty', 'Coorg', 'Kodaikanal', 'Munnar', 'Pondicherry', 'Chennai'].map((city) => (
              <Link
                key={city}
                to={`/community/${city.toLowerCase()}`}
                className="rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Background Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-40 -bottom-20 h-60 w-60 rounded-full bg-sky-400/20 blur-2xl" />
      </section>

      {/* Section 1: Popular Destinations & Communities */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="h-5 w-5 text-brand-600" />
              Popular Destination Communities
            </h2>
            <p className="text-xs text-slate-500">
              Join active local communities and review verified Community Trust Scores
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            View All ({destinations.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Section 2: Recent Community Safety Alerts Banner */}
      {safetyReports.length > 0 && (
        <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Live Community Safety Observations</h3>
                <p className="text-xs text-slate-400">
                  Real-time alerts shared and verified by travellers on the ground
                </p>
              </div>
            </div>
            <Link
              to="/safety"
              className="text-xs font-bold text-brand-400 hover:text-brand-300"
            >
              All Reports ({safetyReports.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyReports.slice(0, 2).map((report) => (
              <SafetyReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Recommended Places Right Now */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Highly Recommended Places
            </h2>
            <p className="text-xs text-slate-500">
              Spots with highest community trust scores and positive recent experiences
            </p>
          </div>
          <Link
            to="/community/ooty"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Explore Places <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecommendedPlaces.slice(0, 3).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Section 4: Live Community Feed of Recent Experiences */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Recent Community Experiences
            </h2>
            <p className="text-xs text-slate-500">
              Live updates from travellers who recently explored these spots
            </p>
          </div>

          {/* Filter Destination Selector & Share CTA */}
          <div className="flex items-center gap-2">
            <select
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Destinations</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={openCreatePost}
            >
              Share Yours
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <ExperienceCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

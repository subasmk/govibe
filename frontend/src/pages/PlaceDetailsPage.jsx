import React, { useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Coins,
  Sparkles,
  ShieldCheck,
  Bookmark,
  Share2,
  Plus,
  HelpCircle,
  Users2,
  AlertTriangle,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { useSaved } from '../context/SavedContext';
import { Rating } from '../components/common/Rating';
import { TrustScore } from '../components/common/TrustScore';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { CommunityMap } from '../components/map/CommunityMap';

export const PlaceDetailsPage = () => {
  const { id } = useParams();
  const outletContext = useOutletContext();
  const openCreatePost = outletContext?.openCreatePost;
  const openAIChat = outletContext?.openAIChat;

  const { places, posts, destinations } = useDestinations();
  const { isPlaceSaved, toggleSavePlace } = useSaved();
  const [copied, setCopied] = useState(false);

  const place = places.find((p) => p.id === id) || places[0];
  const destination = destinations.find((d) => d.id === place.destinationId) || destinations[0];
  const placePosts = posts.filter((p) => p.placeId === place.id);
  const saved = isPlaceSaved(place.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Back breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to={`/community/${place.destinationId}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {destination.name} Community
        </Link>
      </div>

      {/* Hero Image Gallery & Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-elevated">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={place.coverImage}
            alt={place.name}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/10">
              {place.category}
            </span>
            <TrustScore score={place.trustScore} size="md" />
          </div>

          {/* Title & Meta bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                {place.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  {place.location}
                </span>
                <Rating value={place.rating} count={place.totalRatings} size="sm" />
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  place.currentCrowd === 'Low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                }`}>
                  Current Crowd: {place.currentCrowd}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar Below Image */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 border-t border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={openCreatePost}
            >
              Add Experience
            </Button>
            <Button
              variant="dark"
              size="sm"
              icon={HelpCircle}
              onClick={openAIChat}
              className="bg-slate-800 hover:bg-slate-700"
            >
              Ask Community AI
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleSavePlace(place.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                saved
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{saved ? 'Saved' : 'Save Place'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Practical Traveller Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-2">About this Place</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {place.description}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Operating Hours
                </span>
                <p className="font-bold text-slate-800">{place.timings}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Entry / Safari Fee
                </span>
                <p className="font-bold text-slate-800">{place.entryFee}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Best Time Window
                </span>
                <p className="font-bold text-slate-800">{place.bestTimeToVisit}</p>
              </div>
            </div>
          </div>

          {/* Safety & Route Observations */}
          {place.safetyObservations && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Community Safety & Route Observation
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {place.safetyObservations}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Community Experiences for this Place */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Recent Traveller Experiences ({placePosts.length})
              </h3>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={openCreatePost}
              >
                Share Experience
              </Button>
            </div>

            {placePosts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center">
                <p className="text-xs text-slate-500 mb-2">No experiences shared for this place yet.</p>
                <Button variant="primary" size="sm" onClick={openCreatePost}>
                  Be the First to Share
                </Button>
              </div>
            ) : (
              placePosts.map((post) => (
                <ExperienceCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>

        {/* Sidebar Insights & Map */}
        <div className="space-y-6">
          {/* Trust Score Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Community Trust Score
            </span>
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 text-2xl font-black mb-3">
              {place.trustScore}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Calculated from {place.recentExperiencesCount} recent logs and community upvotes.
            </p>
            <div className="text-left space-y-2 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600">
                <span>Family Suitability:</span>
                <strong className="text-slate-900">{place.familySuitability}%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Accessibility:</span>
                <strong className="text-slate-900">{place.accessibility}</strong>
              </div>
            </div>
          </div>

          {/* Mini Map */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-soft">
            <CommunityMap
              places={[place]}
              center={[place.coordinates.lat, place.coordinates.lng]}
              zoom={14}
              destinationName={place.name}
              className="h-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

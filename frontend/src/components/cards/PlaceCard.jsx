import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Users2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Rating } from '../common/Rating';
import { TrustScore } from '../common/TrustScore';
import { Badge } from '../common/Badge';
import { useSaved } from '../../context/SavedContext';

export const PlaceCard = ({ place }) => {
  const { isPlaceSaved, toggleSavePlace } = useSaved();
  const saved = isPlaceSaved(place.id);

  const getStatusBadge = () => {
    if (place.status === 'green') {
      return <Badge variant="green" icon={CheckCircle2}>Recommended</Badge>;
    }
    if (place.status === 'yellow') {
      return <Badge variant="yellow" icon={Sparkles}>Mixed Reports</Badge>;
    }
    if (place.status === 'red') {
      return <Badge variant="red" icon={ShieldAlert}>Crowd / Warning</Badge>;
    }
    return <Badge variant="blue" icon={Sparkles}>Popular Spot</Badge>;
  };

  const getCrowdColor = (crowd) => {
    if (crowd === 'Low') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (crowd === 'Moderate') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300">
      {/* Image & Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Link to={`/place/${place.id}`}>
          <img
            src={place.coverImage}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            {getStatusBadge()}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleSavePlace(place.id);
            }}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              saved
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
            }`}
            title={saved ? 'Remove from Saved' : 'Save Place'}
          >
            <Bookmark className="h-4 w-4 fill-current" />
          </button>
        </div>

        {/* Crowd Indicator */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[11px] font-bold shadow-xs backdrop-blur-md ${getCrowdColor(place.currentCrowd)}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            Crowd: {place.currentCrowd}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link to={`/place/${place.id}`}>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                {place.name}
              </h4>
            </Link>
            <TrustScore score={place.trustScore} size="sm" />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{place.location}</span>
          </div>

          <div className="flex items-center justify-between mb-3 text-xs">
            <Rating value={place.rating} count={place.totalRatings} size="sm" />
            <span className="text-slate-500 font-medium">
              {place.recentExperiencesCount} recent posts
            </span>
          </div>

          {/* Latest Observation Snippet */}
          {place.latestReport && (
            <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-100 line-clamp-2 italic mb-3">
              "{place.latestReport}"
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            Best time: <strong className="text-slate-700">{place.bestTimeToVisit?.split(' ')[0]}</strong>
          </span>
          <Link
            to={`/place/${place.id}`}
            className="font-bold text-brand-600 hover:text-brand-700"
          >
            View Community Insights →
          </Link>
        </div>
      </div>
    </div>
  );
};

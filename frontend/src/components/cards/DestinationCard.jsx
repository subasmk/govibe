import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, ChevronRight } from 'lucide-react';
import { Rating } from '../common/Rating';
import { TrustScore } from '../common/TrustScore';

export const DestinationCard = ({ destination }) => {
  return (
    <Link
      to={`/community/${destination.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Cover Image with Gradient Overlay */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* State Badge & Trust Score */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <span className="rounded-full bg-slate-900/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
            {destination.state}
          </span>
          <TrustScore score={destination.trustScore} breakdown={destination.trustScoreBreakdown} size="sm" />
        </div>

        {/* Name & Tagline */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1 opacity-90 mt-0.5">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Content Info */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Rating value={destination.rating} count={destination.totalRatings} size="sm" />
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
            <Activity className="w-3.5 h-3.5" />
            <span>{destination.recentActivityCount} active updates</span>
          </div>
        </div>

        {/* Categories / Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.categories?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <strong className="font-semibold text-slate-700">{destination.membersCount?.toLocaleString()}</strong> members
          </span>

          <span className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
            Enter Community <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

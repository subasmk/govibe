import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles, Users, ThumbsUp, Calendar } from 'lucide-react';

export const TrustScore = ({
  score = 90,
  breakdown = {
    recentExperiences: 92,
    communityVotes: 88,
    ratings: 94,
    activeContributors: 86
  },
  size = 'md',
  showBreakdown = false,
  interactive = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getScoreColor = (val) => {
    if (val >= 90) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', badge: 'bg-emerald-500', ring: 'text-emerald-600' };
    if (val >= 75) return { bg: 'bg-brand-50 text-brand-700 border-brand-200', badge: 'bg-brand-500', ring: 'text-brand-600' };
    if (val >= 60) return { bg: 'bg-amber-50 text-amber-700 border-amber-200', badge: 'bg-amber-500', ring: 'text-amber-600' };
    return { bg: 'bg-rose-50 text-rose-700 border-rose-200', badge: 'bg-rose-500', ring: 'text-rose-600' };
  };

  const colors = getScoreColor(score);

  const sizes = {
    sm: {
      container: 'px-2 py-0.5 text-xs',
      icon: 'w-3.5 h-3.5',
      scoreText: 'font-bold'
    },
    md: {
      container: 'px-3 py-1.5 text-xs',
      icon: 'w-4 h-4',
      scoreText: 'text-sm font-extrabold'
    },
    lg: {
      container: 'px-4 py-2 text-sm',
      icon: 'w-5 h-5',
      scoreText: 'text-lg font-black'
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => interactive && setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 rounded-xl border font-medium transition-all duration-200 ${colors.bg} ${sizes[size].container} ${
          interactive ? 'hover:shadow-sm cursor-pointer' : 'cursor-default'
        }`}
      >
        <ShieldCheck className={`${sizes[size].icon} shrink-0`} />
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Trust Score
          </span>
          <span className={sizes[size].scoreText}>{score}</span>
          <span className="text-[10px] text-slate-400 font-normal">/100</span>
        </div>
        {interactive && <Info className="w-3 h-3 text-slate-400 opacity-70 hover:opacity-100" />}
      </button>

      {/* Trust Score Breakdown Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white p-4 shadow-elevated border border-slate-100 z-50 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Community Trust Score</h4>
                  <p className="text-[10px] text-slate-500">Calculated from verified traveller feedback</p>
                </div>
              </div>
              <span className="text-base font-extrabold text-emerald-600">{score}/100</span>
            </div>

            {/* Breakdown Bars */}
            <div className="py-3 space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" /> Recent Experiences
                  </span>
                  <span className="font-bold">{breakdown.recentExperiences}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${breakdown.recentExperiences}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3 h-3 text-slate-400" /> Community Upvotes
                  </span>
                  <span className="font-bold">{breakdown.communityVotes}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${breakdown.communityVotes}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-slate-400" /> Quality Ratings
                  </span>
                  <span className="font-bold">{breakdown.ratings}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${breakdown.ratings}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-slate-400" /> Active Local Contributors
                  </span>
                  <span className="font-bold">{breakdown.activeContributors}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${breakdown.activeContributors}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Crucial Spec Disclaimer */}
            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 bg-slate-50 -mx-4 -mb-4 p-3 rounded-b-2xl">
              <span className="font-semibold text-slate-700">Notice:</span> Community-generated Trust Score based on recent visits, community votes, ratings and active contributors. <span className="text-slate-400">Not an official government safety rating.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

import React from 'react';

export const CardSkeleton = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-slate-200" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-3 bg-slate-100 rounded w-1/4" />
      </div>
    </div>
    <div className="h-48 bg-slate-200 rounded-xl mb-4" />
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-slate-200 rounded w-5/6" />
      <div className="h-4 bg-slate-100 rounded w-2/3" />
    </div>
    <div className="flex justify-between pt-2 border-t border-slate-100">
      <div className="h-8 bg-slate-200 rounded-lg w-20" />
      <div className="h-8 bg-slate-200 rounded-lg w-20" />
    </div>
  </div>
);

export const DestinationCardSkeleton = () => (
  <div className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-soft animate-pulse">
    <div className="h-52 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-200 rounded w-1/2" />
      <div className="h-3 bg-slate-100 rounded w-3/4" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-slate-200 rounded-full w-24" />
        <div className="h-6 bg-slate-200 rounded-full w-16" />
      </div>
    </div>
  </div>
);

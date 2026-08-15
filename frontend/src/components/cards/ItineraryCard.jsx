import React from 'react';
import { Clock, Users, Sparkles, MapPin, CheckCircle2, DollarSign } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ItineraryCard = ({ dayPlan }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-soft mb-6">
      {/* Day Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-sm">
            D{dayPlan.day}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Day {dayPlan.day}: {dayPlan.theme}
            </h4>
            <p className="text-xs text-slate-500">Community-optimized travel route</p>
          </div>
        </div>

        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          {dayPlan.schedule?.length} Stops
        </span>
      </div>

      {/* Timeline Stops */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {dayPlan.schedule?.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-brand-100 group-hover:ring-brand-200 transition-all">
              <div className="h-2 w-2 rounded-full bg-brand-600" />
            </div>

            {/* Content Box */}
            <div className="rounded-2xl bg-slate-50/80 p-4 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                    <Clock className="w-3 h-3 text-brand-500" />
                    {item.time}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900">{item.placeName}</h5>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Est. {item.estimatedCost}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.crowdExpected === 'Low' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    Crowd: {item.crowdExpected}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 mb-3">{item.activity}</p>

              {/* Community Reasoning Badge (Spec Requirement) */}
              {item.communityReasoning && (
                <div className="flex items-start gap-2 rounded-xl bg-white p-2.5 border border-brand-100 text-[11px] text-brand-900 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-brand-800">Why recommended: </strong>
                    <span>{item.communityReasoning}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

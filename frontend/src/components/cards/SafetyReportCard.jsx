import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Clock,
  User,
  Info,
  Flag
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { useDestinations } from '../../context/DestinationContext';

export const SafetyReportCard = ({ report }) => {
  const { confirmSafetyReport } = useDestinations();
  const [flagged, setFlagged] = useState(false);

  const getSeverityStyle = (sev) => {
    if (sev === 'danger') {
      return {
        card: 'border-rose-200 bg-rose-50/40',
        badge: 'red',
        icon: ShieldAlert,
        iconColor: 'text-rose-600 bg-rose-100'
      };
    }
    if (sev === 'warning') {
      return {
        card: 'border-amber-200 bg-amber-50/40',
        badge: 'yellow',
        icon: AlertTriangle,
        iconColor: 'text-amber-600 bg-amber-100'
      };
    }
    return {
      card: 'border-sky-200 bg-sky-50/40',
      badge: 'blue',
      icon: Info,
      iconColor: 'text-sky-600 bg-sky-100'
    };
  };

  const style = getSeverityStyle(report.severity);
  const Icon = style.icon;

  return (
    <div className={`rounded-3xl border p-5 sm:p-6 shadow-soft transition-all duration-200 ${style.card}`}>
      {/* Top Tag & Community Notice */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
            COMMUNITY REPORT
          </span>
          <Badge variant={style.badge}>{report.category}</Badge>
        </div>

        <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {report.reportedTimestamp}
        </span>
      </div>

      {/* Title & Description */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className={`rounded-2xl p-2.5 shrink-0 ${style.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 mb-1">{report.title}</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {report.description}
          </p>
        </div>
      </div>

      {/* Location & Reporter Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-4 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60">
        <span className="flex items-center gap-1.5 font-semibold text-slate-800">
          <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
          {report.placeName}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          Reported by: <strong className="text-slate-700">{report.reportedBy}</strong>
        </span>
      </div>

      {/* Confirmation & Community Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Confirm Report Button */}
          <button
            type="button"
            onClick={() => confirmSafetyReport(report.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition-all ${
              report.userConfirmed
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{report.userConfirmed ? 'Confirmed by you' : 'Confirm this observation'}</span>
          </button>

          <span className="text-[11px] font-medium text-slate-500">
            <strong>{report.verifiedCount}</strong> travellers found this useful
          </span>
        </div>

        {/* Flag incorrect */}
        <button
          type="button"
          onClick={() => setFlagged(!flagged)}
          className={`inline-flex items-center gap-1 text-[11px] transition-colors ${
            flagged ? 'text-rose-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
          title="Report incorrect information"
        >
          <Flag className="w-3 h-3" />
          <span>{flagged ? 'Reported to moderators' : 'Report incorrect info'}</span>
        </button>
      </div>

      {/* Disclaimer Requirement */}
      <div className="mt-3 text-[10px] text-slate-400 italic">
        * Notice: Unverified peer observations shared by community travellers. Exercise personal discretion.
      </div>
    </div>
  );
};

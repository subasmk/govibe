import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  Wallet,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import { useDestinations } from '../../context/DestinationContext';

export const TripGroupCard = ({ group }) => {
  const { currentUser } = useAuth();
  const { toggleJoinGroup } = useDestinations();

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300">
      <div>
        {/* Top Destination & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
            <Compass className="w-3.5 h-3.5" />
            {group.destinationName}
          </span>

          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            {group.status}
          </span>
        </div>

        {/* Title & Description */}
        <Link to={`/groups/${group.id}`}>
          <h3 className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors mb-2">
            {group.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {group.description}
        </p>

        {/* Dates & Budget Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 border border-slate-100">
            <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Dates</p>
              <p className="font-bold text-slate-800">{group.dates}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 border border-slate-100">
            <Wallet className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Est. Budget</p>
              <p className="font-bold text-slate-800">{group.budget}</p>
            </div>
          </div>
        </div>

        {/* Interests Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {group.interests?.map((item, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Members & Join Action */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
        {/* Avatars */}
        <div className="flex items-center">
          <div className="flex -space-x-2 overflow-hidden mr-2">
            {group.members?.slice(0, 4).map((m, idx) => (
              <img
                key={idx}
                src={m.avatar}
                alt={m.name}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            <strong>{group.membersCount}</strong> / {group.maxMembers} joined
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => currentUser && toggleJoinGroup(group.id, currentUser)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              group.isJoined
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
            }`}
          >
            {group.isJoined ? 'Joined ✓' : 'Join Group'}
          </button>
        </div>
      </div>
    </div>
  );
};

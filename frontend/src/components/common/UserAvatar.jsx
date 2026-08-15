import React from 'react';
import { Award, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export const UserAvatar = ({
  user,
  size = 'md',
  showBadge = true,
  className = ''
}) => {
  const name = user?.name || 'Traveller';
  const avatar = user?.avatar;
  const badge = user?.badge;

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl font-bold'
  };

  const badgeIcon = () => {
    if (!badge) return null;
    if (badge.includes('Top') || badge.includes('Guide')) {
      return (
        <span
          title={badge}
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white ring-2 ring-white shadow-sm"
        >
          <Award className="h-2.5 w-2.5" />
        </span>
      );
    }
    if (badge.includes('Helpful')) {
      return (
        <span
          title={badge}
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white ring-2 ring-white shadow-sm"
        >
          <CheckCircle2 className="h-2.5 w-2.5" />
        </span>
      );
    }
    return (
      <span
        title={badge}
        className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-white ring-2 ring-white shadow-sm"
      >
        <Compass className="h-2.5 w-2.5" />
      </span>
    );
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={`rounded-full object-cover ring-2 ring-slate-100 ${sizeClasses[size]}`}
          loading="lazy"
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full bg-gradient-to-tr from-brand-600 to-sky-400 font-bold text-white shadow-sm ring-2 ring-slate-100 ${sizeClasses[size]}`}
        >
          {initials}
        </div>
      )}
      {showBadge && badgeIcon()}
    </div>
  );
};

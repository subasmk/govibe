import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  Users2,
  MapPin,
  ShieldAlert,
  HelpCircle,
  Users,
  Sparkles,
  CalendarDays,
  Bookmark,
  UserCheck
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { label: 'Home Feed', path: '/home', icon: Home },
    { label: 'Explore Destinations', path: '/explore', icon: Compass },
    { label: 'Ooty Community', path: '/community/ooty', icon: Users2, highlight: true },
    { label: 'Community Map', path: '/map', icon: MapPin },
    { label: 'Trip Groups', path: '/groups', icon: Users },
    { label: 'Safety Reports', path: '/safety', icon: ShieldAlert },
    { label: 'Questions & Discussions', path: '/questions', icon: HelpCircle },
    { label: 'Ask GoVIBE AI', path: '/ai', icon: Sparkles, badge: 'Smart' },
    { label: 'AI Itinerary Planner', path: '/itinerary', icon: CalendarDays },
    { label: 'Saved Places', path: '/saved', icon: Bookmark },
    { label: 'My Profile', path: '/profile', icon: UserCheck }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0">
      <div className="space-y-1">
        <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="rounded bg-gradient-to-r from-sky-500 to-brand-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Community Tip Card */}
      <div className="mt-auto pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50 p-4 border border-brand-100/80">
          <div className="flex items-center gap-2 text-brand-800 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Community Driven</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            "Google Maps tells you where a place is. GoVIBE helps you understand what that place is like now."
          </p>
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Users2, Users, User, Sparkles } from 'lucide-react';

export const BottomNav = ({ onOpenAIChat }) => {
  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Ooty', path: '/community/ooty', icon: Users2 },
    { label: 'Groups', path: '/groups', icon: Users },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Floating AI Button on Mobile */}
      <button
        type="button"
        onClick={onOpenAIChat}
        className="lg:hidden fixed right-4 bottom-20 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-elevated hover:scale-105 active:scale-95 transition-transform"
        aria-label="Ask GoVIBE AI"
      >
        <Sparkles className="h-6 w-6 animate-pulse-subtle" />
      </button>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-safe">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-600'
                      : 'text-slate-500 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                        isActive ? 'bg-brand-50 text-brand-600 scale-110' : ''
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mt-0.5">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  Compass,
  Plus,
  LogOut,
  ChevronDown,
  User,
  Bookmark,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserAvatar } from './UserAvatar';
import { Button } from './Button';

export const Navbar = ({ onOpenCreatePost, onOpenAIChat }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [searchInput, setSearchInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">GoVIBE</span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-emerald-700 border border-emerald-200">
                Verified
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-slate-400 font-medium -mt-0.5">
              Know the place before you explore
            </p>
          </div>
        </Link>
      </div>

      {/* Global Search Bar */}
      <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search destinations, tourist spots, or recent experiences..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ask GoVIBE AI Button */}
        <button
          type="button"
          onClick={onOpenAIChat}
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:shadow hover:opacity-95 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask AI Assistant</span>
        </button>

        {/* Share Experience Button */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenCreatePost}
          className="hidden sm:inline-flex shadow-sm"
        >
          Share Experience
        </Button>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 transition-colors"
          >
            <UserAvatar user={currentUser} size="sm" showBadge={false} />
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-elevated border border-slate-100 z-50 animate-scaleUp">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.name || 'Explorer'}</p>
                  <p className="text-[11px] text-slate-400">{currentUser?.handle || '@traveller'}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 border border-brand-100">
                    <ShieldCheck className="w-3 h-3 text-brand-600" />
                    <span>{currentUser?.badge || 'Explorer'} • {currentUser?.points || 50} pts</span>
                  </div>
                </div>

                <div className="py-1 space-y-0.5 text-xs font-medium text-slate-700">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    <span>My Profile & Logs</span>
                  </Link>

                  <Link
                    to="/saved"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <Bookmark className="h-4 w-4 text-slate-400" />
                    <span>Saved Tourist Places</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

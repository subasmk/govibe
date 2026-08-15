import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-md shadow-brand-500/20">
            <Compass className="h-6 w-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">GoVIBE</span>
        </Link>
        <p className="text-xs text-slate-500 font-medium">
          Know the place before you explore
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-card rounded-3xl sm:px-10 border border-slate-200/80">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  MapPin,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Award
} from 'lucide-react';
import { sampleDestinations } from '../data/sampleData';
import { Button } from '../components/common/Button';
import { TrustScore } from '../components/common/TrustScore';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isDemoMode } = useAuth();
  const demoModeEnabled = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-md shadow-brand-500/20">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">GoVIBE</span>
              <span className="ml-1 text-[10px] font-bold text-brand-600 uppercase tracking-widest">Community</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={isAuthenticated ? '/home' : '/login'}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 hidden sm:inline"
            >
              {isAuthenticated ? 'Open App' : 'Explore Feed'}
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700 shadow-sm transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-4 py-1.5 text-xs font-bold text-brand-800 border border-brand-200 mb-6">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Know the place before you explore</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Google Maps tells you <span className="text-slate-400 font-medium line-through">where</span> it is.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">GoVIBE</span> tells you what it's like <span className="underline decoration-brand-400 underline-offset-4">now</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Discover destinations through real, recent experiences from verified travellers who actually visited yesterday. Live crowd updates, community trust scores & AI trip guidance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
              <Button
                size="lg"
                variant="primary"
                icon={ArrowRight}
                onClick={() => navigate(isAuthenticated ? '/home' : '/register')}
                className="shadow-elevated shadow-brand-500/20"
              >
                {isAuthenticated ? 'Open App' : 'Get Started'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/community/ooty')}
              >
                Open Ooty Community
              </Button>
              {demoModeEnabled && (
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => navigate('/home')}
                >
                  Try Demo
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-6 border-t border-slate-200/60 text-center">
              <div>
                <p className="text-2xl font-extrabold text-slate-900">20,000+</p>
                <p className="text-xs text-slate-500 font-medium">Traveller Logs</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-600">92%</p>
                <p className="text-xs text-slate-500 font-medium">Verified Recent</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-600">6+</p>
                <p className="text-xs text-slate-500 font-medium">Hill Communities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Flow Guide (Discover -> Experience -> Share -> Help Others) */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-600 mb-2">
              How GoVIBE Works
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">
              The Traveller Community Flow
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Search destinations and check live Community Trust Scores before packing your bags.",
                icon: Compass
              },
              {
                step: "02",
                title: "Experience",
                desc: "Explore places knowing current crowd levels, road detours, and best morning slots.",
                icon: MapPin
              },
              {
                step: "03",
                title: "Share",
                desc: "Post your real visit photos, crowd observation, and rating within minutes of visiting.",
                icon: Sparkles
              },
              {
                step: "04",
                title: "Help Others",
                desc: "Answer travellers' questions and confirm road/weather safety reports in real time.",
                icon: Users
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-3xl bg-white p-6 shadow-soft border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-black text-slate-200 block mb-3">{item.step}</span>
                    <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600 w-fit mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Main Value Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Why Travellers Rely on GoVIBE
            </h2>
            <p className="text-sm text-slate-600">
              The difference between generic reviews from 3 years ago and what you will actually encounter today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-200 p-8 shadow-soft bg-white flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">REAL EXPERIENCES</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Authentic experiences from travellers who visited this week. Ratings on crowd levels, family accessibility, and actual entry ticket procedures.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600">
                Verified Traveller Badge System →
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-8 shadow-soft bg-white flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">RECENT INFORMATION</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our system prioritizes fresh updates ("Visited 2 days ago") and automatically warns you when information is older, so you never get surprised by outdated fees or routes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-brand-600">
                Outdated Content Decay Warnings →
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-8 shadow-soft bg-white flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">COMMUNITY POWERED</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every destination has an active community. Ask questions, report road conditions or mist hazards, and form trip groups with fellow travellers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-sky-600">
                Peer Safety Verification →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destination Jump */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-600 mb-2">Featured Destination</p>
              <h2 className="text-3xl font-extrabold text-slate-900">Ooty, Tamil Nadu</h2>
            </div>
            <Button size="md" variant="outline" onClick={() => navigate('/community/ooty')}>
              Visit Community <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sampleDestinations.slice(0, 3).map((destination) => (
              <div key={destination.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <img src={destination.coverImage} alt={destination.name} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{destination.name}</h3>
                    <TrustScore score={destination.trustScore} compact />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{destination.tagline}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{destination.membersCount.toLocaleString()} members</span>
                    <span>{destination.activeNow} active now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-r from-brand-600 to-sky-500 p-8 sm:p-12 text-white shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100 mb-4">Ready to travel smarter?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Build a real community around every destination.</h2>
            <p className="text-sm sm:text-base text-brand-50/90 mb-8 max-w-2xl mx-auto">
              Sign up, create your first trip log, and start helping other travellers plan safer and smarter journeys.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              Join the Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

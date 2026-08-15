import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { UserAvatar } from './UserAvatar';
import { useAuth, AVATAR_OPTIONS } from '../../context/AuthContext';

export const WelcomeOnboardingModal = () => {
  const navigate = useNavigate();
  const { currentUser, showWelcomeOnboarding, dismissWelcomeOnboarding, updateUserAvatar } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || null);

  if (!showWelcomeOnboarding || !currentUser) return null;

  const handleAvatarSelect = (url) => {
    setSelectedAvatar(url);
    updateUserAvatar(url);
  };

  const handleStartExploring = () => {
    dismissWelcomeOnboarding();
    navigate('/community/ooty');
  };

  return (
    <Modal
      isOpen={showWelcomeOnboarding}
      onClose={dismissWelcomeOnboarding}
      title=""
      maxWidth="max-w-2xl"
      showClose={true}
    >
      <div className="space-y-6 pt-1">
        {/* Header with gradient badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Account Successfully Created!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome to GoVIBE, {currentUser.name}! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            "Google Maps tells you where a place is. GoVIBE helps you understand what that place is like right now."
          </p>
        </div>

        {/* Profile Avatar Selection Section */}
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar
                user={{ name: currentUser.name, avatar: selectedAvatar }}
                size="lg"
                showBadge={false}
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Your Traveller Avatar</p>
                <p className="text-[11px] text-slate-500">Pick a profile style or use your initials</p>
              </div>
            </div>

            {selectedAvatar && (
              <button
                type="button"
                onClick={() => handleAvatarSelect(null)}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 underline"
              >
                Use Initials
              </button>
            )}
          </div>

          {/* Avatar Option Pills */}
          <div className="flex gap-2 overflow-x-auto pt-1 pb-1">
            {AVATAR_OPTIONS.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAvatarSelect(imgUrl)}
                className={`relative h-12 w-12 rounded-full overflow-hidden shrink-0 border-2 transition-all ${
                  selectedAvatar === imgUrl
                    ? 'border-brand-600 scale-105 shadow-md ring-2 ring-brand-200'
                    : 'border-transparent hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Avatar option" className="h-full w-full object-cover" />
                {selectedAvatar === imgUrl && (
                  <div className="absolute inset-0 bg-brand-600/30 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-4 h-4 fill-brand-600 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Step Community Guide & Instructions */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Community Instructions
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Step 1 */}
            <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600 shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">1. Know Before You Go</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                  Check live crowd levels, recent ratings, and Community Trust Scores before visiting tourist spots.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">2. Color-Coded Map</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                  Open the interactive map with 🟢 Recommended, 🟡 Mixed, 🔴 Safety alerts, and 🔵 Popular pins.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">3. Post Real Experiences</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                  Share visit photos, entry wait times, and crowd status to earn badges and community points.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">4. Ask GoVIBE AI</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                  Get personalized recommendations with community citations and customized multi-day itineraries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 font-medium">
            Your saved places start completely fresh.
          </span>

          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            onClick={handleStartExploring}
          >
            Start Exploring Communities
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import React, { useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import {
  Users,
  Star,
  ShieldCheck,
  Activity,
  MapPin,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Plus,
  Compass,
  Calendar,
  Layers,
  HelpCircle,
  Users2
} from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { Rating } from '../components/common/Rating';
import { TrustScore } from '../components/common/TrustScore';
import { Button } from '../components/common/Button';
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { PlaceCard } from '../components/cards/PlaceCard';
import { SafetyReportCard } from '../components/cards/SafetyReportCard';
import { QuestionCard } from '../components/cards/QuestionCard';
import { TripGroupCard } from '../components/cards/TripGroupCard';
import { CommunityMap } from '../components/map/CommunityMap';

export const DestinationCommunityPage = () => {
  const { id } = useParams();
  const destinationId = (id || 'ooty').toLowerCase();
  const outletContext = useOutletContext();
  const openCreatePost = outletContext?.openCreatePost;
  const openAIChat = outletContext?.openAIChat;

  const { destinations, places, posts, safetyReports, questions, tripGroups } = useDestinations();
  const [activeTab, setActiveTab] = useState('experiences'); // overview, experiences, places, map, questions, safety, groups

  const currentDestination = destinations.find((d) => d.id === destinationId) || destinations[0];
  const destPlaces = places.filter((p) => p.destinationId === currentDestination.id);
  const destPosts = posts.filter((p) => p.destinationId === currentDestination.id);
  const destSafetyReports = safetyReports.filter((r) => r.destinationId === currentDestination.id);
  const destQuestions = questions.filter((q) => q.destinationId === currentDestination.id);
  const destGroups = tripGroups.filter((g) => g.destinationId === currentDestination.id);

  const tabs = [
    { id: 'experiences', label: 'Experiences Feed', count: destPosts.length, icon: Sparkles },
    { id: 'places', label: 'Places & Spots', count: destPlaces.length, icon: MapPin },
    { id: 'map', label: 'Community Map', icon: Layers },
    { id: 'questions', label: 'Q&A Discussions', count: destQuestions.length, icon: HelpCircle },
    { id: 'safety', label: 'Safety Reports', count: destSafetyReports.length, icon: ShieldAlert },
    { id: 'groups', label: 'Trip Groups', count: destGroups.length, icon: Users2 }
  ];

  return (
    <div className="space-y-8">
      {/* Destination Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-elevated">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={currentDestination.coverImage}
            alt={currentDestination.name}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white border border-white/10">
              {currentDestination.state}
            </span>

            <TrustScore
              score={currentDestination.trustScore}
              breakdown={currentDestination.trustScoreBreakdown}
              size="md"
            />
          </div>

          {/* Hero Content Bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
                {currentDestination.name} Community
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 line-clamp-2">
                {currentDestination.description}
              </p>

              {/* Meta Counters */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-brand-300" />
                  <span><strong>{currentDestination.membersCount?.toLocaleString()}</strong> Members</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span><strong>{currentDestination.rating}</strong> ({currentDestination.totalRatings} ratings)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-xl border border-emerald-400/30 text-emerald-300 font-semibold">
                  <Activity className="w-4 h-4" />
                  <span>{currentDestination.activeNow} travellers active here</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Sub-Bar with Quick Action CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={openCreatePost}
            >
              Post Experience
            </Button>
            <Button
              variant="dark"
              size="sm"
              icon={Sparkles}
              onClick={openAIChat}
              className="bg-slate-800 hover:bg-slate-700"
            >
              Ask AI about {currentDestination.name.split(' ')[0]}
            </Button>
          </div>

          {/* Destination Highlights Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Top Spots:</span>
            {currentDestination.highlights?.slice(0, 4).map((h, i) => (
              <span key={i} className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-soft">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Experiences Feed */}
      {activeTab === 'experiences' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Showing {destPosts.length} Community Logs
            </p>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Fresh updates prioritized
            </span>
          </div>

          <div className="space-y-6">
            {destPosts.map((post) => (
              <ExperienceCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Places & Spots Grid */}
      {activeTab === 'places' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {destPlaces.length} Places in {currentDestination.name}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Community Map */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <CommunityMap
            places={destPlaces}
            center={[currentDestination.coordinates.lat, currentDestination.coordinates.lng]}
            destinationName={currentDestination.name}
            className="h-[550px]"
          />
        </div>
      )}

      {/* Tab 4: Questions & Discussions */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Community Q&A ({destQuestions.length})
            </p>
          </div>

          <div className="space-y-4">
            {destQuestions.map((q) => (
              <QuestionCard key={q.id} questionItem={q} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Community Safety Reports */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Safety & Route Observations</h3>
              <p className="text-xs text-slate-500">Live peer reports for {currentDestination.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destSafetyReports.map((report) => (
              <SafetyReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Trip Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Trip Groups ({destGroups.length})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destGroups.map((group) => (
              <TripGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  User,
  Award,
  ThumbsUp,
  MapPin,
  Calendar,
  Compass,
  Bookmark,
  Users,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDestinations } from '../context/DestinationContext';
import { useSaved } from '../context/SavedContext';
import { UserAvatar } from '../components/common/UserAvatar';
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { PlaceCard } from '../components/cards/PlaceCard';
import { TripGroupCard } from '../components/cards/TripGroupCard';

export const ProfilePage = () => {
  const { currentUser, loginWithDemoUser, availableDemoUsers } = useAuth();
  const { posts, places, tripGroups } = useDestinations();
  const { savedPlaces } = useSaved();

  const [activeTab, setActiveTab] = useState('posts'); // posts, saved, groups

  const myPosts = posts.filter(
    (p) => p.userName === currentUser.name || p.userId === currentUser.id
  );

  const bookmarkedPlaces = places.filter((p) => savedPlaces.includes(p.id));
  const myJoinedGroups = tripGroups.filter((g) => g.isJoined);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <UserAvatar user={currentUser} size="xl" showBadge={true} />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
              <span className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-bold text-brand-700 border border-brand-200">
                {currentUser?.badge}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {currentUser?.handle} • Member since {currentUser?.joinedDate}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
              {currentUser?.bio}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Explorer', 'Helpful Traveller', 'Community Contributor', 'Top Contributor'].map(
                (badgeTitle) => {
                  const isEarned = currentUser?.badge?.includes(badgeTitle.split(' ')[0]);
                  return (
                    <span
                      key={badgeTitle}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-[11px] font-bold border ${
                        isEarned
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                          : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{badgeTitle}</span>
                    </span>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Stats Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-black text-slate-900">{currentUser?.points || 120}</p>
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Community Points</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-black text-emerald-600">{currentUser?.helpfulVotes || 24}</p>
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Helpful Upvotes</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-black text-brand-600">{currentUser?.placesVisited || 12}</p>
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Places Logged</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-black text-indigo-600">{myPosts.length}</p>
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Shared Posts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-2">
        {[
          { id: 'posts', label: 'My Experience Posts', count: myPosts.length },
          { id: 'saved', label: 'Saved Places', count: bookmarkedPlaces.length },
          { id: 'groups', label: 'My Trip Groups', count: myJoinedGroups.length }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {myPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-slate-700">No experiences posted yet</p>
              <p className="text-xs text-slate-400 mt-1">Share your recent visits to earn community badges!</p>
            </div>
          ) : (
            myPosts.map((p) => <ExperienceCard key={p.id} post={p} />)
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPlaces.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No saved places yet</p>
            </div>
          ) : (
            bookmarkedPlaces.map((pl) => <PlaceCard key={pl.id} place={pl} />)
          )}
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myJoinedGroups.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Users className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">You have not joined any trip groups yet</p>
            </div>
          ) : (
            myJoinedGroups.map((g) => <TripGroupCard key={g.id} group={g} />)
          )}
        </div>
      )}
    </div>
  );
};

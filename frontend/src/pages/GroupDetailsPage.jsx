import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  Wallet,
  ArrowLeft,
  MessageSquare,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/common/UserAvatar';
import { Button } from '../components/common/Button';

export const GroupDetailsPage = () => {
  const { id } = useParams();
  const { tripGroups, toggleJoinGroup } = useDestinations();
  const { currentUser } = useAuth();

  const group = tripGroups.find((g) => g.id === id) || tripGroups[0];
  const [messages, setMessages] = useState([
    {
      id: "gm_1",
      sender: group.organizer?.name || "Rahul Sundaram",
      text: "Hey everyone! We're aiming to book the Avalanche Eco Safari for the 9 AM slot. Please confirm if that works for you.",
      time: "2 hours ago"
    },
    {
      id: "gm_2",
      sender: "Karthik R.",
      text: "9 AM works great for me! I'll bring the DSLRs for the morning lake reflections.",
      time: "1 hour ago"
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser) return;

    setMessages((prev) => [
      ...prev,
      {
        id: "gm_" + Date.now(),
        sender: currentUser.name,
        text: chatInput.trim(),
        time: "Just now"
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        to="/groups"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Trip Groups
      </Link>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {group.destinationName} Trip Group
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {group.title}
            </h1>
          </div>

          <Button
            variant={group.isJoined ? 'emerald' : 'primary'}
            size="md"
            onClick={() => currentUser && toggleJoinGroup(group.id, currentUser)}
          >
            {group.isJoined ? 'Joined Group ✓' : 'Join This Group'}
          </Button>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          {group.description}
        </p>

        {/* Meta Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-slate-100 pt-6">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Dates</span>
            <p className="font-bold text-slate-800">{group.dates}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Budget</span>
            <p className="font-bold text-emerald-700">{group.budget}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Members</span>
            <p className="font-bold text-slate-800">{group.membersCount} / {group.maxMembers} Joined</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Organizer</span>
            <p className="font-bold text-brand-700 truncate">{group.organizer?.name}</p>
          </div>
        </div>
      </div>

      {/* Main Layout: Itinerary Plan & Live Group Discussion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shared Itinerary Outline */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Group Itinerary Plan
          </h3>

          <div className="space-y-3 text-xs">
            {group.itinerarySummary ? (
              group.itinerarySummary.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-800">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">Itinerary is currently being voted on in the group chat.</p>
            )}
          </div>

          {/* Members List */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Travellers in this Group ({group.members?.length})
            </h4>
            <div className="space-y-2">
              {group.members?.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <UserAvatar user={{ name: m.name, avatar: m.avatar }} size="sm" showBadge={false} />
                  <span className="text-xs font-semibold text-slate-800">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Group Discussion Wall */}
        <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft h-[500px]">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            Group Discussion & Planning
          </h3>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m) => (
              <div key={m.id} className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{m.sender}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask group about cab sharing, gear..."
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

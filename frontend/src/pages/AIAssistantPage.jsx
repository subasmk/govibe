import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ShieldCheck, Compass, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { askTravelAI } from '../services/aiService';
import { Button } from '../components/common/Button';

export const AIAssistantPage = () => {
  const { destinations, places, posts, safetyReports } = useDestinations();
  const [selectedDestId, setSelectedDestId] = useState('ooty');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Welcome to **GoVIBE AI**!\n\nUnlike traditional chatbots that give generic Wikipedia answers, I analyze **verified recent traveller experiences**, **real-time crowd reports**, and **Community Trust Scores** across South India.\n\nSelect your destination and ask me anything!`,
      citations: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "I am in Ooty with my family. Which places are less crowded?",
    "I have 2 days in Ooty. What should I visit?",
    "Which places have good recent experiences and high trust scores?",
    "Are there any active road or weather safety alerts I should know about?"
  ];

  const handleSend = async (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const aiResponse = await askTravelAI({
        prompt: query,
        destinationId: selectedDestId,
        contextData: { places, posts, safetyReports, destinations }
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: aiResponse.response,
          citations: aiResponse.citations || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm temporarily experiencing connectivity issues with the AI engine. Please try again shortly.",
          citations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-brand-950 p-6 sm:p-8 rounded-3xl text-white shadow-elevated">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-3.5 py-1 text-xs font-semibold text-brand-300 border border-brand-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community-Grounded Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ask GoVIBE AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real recommendations backed by verified traveller visits, crowd levels, and trust scores
          </p>
        </div>

        {/* Destination Target */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs">
          <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1">
            Analyzing Destination:
          </label>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="rounded-xl border border-white/20 bg-slate-900 px-3 py-1.5 font-bold text-white focus:outline-none"
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[560px] rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-soft">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 text-xs sm:text-sm ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-sm">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-3xl p-5 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-soft'
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>

                {/* Evidence Citations */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Community Evidence Citations:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.citations.map((c, i) => (
                        <span key={i} className="rounded-lg bg-white px-2 py-0.5 border border-slate-200 text-slate-700 font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-sm">
                  <User className="h-4.5 w-4.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              <span>Synthesizing recent traveller logs and trust score indicators...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Suggestions */}
        <div className="py-2.5 border-t border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Suggested Inquiries
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-transparent px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2 border-t border-slate-100"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask GoVIBE AI (e.g. Which places have low crowd and good morning weather?)"
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

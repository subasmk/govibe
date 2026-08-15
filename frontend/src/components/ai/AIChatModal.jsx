import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ShieldCheck, Compass, ArrowRight, Loader2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { askTravelAI } from '../../services/aiService';
import { useDestinations } from '../../context/DestinationContext';

export const AIChatModal = ({ isOpen, onClose, destinationId = 'ooty' }) => {
  const { places, posts, safetyReports, destinations } = useDestinations();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm GoVIBE AI. I analyze recent traveller visits, crowd levels, and safety reports to give you grounded recommendations.\n\nHow can I assist your trip to **${destinationId.toUpperCase()}** today?`,
      citations: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "I am in Ooty with my family. Which places are less crowded?",
    "Which places have good recent experiences?",
    "Are there any recent community reports I should know about?",
    "What is the best time to visit Doddabetta Peak?"
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
        destinationId,
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ask GoVIBE AI"
      subtitle="Recommendations grounded in verified, recent community experiences"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col h-[520px]">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 text-xs sm:text-sm ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-soft'
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>

                {/* Citations Footer */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Community Evidence Sources:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {m.citations.map((c, i) => (
                        <span key={i} className="rounded bg-white px-2 py-0.5 border border-slate-200 font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white shadow-sm">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 italic bg-slate-50 p-3 rounded-2xl border border-slate-100 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              <span>Analyzing recent community logs & trust scores...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="py-2 border-t border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Quick Questions
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="whitespace-nowrap rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-transparent px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
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
            placeholder="Ask GoVIBE AI (e.g. Which lake is peaceful in morning?)"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 text-white hover:opacity-95 disabled:opacity-40 transition-opacity shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Modal>
  );
};

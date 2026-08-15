import React, { useState } from 'react';
import { HelpCircle, Plus, Search, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import { QuestionCard } from '../components/cards/QuestionCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input, TextArea } from '../components/common/Input';

export const QuestionsPage = () => {
  const { questions, destinations, addQuestion } = useDestinations();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('all'); // all, answered, unanswered
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form state
  const [destId, setDestId] = useState('ooty');
  const [qTitle, setQTitle] = useState('');
  const [qDetails, setQDetails] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.details && q.details.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === 'answered') return matchesSearch && q.status === 'Answered';
    if (activeTab === 'unanswered') return matchesSearch && q.status === 'Unanswered';
    return matchesSearch;
  });

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!qTitle.trim() || !currentUser) return;

    addQuestion({
      destinationId: destId,
      question: qTitle.trim(),
      details: qDetails.trim(),
      askedBy: currentUser.name,
      askedAvatar: currentUser.avatar
    });

    setQTitle('');
    setQDetails('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <HelpCircle className="h-7 w-7 text-brand-600" />
            Questions & Travel Discussions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ask recent visitors and local guides about routes, crowd timings, and child-friendly spots
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Ask the Community
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'answered', label: 'Answered' },
            { id: 'unanswered', label: 'Needs Answers' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-semibold text-slate-700">No questions found</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to start a conversation!</p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <QuestionCard key={q.id} questionItem={q} />
          ))
        )}
      </div>

      {/* Ask Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ask the Community"
        subtitle="Your question will be answered by travellers who recently visited"
      >
        <form onSubmit={handleAskQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Destination
            </label>
            <select
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="Question Title"
            value={qTitle}
            onChange={(e) => setQTitle(e.target.value)}
            placeholder="e.g. Is Avalanche Lake worth visiting with senior citizens?"
            required
          />

          <TextArea
            label="Additional Details (Optional)"
            value={qDetails}
            onChange={(e) => setQDetails(e.target.value)}
            placeholder="Mention your dates, group size, or specific concerns (e.g. wheelchair access, morning cold)..."
            rows={3}
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={!qTitle.trim()}>
              Post Question
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

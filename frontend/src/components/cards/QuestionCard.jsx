import React, { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  ThumbsUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useDestinations } from '../../context/DestinationContext';

export const QuestionCard = ({ questionItem }) => {
  const { currentUser } = useAuth();
  const { addAnswer } = useDestinations();
  const [expanded, setExpanded] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [upvotes, setUpvotes] = useState(questionItem.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) {
      setUpvotes(upvotes - 1);
      setHasVoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setHasVoted(true);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answerText.trim() || !currentUser) return;

    addAnswer(questionItem.id, {
      answeredBy: currentUser.name,
      answererAvatar: currentUser.avatar,
      answererBadge: currentUser.badge,
      text: answerText.trim()
    });

    setAnswerText('');
    setExpanded(true);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-soft hover:border-slate-300 transition-all duration-200">
      {/* Status & Timestamp */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {questionItem.status === 'Answered' ? (
            <Badge variant="emerald" icon={CheckCircle2}>Answered</Badge>
          ) : (
            <Badge variant="amber" icon={HelpCircle}>Needs Answers</Badge>
          )}
          <span className="text-xs text-slate-400 font-medium">
            {questionItem.askedTimestamp}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <UserAvatar
            user={{ name: questionItem.askedBy, avatar: questionItem.askedAvatar }}
            size="xs"
            showBadge={false}
          />
          <span className="text-xs font-semibold text-slate-700">{questionItem.askedBy}</span>
        </div>
      </div>

      {/* Question Title & Details */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
        {questionItem.question}
      </h3>
      {questionItem.details && (
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {questionItem.details}
        </p>
      )}

      {/* Accepted / Top Answer Highlight */}
      {questionItem.answers && questionItem.answers.length > 0 && !expanded && (
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Top Community Answer
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {questionItem.answers[0].answeredBy}
            </span>
            {questionItem.answers[0].answererBadge && (
              <span className="text-[10px] text-slate-400 font-medium">
                ({questionItem.answers[0].answererBadge})
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 line-clamp-2">
            "{questionItem.answers[0].text}"
          </p>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Upvote Question */}
          <button
            type="button"
            onClick={handleVote}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition-all ${
              hasVoted
                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
            <span>Upvote ({upvotes})</span>
          </button>

          {/* Toggle All Answers */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-slate-400" />
            <span>{questionItem.answers?.length || 0} Answers</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Answers List & Answer Submission Form */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          <div className="space-y-3">
            {questionItem.answers?.map((ans) => (
              <div key={ans.id} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      user={{ name: ans.answeredBy, avatar: ans.answererAvatar, badge: ans.answererBadge }}
                      size="sm"
                    />
                    <div>
                      <span className="font-bold text-slate-900">{ans.answeredBy}</span>
                      {ans.answererBadge && (
                        <span className="ml-2 rounded bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold text-brand-700">
                          {ans.answererBadge}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{ans.timestamp}</span>
                </div>
                <p className="text-slate-700 leading-relaxed sm:text-sm pl-10">{ans.text}</p>
              </div>
            ))}
          </div>

          {/* Answer Form */}
          <form onSubmit={handleAnswerSubmit} className="flex items-center gap-2 pt-2">
            <UserAvatar user={currentUser} size="sm" showBadge={false} />
            <input
              type="text"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write a helpful answer based on your visit..."
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              disabled={!answerText.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

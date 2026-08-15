import React, { useState } from 'react';
import { Send, ThumbsUp } from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import { useDestinations } from '../../context/DestinationContext';

export const CommentSection = ({ postId, comments = [] }) => {
  const { currentUser } = useAuth();
  const { addComment } = useDestinations();
  const [commentText, setCommentText] = useState('');
  const [localUpvotes, setLocalUpvotes] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;
    addComment(postId, currentUser, commentText.trim());
    setCommentText('');
  };

  const toggleCommentVote = (commentId) => {
    setLocalUpvotes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
  };

  return (
    <div className="space-y-4">
      {/* Existing Comments List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No comments yet. Start the conversation!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3 text-xs">
              <UserAvatar
                user={{ name: c.userName, avatar: c.userAvatar }}
                size="sm"
                showBadge={false}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{c.userName}</span>
                  <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                </div>
                <p className="text-slate-700 leading-relaxed mb-2">{c.text}</p>
                <button
                  type="button"
                  onClick={() => toggleCommentVote(c.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{(c.upvotes || 0) + (localUpvotes[c.id] || 0)}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
        <UserAvatar user={currentUser} size="sm" showBadge={false} />
        <div className="relative flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ask a question or share advice..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 transition-colors shadow-xs"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};

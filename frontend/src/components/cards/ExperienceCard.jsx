import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Calendar,
  AlertTriangle,
  MapPin,
  Sparkles,
  Check
} from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';
import { Rating } from '../common/Rating';
import { Badge } from '../common/Badge';
import { CommentSection } from '../post/CommentSection';
import { useDestinations } from '../../context/DestinationContext';
import { useSaved } from '../../context/SavedContext';
import { useAuth } from '../../context/AuthContext';

export const ExperienceCard = ({ post, onAddComment }) => {
  const { votePost } = useDestinations();
  const { isPostSaved, toggleSavePost } = useSaved();
  const { currentUser } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const saved = isPostSaved(post.id);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCrowdBadge = (crowd) => {
    if (crowd === 'Low') return <Badge variant="emerald">Crowd: Low</Badge>;
    if (crowd === 'Moderate') return <Badge variant="amber">Crowd: Moderate</Badge>;
    return <Badge variant="rose">Crowd: High</Badge>;
  };

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-soft hover:border-slate-300 transition-all duration-200">
      {/* Header: User Info & Outdated Warning */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: post.userName,
              avatar: post.userAvatar,
              badge: post.userBadge
            }}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-slate-900">{post.userName}</h4>
              {post.userBadge && (
                <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                  {post.userBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{post.userHandle} • {post.createdTimestamp}</p>
          </div>
        </div>

        {/* Save / Bookmark Button */}
        <button
          type="button"
          onClick={() => toggleSavePost(post.id)}
          className={`rounded-xl p-2 transition-colors ${
            saved
              ? 'text-rose-500 bg-rose-50'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
          title={saved ? 'Remove bookmark' : 'Bookmark experience'}
        >
          <Bookmark className="h-4 w-4 fill-current" />
        </button>
      </div>

      {/* Outdated Notice (Crucial Spec Requirement) */}
      {post.isOutdated && (
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-amber-50 p-3.5 border border-amber-200 text-amber-900 text-xs">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <div>
            <strong className="font-bold">Historical Information: </strong>
            <span>{post.outdatedNotice || 'This experience was posted over 1 year ago. Recent conditions, pricing, or routes may have changed.'}</span>
          </div>
        </div>
      )}

      {/* Place & Visit Meta Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-50 p-3 mb-4 border border-slate-100">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-600 shrink-0" />
          <Link
            to={`/place/${post.placeId}`}
            className="text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors"
          >
            {post.placeName}
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-brand-500" />
            {post.visitedTimestamp}
          </span>
          {getCrowdBadge(post.crowdLevel)}
        </div>
      </div>

      {/* Rating & Post Content */}
      <div className="space-y-3 mb-4">
        <Rating value={post.rating} size="md" />
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Photo Gallery */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(img)}
              className="relative h-48 sm:h-56 overflow-hidden rounded-2xl bg-slate-100 cursor-pointer group"
            >
              <img
                src={img}
                alt="Traveller photo"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Photo Preview Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Enlarged community photo"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions: Helpful Upvote, Comment, Share */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center gap-1.5">
          {/* Helpful Upvote Button */}
          <button
            type="button"
            onClick={() => votePost(post.id, 'up')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition-all ${
              post.userVoted === 'up'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${post.userVoted === 'up' ? 'fill-current' : ''}`} />
            <span>Helpful ({post.upvotes})</span>
          </button>

          {/* Not Helpful Button */}
          <button
            type="button"
            onClick={() => votePost(post.id, 'down')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-medium transition-all ${
              post.userVoted === 'down'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
            title="Not helpful"
          >
            <ThumbsDown className={`h-3.5 w-3.5 ${post.userVoted === 'down' ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Comments Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-slate-400" />
            <span>{post.commentsCount || 0} Comments</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Copy link"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Expanded Comment Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <CommentSection
            postId={post.id}
            comments={post.comments || []}
            onAddComment={onAddComment}
          />
        </div>
      )}
    </article>
  );
};

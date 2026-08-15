import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { ExperienceCard } from '../components/cards/ExperienceCard';

export const PostDetailsPage = () => {
  const { id } = useParams();
  const { posts } = useDestinations();

  const post = posts.find((p) => p.id === id) || posts[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to={`/community/${post.destinationId}`}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Community Feed
      </Link>

      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Community Experience: {post.placeName}
        </h1>
        <ExperienceCard post={post} />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, MapPin, Calendar, Star, Sparkles, X } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, TextArea } from '../common/Input';
import { Rating } from '../common/Rating';
import { useAuth } from '../../context/AuthContext';
import { useDestinations } from '../../context/DestinationContext';

export const PostCreatorModal = ({ isOpen, onClose, defaultDestinationId = 'ooty', defaultPlaceId }) => {
  const { currentUser } = useAuth();
  const { places, destinations, addPost } = useDestinations();

  const [destinationId, setDestinationId] = useState(defaultDestinationId);
  const [placeId, setPlaceId] = useState(defaultPlaceId || (places[0]?.id || ''));
  const [visitDate, setVisitDate] = useState('Yesterday');
  const [visitedTimestamp, setVisitedTimestamp] = useState('Visited 1 day ago');
  const [rating, setRating] = useState(5);
  const [crowdLevel, setCrowdLevel] = useState('Low');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('Scenic, MorningVibe');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availablePlaces = places.filter((p) => p.destinationId === destinationId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    setIsSubmitting(true);

    const selectedPlace = places.find((p) => p.id === placeId) || places[0];
    const images = imageUrl.trim()
      ? [imageUrl.trim()]
      : ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"];

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addPost({
      destinationId,
      placeId: selectedPlace.id,
      placeName: selectedPlace.name,
      userId: currentUser.id,
      userName: currentUser.name,
      userHandle: currentUser.handle,
      userAvatar: currentUser.avatar,
      userBadge: currentUser.badge,
      visitedTimestamp,
      visitDate: "Aug 15, 2026",
      rating,
      crowdLevel,
      content: content.trim(),
      images,
      tags
    });

    setIsSubmitting(false);
    setContent('');
    setImageUrl('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Community Experience"
      subtitle="Help fellow travellers know what the place is like right now"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination & Place Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Destination
            </label>
            <select
              value={destinationId}
              onChange={(e) => {
                setDestinationId(e.target.value);
                const firstPlace = places.find((p) => p.destinationId === e.target.value);
                if (firstPlace) setPlaceId(firstPlace.id);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Place Visited
            </label>
            <select
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {availablePlaces.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Visit Timing & Crowd Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              When did you visit?
            </label>
            <select
              value={visitedTimestamp}
              onChange={(e) => setVisitedTimestamp(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              <option value="Visited today">Visited today</option>
              <option value="Visited yesterday">Visited yesterday</option>
              <option value="Visited 2 days ago">Visited 2 days ago</option>
              <option value="Visited 1 week ago">Visited 1 week ago</option>
              <option value="Visited 1 month ago">Visited 1 month ago</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Observed Crowd Level
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Low', 'Moderate', 'High'].map((crowd) => (
                <button
                  key={crowd}
                  type="button"
                  onClick={() => setCrowdLevel(crowd)}
                  className={`rounded-xl py-2 text-xs font-bold transition-all border ${
                    crowdLevel === crowd
                      ? crowd === 'Low'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : crowd === 'Moderate'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {crowd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Overall Experience Rating
          </label>
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Rating value={rating} size="lg" interactive={true} onChange={setRating} />
            <span className="text-xs font-bold text-slate-700">{rating} out of 5</span>
          </div>
        </div>

        {/* Experience Details */}
        <TextArea
          label="Your Real Experience & Observations"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What was the current condition? Any road/route tips? How were the wait times?"
          rows={3}
          required
        />

        {/* Optional Image URL */}
        <Input
          label="Photo URL (Unsplash or Image Link)"
          icon={ImageIcon}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://images.unsplash.com/photo-..."
          helperText="Leave empty to use a scenic default sample photo"
        />

        {/* Tags */}
        <Input
          label="Tags (Comma separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Peaceful, Scenic, RoadTrip, MorningVibe"
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            disabled={!content.trim()}
          >
            Publish Experience
          </Button>
        </div>
      </form>
    </Modal>
  );
};

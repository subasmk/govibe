import React, { useState } from 'react';
import { Users, Plus, Calendar, Compass, Wallet, Sparkles } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import { TripGroupCard } from '../components/cards/TripGroupCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input, TextArea } from '../components/common/Input';

export const TripGroupsPage = () => {
  const { tripGroups, destinations, createTripGroup } = useDestinations();
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New group form
  const [destId, setDestId] = useState('ooty');
  const [title, setTitle] = useState('');
  const [dates, setDates] = useState('Aug 25 – Aug 27, 2026');
  const [budget, setBudget] = useState('₹4,500 / person');
  const [maxMembers, setMaxMembers] = useState(5);
  const [interests, setInterests] = useState('Nature, Trekking, Photography');
  const [description, setDescription] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!title.trim() || !currentUser) return;

    const dest = destinations.find((d) => d.id === destId) || destinations[0];

    createTripGroup({
      destinationId: dest.id,
      destinationName: dest.name,
      title: title.trim(),
      dates,
      budget,
      maxMembers: Number(maxMembers),
      organizer: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        badge: currentUser.badge
      },
      members: [{ name: currentUser.name, avatar: currentUser.avatar }],
      interests: interests.split(',').map((i) => i.trim()),
      description: description.trim()
    });

    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Users className="h-7 w-7 text-brand-600" />
            Trip Groups & Co-Travellers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Form travel groups, share cabs and homestays, and plan itineraries together
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Create Trip Group
        </Button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tripGroups.map((group) => (
          <TripGroupCard key={group.id} group={group} />
        ))}
      </div>

      {/* Create Group Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Trip Group"
        subtitle="Connect with travellers heading to the same destination"
      >
        <form onSubmit={handleCreateGroup} className="space-y-4">
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
            label="Group Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ooty Monsoon Weekend Road Trip"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Travel Dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="e.g. Aug 28 - Aug 30"
              required
            />
            <Input
              label="Estimated Budget / Person"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. ₹4,000 / person"
              required
            />
          </div>

          <Input
            label="Interests (Comma separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. Trekking, Photography, Food"
          />

          <TextArea
            label="Trip Plan & Group Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your itinerary, vehicle arrangement, homestay type, and who should join..."
            rows={3}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={!title.trim()}>
              Create Group
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

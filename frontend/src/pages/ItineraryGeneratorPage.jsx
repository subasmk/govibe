import React, { useState } from 'react';
import { CalendarDays, Sparkles, Wand2, Compass, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { generateAIItinerary } from '../services/aiService';
import { Button } from '../components/common/Button';
import { ItineraryCard } from '../components/cards/ItineraryCard';

export const ItineraryGeneratorPage = () => {
  const { destinations } = useDestinations();

  // Generator Form State
  const [destinationId, setDestinationId] = useState('ooty');
  const [days, setDays] = useState(2);
  const [travelType, setTravelType] = useState('Family');
  const [budget, setBudget] = useState('Moderate');
  const [selectedInterests, setSelectedInterests] = useState(['Nature', 'Photography']);
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const interestOptions = [
    'Nature',
    'Adventure',
    'Food',
    'Photography',
    'Relaxation',
    'Tea Gardens',
    'Heritage',
    'Budget Trails'
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateAIItinerary({
        destinationId,
        days,
        travelType,
        budget,
        interests: selectedInterests
      });
      setGeneratedResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <CalendarDays className="h-7 w-7 text-brand-600" />
          AI Community Itinerary Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Generate custom day-by-day travel schedules optimized with real crowd timings and verified route advice
        </p>
      </div>

      {/* Generator Configuration Form */}
      <form onSubmit={handleGenerate} className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Destination
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Number of Days */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              <option value="1">1 Day Express</option>
              <option value="2">2 Days (Recommended)</option>
              <option value="3">3 Days Leisure</option>
            </select>
          </div>

          {/* Travel Group Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Travel Type
            </label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              <option value="Family">Family with Kids / Elders</option>
              <option value="Solo">Solo Explorer</option>
              <option value="Friends">Friends / Backpackers</option>
              <option value="Couple">Couple / Romantic</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Budget Level
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
            >
              <option value="Budget">Budget / Backpacker</option>
              <option value="Moderate">Moderate / Comfortable</option>
              <option value="Luxury">Premium / Luxury</option>
            </select>
          </div>
        </div>

        {/* Interests Pills */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Trip Interests & Vibe
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedInterests.includes(opt)
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            AI matches your request with {destinationId.toUpperCase()} community data
          </span>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Wand2}
            loading={loading}
          >
            Generate Community Itinerary
          </Button>
        </div>
      </form>

      {/* Generated Results View */}
      {generatedResult && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Your Custom {generatedResult.destination} {generatedResult.totalDays}-Day Plan
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Community Grounded ✓
            </span>
          </div>

          {generatedResult.itinerary?.map((dayPlan) => (
            <ItineraryCard key={dayPlan.day} dayPlan={dayPlan} />
          ))}
        </div>
      )}
    </div>
  );
};

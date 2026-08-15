import React, { useState } from 'react';
import { ShieldAlert, Plus, AlertTriangle, CheckCircle2, MapPin, Filter } from 'lucide-react';
import { useDestinations } from '../context/DestinationContext';
import { useAuth } from '../context/AuthContext';
import { SafetyReportCard } from '../components/cards/SafetyReportCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input, TextArea } from '../components/common/Input';

export const SafetyReportsPage = () => {
  const { safetyReports, destinations, addSafetyReport } = useDestinations();
  const { currentUser } = useAuth();

  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [destId, setDestId] = useState('ooty');
  const [placeName, setPlaceName] = useState('');
  const [category, setCategory] = useState('Road condition');
  const [severity, setSeverity] = useState('warning');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const categories = [
    'All',
    'Road condition',
    'Heavy crowd',
    'Blocked route',
    'Weather-related concern',
    'Location concern'
  ];

  const filteredReports = safetyReports.filter(
    (r) => filterCategory === 'All' || r.category === filterCategory
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !currentUser) return;

    addSafetyReport({
      destinationId: destId,
      placeName: placeName.trim() || 'General Route',
      category,
      severity,
      title: title.trim(),
      description: description.trim(),
      reportedBy: `${currentUser.name} (${currentUser.badge || 'Traveller'})`
    });

    setTitle('');
    setDescription('');
    setPlaceName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <ShieldAlert className="h-7 w-7 text-rose-600" />
            Community Safety & Route Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time peer alerts on road conditions, parking congestion, fog, and weather
          </p>
        </div>

        <Button
          variant="danger"
          size="md"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Submit Community Report
        </Button>
      </div>

      {/* Crucial Notice Banner */}
      <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Important Community Disclaimer: </strong>
          <span>
            These are peer-reported observations submitted and confirmed by fellow travellers. They do not constitute official government or municipal advisories. Always practice safe driving.
          </span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              filterCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <SafetyReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Create Safety Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Safety & Condition Report"
        subtitle="Help others avoid traffic bottlenecks, slippery spots, or road hazards"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Report Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              >
                <option value="Road condition">Road condition / Detour</option>
                <option value="Heavy crowd">Heavy crowd / Parking delay</option>
                <option value="Blocked route">Blocked route / Maintenance</option>
                <option value="Weather-related concern">Weather (Fog, Rain, Landslide)</option>
                <option value="Location concern">Location / Entry concern</option>
              </select>
            </div>
          </div>

          <Input
            label="Specific Location / Landmark"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="e.g. Doddabetta Junction Approach Road"
            required
          />

          <Input
            label="Short Summary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Narrow single-lane detour near Emerald bridge"
            required
          />

          <TextArea
            label="Detailed Observation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you experienced, delays expected, vehicle suitability (e.g. 4x4 recommended), and time observed..."
            rows={3}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="md" disabled={!title.trim() || !description.trim()}>
              Submit Community Report
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

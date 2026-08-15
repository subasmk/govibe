import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth, AVATAR_OPTIONS } from '../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      await registerUser(name, email, password, selectedAvatar);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 border border-brand-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join 14,000+ Travellers</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Create GoVIBE Account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Share your real visits and help thousands of travellers explore better
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Choose Avatar Option */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Choose Your Profile Photo (Optional)
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {/* Custom Initials Option */}
            <button
              type="button"
              onClick={() => setSelectedAvatar(null)}
              className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border-2 transition-all ${
                selectedAvatar === null
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm ring-2 ring-brand-200'
                  : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
              }`}
              title="Use custom initials avatar"
            >
              {name ? name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase() || 'ME' : 'ME'}
            </button>

            {/* Avatar Presets */}
            {AVATAR_OPTIONS.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAvatar(imgUrl)}
                className={`relative h-11 w-11 rounded-full overflow-hidden shrink-0 border-2 transition-all ${
                  selectedAvatar === imgUrl
                    ? 'border-brand-600 scale-105 shadow-sm ring-2 ring-brand-200'
                    : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Avatar option" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Full Name"
          type="text"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Swathi Krishnan"
          required
        />

        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <Input
          label="Create Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 6 characters"
          required
        />

        <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 border border-slate-100 space-y-1">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Community Welcome Note:
          </p>
          <p>
            Your fresh profile starts with <strong>0 saved places</strong> so you can bookmark your own favorite spots, track visits, and earn community contributor badges!
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full shadow-sm"
        >
          Create Community Account
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};

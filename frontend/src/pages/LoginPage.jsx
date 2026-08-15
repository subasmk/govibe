import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('rahul@govibe.travel');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithCredentials(email, password);
      navigate('/home');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 border border-brand-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Verified Traveller Access</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Sign in to GoVIBE</h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your travel communities, live safety reports, and AI itinerary planner
        </p>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
          {errorMsg}
        </div>
      )}

      {/* Regular Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. name@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
            <span>Remember me</span>
          </label>
          <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full shadow-sm"
        >
          Sign In
        </Button>
      </form>

      {/* Switch to Register */}
      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        New to GoVIBE?{' '}
        <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
          Create an account
        </Link>
      </div>
    </div>
  );
};

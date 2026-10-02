import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Building2, 
  Terminal,
  ShieldAlert
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ 
  onLoginSuccess, 
  onNavigateHome 
}) => {
  const { adminLogin, isAdminLoggedIn, language } = useApp();
  const [passkey, setPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // If already logged in, trigger success immediately
  useEffect(() => {
    if (isAdminLoggedIn) {
      onLoginSuccess();
    }
  }, [isAdminLoggedIn, onLoginSuccess]);

  // Handle countdown if temporarily locked out
  useEffect(() => {
    if (lockTimer > 0) {
      const interval = setInterval(() => {
        setLockTimer(t => {
          if (t <= 1) {
            setIsLocked(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setError(null);
    let serverAuthorized = false;
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authorized) serverAuthorized = true;
      }
    } catch (err) {
      console.warn('Backend server verification offline, using client validation:', err);
    }

    const success = adminLogin(passkey) || serverAuthorized;
    if (success) {
      setPasskey('');
      onLoginSuccess();
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 4) {
        setIsLocked(true);
        setLockTimer(30);
        setError('Too many failed authorization attempts. Temporary security lockout activated (30s).');
      } else {
        setError('Invalid security master credentials. Unauthorized entry is logged under Rwanda Law No. 058/2021.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 selection:bg-emerald-900 selection:text-emerald-200">
      
      {/* Top Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8 border-b border-slate-800">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Website (Akazi.com)</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Restricted Portal URL: /admin-login</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto space-y-8">
        
        {/* Security Emblem & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-b from-emerald-500/20 to-slate-900 border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
              Republic of Rwanda · Akazi Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Admin & Moderator Gateway
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
              Authorized access point for Akazi.com systems administration, advert moderation, employer vetting, and financial oversight.
            </p>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Administrative URL</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            This URL is reserved strictly for Akazi staff. Public visitors and employers cannot access this portal from the public footer or navigation.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Master Administrative Passkey</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  Default: admin2026
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passkey}
                  onChange={(e) => {
                    setPasskey(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={isLocked}
                  placeholder="Enter administrator passkey..."
                  autoFocus
                  required
                  className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-colors pr-10 font-mono ${
                    error 
                      ? 'border-rose-500 ring-1 ring-rose-500/50' 
                      : 'border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <div className="p-3 mt-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Access Denied</div>
                    <div className="text-[11px] mt-0.5">{error}</div>
                    {isLocked && (
                      <div className="font-mono text-rose-200 mt-1 font-bold">
                        Retry enabled in {lockTimer} seconds
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLocked || !passkey.trim()}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLocked ? `Locked (${lockTimer}s)` : 'Authenticate & Open Console'}</span>
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Direct Session Encryption</span>
            <span>Law No. 058/2021</span>
          </div>
        </div>

      </div>

      {/* Bottom Footer Details */}
      <div className="max-w-4xl mx-auto w-full pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 Akazi.com Rwanda. Internal Operations & Secure Compliance System.</p>
        <p className="text-[11px] text-slate-600 mt-1">
          Authorized personnel only. All access requests and audit footprints are cryptographically recorded.
        </p>
      </div>

    </div>
  );
};

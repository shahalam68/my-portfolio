'use client';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.post('/api/auth/login', { password });
      localStorage.setItem('admin_token', data.token);
      router.replace('/admin');
    } catch (err) {
      setError(err.message || 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-accent/5 blur-[200px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10 gap-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-accent flex items-center justify-center shadow-[0_10px_40px_rgba(0,255,153,0.3)]">
              <Zap size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black text-white tracking-tight">Admin Access</h1>
              <p className="text-white/30 text-xs mt-1 uppercase tracking-[0.3em] font-black">Portfolio CMS</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-11 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 font-black"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-black text-xs uppercase tracking-[0.3em] py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_-10px_rgba(0,255,153,0.4)]"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/10 text-[10px] mt-6 uppercase tracking-[0.5em] font-black">
          Shah Alam · Portfolio v2.0
        </p>
      </motion.div>
    </div>
  );
}

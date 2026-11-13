'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('AdminPassword2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center text-xs text-slate-400 hover:text-white mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Public Website
          </Link>

          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-gold-500/50 shadow-xl bg-white p-1">
            <img
              src="/images/logo.jpg"
              alt="Rahmani Islamic Center & Wa Raast Education System Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Institutional Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Rahmani Islamic Center & Wa Raast Education System
          </p>
        </div>

        <div className="bg-navy-900/90 border border-navy-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
              </button>
            </div>
          </form>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-gold-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold-500" />
              Default Credentials (Seeded):
            </span>
            <p>Username: <code className="text-white bg-navy-900 px-1 py-0.5 rounded">admin</code></p>
            <p>Password: <code className="text-white bg-navy-900 px-1 py-0.5 rounded">AdminPassword2026!</code></p>
          </div>

        </div>

      </div>
    </div>
  );
}

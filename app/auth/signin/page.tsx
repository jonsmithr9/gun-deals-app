'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email) {
        router.push('/account');
        return;
      }
    }

    // Demo mode - auto create if not exists
    const demoUser = {
      id: Date.now(),
      name: "Demo User",
      email: email,
      zipCode: "50266",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your deals and alerts</p>
        </div>

        <form onSubmit={handleSignIn} className="bg-gray-900 rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-medium text-lg disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-400 hover:underline">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
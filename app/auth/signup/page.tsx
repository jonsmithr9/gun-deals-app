'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple validation
    if (!name || !email || !password || !zipCode) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Create user object
    const newUser = {
      id: Date.now(),
      name,
      email,
      zipCode,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage (temporary - will be replaced with real auth later)
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redirect to account page
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join MyGunDeals to save favorites and get alerts</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-gray-900 rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-orange-500"
              placeholder="John Smith"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-400 mb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-orange-500"
              placeholder="50266"
              maxLength={5}
              required
            />
            <p className="text-xs text-gray-500 mt-2">Used to find nearby FFL dealers</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-medium text-lg disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-orange-400 hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
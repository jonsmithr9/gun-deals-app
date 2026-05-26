'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-4">My Account</h1>
          <p className="text-gray-400 mb-8">Sign in to save favorites, set alerts, and find local FFLs near you.</p>
          <div className="space-y-4">
            <Link href="/auth/signin" className="block w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-medium">
              Sign In
            </Link>
            <Link href="/auth/signup" className="block w-full bg-gray-800 hover:bg-gray-700 py-4 rounded-2xl font-medium">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Sign Out</button>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm text-gray-400 mb-3">Zip Code (for local FFLs)</label>
              <input 
                type="text" 
                maxLength={5}
                value={user?.zipCode || ''} 
                onChange={(e) => {
                  const updatedUser = { ...user, zipCode: e.target.value };
                  setUser(updatedUser);
                  localStorage.setItem('user', JSON.stringify(updatedUser));
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-orange-500"
                placeholder="50266"
              />
            </div>

            <div>
              <h3 className="font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                  <span>Email me when price alerts are triggered</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                  <span>Weekly deal summary</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/favorites" className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-3xl p-8 text-center transition-all">
            ❤️ My Favorites
          </Link>
          <Link href="/alerts" className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-3xl p-8 text-center transition-all">
            🔔 My Price Alerts
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

const mockDeals = [
  { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", image: "https://picsum.photos/id/1015/600/400" },
  { id: 2, title: "Federal American Eagle 5.56x45 55gr FMJ - 420 Rounds", price: 189.99, retailer: "Ammo.com", image: "https://picsum.photos/id/1074/600/400" },
  { id: 3, title: "Holosun HS507C-X2 Red Dot Sight", price: 229.99, retailer: "Primary Arms", image: "https://picsum.photos/id/201/600/400" },
  { id: 4, title: "PSA AR-15 Stealth Stripped Lower Receiver", price: 59.99, retailer: "Palmetto State Armory", image: "https://picsum.photos/id/180/600/400" },
  { id: 5, title: "Glock 43X MOS 9mm Pistol", price: 449.99, retailer: "Sportsman's Warehouse", image: "https://picsum.photos/id/106/600/400" },
  { id: 6, title: "Hornady 5.56x45 55gr FMJ - 500 Rounds", price: 229.99, retailer: "Target Sports USA", image: "https://picsum.photos/id/107/600/400" },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'alerts' | 'settings'>('favorites');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [savedZip, setSavedZip] = useState('');

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedAlerts = localStorage.getItem('priceAlerts');
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));

    const zip = localStorage.getItem('savedZip');
    if (zip) setSavedZip(zip);
  }, []);

  const favoritedDeals = mockDeals.filter(d => favorites.includes(d.id));
  const activeAlerts = mockDeals.filter(d => alerts.some(a => a.id === d.id));

  const saveZip = (zip: string) => {
    localStorage.setItem('savedZip', zip);
    setSavedZip(zip);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>
          <a href="/" className="text-orange-400 hover:underline">← Back to Deals</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold mb-8">My Account</h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8 overflow-x-auto">
          {(['favorites', 'alerts', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'border-b-2 border-orange-500 text-orange-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'favorites' && '❤️ Favorites'}
              {tab === 'alerts' && '🔔 Alerts'}
              {tab === 'settings' && '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            <h3 className="text-2xl mb-6">❤️ My Favorites ({favoritedDeals.length})</h3>
            {favoritedDeals.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                No favorites yet. Go back and heart some deals!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedDeals.map(deal => (
                  <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
                    <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                      <p className="text-gray-400">{deal.retailer}</p>
                      <h4 className="mt-2 font-medium leading-tight">{deal.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div>
            <h3 className="text-2xl mb-6">🔔 My Price Alerts ({activeAlerts.length})</h3>
            {activeAlerts.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                No price alerts set yet. Click the bell icon on any deal to get notified when prices drop.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAlerts.map(deal => (
                  <div key={deal.id} className="bg-gray-900 border border-green-700 rounded-3xl overflow-hidden">
                    <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                      <p className="text-gray-400">{deal.retailer}</p>
                      <h4 className="mt-2 font-medium leading-tight">{deal.title}</h4>
                      <div className="mt-4 text-green-400 text-sm font-medium">🔔 Alert Active</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-md">
            <h3 className="text-2xl mb-6">⚙️ Settings</h3>
            
            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
              <label className="block text-sm text-gray-400 mb-3">Default ZIP Code for Local Stock</label>
              <input
                type="text"
                value={savedZip}
                onChange={(e) => saveZip(e.target.value)}
                maxLength={5}
                placeholder="50309"
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-4">This ZIP code will be used for local inventory checks in future updates.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
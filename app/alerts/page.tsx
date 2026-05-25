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

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const savedAlerts = localStorage.getItem('priceAlerts');
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
  }, []);

  const activeAlerts = mockDeals.filter(deal => 
    alerts.some(a => a.id === deal.id)
  );

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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          🔔 My Price Alerts 
          <span className="text-2xl text-orange-400">({activeAlerts.length})</span>
        </h2>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-6">🔕</div>
            <p className="text-xl">No price alerts set yet.</p>
            <p className="mt-2">Click the bell icon on any deal on the main page to get notified when prices drop.</p>
            <a 
              href="/" 
              className="mt-8 inline-block bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-2xl font-medium"
            >
              Browse Hot Deals
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeAlerts.map(deal => (
              <div 
                key={deal.id} 
                className="bg-gray-900 border border-green-700 rounded-3xl overflow-hidden hover:border-orange-500 transition-all"
              >
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                  <p className="text-gray-400 mt-1">{deal.retailer}</p>
                  <h3 className="mt-3 font-medium leading-tight line-clamp-2">{deal.title}</h3>
                  
                  <div className="mt-6 bg-green-900/50 border border-green-700 rounded-2xl p-4 text-sm">
                    <p className="text-green-400 font-medium">🔔 Price Alert Active</p>
                    <p className="text-xs text-gray-400 mt-1">You'll be notified if the price drops below your target.</p>
                  </div>

                  <a
                    href="/"
                    className="block mt-6 w-full bg-orange-600 hover:bg-orange-500 text-center py-4 rounded-2xl font-medium transition-colors"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
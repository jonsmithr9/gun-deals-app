'use client';

import { useState, useEffect } from 'react';

const mockDeals = [
  {
    id: 1,
    title: "PSA 16\" 5.56 NATO Freedom Carbine",
    price: 399.99,
    retailer: "Palmetto State Armory",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=PSA+Freedom+Carbine",
  },
  {
    id: 2,
    title: "Federal American Eagle 5.56x45 55gr FMJ - 420 Rounds",
    price: 189.99,
    retailer: "Ammo.com",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=5.56+Federal",
  },
  {
    id: 3,
    title: "Holosun HS507C-X2 Red Dot Sight",
    price: 229.99,
    retailer: "Primary Arms",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Holosun+507C",
  },
  {
    id: 4,
    title: "PSA AR-15 Stealth Stripped Lower Receiver",
    price: 59.99,
    retailer: "Palmetto State Armory",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=PSA+Lower",
  },
  {
    id: 5,
    title: "Glock 43X MOS 9mm Pistol",
    price: 449.99,
    retailer: "Sportsman's Warehouse",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Glock+43X",
  },
  {
    id: 6,
    title: "Hornady 5.56x45 55gr FMJ - 500 Rounds",
    price: 229.99,
    retailer: "Target Sports USA",
    image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Hornady+5.56",
  },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const favoritedDeals = mockDeals.filter(deal => favorites.includes(deal.id));

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>
          <a href="/" className="text-orange-400 hover:underline flex items-center gap-2">
            ← Back to Deals
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          ❤️ My Favorites 
          <span className="text-2xl text-orange-400">({favoritedDeals.length})</span>
        </h2>

        {favoritedDeals.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-6">♡</div>
            <p className="text-xl">No favorites yet.</p>
            <p className="mt-2">Go back and heart some deals!</p>
            <a 
              href="/" 
              className="mt-8 inline-block bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-2xl font-medium"
            >
              Browse Hot Deals
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedDeals.map(deal => (
              <div 
                key={deal.id} 
                className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 transition-all"
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
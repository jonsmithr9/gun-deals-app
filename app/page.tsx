'use client';

import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const deals = [
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", image: "https://picsum.photos/id/1015/600/400" },
    { id: 2, title: "Federal 5.56 Ammo - 420 Rounds", price: 189.99, retailer: "Ammo.com", image: "https://picsum.photos/id/1074/600/400" },
    { id: 3, title: "Holosun HS507C Red Dot", price: 229.99, retailer: "Primary Arms", image: "https://picsum.photos/id/201/600/400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black p-6">
        <h1 className="text-4xl font-bold">My<span className="text-orange-500">GunDeals</span></h1>
      </header>

      <div className="p-6">
        <input
          type="text"
          placeholder="Search deals..."
          className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {deals.map(deal => (
          <div key={deal.id} className="bg-gray-900 rounded-3xl overflow-hidden">
            <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-2xl font-bold text-orange-400">${deal.price}</p>
              <p className="text-gray-400">{deal.retailer}</p>
              <h3 className="mt-2">{deal.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
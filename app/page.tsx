'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [zipCode, setZipCode] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const categories = ['All', 'Rifles', 'Ammo', 'Optics', 'Handguns', 'Parts'];

  // 6 Realistic Deals
  const deals = [
    {
      id: 1,
      title: "PSA 16\" 5.56 NATO Freedom Carbine",
      price: 399.99,
      oldPrice: 449.99,
      retailer: "Palmetto State Armory",
      category: "Rifles",
      link: "https://palmettostatearmory.com",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=PSA+Freedom+Carbine",
      rating: 4.8,
      shipping: 12.99,
      fflFee: 25,
    },
    {
      id: 2,
      title: "Federal American Eagle 5.56x45 55gr FMJ - 420 Rounds",
      price: 189.99,
      oldPrice: 219.99,
      retailer: "Ammo.com",
      category: "Ammo",
      link: "https://ammo.com",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=5.56+Federal",
      rating: 4.9,
      shipping: 19.99,
      fflFee: 0,
    },
    {
      id: 3,
      title: "Holosun HS507C-X2 Red Dot Sight",
      price: 229.99,
      oldPrice: 259.99,
      retailer: "Primary Arms",
      category: "Optics",
      link: "https://primaryarms.com",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Holosun+507C",
      rating: 4.7,
      shipping: 9.99,
      fflFee: 0,
    },
    {
      id: 4,
      title: "PSA AR-15 Stealth Stripped Lower Receiver",
      price: 59.99,
      oldPrice: 79.99,
      retailer: "Palmetto State Armory",
      category: "Parts",
      link: "https://palmettostatearmory.com",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=PSA+Lower",
      rating: 4.6,
      shipping: 8.99,
      fflFee: 25,
    },
    {
      id: 5,
      title: "Glock 43X MOS 9mm Pistol",
      price: 449.99,
      oldPrice: 499.99,
      retailer: "Sportsman's Warehouse",
      category: "Handguns",
      link: "#",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Glock+43X",
      rating: 4.8,
      shipping: 14.99,
      fflFee: 25,
    },
    {
      id: 6,
      title: "Hornady 5.56x45 55gr FMJ - 500 Rounds",
      price: 229.99,
      oldPrice: 269.99,
      retailer: "Target Sports USA",
      category: "Ammo",
      link: "#",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Hornady+5.56",
      rating: 4.5,
      shipping: 24.99,
      fflFee: 0,
    },
  ];

  const filteredDeals = deals.filter(deal => 
    (selectedCategory === 'All' || deal.category === selectedCategory) &&
    (deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     deal.retailer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const calculateTrueCost = (price: number, shipping: number, ffl: number) => 
    (price + shipping + ffl).toFixed(2);

  const percentOff = (oldPrice: number | undefined, price: number) => 
    oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="/" className="hover:text-orange-400 transition-colors">Deals</a>
            <a 
              href="/favorites" 
              className="hover:text-orange-400 transition-colors flex items-center gap-2"
            >
              ❤️ Favorites 
              <span className="bg-gray-900 px-2.5 py-0.5 rounded-full text-xs font-mono">
                {favorites.length}
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search rifles, 9mm, optics, PSA..."
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">🔍</div>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="ZIP Code for local stock"
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-orange-500"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={5}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-900 border border-gray-700 hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Hot Deals Right Now ({filteredDeals.length})</h2>
          {zipCode && <p className="text-orange-400">📍 Checking stock near {zipCode}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            const savings = percentOff(deal.oldPrice, deal.price);
            const isFavorite = favorites.includes(deal.id);

            return (
              <div 
                key={deal.id} 
                className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 transition-all relative"
              >
                <button
                  onClick={() => toggleFavorite(deal.id)}
                  className="absolute top-4 right-4 z-10 text-3xl transition-all hover:scale-110"
                >
                  {isFavorite ? '❤️' : '♡'}
                </button>

                <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                      {deal.oldPrice && (
                        <p className="text-sm line-through text-gray-500">${deal.oldPrice}</p>
                      )}
                    </div>
                    <div className="text-yellow-400">★ {deal.rating}</div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3">{deal.retailer}</p>
                  <h3 className="font-medium leading-tight mb-4 line-clamp-2">{deal.title}</h3>

                  {savings > 0 && (
                    <div className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full mb-4">
                      {savings}% OFF
                    </div>
                  )}

                  <div className="bg-gray-950 border border-gray-700 rounded-2xl p-4 mb-5 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">True Cost (est.)</span>
                      <span className="font-bold text-orange-400">${trueCost}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      +${deal.shipping} shipping + ~${deal.fflFee} FFL
                    </div>
                  </div>

                  <a
                    href={deal.link}
                    target="_blank"
                    className="block w-full bg-orange-600 hover:bg-orange-500 text-center py-4 rounded-2xl font-medium transition-colors"
                  >
                    Visit Deal →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
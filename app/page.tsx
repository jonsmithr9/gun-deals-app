'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [zipCode, setZipCode] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [showAlertToast, setShowAlertToast] = useState(false);
  const [alertedDeal, setAlertedDeal] = useState('');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedAlerts = localStorage.getItem('priceAlerts');
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));
  }, [alerts]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const togglePriceAlert = (deal: any) => {
    const existing = alerts.find(a => a.id === deal.id);
    if (existing) {
      setAlerts(alerts.filter(a => a.id !== deal.id));
    } else {
      setAlerts([...alerts, { ...deal, targetPrice: Math.floor(deal.price * 0.9) }]);
      setAlertedDeal(deal.title);
      setShowAlertToast(true);
      setTimeout(() => setShowAlertToast(false), 2500);
    }
  };

  const categories = ['All', 'Rifles', 'Ammo', 'Optics', 'Handguns', 'Parts'];

  const deals = [
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, oldPrice: 449.99, retailer: "Palmetto State Armory", category: "Rifles", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", rating: 4.8, shipping: 12.99, fflFee: 25 },
    { id: 2, title: "Federal American Eagle 5.56x45 55gr FMJ - 420 Rounds", price: 189.99, oldPrice: 219.99, retailer: "Ammo.com", category: "Ammo", link: "https://ammo.com", image: "https://picsum.photos/id/1074/600/400", rating: 4.9, shipping: 19.99, fflFee: 0 },
    { id: 3, title: "Holosun HS507C-X2 Red Dot Sight", price: 229.99, oldPrice: 259.99, retailer: "Primary Arms", category: "Optics", link: "https://primaryarms.com", image: "https://picsum.photos/id/201/600/400", rating: 4.7, shipping: 9.99, fflFee: 0 },
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

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="/" className="hover:text-orange-400">Deals</a>
            <a href="/alerts" className="hover:text-orange-400">🔔 Alerts</a>
            <a href="/favorites" className="hover:text-orange-400">❤️ Favorites</a>
            <a href="/account" className="hover:text-orange-400">👤 Account</a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black px-6 py-6 flex flex-col gap-4 text-lg">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Deals</a>
            <a href="/alerts" onClick={() => setIsMobileMenuOpen(false)}>🔔 Alerts</a>
            <a href="/favorites" onClick={() => setIsMobileMenuOpen(false)}>❤️ Favorites</a>
            <a href="/account" onClick={() => setIsMobileMenuOpen(false)}>👤 Account</a>
          </div>
        )}
      </header>

      {showAlertToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50">
          🔔 Price alert set for {alertedDeal}
        </div>
      )}

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
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-semibold mb-6">Hot Deals ({filteredDeals.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            const savings = percentOff(deal.oldPrice, deal.price);
            const isFavorite = favorites.includes(deal.id);
            const hasAlert = alerts.some(a => a.id === deal.id);

            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 transition-all relative">
                <button onClick={() => toggleFavorite(deal.id)} className="absolute top-4 right-14 z-20 text-3xl">
                  {isFavorite ? '❤️' : '♡'}
                </button>
                <button onClick={() => togglePriceAlert(deal)} className={`absolute top-4 right-4 z-20 text-2xl ${hasAlert ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}>
                  {hasAlert ? '🔔' : '🔕'}
                </button>

                <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover bg-gray-800" />

                <div className="p-6">
                  <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                  <p className="text-gray-400">{deal.retailer}</p>
                  <h3 className="mt-2 font-medium">{deal.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
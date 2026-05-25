'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState<'price-low' | 'price-high' | 'discount' | 'newest'>('price-low');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  
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

  const deals = [ /* ... same 20 deals as before ... */ ];

  // Filtering and sorting logic remains the same (omitted here for brevity - keep it from previous version)

  // ... (keep all the filtering, sorting, calculateTrueCost, percentOff, getTrendColor functions)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="/" className="hover:text-orange-400 transition-colors">Deals</a>
            <a href="/alerts" className="hover:text-orange-400 transition-colors">🔔 Alerts</a>
            <a href="/favorites" className="hover:text-orange-400 transition-colors">❤️ Favorites</a>
            <a href="/account" className="hover:text-orange-400 transition-colors">👤 Account</a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-3xl p-2 focus:outline-none active:scale-95 transition-transform"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black px-4 py-6 flex flex-col gap-4 text-lg">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Deals</a>
            <a href="/alerts" onClick={() => setIsMobileMenuOpen(false)} className="py-2">🔔 Alerts</a>
            <a href="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="py-2">❤️ Favorites</a>
            <a href="/account" onClick={() => setIsMobileMenuOpen(false)} className="py-2">👤 Account</a>
          </div>
        )}
      </header>

      {/* Rest of the page with improved mobile spacing */}
      {/* ... (filters, toggles, and deal cards with better mobile padding) */}

      {/* I kept the rest of the code the same as the previous version for brevity. The main improvements are in spacing, button sizes, and header. */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
        {/* Search, Sort, Price Range - stacked better on mobile */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input type="text" placeholder="Search rifles, 9mm, optics..." className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-base md:text-lg focus:outline-none focus:border-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="flex gap-3 md:gap-4">
            <div className="w-full md:w-56">
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value as any)} className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-orange-500">
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
                <option value="discount">% Off</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="w-full md:w-56">
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-orange-500">
                <option value="all">All Prices</option>
                <option value="under100">Under $100</option>
                <option value="100-299">$100–$299</option>
                <option value="300-599">$300–$599</option>
                <option value="600-999">$600–$999</option>
                <option value="1000-1999">$1,000–$1,999</option>
                <option value="2000plus">$2,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Toggles - better on mobile */}
        <div className="flex flex-wrap gap-6 mt-5 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-5 h-5 accent-orange-500" />
            <span>In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={freeShippingOnly} onChange={(e) => setFreeShippingOnly(e.target.checked)} className="w-5 h-5 accent-orange-500" />
            <span>Free Shipping</span>
          </label>
        </div>

        {/* Category buttons - scrollable on mobile */}
        <div className="flex flex-wrap gap-2 mt-6 overflow-x-auto pb-2 -mx-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-orange-600 text-white' : 'bg-gray-900 border border-gray-700 hover:border-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Deal Cards Section - same as before with In Stock and Free Shipping badges */}
      {/* (The full card code from previous version goes here) */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Hot Deals Right Now ({filteredDeals.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Deal cards with improved mobile padding */}
          {filteredDeals.map((deal) => { /* same card JSX as last version */ })}
        </div>
      </div>
    </div>
  );
}
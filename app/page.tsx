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

  const deals = [ /* Keep all 20 deals from the previous version */ ];

  // Filtering and sorting logic (same as before)
  let filteredDeals = deals.filter(/* ... */);

  if (sortOption === 'price-low') filteredDeals.sort((a, b) => a.price - b.price);
  else if (sortOption === 'price-high') filteredDeals.sort((a, b) => b.price - a.price);
  else if (sortOption === 'discount') {
    filteredDeals.sort((a, b) => {
      const da = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) * 100 : 0;
      const db = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) * 100 : 0;
      return db - da;
    });
  } else if (sortOption === 'newest') {
    filteredDeals = [...filteredDeals].reverse();
  }

  const calculateTrueCost = (price: number, shipping: number, ffl: number) => 
    (price + shipping + ffl).toFixed(2);

  const percentOff = (oldPrice: number | undefined, price: number) => 
    oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const getTrendColor = (history: number[]) => {
    if (history.length < 2) return 'bg-orange-500';
    const first = history[0];
    const last = history[history.length - 1];
    if (last < first * 0.97) return 'bg-green-500';
    if (last > first * 1.03) return 'bg-red-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
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

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-3xl p-2 focus:outline-none active:scale-95 transition-transform">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black px-4 py-6 flex flex-col gap-4 text-lg">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Deals</a>
            <a href="/alerts" onClick={() => setIsMobileMenuOpen(false)}>🔔 Alerts</a>
            <a href="/favorites" onClick={() => setIsMobileMenuOpen(false)}>❤️ Favorites</a>
            <a href="/account" onClick={() => setIsMobileMenuOpen(false)}>👤 Account</a>
          </div>
        )}
      </header>

      {showAlertToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 border border-green-500">
          🔔 Price alert set for {alertedDeal}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <input type="text" placeholder="Search rifles, 9mm, optics..." className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3.5 text-base focus:outline-none focus:border-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">🔍</div>
          </div>

          <div className="flex gap-3">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value as any)} className="bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500 md:w-52">
              <option value="price-low">Price Low-High</option>
              <option value="price-high">Price High-Low</option>
              <option value="discount">% Off</option>
              <option value="newest">Newest</option>
            </select>

            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500 md:w-52">
              <option value="all">All Prices</option>
              <option value="under100">Under $100</option>
              <option value="100-299">$100–$299</option>
              <option value="300-599">$300–$599</option>
              <option value="600-999">$600–$999</option>
              <option value="1000-1999">$1k–$2k</option>
              <option value="2000plus">$2,000+</option>
            </select>
          </div>
        </div>

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

        <div className="flex gap-2 mt-6 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-900 border border-gray-700 hover:border-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Hot Deals Right Now ({filteredDeals.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            const savings = percentOff(deal.oldPrice, deal.price);
            const isFavorite = favorites.includes(deal.id);
            const hasAlert = alerts.some(a => a.id === deal.id);
            const trendColor = getTrendColor(deal.priceHistory);
            const maxPrice = Math.max(...deal.priceHistory);

            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all relative group">
                <button onClick={() => toggleFavorite(deal.id)} className="absolute top-4 right-14 z-20 text-3xl active:scale-125 transition-transform">{isFavorite ? '❤️' : '♡'}</button>
                <button onClick={() => togglePriceAlert(deal)} className={`absolute top-4 right-4 z-20 text-2xl ${hasAlert ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'} active:scale-125 transition-transform`}>{hasAlert ? '🔔' : '🔕'}</button>

                <div className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs font-bold rounded-full ${deal.inStock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {deal.inStock ? '✅ IN STOCK' : '❌ OUT OF STOCK'}
                </div>

                {deal.shipping === 0 && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-bold rounded-full bg-blue-600 text-white ml-28">
                    🚚 FREE SHIPPING
                  </div>
                )}

                <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover bg-gray-800" />

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                      {deal.oldPrice && <p className="text-sm line-through text-gray-500">${deal.oldPrice}</p>}
                    </div>
                    <div className="text-yellow-400">★ {deal.rating}</div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3">{deal.retailer}</p>
                  <h3 className="font-medium leading-tight mb-4 line-clamp-2">{deal.title}</h3>

                  {savings > 0 && <div className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full mb-4">{savings}% OFF</div>}

                  <div className="mb-5">
                    <p className="text-xs text-gray-500 mb-2">Price Trend (Last 5 Days)</p>
                    <div className="flex items-end gap-1 h-14 bg-gray-950 rounded-xl p-2 relative">
                      {deal.priceHistory.map((p, i) => (
                        <div key={i} className={`${trendColor} hover:brightness-110 rounded-t flex-1 transition-all relative group`} style={{ height: `${(p / maxPrice) * 100}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30">
                            ${p}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-950 border border-gray-700 rounded-2xl p-4 mb-5 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">True Cost (est.)</span>
                      <span className="font-bold text-orange-400">${trueCost}</span>
                    </div>
                    <div className="text-xs text-gray-500">+${deal.shipping} shipping + ~${deal.fflFee} FFL</div>
                  </div>

                  <a href={deal.link} target="_blank" className="block w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-center py-4 rounded-2xl font-medium transition-colors">
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
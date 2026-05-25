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

  const deals = [
    // (same 20 deals as before - keeping them for consistency)
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, oldPrice: 449.99, retailer: "Palmetto State Armory", category: "Rifles", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", rating: 4.8, shipping: 12.99, fflFee: 25, priceHistory: [459, 429, 449, 399, 399.99], inStock: true },
    // ... (all other deals remain the same)
  ];

  // Filtering and sorting logic (same as previous)

  let filteredDeals = deals.filter(/* filtering logic */);

  // ... (keep all helper functions: calculateTrueCost, percentOff, getTrendColor)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header and filters remain the same as last version */}

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
                        <div 
                          key={i} 
                          className={`${trendColor} hover:brightness-110 rounded-t flex-1 transition-all relative group cursor-help`} 
                          style={{ height: `${(p / maxPrice) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30">
                            ${p.toFixed(2)}
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
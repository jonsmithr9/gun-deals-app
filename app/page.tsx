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
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, oldPrice: 449.99, retailer: "Palmetto State Armory", category: "Rifles", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", rating: 4.8, shipping: 12.99, fflFee: 25, priceHistory: [459, 429, 449, 399, 399.99], inStock: true },
    { id: 2, title: "Ruger AR-556 5.56 NATO Rifle", price: 689.99, oldPrice: 749.99, retailer: "Sportsman's Warehouse", category: "Rifles", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.7, shipping: 14.99, fflFee: 25, priceHistory: [749, 719, 699, 689.99, 689.99], inStock: true },
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, oldPrice: 1999.99, retailer: "Primary Arms", category: "Rifles", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.9, shipping: 19.99, fflFee: 25, priceHistory: [1999, 1950, 1929, 1899.99, 1899.99], inStock: true },
    { id: 4, title: "Smith & Wesson M&P15 Sport II", price: 549.99, oldPrice: 599.99, retailer: "GunBroker", category: "Rifles", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.6, shipping: 15.99, fflFee: 25, priceHistory: [599, 579, 559, 549.99, 549.99], inStock: false },
    { id: 5, title: "Sig Sauer MCX Virtus Patrol", price: 2299.99, oldPrice: 2499.99, retailer: "Palmetto State Armory", category: "Rifles", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.8, shipping: 24.99, fflFee: 25, priceHistory: [2499, 2399, 2329, 2299.99, 2299.99], inStock: true },
    { id: 6, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, oldPrice: 549.99, retailer: "Primary Arms", category: "Handguns", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.9, shipping: 12.99, fflFee: 25, priceHistory: [549, 529, 509, 499.99, 499.99], inStock: true },
    { id: 7, title: "Sig Sauer P320 Compact 9mm", price: 449.99, oldPrice: 499.99, retailer: "Sportsman's Warehouse", category: "Handguns", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.7, shipping: 0, fflFee: 25, priceHistory: [499, 479, 459, 449.99, 449.99], inStock: true },
    { id: 8, title: "Smith & Wesson Shield Plus 9mm", price: 379.99, oldPrice: 429.99, retailer: "Palmetto State Armory", category: "Handguns", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.8, shipping: 9.99, fflFee: 25, priceHistory: [429, 409, 389, 379.99, 379.99], inStock: true },
    { id: 9, title: "Ruger LCP II .380 ACP", price: 249.99, oldPrice: 289.99, retailer: "Ammo.com", category: "Handguns", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.5, shipping: 8.99, fflFee: 25, priceHistory: [289, 269, 259, 249.99, 249.99], inStock: false },
    { id: 10, title: "Holosun HS507C-X2 Red Dot", price: 229.99, oldPrice: 259.99, retailer: "Primary Arms", category: "Optics", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.8, shipping: 0, fflFee: 0, priceHistory: [259, 249, 239, 229.99, 229.99], inStock: true },
    { id: 11, title: "Vortex Viper PST Gen II 3-15x44", price: 699.99, oldPrice: 799.99, retailer: "MidwayUSA", category: "Optics", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.9, shipping: 0, fflFee: 0, priceHistory: [799, 749, 719, 699.99, 699.99], inStock: true },
    { id: 12, title: "EOTech EXPS3-0 Holographic Sight", price: 599.99, oldPrice: 649.99, retailer: "Palmetto State Armory", category: "Optics", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.7, shipping: 12.99, fflFee: 0, priceHistory: [649, 629, 609, 599.99, 599.99], inStock: true },
    { id: 13, title: "Sig Sauer Romeo5 Red Dot", price: 129.99, oldPrice: 149.99, retailer: "Sportsman's Warehouse", category: "Optics", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.6, shipping: 0, fflFee: 0, priceHistory: [149, 139, 129.99, 129.99, 129.99], inStock: true },
    { id: 14, title: "Federal American Eagle 5.56 55gr FMJ - 420 Rounds", price: 189.99, oldPrice: 219.99, retailer: "Ammo.com", category: "Ammo", link: "#", image: "https://picsum.photos/id/1074/600/400", rating: 4.8, shipping: 0, fflFee: 0, priceHistory: [229, 209, 199, 189.99, 189.99], inStock: true },
    { id: 15, title: "Hornady 9mm 115gr FMJ - 500 Rounds", price: 149.99, oldPrice: 169.99, retailer: "Target Sports USA", category: "Ammo", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.7, shipping: 0, fflFee: 0, priceHistory: [179, 169, 159, 149.99, 149.99], inStock: true },
    { id: 16, title: "Blazer Brass 9mm 124gr - 1000 Rounds", price: 289.99, oldPrice: 319.99, retailer: "Palmetto State Armory", category: "Ammo", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.6, shipping: 24.99, fflFee: 0, priceHistory: [319, 299, 289.99, 289.99, 289.99], inStock: false },
    { id: 17, title: "Winchester White Box 5.56 55gr - 300 Rounds", price: 139.99, oldPrice: 159.99, retailer: "MidwayUSA", category: "Ammo", link: "#", image: "https://picsum.photos/id/1015/600/400", rating: 4.5, shipping: 19.99, fflFee: 0, priceHistory: [159, 149, 139.99, 139.99, 139.99], inStock: true },
    { id: 18, title: "Magpul MOE Carbine Stock", price: 44.99, oldPrice: 54.99, retailer: "Primary Arms", category: "Parts", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.8, shipping: 8.99, fflFee: 0, priceHistory: [54.99, 49.99, 44.99, 44.99, 44.99], inStock: true },
    { id: 19, title: "Streamlight TLR-7A Weapon Light", price: 139.99, oldPrice: 159.99, retailer: "Palmetto State Armory", category: "Parts", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.7, shipping: 0, fflFee: 0, priceHistory: [159, 149, 139.99, 139.99, 139.99], inStock: true },
    { id: 20, title: "Blue Force Gear Vickers Sling", price: 69.99, oldPrice: 79.99, retailer: "MidwayUSA", category: "Parts", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.9, shipping: 0, fflFee: 0, priceHistory: [79.99, 74.99, 69.99, 69.99, 69.99], inStock: true },
  ];

  let filteredDeals = deals.filter(deal => {
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || deal.retailer.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const p = deal.price;
      if (priceRange === 'under100') matchesPrice = p < 100;
      else if (priceRange === '100-299') matchesPrice = p >= 100 && p <= 299;
      else if (priceRange === '300-599') matchesPrice = p >= 300 && p <= 599;
      else if (priceRange === '600-999') matchesPrice = p >= 600 && p <= 999;
      else if (priceRange === '1000-1999') matchesPrice = p >= 1000 && p <= 1999;
      else if (priceRange === '2000plus') matchesPrice = p >= 2000;
    }

    const matchesStock = !inStockOnly || deal.inStock;
    const matchesShipping = !freeShippingOnly || deal.shipping === 0;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock && matchesShipping;
  });

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
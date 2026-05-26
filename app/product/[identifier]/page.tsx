'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const identifier = params.identifier as string;

  const [productDeals, setProductDeals] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<any>(null);

  // Mock data (expand as needed)
  const allDeals = [
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", category: "Rifles", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", rating: 4.8, shipping: 12.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 2, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, retailer: "Primary Arms", category: "Handguns", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.9, shipping: 12.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, retailer: "Primary Arms", category: "Rifles", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.9, shipping: 19.99, fflFee: 25, upc: "815604018289", sku: "DDM4V7", inStock: true },
    { id: 4, title: "Smith & Wesson M&P15 Sport II", price: 549.99, retailer: "GunBroker", category: "Rifles", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.6, shipping: 15.99, fflFee: 25, upc: "022188869217", sku: "MP15-SPORT2", inStock: false },
    { id: 5, title: "Sig Sauer MCX Virtus Patrol", price: 2299.99, retailer: "Palmetto State Armory", category: "Rifles", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.8, shipping: 24.99, fflFee: 25, upc: "798681617456", sku: "MCX-VIRTUS", inStock: true },
    // Add more deals as needed...
  ];

  useEffect(() => {
    const matchingDeals = allDeals.filter(deal => 
      (deal.upc && deal.upc === identifier) || 
      (deal.sku && deal.sku === identifier)
    );

    if (matchingDeals.length > 0) {
      setProductDeals(matchingDeals);
      setProductInfo({
        title: matchingDeals[0].title,
        upc: matchingDeals[0].upc,
        sku: matchingDeals[0].sku
      });
    }
  }, [identifier]);

  if (productDeals.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">No deals found for this UPC or SKU.</p>
          <Link href="/" className="bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-2xl inline-block">
            ← Back to All Deals
          </Link>
        </div>
      </div>
    );
  }

  const sortedDeals = [...productDeals].sort((a, b) => 
    (a.price + a.shipping + a.fflFee) - (b.price + b.shipping + b.fflFee)
  );

  const calculateTrueCost = (price: number, shipping: number, ffl: number) => 
    (price + shipping + ffl).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>
          <Link href="/" className="text-orange-400 hover:text-orange-300">
            ← Back to All Deals
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-12">
        <h1 className="text-3xl font-bold mb-2">{productInfo?.title}</h1>
        <div className="text-gray-400 mb-8 space-y-1">
          {productInfo?.upc && <p>UPC: {productInfo.upc}</p>}
          {productInfo?.sku && <p>SKU: {productInfo.sku}</p>}
        </div>

        <h2 className="text-xl font-semibold mb-6">Available Deals ({sortedDeals.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all">
                <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover bg-gray-800" />

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                      <p className="text-sm text-gray-400">True Cost: <span className="font-bold text-orange-400">${trueCost}</span></p>
                    </div>
                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${deal.inStock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {deal.inStock ? '✅ IN STOCK' : '❌ OUT OF STOCK'}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{deal.retailer}</p>

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
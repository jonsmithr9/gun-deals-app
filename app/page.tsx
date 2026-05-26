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

  // Mock data - In the future this would come from a database
  const allDeals = [
    // Same 20 deals as your main page (shortened for brevity)
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true, shipping: 12.99, fflFee: 25 },
    { id: 2, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, retailer: "Primary Arms", upc: "764503036958", sku: "G19-GEN5", inStock: true, shipping: 12.99, fflFee: 25 },
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, retailer: "Primary Arms", upc: "815604018289", sku: "DDM4V7", inStock: true, shipping: 19.99, fflFee: 25 },
    // Add all other deals from your main page here...
  ];

  useEffect(() => {
    // Find all deals with matching UPC or SKU
    const matchingDeals = allDeals.filter(deal => 
      deal.upc === identifier || deal.sku === identifier
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

  const calculateTrueCost = (price: number, shipping: number, ffl: number) => 
    (price + shipping + ffl).toFixed(2);

  if (productDeals.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">No deals found for this UPC or SKU.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-2xl"
          >
            Back to Deals
          </button>
        </div>
      </div>
    );
  }

  // Sort by True Cost
  const sortedDeals = [...productDeals].sort((a, b) => 
    (a.price + a.shipping + a.fflFee) - (b.price + b.shipping + b.fflFee)
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            My<span className="text-orange-500">GunDeals</span>
          </h1>
          <button 
            onClick={() => router.push('/')}
            className="text-orange-400 hover:text-orange-300"
          >
            ← Back to All Deals
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h1 className="text-3xl font-bold mb-2">{productInfo?.title}</h1>
        <div className="text-gray-400 mb-8">
          {productInfo?.upc && <p>UPC: {productInfo.upc}</p>}
          {productInfo?.sku && <p>SKU: {productInfo.sku}</p>}
        </div>

        <h2 className="text-xl font-semibold mb-6">Available Deals ({sortedDeals.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                    <p className="text-sm text-gray-400">True Cost: <span className="text-orange-400 font-bold">${trueCost}</span></p>
                  </div>
                  <div className={`px-3 py-1 text-xs font-bold rounded-full ${deal.inStock ? 'bg-green-600' : 'bg-red-600'}`}>
                    {deal.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                  </div>
                </div>

                <p className="font-medium mb-1">{deal.retailer}</p>
                <p className="text-sm text-gray-400 mb-6">+${deal.shipping} shipping + ~${deal.fflFee} FFL</p>

                <a href={deal.link} target="_blank" className="block w-full bg-orange-600 hover:bg-orange-500 text-center py-4 rounded-2xl font-medium transition-colors">
                  Visit Deal →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
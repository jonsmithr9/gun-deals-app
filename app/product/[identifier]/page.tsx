'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const identifier = params.identifier as string;

  const [productDeals, setProductDeals] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<any>(null);

  // Expanded mock data with multiple retailers per product
  const allDeals = [
    // PSA Freedom Carbine - 3 retailers
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", shipping: 12.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 21, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 419.99, retailer: "Sportsman's Warehouse", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 14.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 22, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 389.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 9.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },

    // Glock 19 - 3 retailers
    { id: 2, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 12.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 23, title: "Glock 19 Gen5 9mm Pistol", price: 519.99, retailer: "Sportsman's Warehouse", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 0, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 24, title: "Glock 19 Gen5 9mm Pistol", price: 489.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 14.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },

    // Daniel Defense - 2 retailers
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/201/600/400", shipping: 19.99, fflFee: 25, upc: "815604018289", sku: "DDM4V7", inStock: true },
    { id: 25, title: "Daniel Defense DDM4 V7 5.56", price: 1929.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/201/600/400", shipping: 24.99, fflFee: 25, upc: "815604018289", sku: "DDM4V7", inStock: true },

    // Add more products as needed...
    { id: 4, title: "Smith & Wesson M&P15 Sport II", price: 549.99, retailer: "GunBroker", link: "#", image: "https://picsum.photos/id/106/600/400", shipping: 15.99, fflFee: 25, upc: "022188869217", sku: "MP15-SPORT2", inStock: false },
    { id: 5, title: "Sig Sauer MCX Virtus Patrol", price: 2299.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 24.99, fflFee: 25, upc: "798681617456", sku: "MCX-VIRTUS", inStock: true },
    { id: 6, title: "Holosun HS507C-X2 Red Dot", price: 229.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/201/600/400", shipping: 0, fflFee: 0, upc: "605930624694", sku: "HS507C-X2", inStock: true },
  ];

  useEffect(() => {
    const matching = allDeals.filter(deal => 
      (deal.upc === identifier) || (deal.sku === identifier)
    );

    if (matching.length > 0) {
      setProductDeals(matching);
      setProductInfo({
        title: matching[0].title,
        upc: matching[0].upc,
        sku: matching[0].sku,
        image: matching[0].image
      });
    }
  }, [identifier]);

  if (productDeals.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
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
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <img 
            src={productInfo?.image} 
            alt={productInfo?.title} 
            className="w-full md:w-80 h-64 md:h-80 object-cover rounded-3xl bg-gray-800 flex-shrink-0" 
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{productInfo?.title}</h1>
            <div className="text-gray-400 space-y-2">
              {productInfo?.upc && <p><span className="text-gray-500">UPC:</span> {productInfo.upc}</p>}
              {productInfo?.sku && <p><span className="text-gray-500">SKU:</span> {productInfo.sku}</p>}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">Available from {sortedDeals.length} Retailers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedDeals.map((deal) => {
            const trueCost = calculateTrueCost(deal.price, deal.shipping, deal.fflFee);
            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-orange-500 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                    <p className="text-sm text-gray-400">True Cost ≈ <span className="font-bold text-orange-400">${trueCost}</span></p>
                  </div>
                  <div className={`px-3 py-1 text-xs font-bold rounded-full ${deal.inStock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {deal.inStock ? '✅ IN STOCK' : '❌ OUT OF STOCK'}
                  </div>
                </div>

                <p className="font-medium text-lg">{deal.retailer}</p>

                <a href={deal.link} target="_blank" className="mt-6 block w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-center py-4 rounded-2xl font-medium transition-colors">
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
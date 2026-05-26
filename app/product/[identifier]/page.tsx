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
  const [loading, setLoading] = useState(true);

  // Mock database of all deals (expand this as you add more)
  const allDeals = [
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", category: "Rifles", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", rating: 4.8, shipping: 12.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 2, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, retailer: "Primary Arms", category: "Handguns", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.9, shipping: 12.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, retailer: "Primary Arms", category: "Rifles", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.9, shipping: 19.99, fflFee: 25, upc: "815604018289", sku: "DDM4V7", inStock: true },
    { id: 4, title: "Smith & Wesson M&P15 Sport II", price: 549.99, retailer: "GunBroker", category: "Rifles", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.6, shipping: 15.99, fflFee: 25, upc: "022188869217", sku: "MP15-SPORT2", inStock: false },
    { id: 5, title: "Sig Sauer MCX Virtus Patrol", price: 2299.99, retailer: "Palmetto State Armory", category: "Rifles", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.8, shipping: 24.99, fflFee: 25, upc: "798681617456", sku: "MCX-VIRTUS", inStock: true },
    { id: 6, title: "Holosun HS507C-X2 Red Dot", price: 229.99, retailer: "Primary Arms", category: "Optics", link: "#", image: "https://picsum.photos/id/201/600/400", rating: 4.8, shipping: 0, fflFee: 0, upc: "605930624694", sku: "HS507C-X2", inStock: true },
    { id: 7, title: "Vortex Viper PST Gen II 3-15x44", price: 699.99, retailer: "MidwayUSA", category: "Optics", link: "#", image: "https://picsum.photos/id/106/600/400", rating: 4.9, shipping: 0, fflFee: 0, upc: "875874008595", sku: "PST-3151", inStock: true },
    { id: 8, title: "Federal American Eagle 5.56 - 420 Rounds", price: 189.99, retailer: "Ammo.com", category: "Ammo", link: "#", image: "https://picsum.photos/id/1074/600/400", rating: 4.8, shipping: 0, fflFee: 0, upc: "029465062354", sku: "AE556", inStock: true },
    { id: 9, title: "Magpul MOE Carbine Stock", price: 44.99, retailer: "Primary Arms", category: "Parts", link: "#", image: "https://picsum.photos/id/180/600/400", rating: 4.8, shipping: 8.99, fflFee: 0, upc: "873750007915", sku: "MAG400", inStock: true },
    { id: 10, title: "Streamlight TLR-7A Weapon Light", price: 139.99, retailer: "Palmetto State Armory", category: "Parts", link: "#", image: "https://picsum.photos/id/107/600/400", rating: 4.7, shipping: 0, fflFee: 0, upc: "080926694019", sku: "TLR-7A", inStock: true },
    // Add the rest of your deals here with upc/sku as needed
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
    setLoading(false);
  }, [identifier]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;
  }

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

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h1 className="text-3xl font-bold mb-2">{productInfo?.title}</h1>
        <div className="text-gray-400 mb-8 space-y-1">
          {productInfo?.upc && <p>UPC: {productInfo.upc}</p>}
          {productInfo?.sku && <p>SKU: {productInfo.sku}</p>}
        </div>

        <h2 className="text-xl font-semibold mb-6">Available Deals ({sortedDeals.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeals.map((deal) => {
            const trueCost = (deal.price + deal.shipping + deal.fflFee).toFixed(2);
            return (
              <div key={deal.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-orange-500 transition-all">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-orange-400">${deal.price}</p>
                    <p className="text-sm text-gray-400">True Cost ≈ <span className="text-orange-400">${trueCost}</span></p>
                  </div>
                  <div className={`px-3 py-1 text-xs font-bold rounded-full ${deal.inStock ? 'bg-green-600' : 'bg-red-600'}`}>
                    {deal.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                  </div>
                </div>

                <p className="font-medium mb-1">{deal.retailer}</p>

                <a href={deal.link} target="_blank" className="mt-6 block w-full bg-orange-600 hover:bg-orange-500 text-center py-4 rounded-2xl font-medium transition-colors">
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
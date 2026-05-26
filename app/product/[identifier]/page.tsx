'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const identifier = params.identifier as string;

  const [productDeals, setProductDeals] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<any>(null);

  // === FULLY SYNCED WITH MAIN PAGE ===
  const allDeals = [
    // PSA 16" 5.56 NATO Freedom Carbine
    { id: 1, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 399.99, retailer: "Palmetto State Armory", link: "https://palmettostatearmory.com", image: "https://picsum.photos/id/1015/600/400", shipping: 12.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 21, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 419.99, retailer: "Sportsman's Warehouse", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 14.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },
    { id: 22, title: "PSA 16\" 5.56 NATO Freedom Carbine", price: 389.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 9.99, fflFee: 25, upc: "123456789012", sku: "PSA-556-FREEDOM", inStock: true },

    // Glock 19 Gen5
    { id: 2, title: "Glock 19 Gen5 9mm Pistol", price: 499.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 12.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 23, title: "Glock 19 Gen5 9mm Pistol", price: 519.99, retailer: "Sportsman's Warehouse", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 0, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },
    { id: 24, title: "Glock 19 Gen5 9mm Pistol", price: 489.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 14.99, fflFee: 25, upc: "764503036958", sku: "G19-GEN5", inStock: true },

    // Daniel Defense DDM4 V7
    { id: 3, title: "Daniel Defense DDM4 V7 5.56", price: 1899.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/201/600/400", shipping: 19.99, fflFee: 25, upc: "815604018289", sku: "DDM4V7", inStock: true },

    // Smith & Wesson M&P15 Sport II
    { id: 4, title: "Smith & Wesson M&P15 Sport II", price: 549.99, retailer: "GunBroker", link: "#", image: "https://picsum.photos/id/106/600/400", shipping: 15.99, fflFee: 25, upc: "022188869217", sku: "MP15-SPORT2", inStock: false },

    // Sig Sauer MCX Virtus Patrol
    { id: 5, title: "Sig Sauer MCX Virtus Patrol", price: 2299.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 24.99, fflFee: 25, upc: "798681617456", sku: "MCX-VIRTUS", inStock: true },

    // Holosun HS507C-X2
    { id: 6, title: "Holosun HS507C-X2 Red Dot", price: 229.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/201/600/400", shipping: 0, fflFee: 0, upc: "605930624694", sku: "HS507C-X2", inStock: true },

    // Vortex Viper PST Gen II
    { id: 7, title: "Vortex Viper PST Gen II 3-15x44", price: 699.99, retailer: "MidwayUSA", link: "#", image: "https://picsum.photos/id/106/600/400", shipping: 0, fflFee: 0, upc: "875874008595", sku: "PST-3151", inStock: true },

    // Federal American Eagle
    { id: 8, title: "Federal American Eagle 5.56 - 420 Rounds", price: 189.99, retailer: "Ammo.com", link: "#", image: "https://picsum.photos/id/1074/600/400", shipping: 0, fflFee: 0, upc: "029465062354", sku: "AE556", inStock: true },

    // Magpul MOE Carbine Stock
    { id: 9, title: "Magpul MOE Carbine Stock", price: 44.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 8.99, fflFee: 0, upc: "873750007915", sku: "MAG400", inStock: true },
    { id: 26, title: "Magpul MOE Carbine Stock", price: 49.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/180/600/400", shipping: 9.99, fflFee: 0, upc: "873750007915", sku: "MAG400", inStock: true },

    // Streamlight TLR-7A
    { id: 10, title: "Streamlight TLR-7A Weapon Light", price: 139.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 0, fflFee: 0, upc: "080926694019", sku: "TLR-7A", inStock: true },

    // Smith & Wesson Shield Plus
    { id: 11, title: "Smith & Wesson Shield Plus 9mm", price: 379.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/106/600/400", shipping: 9.99, fflFee: 25, upc: "022188879469", sku: "SHIELD-PLUS", inStock: true },

    // Ruger LCP II
    { id: 12, title: "Ruger LCP II .380 ACP", price: 249.99, retailer: "Ammo.com", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 8.99, fflFee: 25, upc: "736676037124", sku: "LCP-II", inStock: false },

    // EOTech EXPS3-0
    { id: 13, title: "EOTech EXPS3-0 Holographic Sight", price: 599.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/106/600/400", shipping: 12.99, fflFee: 0, upc: "672294526551", sku: "EXPS3-0", inStock: true },

    // Sig Sauer Romeo5
    { id: 14, title: "Sig Sauer Romeo5 Red Dot", price: 129.99, retailer: "Sportsman's Warehouse", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 0, fflFee: 0, upc: "798681600083", sku: "ROMEO5", inStock: true },
    { id: 27, title: "Sig Sauer Romeo5 Red Dot", price: 119.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 0, fflFee: 0, upc: "798681600083", sku: "ROMEO5", inStock: true },

    // Hornady 9mm
    { id: 15, title: "Hornady 9mm 115gr FMJ - 500 Rounds", price: 149.99, retailer: "Target Sports USA", link: "#", image: "https://picsum.photos/id/107/600/400", shipping: 0, fflFee: 0, upc: "090255912357", sku: "HORN-9MM-500", inStock: true },

    // Winchester White Box 5.56
    { id: 17, title: "Winchester White Box 5.56 55gr - 300 Rounds", price: 139.99, retailer: "MidwayUSA", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 19.99, fflFee: 0, upc: "", sku: "WWB-556-300", inStock: true },
    { id: 28, title: "Winchester White Box 5.56 55gr - 300 Rounds", price: 134.99, retailer: "Palmetto State Armory", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 0, fflFee: 0, upc: "", sku: "WWB-556-300", inStock: true },
    { id: 29, title: "Winchester White Box 5.56 55gr - 300 Rounds", price: 144.99, retailer: "Primary Arms", link: "#", image: "https://picsum.photos/id/1015/600/400", shipping: 0, fflFee: 0, upc: "", sku: "WWB-556-300", inStock: true },
  ];

  useEffect(() => {
    const matching = allDeals.filter(deal => 
      (deal.upc && deal.upc === identifier) || (deal.sku && deal.sku === identifier)
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
          <img src={productInfo?.image} alt={productInfo?.title} className="w-full md:w-80 h-64 md:h-80 object-cover rounded-3xl bg-gray-800 flex-shrink-0" />
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
                <p className="font-medium">{deal.retailer}</p>
                <a href={deal.link} target="_blank" className="mt-6 block w-full bg-orange-600 hover:bg-orange-500 text-center py-4 rounded-2xl font-medium">
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
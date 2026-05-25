import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MyGunDeals - Gun Deals, Ammo & Gear',
  description: 'Find the best deals on firearms, ammunition, optics and more.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  );
}
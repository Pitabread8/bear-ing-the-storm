"use client"

import dynamic from 'next/dynamic';

// Prevent SSR errors
const LeafletD3Map = dynamic(() => import('./components/Map'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main>
      <h1>Map with D3 Box Drawing</h1>
      <LeafletD3Map />
    </main>
  );
}

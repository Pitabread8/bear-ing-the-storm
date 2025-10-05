"use client"

import dynamic from 'next/dynamic';
import DataFetcher from './components/DataFetcher';

// Prevent SSR errors
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Map />
      <DataFetcher path="test" />
    </main>
  );
}

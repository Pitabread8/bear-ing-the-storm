"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import DataFetcher from "./components/DataFetcher";
import sendData from "./utils/sendData";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

export default function Home() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleCoords = (coordsValue) => {
    if (coordsValue != null) {
      setLat(coordsValue[0]);
      setLng(coordsValue[1]);
    }
  };

  return (
    <main>
      <p>
        Coordinates: {lat}, {lng}
      </p>
      <button onClick={() => sendData(`${lat}, ${lng}`)}>Send coords to Flask</button>;
      <Map onSend={handleCoords} />
      <DataFetcher path="test" />
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Calendar from "./components/Calendar";
import DataFetcher from "./components/DataFetcher";
import Dashboard from "./components/Dashboard/dashboard.jsx";
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
      sendData(coordsValue);
    }
  };

  return (
    <main>
      <Calendar />
      <p>
        Coordinates: {lat}, {lng}
      </p>
      <Map onSend={handleCoords} />
      <DataFetcher path="test" />
      <Dashboard />
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Calendar from "./components/Calendar";
import DataFetcher from "./components/DataFetcher";
import Dashboard from "./components/Dashboard/dashboard.jsx";
import sendData from "./utils/sendData";
import { HiArrowLeft, HiArrowDown } from "react-icons/hi";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

export default function Home() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [date, setDate] = useState(null);

  const handleCoords = (coordsValue) => {
    if (coordsValue != null) {
      setLat(coordsValue[0]);
      setLng(coordsValue[1]);
    }
  };

  const handleDate = (dateValue) => {
    if (dateValue != null) {
      setDate(dateValue);
    }
  };

  const submitData = () => {
    if (lat === null || lng === null) {
      alert("Please select a location on the map first!");
    } else if (date === null) {
      alert("Please select a day on the calendar first!");
    } else {
      sendData([lat, lng, date]);
    }
  };

  return (
    <main>
      <div className="flex flex-row gap-24 p-8 h-screen">
        <Map sendCoords={handleCoords} />
        <div className="flex flex-col items-center justify-center gap-12 grow">
          <div className="flex flex-row gap-2">
            <HiArrowLeft className="w-7 h-7" />
            <p>Click on the map to select your event location.</p>
          </div>
          <div className="flex flex-row gap-2">
            <HiArrowDown className="w-7 h-7" />
            <p>Select your event date using the calendar.</p>
          </div>
          <Calendar sendDate={handleDate} />
          {lat != null && lng != null && date != null ? (
            <button
              onClick={submitData}
              className="w-1/3 px-5 py-3 bg-[#cfddd0] text-black rounded-lg text-lg font-medium text-center hover:bg-[#8ba08d] hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit!
            </button>
          ) : (
            <button
              disabled
              className="w-1/3 px-5 py-3 bg-[#cfddd0] text-black rounded-lg text-lg font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit!
            </button>
          )}
        </div>
      </div>
      {/* <DataFetcher path="test" /> */}
      <Dashboard />
    </main>
  );
}

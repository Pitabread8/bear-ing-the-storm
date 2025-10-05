"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMarkerOnly() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (leafletMapRef.current) return;

    const map = L.map(mapRef.current).setView([39.5, -98.35], 4);
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const newMarker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      markerRef.current = newMarker;
    });
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%" }} />
    </div>
  );
}

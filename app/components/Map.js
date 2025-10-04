'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapRef = useRef(null);
  const d3Ref = useRef(null);
  const [drawingMode, setDrawingMode] = useState(false);

  useEffect(() => {
    // Create Leaflet map
    const map = L.map(mapRef.current).setView([39.5, -98.35], 4); // North America

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Create D3 overlay SVG
    const svg = d3
      .select(d3Ref.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('pointer-events', 'none'); // Initially prevent interference

    let startPoint = null;
    let box = null;

    function enableDrawing() {
      svg.style('pointer-events', 'all'); // allow clicking

      svg.on('click', function (event) {
        const [x, y] = d3.pointer(event);
        console.log(x, y)
        if (!startPoint) {
          startPoint = [x, y];

          // Remove any previous box
          svg.selectAll('rect').remove();

          box = svg
            .append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', 0)
            .attr('height', 0)
            .attr('stroke', 'red')
            .attr('fill', 'rgba(255,0,0,0.2)')
            .attr('stroke-width', 2);
        } else {
          const [x0, y0] = startPoint;
          const width = x - x0;
          const height = y - y0;

          box
            .attr('width', Math.abs(width))
            .attr('height', Math.abs(height))
            .attr('x', Math.min(x0, x))
            .attr('y', Math.min(y0, y));

          startPoint = null;
        }
      });
    }

    if (drawingMode) {
      // Freeze the map
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();

      enableDrawing();
    } else {
      // Unfreeze map
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable();

      svg.on('click', null).style('pointer-events', 'none');
    }

    // Clean up
    return () => {
      map.remove();
    };
  }, [drawingMode]);

  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%' }} />
      <svg ref={d3Ref} />
      <button
        onClick={() => setDrawingMode((prev) => !prev)}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          padding: '8px 12px',
        }}
      >
        {drawingMode ? 'Cancel Drawing' : 'Draw Bounding Box'}
      </button>
    </div>
  );
}

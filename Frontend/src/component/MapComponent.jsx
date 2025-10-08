import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// ✅ Import leaflet-draw safely to avoid 'type is not defined' bug
import "leaflet-draw/dist/leaflet.draw.js";

export default function MapComponent() {
  const mapRef = useRef(null);
  const [areaData, setAreaData] = useState(null);

  useEffect(() => {
    if (mapRef.current) return;

    // ✅ Initialize the map
    const map = L.map("map", {
      center: [19.9975, 73.7898],
      zoom: 7,
    });
    mapRef.current = map;

    // ✅ Hybrid Google Map tiles
    L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    // ✅ Drawn shapes layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // ✅ Draw control (only rectangle)
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: {
          shapeOptions: {
            color: "#3388ff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.1,
          },
          showArea: false,
        },
        polygon: true,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: { featureGroup: drawnItems },
    });

    map.addControl(drawControl);

    // ✅ Handle the created event
    map.on(L.Draw.Event.CREATED, function (e) {
      drawnItems.clearLayers();
      const layer = e.layer;
      drawnItems.addLayer(layer);

      const bounds = layer.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      let coordinates = [];
      if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs()[0];
        coordinates = latlngs.map((point) => ({
          lat: point.lat.toFixed(5),
          lng: point.lng.toFixed(5),
        }));
      }

      // Dummy calculations for area and perimeter
      const latDiff = Math.abs(ne.lat - sw.lat);
      const lngDiff = Math.abs(ne.lng - sw.lng);
      const area = (latDiff * lngDiff * 12365).toFixed(2); // Rough km²
      const perimeter = ((latDiff + lngDiff) * 2 * 111).toFixed(2); // Rough km

      setAreaData({
        area,
        perimeter,
        coordinates,
      });
    });

    // ✅ Fix leaflet button overlap with navbar
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-top { top: 80px !important; }
      .leaflet-draw-tooltip, .leaflet-draw-guides {
        z-index: 10000 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
    };
  }, []);

    return (
  <div className="flex h-screen">
      {/* LEFT: MAP */}
      <div id="map" className="w-4/6 h-full shadow-inner"></div>

      {/* RIGHT: DASHBOARD */}
      <div className="w-3/6 bg-gray-100 p-8 overflow-y-auto shadow-lg flex flex-col justify-center">
        {!areaData ? (
          <>
            <h1 className="text-3xl font-bold text-orange-600 mb-4">
              ☀️ Welcome to Radiant
            </h1>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Start exploring solar farm sites by <b>drawing a rectangle</b> on the map.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can also select multiple sites using <b>polygon tools</b> for deeper analysis.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🟢 Selected Area Details
            </h2>

            <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
              <p>
                <span className="font-semibold text-gray-800">Area:</span>{" "}
                {areaData.area} km²
              </p>
              <p>
                <span className="font-semibold text-gray-800">Perimeter:</span>{" "}
                {areaData.perimeter} km
              </p>

              <div>
                <span className="font-semibold text-gray-800">Coordinates:</span>
                <ul className="mt-2 text-sm text-gray-700 space-y-1 max-h-40 overflow-y-auto">
                  {areaData.coordinates.map((c, i) => (
                    <li key={i}>
                      Lat: {c.lat}, Lng: {c.lng}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setAreaData(null)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all duration-300"
              >
                Clear Selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
);

  
}

/*
MapComponent.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function DrawRectangle({ onAreaSelected }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Dynamically import leaflet-draw (avoid ESM issues in Vite)
    import("leaflet-draw").then(() => {
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        draw: {
          rectangle: true,
          polygon: false,
          polyline: false,
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnItems,
        },
      });

      map.addControl(drawControl);

      const handleCreated = (e) => {
        drawnItems.clearLayers(); // keep only one rectangle
        drawnItems.addLayer(e.layer);

        if (onAreaSelected) {
          onAreaSelected(e.layer.getBounds());
        }
      };

      map.on(L.Draw.Event.CREATED, handleCreated);

      return () => {
        map.off(L.Draw.Event.CREATED, handleCreated);
        map.removeControl(drawControl);
        map.removeLayer(drawnItems);
      };
    });
  }, [map, onAreaSelected]);

  return null;
}

export default function MapComponent({ onAreaSelected }) {
  return (
    <MapContainer
      center={[19.9975, 73.7898]} // Nashik
      zoom={14}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution="&copy; Google"
      />
      <DrawRectangle onAreaSelected={onAreaSelected} />
    </MapContainer>
  );
}
*/
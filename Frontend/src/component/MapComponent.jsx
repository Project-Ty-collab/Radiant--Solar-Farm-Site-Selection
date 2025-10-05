// MapComponent.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

function DrawRectangle({ onAreaSelected }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Layer to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Draw control
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: {
          showArea: false, // <-- disables the buggy area tooltip
        },
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

    // Handle when a shape is created
    const handleCreated = (e) => {
      drawnItems.clearLayers(); // clear previous
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
  }, [map, onAreaSelected]);

  return null;
}

export default function MapComponent({ onAreaSelected }) {
  return (
    <MapContainer
      center={[19.9975, 73.7898]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution="&copy; Google"
      />
      <DrawRectangle onAreaSelected={onAreaSelected} />
    </MapContainer>
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
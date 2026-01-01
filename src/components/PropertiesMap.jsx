import { useEffect, useRef } from "react";

export default function PropertiesMap({ properties, onClose }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!properties.length || !window.L) return;

    // Prevent multiple map instances
    if (mapRef.current) return;

    const first = properties[0];

    mapRef.current = window.L.map("properties-map").setView(
      [first.coordinates.lat, first.coordinates.lng],
      6
    );

    window.L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap contributors",
      }
    ).addTo(mapRef.current);

    properties.forEach((p) => {
      window.L.marker([p.coordinates.lat, p.coordinates.lng])
        .addTo(mapRef.current)
        .bindPopup(`
          <strong>£${p.price.toLocaleString()}</strong><br/>
          ${p.bedrooms} bed ${p.type}<br/>
          ${p.location}
        `);
    });

    return () => {
      mapRef.current.remove();
      mapRef.current = null;
    };
  }, [properties]);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 180px)" }}>
        <div
        id="properties-map"
        style={{ width: "100%", height: "100%" }}
        />
    </div>
    );
}

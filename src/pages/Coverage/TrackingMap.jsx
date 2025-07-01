// components/TrackingMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Optional: use a custom marker icon
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",

  iconSize: [15, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const TrackingMap = ({ position = [23.8103, 90.4125], districts }) => {
  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full rounded-xl overflow-hidden z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {districts.map(
        (
          { latitude, longitude, district, region, covered_area, flowchart },
          i
        ) => (
          <Marker key={i} position={[latitude, longitude]} icon={redIcon}>
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg mb-1">
                  {district}, {region}
                </h3>
                <p className="mb-1">
                  <strong>Covered Areas:</strong>
                </p>
                <ul className="list-disc ml-5 mb-2">
                  {covered_area.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
                <a
                  href={flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CAEB66] underline"
                >
                  View Flowchart
                </a>
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
};

export default TrackingMap;

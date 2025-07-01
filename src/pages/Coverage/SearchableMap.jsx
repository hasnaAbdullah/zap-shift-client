import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Red icon
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FlyTo = ({ district }) => {
  const map = useMap();

  if (district) {
    map.flyTo([district.latitude, district.longitude], 10, { duration: 1.5 });
  }

  return null;
};

const SearchableMap = ({ allDistricts, focusedDistrict }) => {
  return (
    <MapContainer
      center={[23.7, 90.3]}
      zoom={7}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap & CartoDB"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {allDistricts.map((d, idx) => (
        <Marker key={idx} position={[d.latitude, d.longitude]} icon={redIcon}>
          <Popup>
            <strong>{d.district}</strong>
            <br />
            {d.covered_area.join(", ")}
            <br />
            <a href={d.flowchart} target="_blank" className="text-[#CAEB66]">
              Flowchart
            </a>
          </Popup>
        </Marker>
      ))}

      {focusedDistrict && <FlyTo district={focusedDistrict} />}
    </MapContainer>
  );
};

export default SearchableMap;

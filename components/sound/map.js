import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from './map.module.css';
import "leaflet/dist/leaflet.css";

L.Icon.Default.imagePath = '../../leaflet/'

const Map = ({onLocationChange}) => {
  return (
    <div
      className={styles.map}
    >
      <h2>Map</h2>
      <MapContainer

        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationChange={onLocationChange} />
      </MapContainer>
      ,
    </div>
  );
};

function LocationMarker({onLocationChange}) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      onLocationChange(e.latlng)
    },
  });
  console.log({map})

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default Map;

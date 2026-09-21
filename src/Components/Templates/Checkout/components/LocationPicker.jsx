import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ position, setPosition }) {
  useMapEvent({
    click(event) {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
  });
  return (
    position && (
      <Marker position={position}>
        <Popup>آدرس انتخابی شما</Popup>
      </Marker>
    )
  );
}

function LocationPicker({ position, setPosition }) {
  return (
    <div className="w-full h-100 bg-red-400">
      <MapContainer
        className="w-full h-100"
        center={[35.73870222604133, 51.31337255138956]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}

export default LocationPicker;

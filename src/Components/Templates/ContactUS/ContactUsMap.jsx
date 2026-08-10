import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ContactUsMap() {
  const locations = [
    {
      location: [35.74027441680592, 51.30193236374185],
      popup: "ایستگاه مترو آیت الله کاشانی",
    },
    {
      location: [35.730825658265196, 51.30726824920211],
      popup: "ایستگاه مترو علامه جعفری",
    },
  ];
  return (
    <div className="w-full h-max space-y-20">
      {locations.map((item, index) => (
        <MapContainer
          key={index}
          className="w-full h-100"
          center={item.location}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={item.location}>
            <Popup>{item.popup}</Popup>
          </Marker>
        </MapContainer>
      ))}
    </div>
  );
}

export default ContactUsMap;

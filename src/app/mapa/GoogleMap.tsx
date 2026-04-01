// src/components/GoogleMapComponent.tsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -23.670827, // Substitua com a latitude desejada
  lng: -46.70025, // Substitua com a longitude desejada
};

const GoogleMapComponent = ({ apiKey }: { apiKey: any }) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;

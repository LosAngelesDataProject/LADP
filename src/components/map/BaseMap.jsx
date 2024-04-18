import { React, useState, useRef } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import osmProviders from "./osm-providers";
import "leaflet/dist/leaflet.css";

const BaseMap = () => {
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const zoomLevel = 11;
  const mapRef = useRef();

  return (
    <>
      <div className="leaflet-container">
        <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
          <TileLayer
            url={osmProviders.maptiler.url}
            attribution={osmProviders.maptiler.attribution}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default BaseMap;

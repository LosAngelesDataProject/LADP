import { React, useState, useRef } from "react";

import styles from "./Map.module.css";

import { MapContainer, TileLayer } from "react-leaflet";
import osmProviders from "./osm-providers";
import "leaflet/dist/leaflet.css";

const BaseMap = () => {
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const zoomLevel = 11; //base zoom level
  const mapRef = useRef();

  return (
    <>
      <div className={styles.leafletContainer}>
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

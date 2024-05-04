import { React, useState, useRef } from "react";

import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osmProviders from "./osm-providers";
import "leaflet/dist/leaflet.css";

const BaseMap = () => {
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const zoomLevel = 10.5; //base zoom level
  const mapRef = useRef();

  const markers = [
    {
      geocode: [33.779225, -118.146143],
      popUp: "3935 E. 10th St.",
    },
    {
      geocode: [33.938011, -118.292446],
      popUp: "1010-B W. 108th St.",
    },
    {
      geocode: [34.099089, -117.900356],
      popUp: "17880 E. Covina Blvd.",
    },
  ];

  return (
    <>
      <div className={styles.leafletContainer}>
        <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
          <TileLayer
            url={osmProviders.maptiler.url}
            attribution={osmProviders.maptiler.attribution}
          />
          {markers.map((markers) => (
            <Marker position={markers.geocode}>
              <Popup>
                <p>{markers.popUp}</p>
              </Popup>
            </Marker>
          ))}
          ;
        </MapContainer>
      </div>
    </>
  );
};

export default BaseMap;

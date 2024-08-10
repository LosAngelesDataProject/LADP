import { useEffect, useRef } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osmProviders from "./osm-providers";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

const BaseMap = (props) => {
  const { center, markers } = props;
  const baseZoom = 10.5; //base zoom level
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, 15); // Adjust the zoom level as needed
    }
  }, [center]);

  return (
    <>
      <div className={styles.leafletContainer}>
        <MapContainer center={center} zoom={baseZoom} ref={mapRef}>
          <TileLayer
            url={osmProviders.maptiler.url}
            attribution={osmProviders.maptiler.attribution}
          />
          {markers.map((marker, index) => (
            <Marker position={marker.geocode} key={`marker-${index}`}>
              <Popup>
                <p>{marker.popUp.name}</p>
                <p>{marker.popUp.address}</p>
              </Popup>
            </Marker>
          ))}
          ;
        </MapContainer>
      </div>
    </>
  );
};

BaseMap.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      geocode: PropTypes.arrayOf(PropTypes.number).isRequired,
      popUp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default BaseMap;

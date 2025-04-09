import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import osmProviders from "./osm-providers";
import "leaflet/dist/leaflet.css";
import GetDirections from "./GetDirections";
import PropTypes from "prop-types";

const BaseMap = (props) => {
  const { center, markers, zoom, current, activeMarker } = props;
  const baseZoom = 10.5; //base zoom level
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom); // Adjust the zoom level as needed
    }
    if (mapRef.current && activeMarker) {
      console.log("popup working");
      mapRef.current.eachLayer((layer) => {
        if (
          layer.getLatLng &&
          layer.getLatLng().lat === activeMarker.lat &&
          layer.getLatLng().lng === activeMarker.lng
        ) {
          layer.openPopup();
        }
      });
    }
  }, [center, zoom, activeMarker]);

  const customIcon = L.icon({
    iconUrl: "../src/assets/images/googleMarker/GoogleMarker.png",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [-0, -45], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <>
      <MapContainer center={center} zoom={baseZoom} ref={mapRef}>
        {zoom === 16 && (
          <Marker position={current} icon={customIcon}>
            <Popup>
              <p>Current location</p>
            </Popup>
          </Marker>
        )}
        <TileLayer
          url={osmProviders.maptiler.url}
          attribution={osmProviders.maptiler.attribution}
        />
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} key={`marker-${index}`}>
            <Popup>
              <p>{marker.popUp.name}</p>
              <p>{marker.popUp.address}</p>

              <GetDirections
                markerAddress={marker.popUp.address}
                current={current}
              />
            </Popup>
          </Marker>
        ))}
        ;
      </MapContainer>
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
  current: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    active: PropTypes.string,
  }),
  zoom: PropTypes.number.isRequired,
  activeMarker: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

export default BaseMap;

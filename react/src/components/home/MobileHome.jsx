import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import foodResourcesService from "../../services/foodResourcesService";
import sampleResults from "../../assets/data/foodResources.js";
import SearchResults from "./SearchResults.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { useLocation } from "react-router-dom";
import resultFilterer from "./resultFilterer.js";
import Spinner from "react-bootstrap/Spinner";

function MobileHome() {
  const dayOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dayParam = urlParams.get("d");
  const productParam = urlParams.get("p");
  const locationParam = urlParams.get("l");

  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const [current, setCurrent] = useState({
    lat: 34.0549,
    lng: -118.2426,
    active: "off",
  });
  const [zoom, setZoom] = useState(15);
  const [results, setResults] = useState([]);
  const [resultsArray, setResultsArray] = useState([]);

  const markers = results.map((result) => ({
    geocode: [result.latitude, result.longitude],
    popUp: {
      name: result.name,
      address: `${result.streetAddress}, ${result.city}`,
    },
  }));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude) {
        setZoom(16);
        setCurrent((prevState) => {
          const newCurrent = { ...prevState };

          newCurrent.lat = position.coords.latitude;
          newCurrent.lng = position.coords.longitude;
          newCurrent.active = "on";

          return { ...newCurrent };
        });

        setCenter((prevState) => {
          const newCurrent = { ...prevState };

          newCurrent.lat = position.coords.latitude;
          newCurrent.lng = position.coords.longitude;

          return { ...newCurrent };
        });
      }
    });

    foodResourcesService
      .getFoodResources()
      .then(onGetFoodResourcesSuccess)
      .catch(onGetFoodResourcesError);
  }, []);

  const onGetFoodResourcesSuccess = (response) => {
    setResultsArray(() => [...response.data]);
    setResults(() => [...response.data]);
  };

  const onGetFoodResourcesError = (error) => {
    console.error("Error!!!!!!!!!!!!!!! ", error);
    setResultsArray(() => [...sampleResults]);
    setResults(() => [...sampleResults]);
  };

  const SearchBar = () => {
    return (
      <>
        <input
          id="searchFilter"
          type="search"
          className={styles.searchInputLeft}
          placeholder=" Search what you need"
        />
        <input
          id="searchLocation"
          type="search"
          className={styles.searchInputRight}
          placeholder=" Please Enter a City or Zip Code"
        />
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
          onClick={() => {}}
        />
      </>
    );
  };

  useEffect(() => {
    if (dayParam || productParam || locationParam) {
      const filteredResults = resultFilterer(
        resultsArray,
        dayParam,
        productParam,
        locationParam
      );

      setResults(() => [...filteredResults]);
    } else {
      setResults(() => [...resultsArray]);
    }
  }, [location, dayParam, productParam, locationParam]);

  const [showMap, setShowMap] = useState(true);

  return (
    <>
      <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
        <div className={styles.searchInputContainer}>
          <SearchBar />
        </div>
        <div className={`${styles.filterContainer}`}>
          <FilterButtons dayOfTheWeek={dayOfTheWeek} />
        </div>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${showMap ? styles.tabActive : ""}`}
            onClick={() => {
              setShowMap(true);
            }}
          >
            Card
          </div>
          <div
            className={`${styles.tab} ${!showMap ? styles.tabActive : ""}`}
            onClick={() => {
              setShowMap(false);
            }}
          >
            Map
          </div>
        </div>
      </Row>

      <Row>
        {showMap ? (
          resultsArray.length ? (
            <SearchResults
              results={results}
              dayOfTheWeek={dayOfTheWeek}
              setCenter={setCenter}
              center={center}
              current={current}
            />
          ) : (
            <Spinner
              animation="grow"
              variant="dark"
              className="mt-5 d-flex mx-auto"
            />
          )
        ) : (
          <Col className={`${styles.mapContainer}`}>
            <BaseMap
              markers={markers}
              center={center}
              current={current}
              zoom={zoom}
            />
          </Col>
        )}
      </Row>
    </>
  );
}

export default MobileHome;

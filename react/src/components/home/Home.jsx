import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";

import sampleResults from "../../assets/data/foodResources.js";
import { getFoodResources } from "../../services/foodResourcesService";

import SearchResults from "./SearchResults.jsx";
import HomeSlide from "./HomeSlide.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { useLocation } from "react-router-dom";
import resultFilterer from "./resultFilterer.js";
import Spinner from "react-bootstrap/Spinner";
import config from "../../../config.js";

function Home() {
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

    const fetchFoodResources = async () => {
      try {
        const data = await getFoodResources();
        await setResultsArray(() => [data]);
        await setResults(() => [data]);
      } catch (error) {
        console.error("Error loading food resources.", error);
        await setResultsArray(() => [...sampleResults]);
        await setResults(() => [...sampleResults]);
      }
    };

    const resultSetter = async () => {
      await setResultsArray(() => [...sampleResults]);
      await setResults(() => [...sampleResults]);
    };

    config.enableApiFlag ? fetchFoodResources() : resultSetter();
  }, []);

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

  return (
    <>
      <div className="Home-Carousel">
        <HomeSlide className="Carousel-Hero" />
      </div>
      <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
        <div className={styles.searchInputContainer}>
          <SearchBar />
        </div>
        <div className={`${styles.filterContainer}`}>
          <FilterButtons dayOfTheWeek={dayOfTheWeek} />
        </div>
      </Row>

      <Row>
        <Col>
          {resultsArray.length ? (
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
          )}
        </Col>
        <Col className={`${styles.mapContainer}`}>
          <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
          <BaseMap
            markers={markers}
            center={center}
            current={current}
            zoom={zoom}
          />
        </Col>
      </Row>
      <Row className={`mt-3 ${styles.heroContainer}`}>
        <div>
          <p> Hero Section: Welcome to the Los Angeles Data Project...</p>
        </div>
      </Row>
    </>
  );
}

export default Home;

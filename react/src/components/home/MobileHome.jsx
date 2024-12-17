import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";

import { getFoodResources } from "../../services/foodResourcesService";
import sampleResults from "../../assets/data/foodResources.js";
import SearchResults from "./SearchResults.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { useLocation } from "react-router-dom";
import resultFilterer from "./resultFilterer.js";
import Spinner from "react-bootstrap/Spinner";
import Tabs from "./Tabs.jsx";
import config from "../../../config.js";
import daysOfTheWeek from "../../assets/data/daysOfTheWeek.js";

function MobileHome() {
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
    const [toggleInput, setToggleInput] = useState("");
    return (
      <>
        <i
          className={`fa-solid fa-arrow-left ${styles.searchIconLeft} ${
            toggleInput === "" ? "d-none" : ""
          }`}
          onClick={() => {
            setToggleInput("");
          }}
        />
        <input
          id="searchFilter"
          type="text"
          placeholder="&#xF002; Search"
          className={`${styles.searchInputLeft} ${
            toggleInput === "search" ? styles.expand : "w-50"
          } ${toggleInput === "location" ? "d-none" : ""}
            `}
          onClick={() => {
            setToggleInput("search");
          }}
        />
        <input
          id="searchLocation"
          type="text"
          placeholder="&#xF3C5; Location"
          className={`${styles.searchInputRight} ${
            toggleInput === "location" ? styles.expand : "w-50"
          }  ${toggleInput === "search" ? "d-none" : ""}`}
          onSelect={() => {
            setToggleInput("location");
          }}
        />
        {toggleInput === "search" ? (
          <i
            className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
            onClick={() => {}}
          />
        ) : (
          <i
            className={`fa-solid fa-location-dot ${styles.searchIconRight} ${
              toggleInput === "" ? "d-none" : ""
            }`}
            onClick={() => {}}
          />
        )}
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
      <Row className={`${styles.searchContainer}`}>
        <div className={styles.searchInputContainer}>
          <SearchBar />
        </div>
        <div className={`${styles.filterContainer}`}>
          <FilterButtons daysOfTheWeek={daysOfTheWeek} />
        </div>
        <Tabs showMap={showMap} setShowMap={setShowMap} />
      </Row>

      <Row
        className={`${showMap ? styles.resultsContainer : styles.mapContainer}`}
      >
        {showMap ? (
          resultsArray.length ? (
            <SearchResults
              results={results}
              daysOfTheWeek={daysOfTheWeek}
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
          <BaseMap
            markers={markers}
            center={center}
            current={current}
            zoom={zoom}
          />
        )}
      </Row>
    </>
  );
}

export default MobileHome;

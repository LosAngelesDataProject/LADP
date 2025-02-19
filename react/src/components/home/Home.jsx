import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import { getFoodResources } from "../../services/foodResourcesService";
import sampleResults from "../../assets/data/foodResources.js";
import SearchResults from "./SearchResults.jsx";
import HomeSlide from "./HomeSlide.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { useLocation } from "react-router-dom";
import resultFilterer from "./resultFilterer.js";
import Spinner from "react-bootstrap/Spinner";
import Tabs from "./Tabs.jsx";
import config from "../../../config.js";
import daysOfTheWeek from "../../assets/data/daysOfTheWeek.js";
import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";

function Home(props) {
  const { isPhone } = props;
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dayParam = urlParams.get("d");
  const productParam = urlParams.get("p");
  const locationParam = urlParams.get("l");
  const [showMap, setShowMap] = useState(true);
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const [current, setCurrent] = useState({
    lat: 34.0549,
    lng: -118.2426,
    active: "off",
  });
  const [zoom, setZoom] = useState(15);
  const [results, setResults] = useState([]);
  const [resultsArray, setResultsArray] = useState([]);
  const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

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

  const RenderResults = () => {
    return resultsArray.length ? (
      <SearchResults
        results={results}
        daysOfTheWeek={daysOfTheWeek}
        setCenter={setCenter}
        center={center}
        current={current}
        showDescriptionIndex={showDescriptionIndex}
        setShowDescriptionIndex={setShowDescriptionIndex}
      />
    ) : (
      <Spinner
        animation="grow"
        variant="dark"
        className="mt-5 d-flex mx-auto"
      />
    );
  };

  const RenderMap = () => (
    <BaseMap
      markers={markers}
      center={center}
      current={current}
      zoom={zoom}
      setShowDescriptionIndex={setShowDescriptionIndex}
    />
  );

  const handleTabChange = (isMap) => {
    setShowMap(isMap);
  };

  return (
    <>
      {!isPhone && (
        <div className="Home-Carousel">
          <HomeSlide className="Carousel-Hero" />
        </div>
      )}
      <Row className={`${styles.searchContainer}`}>
        <div className={styles.searchInputContainer}>
          <SearchBar />
        </div>
        <div className={`${styles.filterContainer}`}>
          <FilterButtons daysOfTheWeek={daysOfTheWeek} />
        </div>
        {isPhone && <Tabs showMap={showMap} setShowMap={handleTabChange} />}
      </Row>
      {isPhone ? (
        <Row
          className={showMap ? styles.resultsContainer : styles.mapContainer}
        >
          {showMap ? RenderResults() : RenderMap()}
        </Row>
      ) : (
        <Row>
          <Col className={styles.resultsContainer}>{RenderResults()}</Col>
          <Col className={styles.mapContainer}>{RenderMap()}</Col>
        </Row>
      )}
      {!isPhone && (
        <Row className={`mt-3 ${styles.heroContainer}`}>
          <div>
            <p> Hero Section: Welcome to the Los Angeles Data Project...</p>
          </div>
        </Row>
      )}
    </>
  );
}

Home.propTypes = {
  isPhone: PropTypes.bool.isRequired,
};

export default Home;

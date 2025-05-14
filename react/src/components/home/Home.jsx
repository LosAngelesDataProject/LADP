import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import HomeSlide from "./HomeSlide.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { useLocation } from "react-router-dom";
import Tabs from "./Tabs.jsx";
import daysOfTheWeek from "../../assets/data/daysOfTheWeek.js";
import PropTypes from "prop-types";
import SearchBarWrapper from "../searchBar/SearchBarWrapper.jsx";
import RenderResults from "./RenderResults.jsx";
import {
  fetchFoodResources,
  filterLocation,
  updateMaplocation,
} from "../../utils/utils.js";

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
  const [filteredArray, setFilteredArray] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [isResetAllClicked, setIsResetAllClicked] = useState(false);

  const markers = results.map((result) => ({
    geocode: [result.latitude, result.longitude],
    popUp: {
      name: result.name,
      address: `${result.streetAddress}, ${result.city}`,
    },
  }));

  useEffect(() => {
    updateMaplocation(setCurrent, setCenter, setZoom);
    fetchFoodResources(setResultsArray, setResults);
  }, []);

  useEffect(() => {
    filterLocation(
      resultsArray,
      dayParam,
      productParam,
      locationParam,
      setFilteredArray,
      setIsFilterApplied
    );
  }, [location, dayParam, productParam, locationParam]);

  const handleTabChange = (isMap) => {
    setShowMap(isMap);
  };

  const resultsComponent = (
    <RenderResults
      resultsArray={resultsArray}
      results={results}
      setCenter={setCenter}
      center={center}
      current={current}
      showDescriptionIndex={showDescriptionIndex}
      setShowDescriptionIndex={setShowDescriptionIndex}
    />
  );

  const mapComponent = (
    <BaseMap
      markers={markers}
      center={center}
      current={current}
      zoom={zoom}
      setShowDescriptionIndex={setShowDescriptionIndex}
    />
  );

  const locationFilter = () => {
    filterLocation(
      resultsArray,
      dayParam,
      productParam,
      locationParam,
      setFilteredArray,
      setIsFilterApplied
    );
  };

  return (
    <>
      {!isPhone && (
        <div className="Home-Carousel">
          <HomeSlide className="Carousel-Hero" />
        </div>
      )}
      <Row className={`${styles.searchContainer}`}>
        <SearchBarWrapper
          setResults={setResults}
          locationFilter={locationFilter}
          resultsArray={resultsArray}
          filteredArray={filteredArray}
          setIsSearchApplied={setIsSearchApplied}
          isFilterApplied={isFilterApplied}
          isResetAllClicked={isResetAllClicked}
          setIsResetAllClicked={setIsResetAllClicked}
        />
        <div className={`${styles.filterContainer}`}>
          <FilterButtons
            daysOfTheWeek={daysOfTheWeek}
            setIsResetAllClicked={setIsResetAllClicked}
            isFilterApplied={isFilterApplied}
            isSearchApplied={isSearchApplied}
            setIsSearchApplied={setIsSearchApplied}
          />
        </div>
        {isPhone && <Tabs showMap={showMap} setShowMap={handleTabChange} />}
      </Row>
      {isPhone ? (
        <Row
          className={showMap ? styles.resultsContainer : styles.mapContainer}
        >
          {showMap ? resultsComponent : mapComponent}
        </Row>
      ) : (
        <Row>
          <Col className={styles.resultsContainer}>{resultsComponent}</Col>
          <Col className={styles.mapContainer}>{mapComponent}</Col>
        </Row>
      )}
    </>
  );
}

Home.propTypes = {
  isPhone: PropTypes.bool.isRequired,
};

export default Home;

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import results from "../../assets/data/results.js";
import SearchResults from "./SearchResults.jsx";
import HomeSlide from "./HomeSlide.jsx";
import FilterButtons from "./FilterButtons.jsx";

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
  const markers = results.map((result) => ({
    geocode: [result.latitude, result.longitude],
    popUp: {
      name: result.name,
      address: `${result.streetAddress}, ${result.city}`,
    },
  }));
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const [current, setCurrent] = useState({
    lat: 34.0549,
    lng: -118.2426,
    active: "off",
  });
  const [zoom, setZoom] = useState(15);

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const [resultsData, setResultsData] = useState({
    arrayOfResults: results,
    firstFilteredResults: [],
    secondFilteredResults: [],
  });

  const [query, setQuery] = useState("");

  const [locationFilter, setLocationFilter] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleLocation = (e) => {
    let targetVal = e.target.value;

    let resultsCities = results.map((result) => result.city);

    let resultsZipCodes = results.map((result) => result.zipcode.toString());

    if (resultsCities.includes(targetVal)) {
      console.log(targetVal, "if statement for city launching");
      setLocationFilter(targetVal);
    } else if (resultsZipCodes.includes(targetVal)) {
      console.log(targetVal, "if statement for ZIP launching");

      setLocationFilter(targetVal);
    } else {
      console.log(targetVal, "default logic launching");

      setLocationFilter("");
    }
  };

  const onSearchRequested = (e) => {
    e.preventDefault();

    resultsData.firstFilteredResults = filterByValue(results, query);

    if (locationFilter) {
      resultsData.secondFilteredResults = filterByValue(
        resultsData.firstFilteredResults,
        locationFilter
      );
    } else {
      resultsData.secondFilteredResults = resultsData.firstFilteredResults;
    }

    setResultsData((prevState) => {
      let newResults = resultsData.secondFilteredResults;

      const rd = { ...prevState };
      rd.arrayOfResults = newResults;

      console.log(newResults);

      return rd; //resultsData
    });
  };

  const onLocationRequested = (e) => {
    e.preventDefault();

    resultsData.firstFilteredResults = filterByValue(results, locationFilter);

    if (query) {
      resultsData.secondFilteredResults = filterByValue(
        resultsData.firstFilteredResults,
        query
      );
    } else {
      resultsData.secondFilteredResults = resultsData.firstFilteredResults;
    }

    setResultsData((prevState) => {
      let newResults = resultsData.secondFilteredResults;

      const rd = { ...prevState };
      rd.arrayOfResults = newResults;

      console.log(newResults);

      return rd; //resultsData
    });
  };

  function filterByValue(array, string) {
    console.log(string);

    return array.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

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
  }, []);

  return (
    <>
      <Container className={styles.home}>
        <div className="Home-Carousel">
          <HomeSlide className="Carousel-Hero" />
        </div>
        <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
          <div className={styles.searchInputContainer}>
            <>
              <input
                id="searchFilter"
                type="text"
                className={styles.searchInputLeft}
                placeholder=" Search what you need"
                onChange={handleSearch}
              />
              <i
                className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
                onClick={onSearchRequested}
              />
              <input
                id="searchLocation"
                type="text"
                className={styles.searchInputLeft}
                placeholder=" Please Enter a City or Zip Code"
                onChange={handleLocation}
              />
              <i
                className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
                onClick={onLocationRequested}
              />
            </>
          </div>
          <div className={`${styles.filterContainer}`}>
            <FilterButtons dayOfTheWeek={dayOfTheWeek} />
          </div>
        </Row>
        <Row>
          <Col>
            <SearchResults
              results={resultsData.arrayOfResults}
              dayOfTheWeek={dayOfTheWeek}
              setCenter={setCenter}
              center={center}
              current={current}
            />
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
      </Container>
    </>
  );
}

export default Home;

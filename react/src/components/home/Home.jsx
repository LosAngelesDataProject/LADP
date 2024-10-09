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
    setLocationFilter(e.target.value);
  };

  const onSearchRequested = (e) => {
    e.preventDefault();

    resultsData.firstFilteredResults = filterByValue(results, query);

    if (locationFilter) {
      resultsData.secondFilteredResults = filterByLocation(
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

      return rd;
    });
  };

  const onLocationRequested = (e) => {
    e.preventDefault();

    resultsData.firstFilteredResults = filterByLocation(
      results,
      locationFilter
    );

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

      return rd;
    });
  };

  const onResetQueryFilter = (e) => {
    e.preventDefault();

    setQuery("");
    clearQueryField();

    if (locationFilter) {
      resultsData.firstFilteredResults = filterByLocation(
        results,
        locationFilter
      );
    } else if (!locationFilter) {
      resultsData.firstFilteredResults = results;
    }
    setResultsData((prevState) => {
      let newResults = resultsData.firstFilteredResults;

      const rd = { ...prevState };
      rd.arrayOfResults = newResults;

      console.log(newResults);

      return rd;
    });
  };

  const onResetLocationFilter = (e) => {
    e.preventDefault();

    setLocationFilter("");
    clearLocationField();

    if (query) {
      resultsData.firstFilteredResults = filterByValue(results, query);
    } else if (!query) {
      resultsData.firstFilteredResults = results;
    }
    setResultsData((prevState) => {
      let newResults = resultsData.firstFilteredResults;

      const rd = { ...prevState };
      rd.arrayOfResults = newResults;

      console.log(newResults);

      return rd;
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

  function filterByLocation(array, string) {
    return array.filter(
      (result) => result.city == string || result.zipcode == string
    );
  }

  function clearQueryField() {
    document.getElementById("searchFilter").value = "";
  }

  function clearLocationField() {
    document.getElementById("searchLocation").value = "";
  }

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
                type="search"
                className={styles.searchInputLeft}
                placeholder=" Search what you need"
                onChange={handleSearch}
              />
              {query && (
                <i
                  className={`fa-regular fa-circle-xmark ${styles.resetIcon}`}
                  onClick={onResetQueryFilter}
                />
              )}
              <i
                className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
                onClick={onSearchRequested}
              />

              <input
                id="searchLocation"
                type="search"
                className={styles.searchInputLeft}
                placeholder=" Please Enter a City or Zip Code"
                onChange={handleLocation}
              />
              {locationFilter && (
                <i
                  className={`fa-regular fa-circle-xmark ${styles.resetIcon}`}
                  onClick={onResetLocationFilter}
                />
              )}
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

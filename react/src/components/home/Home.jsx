import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import foodResourcesService from "../../services/foodResourcesService";
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

  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const [current, setCurrent] = useState({ lat: 34.0549, lng: -118.2426, active: "off" });
  const [zoom, setZoom] = useState(15);
  const [results, setResults] = useState([]);

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
    setResults(() => [...response.data]);
  };

  const onGetFoodResourcesError = (error) => {
    console.error(error);
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
        <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`} onClick={() => {}} />
      </>
    );
  };

  return (
    <>
      <Container className={styles.home}>
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
            <SearchResults
              results={results}
              dayOfTheWeek={dayOfTheWeek}
              setCenter={setCenter}
              center={center}
              current={current}
            />
          </Col>
          <Col className={`${styles.mapContainer}`}>
            <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
            <BaseMap markers={markers} center={center} current={current} zoom={zoom} />
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

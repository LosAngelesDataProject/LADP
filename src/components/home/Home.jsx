import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import BaseMap from "../map/BaseMap";
import results from "../../assets/data/results.js";
import SearchResults from "./SearchResults.jsx";

function Home() {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dayOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const productOptions = ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"];
  const dateDropdownRef = useRef(null);
  const dayDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);
  const markers = results.map((result) => (
    {
      geocode: [result.latitude, result.longitude],
      popUp: {
        name: result.name,
        address: `${result.streetAddress}, ${result.city}`
      }
    }
  ));
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });

  const handleClickOutside = (event) => {
    const clickedOutsideDateDropdown = dateDropdownRef.current && !dateDropdownRef.current.contains(event.target);
    const clickedOutsideDayDropdown = dayDropdownRef.current && !dayDropdownRef.current.contains(event.target);
    const clickedOutsideProductDropdown = productDropdownRef.current && !productDropdownRef.current.contains(event.target);

    if (clickedOutsideDateDropdown || clickedOutsideDayDropdown || clickedOutsideProductDropdown) {
      setShowDateDropdown(false);
      setShowDayDropdown(false);
      setShowProductDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (dropdownSetter, otherDropdowns) => {
    dropdownSetter(prev => !prev);
    otherDropdowns.forEach(setter => setter(false));
  };

  const SearchBar = () => {
    return(
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
    )
  }

  const FilterButtons = () => {
    return (
      <>
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
          <button className={styles.filterButton} onClick={() => handleButtonClick(setShowDateDropdown, [setShowDayDropdown, setShowProductDropdown])}>
            Date 
            <i className={`fa-solid fa-chevron-up ms-2 ${showDateDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showDateDropdown && (
            <div ref={dateDropdownRef} className={styles.dropdown}>
              <DatePicker
                className={styles.filterOption}
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
              />
            </div>
          )}
        </div>
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
          <button 
            className={styles.filterButton}
            onClick={() => handleButtonClick(setShowDayDropdown, [setShowDateDropdown, setShowProductDropdown])}
          >
            Day of the Week
            <i className={`fa-solid fa-chevron-up ms-2 ${showDayDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showDayDropdown && (
            <div ref={dayDropdownRef} className={styles.dropdown}>
              {dayOfTheWeek.map((day, index) => (
                <option key={index} className={styles.filterOption}>{day}</option>
              ))}
            </div>
          )}
        </div>
        <div className={`mt-3 ${styles.filterItem}`}>
          <button
            className={styles.filterButton}
            onClick={() => handleButtonClick(setShowProductDropdown, [setShowDateDropdown, setShowDayDropdown])}
          >
            Product Type
            <i className={`fa-solid fa-chevron-up ms-2 ${showProductDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showProductDropdown && (
            <div ref={productDropdownRef} className={styles.dropdown}>
              {productOptions.map((product, index) => (
                <option key={index} className={styles.filterOption}>{product}</option>
              ))}
              </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Container className={styles.home}>
        <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
          <div className={styles.searchInputContainer}>
            <SearchBar/>
          </div>
          <div className={`${styles.filterContainer}`}>
            <FilterButtons />
          </div>
        </Row>
        <Row>
          <Col>
              <SearchResults 
                results={results} 
                dayOfTheWeek={dayOfTheWeek} 
                setCenter={setCenter} 
                center={center}
              />
          </Col>
          <Col className={`${styles.mapContainer}`}>
            <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
            <BaseMap markers={markers} center={center}/>
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

export default Home
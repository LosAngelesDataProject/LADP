import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import BaseMap from "../map/BaseMap";
import results from "../../assets/data/results.js";
import SearchResults from "./SearchResults.jsx";
import HomeSlide from "./HomeSlide.jsx";

function Home() {
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [filteredDay, setFilteredDay] = useState({
    selection: "",
    selected: false
  });
  const [filteredProduct, setFilteredProduct] = useState({
    selection: "",
    selected: false
  });
  const [filteredLocation, setFilteredLocation] = useState({
    selection: "",
    selected: false
  });

  const dayOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const productOptions = [
    "Fresh Produce",
    "Dairy",
    "Meat",
    "Bread",
    "Frozen Food",
    "Baby Needs",
    "Clothing",
    "Medicine"
  ];
  const locationOptions = [
    "Food Pantry",
    "Soup Kitchen"
  ];

  const locationDropdownRef = useRef(null);
  const dayDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);

  const markers = results.map((result) => ({
    geocode: [result.latitude, result.longitude],
    popUp: {
      name: result.name,
      address: `${result.streetAddress}, ${result.city}`,
    },
  }));
  const [center, setCenter] = useState({ lat: 34.0549, lng: -118.2426 });
  const [current, setCurrent] = useState({ lat: 34.0549, lng: -118.2426 });
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude) {
        setZoom(16);
        setCurrent((prevState) => {
          const newCurrent = { ...prevState };
          
          newCurrent.lat = position.coords.latitude;
          newCurrent.lng = position.coords.longitude;
          
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
  
  const handleClickOutside = (event) => {
    const clickedOutsideLocationDropdown =
      showLocationDropdown.current && !locationDropdownRef.current.contains(event.target);
    const clickedOutsideDayDropdown =
      dayDropdownRef.current && !dayDropdownRef.current.contains(event.target);
    const clickedOutsideProductDropdown =
      productDropdownRef.current && !productDropdownRef.current.contains(event.target);

    if (clickedOutsideLocationDropdown || clickedOutsideDayDropdown || clickedOutsideProductDropdown) {
      setShowLocationDropdown(false);
      setShowDayDropdown(false);
      setShowProductDropdown(false);
    }
  };
  
  const handleButtonClick = (dropdownSetter, otherDropdowns) => {
    dropdownSetter((prev) => !prev);
    otherDropdowns.forEach((setter) => setter(false));
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

  const FilterButtons = () => {
    const handleDayButton = () => {
      if(!filteredDay.selected){
        handleButtonClick(setShowDayDropdown, [setShowLocationDropdown, setShowProductDropdown])
      }
      else{
        handleRemoveFilter(setFilteredDay)
      }
    }
    const handleTypeButton = () => {
      if(!filteredProduct.selected){
        handleButtonClick(setShowProductDropdown, [setShowLocationDropdown, setShowDayDropdown])
      }
      else{
        // handleRemoveFilter(setFilteredProduct)
        setFilteredProduct({
          type: "",
          selected: false
        })
      }
    }
    const handleLocationButton = () => {
      if(!filteredLocation.selected){
        handleButtonClick(setShowLocationDropdown, [setShowDayDropdown, setShowProductDropdown])
      }
      else{
        setFilteredLocation({
          selection: "",
          selected: false
        })
      }
    }

    const handleOptionClick = (option, setFiltered, setDropdown) => {
      setFiltered({selection: option, selected: true}); // Update the button label with the selected option
      setDropdown(false); // Close the dropdown
    };
    const handleRemoveFilter = (setter) => {
      setter({selection: "", selected: false})
    }

    return (
      <>
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
          <button
            className={`${styles.filterButton} ${filteredDay.selected ? styles.filterSelected : ""}`}
            onClick={handleDayButton}
          >
            {filteredDay.selection || "Day of the Week"}
            <i
              className={`${!filteredDay.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showDayDropdown ? styles.filterClicked : ""}`}
            />
          </button>
          {showDayDropdown && (
            <div ref={dayDropdownRef} className={styles.dropdown}>
              {dayOfTheWeek.map((day, index) => (
                <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(day, setFilteredDay, setShowDayDropdown))}>
                  {day}
                </option>
              ))}
            </div>
          )}
        </div>
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
          <button
            className={`${styles.filterButton} ${filteredProduct.selected ? styles.filterSelected : ""}`}
            onClick={handleTypeButton}
          >
            {filteredProduct.selection || "Product Type"}
            <i
              className={`${!filteredProduct.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showProductDropdown ? styles.filterClicked : ""}`}
            />
          </button>
          {showProductDropdown && (
            <div ref={productDropdownRef} className={styles.dropdown}>
              {productOptions.map((product, index) => (
                <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(product, setFilteredProduct, setShowProductDropdown))}>
                  {product}
                </option>
              ))}
            </div>
          )}
        </div>
        <div className={`mt-3 ${styles.filterItem}`}>
          <button
            className={`${styles.filterButton} ${filteredLocation.selected ? styles.filterSelected : ""}`}
            onClick={handleLocationButton}
          >
            {filteredLocation.selection || "Location Type"}
            <i
              className={`${!filteredLocation.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showLocationDropdown ? styles.filterClicked : ""}`}
            />
          </button>
          {showLocationDropdown && (
            <div ref={locationDropdownRef} className={styles.dropdown}>
              {locationOptions.map((location, index) => (
                <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(location, setFilteredLocation, setShowLocationDropdown))}>
                  {location}
                </option>
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
        <div className="Home-Carousel">
          <HomeSlide className="Carousel-Hero" />
        </div>
        <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
          <div className={styles.searchInputContainer}>
            <SearchBar />
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

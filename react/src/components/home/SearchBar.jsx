import styles from "./SearchBar.module.css";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function SearchBar(props) {
  const {
    resultsArray,
    filteredArray,
    isFilterApplied,
    setIsSearchApplied,
    setResults,
    locationFilter,
    isResetAllClicked,
    setIsResetAllClicked,
  } = props;

  const [searchInputValue, setSearchInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");

  const searchFilterRef = useRef(null);
  const searchLocationRef = useRef(null);

  useEffect(() => {
    if (isResetAllClicked) {
      searchFilterRef.current.value = "";
      setSearchInputValue("");
      searchLocationRef.current.value = "";
      setLocationInputValue("");
      setIsResetAllClicked(false);
    }

    searchHandler();
  }, [isFilterApplied, isResetAllClicked]);

  function filterResults(nameValue, locationValue) {
    const arrayToFilter =
      filteredArray.length > 0 ? [...filteredArray] : [...resultsArray];

    const filtered = arrayToFilter.filter((location) => {
      const nameMatch = nameValue
        ? location.name.toLowerCase().includes(nameValue.toLowerCase())
        : true;

      const locationMatch = locationValue
        ? location.city.toLowerCase().includes(locationValue.toLowerCase()) ||
          location.zipcode.includes(locationValue)
        : true;

      return nameMatch && locationMatch;
    });

    setResults(filtered.length > 0 ? filtered : []);

    if (nameValue != "" || locationValue != "") {
      setIsSearchApplied(true);
    }
  }

  function searchHandler() {
    const searchValue = searchFilterRef.current?.value || "";
    const locationValue = searchLocationRef.current?.value || "";

    filterResults(searchValue, locationValue);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchHandler();
    }
  }

  function resetInputs(resetTrigger) {
    if (resetTrigger === "search" && searchFilterRef.current) {
      searchFilterRef.current.value = "";
      setSearchInputValue("");
      searchHandler();
    }

    if (resetTrigger === "location" && searchLocationRef.current) {
      searchLocationRef.current.value = "";
      setLocationInputValue("");
      searchHandler();
    }

    if (!searchFilterRef.current?.value && !searchLocationRef.current?.value) {
      locationFilter(); // Reset to the default list
    } else {
      searchHandler();
    }
    setIsSearchApplied(false);
  }

  return (
    <>
      <input
        id="searchFilter"
        type="text"
        placeholder="&#xF002; Search"
        className={`${styles.searchInputLeft} ${styles.searchInputLeftStandard}`}
        onChange={(e) => {
          setSearchInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={searchFilterRef}
      />
      {
        <i
          className={`fa-solid fa-circle-xmark ${styles.searchIconX} ${
            searchInputValue ? "" : "d-none"
          } `}
          onClick={() => {
            resetInputs("search");
          }}
        />
      }
      <input
        id="searchLocation"
        type="text"
        placeholder="&#xF3C5; Location"
        className={`${styles.searchInputRight} ${styles.searchInputRightStandard}`}
        onChange={(e) => {
          setLocationInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={searchLocationRef}
      />
      {
        <i
          className={`fa-solid fa-circle-xmark ${styles.searchIconX} ${
            locationInputValue ? "" : "d-none"
          } `}
          onClick={() => {
            resetInputs("location");
          }}
        />
      }
      {
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
          onClick={() => {
            searchHandler();
          }}
        />
      }
    </>
  );
}

SearchBar.propTypes = {
  filteredArray: PropTypes.array.isRequired,
  resultsArray: PropTypes.array.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
  isResetAllClicked: PropTypes.bool.isRequired,
  setIsResetAllClicked: PropTypes.func.isRequired,
  setIsSearchApplied: PropTypes.func.isRequired,

  setResults: PropTypes.func.isRequired,
  locationFilter: PropTypes.func.isRequired,
};

export default SearchBar;

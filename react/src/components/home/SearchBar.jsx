import styles from "./SearchBar.module.css";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

function SearchBar(props) {
  const { results, setResults, locationFilter } = props;

  const [toggleInput, setToggleInput] = useState("");

  const searchFilterRef = useRef(null); // Ref for searchFilter input
  const searchLocationRef = useRef(null); // Ref for searchLocation input

  // Function to filter locations based on search input
  function filterResults(inputValue, isLocationFilter) {
    const filtered = results.filter((location) => {
      const nameMatch = location.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const locationMatch =
        location.city.toLowerCase().includes(inputValue.toLowerCase()) ||
        location.zipcode.includes(inputValue);
      return isLocationFilter ? locationMatch : nameMatch;
    });

    if (filtered.length > 0) {
      console.log(filtered); // Log filtered results if match found  ---------------------TO BE REMOVED AFTER DEMO
      setResults(filtered); // Update results with filtered data
    } else {
      console.log("No match found"); // Log "No match found" if no match  ----------------TO BE REMOVED AFTER DEMO
      setResults([]); // Optionally, reset the results if no match
    }
  }

  function searchHandler() {
    if (toggleInput === "search" && searchFilterRef.current) {
      const inputValue = searchFilterRef.current.value;

      filterResults(inputValue, false); // Trigger filtering based on search input (name)
    } else if (toggleInput === "location" && searchLocationRef.current) {
      const inputValue = searchLocationRef.current.value;

      filterResults(inputValue, true); // Trigger filtering based on location input (city or zipcode)
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      // Check if Enter key was pressed
      searchHandler(); // Call searchHandler
    }
  }

  function resetInputs() {
    setToggleInput("");
    if (searchFilterRef.current) searchFilterRef.current.value = ""; // Reset searchFilter input
    if (searchLocationRef.current) searchLocationRef.current.value = ""; // Reset searchLocation input

    locationFilter(); // Reset the results to the default (original) list. It will use the filter function from the home component to take into consideration any filter that is applied.
  }

  return (
    <>
      <i
        className={`fa-solid fa-arrow-left ${styles.searchIconLeft} ${
          toggleInput === "" ? "d-none" : ""
        }`}
        onClick={resetInputs} // Call resetInputs on click
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
        onKeyDown={handleKeyDown} // Trigger testfunction on Enter key press
        ref={searchFilterRef} // Attach ref to searchFilter input
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
        onKeyDown={handleKeyDown} // Trigger testfunction on Enter key press
        ref={searchLocationRef} // Attach ref to searchLocation input
      />
      {toggleInput === "search" ? (
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
          onClick={() => {
            searchHandler(); // Call searchHandler
          }}
        />
      ) : (
        <i
          className={`fa-solid fa-location-dot ${styles.searchIconRight} ${
            toggleInput === "" ? "d-none" : ""
          }`}
          onClick={() => {
            searchHandler(); // Call searchHandler
          }}
        />
      )}
    </>
  );
}

SearchBar.propTypes = {
  results: PropTypes.array.isRequired,
  setResults: PropTypes.func.isRequired,
  locationFilter: PropTypes.func.isRequired,
};

export default SearchBar;

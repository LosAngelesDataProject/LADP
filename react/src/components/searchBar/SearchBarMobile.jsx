import styles from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import WithSearchLogic from "./WithSearchLogic";

function SearchBarMobile(props) {
  const {
    searchHandler,
    setSearchInputValue,
    searchFilterRef,
    searchInputValue,
    resetInputs,
    setLocationInputValue,
    searchLocationRef,
    locationInputValue,
  } = props;

  const [toggleInput, setToggleInput] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideSearch = event.target.tagName === "INPUT";

      const isClickOnResetIcon =
        event.target.classList.contains("fa-circle-xmark");

      if (!isClickInsideSearch && !isClickOnResetIcon) {
        setToggleInput("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchHandler();
      setToggleInput("");
    }
  }

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
        onChange={(e) => {
          setSearchInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={searchFilterRef}
      />
      <i
        className={`fa-solid fa-circle-xmark ${styles.searchIconX} ${
          searchInputValue ? "" : "d-none"
        } ${toggleInput === "location" ? "d-none" : ""}`}
        onClick={() => {
          resetInputs("search");
        }}
      />
      <input
        id="searchLocation"
        type="text"
        placeholder="&#xF3C5; Location"
        className={`${styles.searchInputRight} ${
          toggleInput === "location" ? styles.expand : ""
        }  ${toggleInput === "search" ? "d-none" : ""}`}
        onSelect={() => {
          setToggleInput("location");
        }}
        onChange={(e) => {
          setLocationInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={searchLocationRef}
      />
      <i
        className={`fa-solid fa-circle-xmark ${styles.searchIconX} ${
          locationInputValue ? "" : "d-none"
        } ${toggleInput === "search" ? "d-none" : ""}`}
        onClick={() => {
          resetInputs("location");
        }}
      />
      {toggleInput === "search" ? (
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
          onClick={() => {
            searchHandler();
          }}
        />
      ) : (
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
          onClick={() => {
            searchHandler();
          }}
        />
      )}
    </>
  );
}

SearchBarMobile.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
  searchFilterRef: PropTypes.object.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  resetInputs: PropTypes.func.isRequired,
  setLocationInputValue: PropTypes.func.isRequired,
  searchLocationRef: PropTypes.object.isRequired,
  locationInputValue: PropTypes.string.isRequired,
};

const EnhancedSearchBarMobile = WithSearchLogic(SearchBarMobile);
export default EnhancedSearchBarMobile;

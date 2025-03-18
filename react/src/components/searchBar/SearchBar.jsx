import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";
import WithSearchBarLogic from "../WithSearchLogic";

function SearchBar(props) {
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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchHandler();
    }
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
  searchHandler: PropTypes.func.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
  searchFilterRef: PropTypes.object.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  resetInputs: PropTypes.func.isRequired,
  setLocationInputValue: PropTypes.func.isRequired,
  searchLocationRef: PropTypes.object.isRequired,
  locationInputValue: PropTypes.string.isRequired,
};

export default WithSearchBarLogic(SearchBar);

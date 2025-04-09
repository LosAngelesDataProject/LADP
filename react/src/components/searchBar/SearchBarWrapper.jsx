import SearchBar from "./SearchBar.jsx";
import SearchBarMobile from "./SearchBarMobile.jsx";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

function SearchBarWrapper(props) {
  const {
    isPhone,
    resultsArray,
    filteredArray,
    isFilterApplied,
    setIsSearchApplied,
    setResults,
    locationFilter,
    isResetAllClicked,
    setIsResetAllClicked,
  } = props;

  return (
    <>
      {isPhone ? (
        <div className={styles.searchInputContainer}>
          <SearchBarMobile
            setResults={setResults}
            locationFilter={locationFilter}
            resultsArray={resultsArray}
            filteredArray={filteredArray}
            setIsSearchApplied={setIsSearchApplied}
            isFilterApplied={isFilterApplied}
            isResetAllClicked={isResetAllClicked}
            setIsResetAllClicked={setIsResetAllClicked}
          />
        </div>
      ) : (
        <div className={styles.searchInputContainerStandard}>
          <SearchBar
            setResults={setResults}
            locationFilter={locationFilter}
            resultsArray={resultsArray}
            filteredArray={filteredArray}
            isFilterApplied={isFilterApplied}
            setIsSearchApplied={setIsSearchApplied}
            isResetAllClicked={isResetAllClicked}
            setIsResetAllClicked={setIsResetAllClicked}
          />
        </div>
      )}
    </>
  );
}

SearchBarWrapper.propTypes = {
  isPhone: PropTypes.bool.isRequired,
  filteredArray: PropTypes.array.isRequired,
  resultsArray: PropTypes.array.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
  isResetAllClicked: PropTypes.bool.isRequired,
  setIsResetAllClicked: PropTypes.func.isRequired,
  setIsSearchApplied: PropTypes.func.isRequired,

  setResults: PropTypes.func.isRequired,
  locationFilter: PropTypes.func.isRequired,
};

export default SearchBarWrapper;

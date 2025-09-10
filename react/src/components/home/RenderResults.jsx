import SearchResults from "./SearchResults.jsx";
import Spinner from "react-bootstrap/Spinner";
import daysOfTheWeek from "../../assets/data/daysOfTheWeek.js";
import PropTypes from "prop-types";

function RenderResults(props) {
  const {
    resultsArray,
    results,
    setCenter,
    center,
    current,
    showDescriptionIndex,
    setShowDescriptionIndex,
  } = props;

  return resultsArray.length ? (
    <SearchResults
      results={results}
      daysOfTheWeek={daysOfTheWeek}
      setCenter={setCenter}
      center={center}
      current={current}
      showDescriptionIndex={showDescriptionIndex}
      setShowDescriptionIndex={setShowDescriptionIndex}
    />
  ) : (
    <Spinner animation="grow" variant="dark" className="mt-5 d-flex mx-auto" />
  );
}

RenderResults.propTypes = {
  resultsArray: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  setCenter: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
  showDescriptionIndex: PropTypes.number.isRequired,
  setShowDescriptionIndex: PropTypes.func.isRequired,
};

export default RenderResults;

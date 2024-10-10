import styles from "./Home.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import GetDirections from "../map/GetDirections";

const SearchResults = (props) => {
  const { setCenter, results, dayOfTheWeek, center, current } = props;
  const [showDescription, setShowDescription] = useState(new Array(results.length).fill(false));
  const currentDate = new Date();
  const todayIs = dayOfTheWeek[currentDate.getDay() - 1];

  const handleDescriptionClick = (index) => {
    const newShowDescription = showDescription.map((_, i) =>
      i === index ? !showDescription[index] : false
    );
    setShowDescription(newShowDescription);
    let resultsLocation = { lat: results[index].latitude, lng: results[index].longitude };
    let reCenter = resultsLocation.lat === center.lat && resultsLocation.lng === center.lng;
    if (reCenter) {
      setCenter({ lat: results[index].latitude, lng: results[index].longitude });
    }
  };

  return (
    <>
      {results.length !== 0 ? (
        results.map((result, index) => {
          const finalCard = index !== results.length - 1 ? "mb-3" : "";
          const resultAddressString = `${result.streetAddress}, ${result.city}, ${result.state} ${
            result.zipcode
          },${" "} ${result.country} `;
          return (
            <div
              className={`${finalCard} ${styles.card} ${
                showDescription[index] ? styles.cardSelected : ""
              }`}
              key={`resultCard-${index}`}
              onClick={() => {
                handleDescriptionClick(index);
                setCenter({ lat: results[index].latitude, lng: results[index].longitude });
              }}
            >
              <div className={`ms-3 mt-3 mb-3 card-body ${styles.cardContent}`}>
                <h4>{result.name}</h4>
                <h6>Area: {result.area}</h6>
                <div className={`mb-1 ${!result.streetAddress ? "d-none" : ""}`}>
                  <h6 className="col d-inline">Address: &nbsp;</h6>

                  <p className="col d-inline">
                    {result.streetAddress}, {result.city}, {result.state} {result.zipcode},{" "}
                    {result.country}
                  </p>
                </div>
                {showDescription[index] && (
                  <>
                    <div className={`mb-1 ${!result.phone ? "d-none" : ""}`}>
                      <h6 className="col d-inline">Phone number: &nbsp;</h6>
                      <p className="col d-inline">{result.phone}</p>
                    </div>
                    <div className={`mb-3 ${!result.website ? "d-none" : ""}`}>
                      <h6 className="col d-inline">Website: &nbsp;</h6>
                      <p className="col d-inline">{result.website}</p>
                    </div>

                    <div>
                      <GetDirections markerAddress={resultAddressString} current={current} />
                    </div>
                    <br></br>
                    <div className={`mb-3`}>
                      <h6 className="mb-1">Tags:</h6>
                      {result.tags.map((tag, index) => {
                        return (
                          <p key={`tag-${index}`} className={`${styles.tag} col `}>
                            {tag}
                          </p>
                        );
                      })}
                    </div>
                    <div className={`my-3 ${!result.description ? "d-none" : ""}`}>
                      <p className="mb-1">Description:</p>
                      <p className={`fw-light ${styles.resultDescription}`}>{result.description}</p>
                    </div>
                    <div>
                      {result.businessHours.map((businessHours, index) => {
                        const closingTime = !businessHours.close
                          ? "Unavailable"
                          : businessHours.close;
                        const openingTime = !businessHours.open
                          ? "Unavailable"
                          : businessHours.open;
                        const timeOpen =
                          !businessHours.close && !businessHours.open
                            ? "Closed"
                            : `${openingTime} - ${closingTime}`;
                        return (
                          <p
                            key={`day-${index}`}
                            className={`mb-0 ${
                              todayIs === businessHours.day ? "fw-bold" : "fw-light"
                            }`}
                          >
                            {`${businessHours.day}: ${timeOpen}`}
                          </p>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p> No Results</p>
      )}
    </>
  );
};

SearchResults.propTypes = {
  setCenter: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      area: PropTypes.string,
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.number,
      country: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      businessHours: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.string.isRequired,
          open: PropTypes.string,
          close: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  dayOfTheWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  current: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    active: PropTypes.string,
  }),
};

export default SearchResults;

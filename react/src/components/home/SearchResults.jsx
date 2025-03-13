import { useRef, useEffect } from "react";
import styles from "./Home.module.css";
import PropTypes from "prop-types";
import GetDirections from "../map/GetDirections";

const SearchResults = (props) => {
  const {
    setCenter,
    results,
    daysOfTheWeek,
    center,
    current,
    showDescriptionIndex,
    setShowDescriptionIndex,
  } = props;

  const currentDate = new Date();
  const todayIs = daysOfTheWeek[currentDate.getDay() - 1];

  const resultRefs = useRef([]);

  useEffect(() => {
    if (
      showDescriptionIndex !== null &&
      resultRefs.current[showDescriptionIndex]
    ) {
      resultRefs.current[showDescriptionIndex].scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [showDescriptionIndex]);

  const handleDescriptionClick = (index) => {
    setShowDescriptionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );

    let resultsLocation = {
      lat: results[index].latitude,
      lng: results[index].longitude,
    };
    let reCenter =
      resultsLocation.lat === center.lat && resultsLocation.lng === center.lng;
    if (reCenter) {
      setCenter({
        lat: results[index].latitude,
        lng: results[index].longitude,
      });
    }
  };

  return (
    <>
      {results.length !== 0 ? (
        results.map((result, index) => {
          const finalCard = index !== results.length - 1 ? "mb-3" : "";
          const resultAddressString = `${result.streetAddress}, ${result.city}, ${result.state} ${result.zipcode}`;
          return (
            <div
              ref={(element) => (resultRefs.current[index] = element)}
              className={`${finalCard} ${styles.card} ${
                showDescriptionIndex === index ? styles.cardSelected : ""
              }`}
              key={`resultCard-${index}`}
              onClick={() => {
                handleDescriptionClick(index);
                setCenter({
                  lat: results[index].latitude,
                  lng: results[index].longitude,
                });
              }}
            >
              <div className={`ms-3 mt-3 mb-3 card-body ${styles.cardContent}`}>
                <h4 className={`${styles.cardTitle}`}>{result.name}</h4>
                <div
                  className={`mb-1 ${!result.streetAddress ? "d-none" : ""}`}
                >
                  <h6 className="col d-inline">Address: &nbsp;</h6>

                  <p className="col d-inline">
                    {result.streetAddress}, {result.city}, {result.state}{" "}
                    {result.zipcode}
                  </p>
                </div>
                {showDescriptionIndex === index && (
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
                      <GetDirections
                        markerAddress={resultAddressString}
                        current={current}
                      />
                    </div>
                    <br></br>
                    <div className={`mb-3`}>
                      <h6 className="mb-1">Tags:</h6>
                      {result.tags.map((tag, index) => {
                        return (
                          <p
                            key={`tag-${index}`}
                            className={`${styles.tag} col `}
                          >
                            {tag.name}
                          </p>
                        );
                      })}
                    </div>
                    <div
                      className={`my-3 ${!result.description ? "d-none" : ""}`}
                    >
                      <p className="mb-1">Description:</p>
                      <p className={`fw-light ${styles.resultDescription}`}>
                        {result.description}
                      </p>
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
                              todayIs === businessHours.day
                                ? "fw-bold"
                                : "fw-light"
                            }`}
                          >
                            {`${businessHours.day.name}: ${timeOpen}`}
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
        <p> Food Resource Not Found</p>
      )}
    </>
  );
};

SearchResults.propTypes = {
  setCenter: PropTypes.func.isRequired,
  setShowDescriptionIndex: PropTypes.func.isRequired,
  showDescriptionIndex: PropTypes.number,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.object),
      description: PropTypes.string,
      businessHours: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.object,
          open: PropTypes.string,
          close: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  daysOfTheWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
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

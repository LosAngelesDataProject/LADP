import { Fragment, useRef, useState } from "react";

import mapStyles from "../map/Map.module.css";
import styles from "./Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import BaseMap from "../map/BaseMap";

function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showInfo, setShowInfo] = useState([false, false, false]); // State for each item's additional information
  const ref = useRef(null);

  const handleGoButtonClick = () => {
    setShowFilters(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateDropdownClick = () => {
    setShowDateDropdown(!showDateDropdown);
    // Hide other dropdowns when this one is clicked
    setShowDayDropdown(false);
    setShowProductDropdown(false);
  };

  const handleDayDropdownClick = () => {
    setShowDayDropdown(!showDayDropdown);
    // Hide other dropdowns when this one is clicked
    setShowDateDropdown(false);
    setShowProductDropdown(false);
  };

  const handleProductDropdownClick = () => {
    setShowProductDropdown(!showProductDropdown);
    // Hide other dropdowns when this one is clicked
    setShowDateDropdown(false);
    setShowDayDropdown(false);
  };

  const handleInfoClick = (index) => {
    // Toggle the visibility of the additional information for the clicked item
    const newShowInfo = [...showInfo];
    newShowInfo[index] = !newShowInfo[index];
    setShowInfo(newShowInfo);
  };

  return (
    <Fragment>
      <div className={styles.home}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>LA Data Project</h2>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputContainer}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="      Please Enter a City or Zip Code"
            />
            <button className={styles.goButton} onClick={handleGoButtonClick}>
              Go!
            </button>
          </div>
          <div className={styles.searchHint}>
            <p>FIND A FOOD BANK NEAR YOU!</p>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filterContainer}>
            <div className={styles.filterItem}>
              <button
                className={styles.filterButton}
                onClick={handleDateDropdownClick}
              >
                Date Posted
              </button>
              {showDateDropdown && (
                <div className={styles.filterOptions}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat={(date) => format(date, "MM/dd/yyyy")}
                  />
                </div>
              )}
            </div>
            <div className={styles.filterItem}>
              <button
                className={styles.filterButton}
                onClick={handleDayDropdownClick}
              >
                Day of the Week{" "}
              </button>
              {showDayDropdown && (
                <div className={styles.filterOptions}>
                  <div>
                    <label>Day of The Week</label>
                    <select>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.filterItem}>
              <button
                className={styles.filterButton}
                onClick={handleProductDropdownClick}
              >
                Product Type
              </button>
              {showProductDropdown && (
                <div className={styles.filterOptions}>
                  <div>
                    <label>Product Types</label>
                    <select>
                      <option>Fresh Produce</option>
                      <option>Dairy</option>
                      <option>Meat</option>
                      <option>Bread</option>
                      <option>Mexican Food</option>
                      <option>Frozen Food</option>
                      <option>Baby Needs</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.bodyContainer}>
          <div className={styles.searchResultsContainer}>
            <h4 className={styles.searchResultsTitle}>Search Results</h4>
            <div className={styles.searchResultItem}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h4>
                    Eggs
                    <p> 500 dozen - Culver City</p>
                    <div ref={ref}>
                      <button
                        className={styles.roundedButton}
                        onClick={() => handleInfoClick(0)}
                      >
                        More Info
                      </button>
                    </div>
                  </h4>
                  {showInfo[0] && (
                    <div className={styles.additionalInfo}>
                      <div className={styles.popDetail}>
                        Address: 3333 HTML Rd
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.searchResultItem}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h4>
                    Oranges
                    <p> 500 count - Ventura</p>
                    <div ref={ref}>
                      <button
                        className={styles.roundedButton}
                        onClick={() => handleInfoClick(1)}
                      >
                        More Info
                      </button>
                    </div>
                  </h4>
                  {showInfo[1] && (
                    <div className={styles.additionalInfo}>
                      <div className={styles.popDetail}>
                        Address: 3333 HTML Rd
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.searchResultItem}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h4>
                    Diapers
                    <p> 1,000 boxes - West Hollywood</p>
                    <div ref={ref}>
                      <button
                        className={styles.roundedButton}
                        onClick={() => handleInfoClick(2)}
                      >
                        More Info
                      </button>
                    </div>
                  </h4>
                  {showInfo[2] && (
                    <div className={styles.additionalInfo}>
                      <div className={styles.popDetail}>
                        Address: 3333 HTML Rd
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.searchResultItem}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <h4>
                    Whole Chickens
                    <p> 200 count - South LA</p>
                    <div ref={ref}>
                      <button
                        className={styles.roundedButton}
                        onClick={() => handleInfoClick(3)}
                      >
                        More Info
                      </button>
                    </div>
                  </h4>
                  {showInfo[3] && (
                    <div className={styles.additionalInfo}>
                      <div className={styles.popDetail}>
                        Address: 3333 HTML Rd
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={mapStyles.leafletContainer}>
            <div className={styles.mapInfo}>
              <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
            </div>
            <div>{<BaseMap />}</div>
          </div>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <p> Hero Section: Welcome to the Los Angeles Data Project...</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;

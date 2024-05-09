import { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
// import mapStyles from "../map/Map.module.css";
import styles from "./Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import BaseMap from "../map/BaseMap";

function Home() {
  const [showFilters, setShowFilters] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [showDateDropdown, setShowDateDropdown] = useState(false);
  // const [showDayDropdown, setShowDayDropdown] = useState(false);
  // const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showInfo, setShowInfo] = useState([false, false, false]); // State for each item's additional information
  const ref = useRef(null);

  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // const handleDateChange = date => setSelectedDate(date);
  // const handleDateDropdownClick = () => setShowDateDropdown(!showDateDropdown);
  // const handleDayDropdownClick = () => setShowDayDropdown(!showDayDropdown);
  // const handleProductDropdownClick = () => setShowProductDropdown(!showProductDropdown);

  // const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // const productOptions = ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"];
  // const buttons = ["Day of the Week", "Product Type" ];

  const FilterButtons = () => {
    return (
      <>
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
      </>
    )
  };

  const SearchResults = () => {
    const results = [
      {
        supplies: "Eggs",
        location: "Culver City",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Diapers",
        location: "Ventura",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Whole Chickens",
        location: "West Hollywood",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Eggs",
        location: "Culver City",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Diapers",
        location: "Ventura",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Whole Chickens",
        location: "West Hollywood",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Eggs",
        location: "Culver City",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Diapers",
        location: "Ventura",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Whole Chickens",
        location: "West Hollywood",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Eggs",
        location: "Culver City",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Diapers",
        location: "Ventura",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Whole Chickens",
        location: "West Hollywood",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Eggs",
        location: "Culver City",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Diapers",
        location: "Ventura",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        supplies: "Whole Chickens",
        location: "West Hollywood",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
    return (
      <>
        {/* <div> */}
          <h4 className={styles.searchResultsTitle}>
            Search Results
          </h4>
          {results.length != 0 ? results.map((result, index)=>{
            return (
              <div
              // <div className={styles.searchResultItem} 
              key={`resultCard-${index}`}>
                <div className={`my-3 ${styles.card}`}>
                  <div className={styles.cardContent}>
                    <h4>
                      {result.supplies}
                      <p> {result.amount} - {result.location}</p>
                      <div ref={ref}>
                        <button
                          className={styles.roundedButton}
                          onClick={() => handleInfoClick(index)}
                        >
                          More Info
                        </button>
                      </div>
                    </h4>
                    {showInfo[index] && (
                      <div className={styles.additionalInfo}>
                        <div className={styles.popDetail}>
                          {result.info}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }):
          <p> No Results</p>}
        {/* </div> */}
      </>
    )
  }

  // const Dropdown = (label, options) => (
  //   return (
  //     <div>
  //       <label>{label}</label>
  //       <select>
  //         {options.map(option => (
  //           <option key={option}>{option}</option>
  //         ))}
  //       </select>
  //     </div>
  //   )
  // );

  return (
    <>
      <Container className={styles.home}>
      {/* <div className={styles.home}> */}
        {/* <div className={styles.titleContainer}>
          <h2 className={styles.title}>LA Data Project</h2>
        </div> */}
        <Row>
          <div className={`${styles.searchContainer}`}>
            <div className={styles.searchInputContainer}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Please Enter a City or Zip Code"
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
              <FilterButtons/>
            </div>
          )}
        </Row>
        <Row>
          <Col>
            <div className={styles.bodyContainer}>
              <SearchResults/>
            </div>
          </Col>
          <Col className={`${styles.mapContainer}`}>
                <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
                {<BaseMap />}
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

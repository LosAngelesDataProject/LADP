import { 
  //useRef, 
  useState } from "react";
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
  // const ref = useRef(null);

  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = new Date();
  const dayOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayIs = dayOfTheWeek[currentDate.getDay() - 1];

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
        area: "Culver City",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Diapers",
        area: "Ventura",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Whole Chickens",
        area: "West Hollywood",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Eggs",
        area: "Culver City",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Diapers",
        area: "Ventura",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Whole Chickens",
        area: "West Hollywood",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Eggs",
        area: "Culver City",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Diapers",
        area: "Ventura",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Whole Chickens",
        area: "West Hollywood",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Eggs",
        area: "Culver City",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Diapers",
        area: "Ventura",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Whole Chickens",
        area: "West Hollywood",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Eggs",
        area: "Culver City",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Diapers",
        area: "Ventura",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      },
      {
        supplies: "Whole Chickens",
        area: "West Hollywood",
        address: "1010-B W. 108th St",
        amount: "500 dozen",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        businessHours: [
          {
            day: "Monday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Tuesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Wednesday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Thursday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Friday",
            open: "9:am",
            close: "12:30"
          },
          {
            day: "Saturday",
            open: null,
            close: null
          },
          {
            day: "Sunday",
            open: null,
            close: null
          }
        ]
      }
    ]
    const [showInfo, setShowInfo] = useState(new Array(results.length).fill(false));

    const handleInfoClick = (index) => {
      // Create an array with all false values, then set only the clicked item to true
      const newShowInfo = showInfo.map((_, i) => i === index ? !showInfo[index] : false);
      setShowInfo(newShowInfo);
    };
    return (
      <>
        {results.length != 0 ? results.map((result, index)=>{
          const finalCard = index != results.length - 1 ? "mb-3" : "";
          return (
              <div 
                className={`${finalCard} ${styles.card} ${showInfo[index] ? styles.cardSelected : ""}`} 
                key={`resultCard-${index}`} onClick={() => handleInfoClick(index)}
              >
                <div className={`ms-3 mt-3 card-body ${styles.cardContent}`}>
                  <h4>
                    {result.supplies}
                  </h4>
                  <p> Location: {result.area}</p>

                  {showInfo[index] && (
                    <div className={styles.additionalInfo}>
                      <div>
                        {result.address}
                      </div>
                      <div className="my-3">
                        <p>Description:</p>
                        <p className={styles.resultInfo}>
                          {result.info}
                        </p>
                      </div>
                      <div>
                        {result.businessHours.map((businessHours, index)=>{
                          const timeOpen = businessHours.open != null ? `${businessHours.open} - ${businessHours.close}` : "Closed";
                          return(
                            <p key={`day-${index}`} 
                            className={`${styles.calendarCard} ${todayIs === businessHours.day ? 'fw-bold' : 'fw-light'}`}
                            >
                              {`${businessHours.day}: ${timeOpen}`}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
          )
        }):
        <p> No Results</p>}
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
            <div className={styles.resultsContainer}>
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

import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import BaseMap from "../map/BaseMap";

function Home() {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = new Date();
  const dayOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayIs = dayOfTheWeek[currentDate.getDay() - 1];
  const productOptions = ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"];
  const dateDropdownRef = useRef(null);
  const dayDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    const clickedOutsideDateDropdown = dateDropdownRef.current && !dateDropdownRef.current.contains(event.target);
    const clickedOutsideDayDropdown = dayDropdownRef.current && !dayDropdownRef.current.contains(event.target);
    const clickedOutsideProductDropdown = productDropdownRef.current && !productDropdownRef.current.contains(event.target);

    if (clickedOutsideDateDropdown || clickedOutsideDayDropdown || clickedOutsideProductDropdown) {
      setShowDateDropdown(false);
      setShowDayDropdown(false);
      setShowProductDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (dropdownSetter, otherDropdowns) => {
    dropdownSetter(prev => !prev);
    otherDropdowns.forEach(setter => setter(false));
  };

  const SearchBar = () => {
    return(
    <>
      <input
        id="searchFilter"
        type="search"
        className={styles.searchInputLeft}
        placeholder=" Search what you need"
      />
      <input 
        id="searchLocation"
        type="search" 
        className={styles.searchInputRight}
        placeholder=" Please Enter a City or Zip Code"
      />
      <i 
        className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`} 
        onClick={() => {}}
      />
    </>
    )
  }

  const FilterButtons = () => {
    return (
      <>
        <div className={styles.filterItem}>
          <button className={styles.filterButton} onClick={() => handleButtonClick(setShowDateDropdown, [setShowDayDropdown, setShowProductDropdown])}>
            Date 
            <i className={`fa-solid fa-chevron-up ms-2 ${showDateDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showDateDropdown && (
            <div ref={dateDropdownRef} className={styles.dropdown}>
              <DatePicker
                className={styles.filterOption}
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
              />
            </div>
          )}
        </div>
        <div className={styles.filterItem}>
          <button 
            className={styles.filterButton}
            onClick={() => handleButtonClick(setShowDayDropdown, [setShowDateDropdown, setShowProductDropdown])}
          >
            Day of the Week
            <i className={`fa-solid fa-chevron-up ms-2 ${showDayDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showDayDropdown && (
            <div ref={dayDropdownRef} className={styles.dropdown}>
              {dayOfTheWeek.map((day, index) => (
                <option key={index} className={styles.filterOption}>{day}</option>
              ))}
            </div>
          )}
        </div>
        <div className={styles.filterItem}>
          <button
            className={styles.filterButton}
            onClick={() => handleButtonClick(setShowProductDropdown, [setShowDateDropdown, setShowDayDropdown])}
          >
            Product Type
            <i className={`fa-solid fa-chevron-up ms-2 ${showProductDropdown ? styles.filterSelected : ""}`} />
          </button>
          {showProductDropdown && (
            <div ref={productDropdownRef} className={styles.dropdown}>
              {productOptions.map((product, index) => (
                <option key={index} className={styles.filterOption}>{product}</option>
              ))}
              </div>
          )}
        </div>
      </>
    );
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
    //add tags for filter remove amount swap main tiltle for Area
    const [showInfo, setShowInfo] = useState(new Array(results.length).fill(false));

    const handleInfoClick = (index) => {
      const newShowInfo = showInfo.map((_, i) => i === index ? !showInfo[index] : false);
      setShowInfo(newShowInfo);
    };

    return (
      <>
        {results.length !== 0 ? results.map((result, index) => {
          const finalCard = index !== results.length - 1 ? "mb-3" : "";
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
                      {result.businessHours.map((businessHours, index) => {
                        const timeOpen = businessHours.open != null ? `${businessHours.open} - ${businessHours.close}` : "Closed";
                        return (
                          <p key={`day-${index}`} 
                            className={`${styles.calendarCard} ${todayIs === businessHours.day ? 'fw-bold' : 'fw-light'}`}
                          >
                            {`${businessHours.day}: ${timeOpen}`}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }) : <p> No Results</p>}
      </>
    );
  };

  return (
    <>
      <Container className={styles.home}>
        <Row className={`mx-2 my-4 ${styles.searchContainer}`}>
          <div className={styles.searchInputContainer}>
            <SearchBar/>
          </div>
          <div className={`mt-3 ${styles.filterContainer}`}>
            <FilterButtons />
          </div>
        </Row>
        <Row>
          <Col>
            <div>
              <SearchResults />
            </div>
          </Col>
          <Col className={`${styles.mapContainer}`}>
            <h4 className={styles.mapTitle}>Map of Los Angeles, CA</h4>
            <BaseMap />
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

export default Home
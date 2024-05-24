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
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
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
        <div className={`me-3 mt-3 ${styles.filterItem}`}>
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
        <div className={`mt-3 ${styles.filterItem}`}>
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
        name: "A World With Compassion",
        area: "Boyle Heights",
        address: "2912 Guirado St, Los Angeles, CA 90023, United States",
        tags: ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"],
        number:"(562) 396-3893",
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
        name: "Christ Living Gospel",
        area: "Lincoln Heights",
        address: "2221 Workman St., Los Angeles, CA 90031, United States",
        tags: ["Baby Needs"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Mid Central",
        address: "191 N. Oak Avenue, Pasadena, CA 91107, United States",
        tags: ["Fresh Produce", "Dairy"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Azusa",
        address: "5525 North Lake Ellen Avenue, Azusa, CA 91702, United States",
        tags: ["Meat", "Bread"],
        number:"909-766-8038",
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
        name: "Harmony Bites",
        area: "South Park",
        address: "5850 Avalon Blvd, Los Angeles, CA 90003, United States",
        tags: [ "Mexican Food", "Frozen Food"],
        number:"(213) 840-8455",
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
        name: "A World With Compassion",
        area: "Boyle Heights",
        address: "2912 Guirado St, Los Angeles, CA 90023, United States",
        tags: ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"],
        number:"(562) 396-3893",
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
        name: "Christ Living Gospel",
        area: "Lincoln Heights",
        address: "2221 Workman St., Los Angeles, CA 90031, United States",
        tags: ["Baby Needs"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Mid Central",
        address: "191 N. Oak Avenue, Pasadena, CA 91107, United States",
        tags: ["Fresh Produce", "Dairy"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Azusa",
        address: "5525 North Lake Ellen Avenue, Azusa, CA 91702, United States",
        tags: ["Meat", "Bread"],
        number:"909-766-8038",
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
        name: "Harmony Bites",
        area: "South Park",
        address: "5850 Avalon Blvd, Los Angeles, CA 90003, United States",
        tags: [ "Mexican Food", "Frozen Food"],
        number:"(213) 840-8455",
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
        name: "A World With Compassion",
        area: "Boyle Heights",
        address: "2912 Guirado St, Los Angeles, CA 90023, United States",
        tags: ["Fresh Produce", "Dairy", "Meat", "Bread", "Mexican Food", "Frozen Food", "Baby Needs"],
        number:"(562) 396-3893",
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
        name: "Christ Living Gospel",
        area: "Lincoln Heights",
        address: "2221 Workman St., Los Angeles, CA 90031, United States",
        tags: ["Baby Needs"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Mid Central",
        address: "191 N. Oak Avenue, Pasadena, CA 91107, United States",
        tags: ["Fresh Produce", "Dairy"],
        number:"(323) 534-8980",
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
        name: "Foothill Unity Center",
        area: "Azusa",
        address: "5525 North Lake Ellen Avenue, Azusa, CA 91702, United States",
        tags: ["Meat", "Bread"],
        number:"909-766-8038",
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
        name: "Harmony Bites",
        area: "South Park",
        address: "5850 Avalon Blvd, Los Angeles, CA 90003, United States",
        tags: [ "Mexican Food", "Frozen Food"],
        number:"(213) 840-8455",
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
    ]
    const [showInfo, setShowInfo] = useState(new Array(results.length).fill(false));

    const handleInfoClick = (index) => {
      const newShowInfo = showInfo.map((_, i) => i === index ? !showInfo[index] : false);
      setShowInfo(newShowInfo);
      //add some way to recenter the map to card clicked
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
                  {result.name}
                </h4>
                <h6>
                  Area: {result.area}
                </h6>
                <p> Address: {result.address}</p>
                {showInfo[index] && (
                  <div >
                    <p>Tags:</p>
                    <div className={``}>
                     {result.tags.map((tag, index) => {
                        return (
                          <p key={`tag-${index}`} className={`${styles.tag} col `} 
                          >
                            {tag}
                          </p>
                        );
                      })}
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
          <div className={`${styles.filterContainer}`}>
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
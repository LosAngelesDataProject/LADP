import { Fragment, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  Overlay,
  Popover,
} from "react-bootstrap";
import LaImg from "../../assets/LaImg.jpg";
import LaMap from "../../assets/LaMap.png";
import styles from "./Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import HeaderOne from "../header/HeaderOne";

function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [show, setShow] = useState(null);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleGoButtonClick = () => {
    setShowFilters(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <Fragment>
      <HeaderOne></HeaderOne>
      <Form>
        <Form.Group className="mb-1" controlId="formCityOrZipCode">
          <Form.Control
            type="search"
            placeholder="Please Enter a City or Zip Code"
          />
        </Form.Group>
        <Form.Text className="text-muted">
          <p>FIND A FOOD BANK NEAR YOU!</p>
        </Form.Text>

        <Button variant="primary" type="button" onClick={handleGoButtonClick}>
          GO
        </Button>
      </Form>

      {showFilters && (
        <>
          <ButtonGroup aria-label="Basic example">
            <Dropdown variant="secondary">
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Date Posted
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat={(date) => format(date, "MM/dd/yyyy")}
                />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown variant="secondary">
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Day of The Week
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Monday</Dropdown.Item>
                <Dropdown.Item eventKey="2">Tuesday</Dropdown.Item>
                <Dropdown.Item eventKey="3">Wednesday</Dropdown.Item>
                <Dropdown.Item eventKey="4">Thursday</Dropdown.Item>
                <Dropdown.Item eventKey="1">Friday</Dropdown.Item>
                <Dropdown.Item eventKey="1">Saturday</Dropdown.Item>
                <Dropdown.Item eventKey="1">Sunday</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown variant="secondary">
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Product Types
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Fresh Produce</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dairy</Dropdown.Item>
                <Dropdown.Item eventKey="3">Meat</Dropdown.Item>
                <Dropdown.Item eventKey="4">Bread</Dropdown.Item>
                <Dropdown.Item eventKey="1">Mexican Food</Dropdown.Item>
                <Dropdown.Item eventKey="1">Frozen Food</Dropdown.Item>
                <Dropdown.Item eventKey="1">Baby Needs</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </>
      )}

      <div className={styles.home}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>LA Data Project</h2>
          <img className={styles.bgImg} src={LaImg} alt="Los Angeles" />
        </div>
        <div className={styles.searchResultsContainer}>
          <div className={styles.info}>
            <h2>Search Results</h2>
            <p>
              <h5>
                500 12-dozen Eggs availabe in Culver City.
                <div ref={ref}>
                  <Button onClick={handleClick}>More Info...</Button>
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained">
                      <Popover.Header as="h3">Details</Popover.Header>
                      <Popover.Body>
                        <strong>Address: 123 Data Street, Culver City</strong>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                  <br />
                  <br />
                </div>
              </h5>
              <h5>
                400 shanks of Lamb available in West Hollywood.
                <div ref={ref}>
                  <Button onClick={handleClick}>More Info...</Button>
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained">
                      <Popover.Header as="h3">Details</Popover.Header>
                      <Popover.Body>
                        <strong>Address: 789 Coffee Blvd, Culver City</strong>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                  <br />
                  <br />
                </div>
              </h5>
              <h5>
                100 whole chickens available in South Los Angeles.
                <div ref={ref}>
                  <Button onClick={handleClick}>More Info...</Button>
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained">
                      <Popover.Header as="h3">Details</Popover.Header>
                      <Popover.Body>
                        <strong>Address: 456 Computer Ave, Los Angeles</strong>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                  <br />
                  <br />
                </div>
              </h5>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <div className={styles.mapInfo}>
          <h3>Map of Los Angeles, CA</h3>
          <div>
            <img width="600" src={LaMap} alt="Google map of Los Angeles, CA" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;

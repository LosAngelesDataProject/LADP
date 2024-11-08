import { useState } from "react";
import {
  Link,
  //  , useLocation
} from "react-router-dom";
import { Navbar, Container, Col } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import styles from "./NavBar.module.css";

const MobileNavBar = () => {
  // const location = useLocation(); // Get the current location
  // const isActive = (path) => (location.pathname === path ? styles.active : "");
  // const SearchBar = () => {
  //   return (
  //     <>
  //       <input
  //         id="searchFilter"
  //         type="search"
  //         className={styles.searchInputLeft}
  //         placeholder="Search"
  //       />
  //       <input
  //         id="searchLocation"
  //         type="search"
  //         className={styles.searchInputRight}
  //         placeholder="Location"
  //       />
  //       {/* <i
  //         className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
  //         onClick={() => {}}
  //       /> */}
  //     </>
  //   );
  // };
  const [toggleInput, setToggleInput] = useState({ input: false, type: "" });
  return (
    <Navbar className={styles.background} expand={false}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={`${styles.navBrandText}`}>
          <img
            src={logo}
            width="35"
            height="35"
            alt="logo"
            className="d-inline-block rounded-2 me-2"
          />
          LADP
        </Navbar.Brand>
        {/* <div> */}
        {toggleInput.input ? (
          <Col className={` align-middle`}>
            <i
              className={`fa-solid fa-arrow-left ${styles.searchIconLeft}`}
              onClick={() => {
                setToggleInput({ input: false, type: "" });
              }}
            />
            <input
              id="searchFilter"
              type="search"
              className={styles.searchInput}
              placeholder={toggleInput.type}
            />
            {toggleInput.type === "Search" ? (
              <i
                className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
                onClick={() => {}}
              />
            ) : (
              <i
                className={`fa-solid fa-location-dot ${styles.searchIconRight}`}
                onClick={() => {}}
              />
            )}
          </Col>
        ) : (
          <Col>
            <button
              className={styles.searchButton}
              onClick={() => {
                setToggleInput({ input: true, type: "Search" });
              }}
            >
              <i
                className={`fa-solid fa-magnifying-glass ${styles.buttonIcon}`}
              />
              Search
            </button>
            <button
              className={styles.locationButton}
              onClick={() => {
                setToggleInput({ input: true, type: "Location" });
              }}
            >
              <i className={`fa-solid fa-location-dot ${styles.buttonIcon}`} />
              Location
            </button>
          </Col>
        )}

        {/* </div> */}
      </Container>
    </Navbar>
  );
};

export default MobileNavBar;

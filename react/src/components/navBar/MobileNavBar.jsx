// import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo.png";
import styles from "./NavBar.module.css";
// import { useMediaQuery } from "react-responsive";

const MobileNavBar = (props) => {
  const { isLoggedIn } = props;
  // const isSmallPhone = useMediaQuery({
  //   query: "(max-width: 370px)",
  // });
  const location = useLocation(); // Get the current location
  const isActive = (path) => (location.pathname === path ? styles.active : "");
  // const [toggleInput, setToggleInput] = useState("");

  return (
    <Navbar className={styles.background} expand={"sm"}>
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
        <Nav>
          <Nav.Link as={Link} to={isLoggedIn ? "/user" : "/login"}>
            <i
              className={`fa-solid fa-user ${styles.filterIcon} ${isActive(
                "/login" || "/register" || "/user"
              )}`}
            />
          </Nav.Link>
        </Nav>
        {/* <div className={`${isSmallPhone ? `w-100 pt-1` : "col"}`}>
          <i
            className={`fa-solid fa-arrow-left ${styles.searchIconLeft} ${
              toggleInput === "" ? "d-none" : ""
            }`}
            onClick={() => {
              setToggleInput("");
            }}
          />
          <input
            id="searchFilter"
            type="text"
            placeholder="&#xF002; Search"
            className={`${styles.searchInputLeft} ${
              toggleInput === "search" ? styles.expand : "w-50"
            } ${toggleInput === "location" ? "d-none" : ""}
            `}
            onClick={() => {
              setToggleInput("search");
            }}
          />
          <input
            id="searchLocation"
            type="text"
            placeholder="&#xF3C5; Location"
            className={`${styles.searchInputRight} ${
              toggleInput === "location" ? styles.expand : "w-50"
            }  ${toggleInput === "search" ? "d-none" : ""}`}
            onSelect={() => {
              setToggleInput("location");
            }}
          />
          {toggleInput === "search" ? (
            <i
              className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
              onClick={() => {}}
            />
          ) : (
            <i
              className={`fa-solid fa-location-dot ${styles.searchIconRight} ${
                toggleInput === "" ? "d-none" : ""
              }`}
              onClick={() => {}}
            />
          )}
        </div> */}
      </Container>
    </Navbar>
  );
};

MobileNavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MobileNavBar;

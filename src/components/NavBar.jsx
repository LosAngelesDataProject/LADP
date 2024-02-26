import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";
import styles from "./NavBar.module.css";

const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className={styles.navbarContainer}
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="100"
          height="100"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center">
          <Nav.Link as={Link} className={styles.navLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} className={styles.navLink} to="/calendar">
            Calendar
          </Nav.Link>
          <Nav.Link as={Link} className={styles.navLink} to="/about-us">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} className={styles.navLink} to="/contact-us">
            Contact Us
          </Nav.Link>
          {isLoggedIn ? (
            <div className="ms-auto">
              <Button variant="outline-primary" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Nav className={`justify-content-end ${styles.authLinks}`}>
              <Nav.Link as={Link} className={styles.navLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} className={styles.navLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;

import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";
import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { isLoggedIn, onLogout } = props;
  return (
    <Navbar className={styles.background} expand="lg" sticky="top">
      <Container>
        <Nav className="me-auto col-md-5 justify-content-start justify-content-around">
          <Nav.Link className={styles.endText} as={Link} to="/">Home</Nav.Link>
          <Nav.Link className={styles.navLink} as={Link} to="/calendar">Calendar</Nav.Link>
          <Nav.Link className={styles.navLink} as={Link} to="/about-us">About Us</Nav.Link>
        </Nav>
        <Navbar.Brand as={Link} to="/" className="mx-auto d-flex justify-content-center col-md-2">
          <img
            src={logo}
            width="140"
            height="140"
            alt="logo"
            className="align-self-center rounded-4"
          />
        </Navbar.Brand>
        <Nav className="ms-auto col-md-5 justify-content-end justify-content-around">
          <Nav.Link className={styles.navLink} as={Link} to="/contact-us">Contact Us</Nav.Link>
          {isLoggedIn ? (
            <Nav.Link  className={styles.endText} onClick={onLogout}>
              Logout
            </Nav.Link >
          ) : (
            <>
              <Nav.Link className={styles.navLink} as={Link} to="/login">Login</Nav.Link>
              <Nav.Link className={styles.endText} as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;

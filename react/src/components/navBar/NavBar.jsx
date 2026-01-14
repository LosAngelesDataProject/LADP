import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo.png";
import styles from "./NavBar.module.css";
import UserIcon from "../../assets/UserIcon.png"
import UserIcon2 from "../../assets/UserIcon2.png"


const NavBar = (props) => {
  const { isLoggedIn, onLogout } = props;
  const location = useLocation(); // Get the current location
  const isActive = (path) => (location.pathname === path ? styles.active : "");

  return (
    <Navbar className={styles.background} expand="md">
      <Container>
        <Nav className="me-auto col-md-4 justify-content-start justify-content-around">
          <Nav.Link
            className={`${styles.endText} ${isActive("/")}`}
            as={Link}
            to="/"
          >
            Home
          </Nav.Link>

          <Nav.Link
            className={`${styles.navLink} ${isActive("/calendar")}`}
            as={Link}
            to="/calendar"
          >
            Calendar
          </Nav.Link>
        </Nav>
        <Navbar.Brand
          as={Link}
          to="/"
          className="mx-auto d-flex justify-content-center col-md-4"
        >
          <img
            src={logo}
            width="140"
            height="140"
            alt="logo"
            className="align-self-center rounded-4"
          />
        </Navbar.Brand>
        <Nav className="ms-auto col-md-4 justify-content-end justify-content-around">
          <Nav.Link
            className={`${styles.navLink} ${isActive("/about-us")}`}
            as={Link}
            to="/about-us"
          >
            About Us
          </Nav.Link>
          <div className={styles.navLink}>
              <div className={styles.dropdown}>
                <div className={`${styles.helpbtn} ${isActive("/contact-us")}`}>Help</div>
                <div className={styles.dropdown_content}>
                  <Nav.Link as={Link} to="/contact-us">FAQ</Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
                </div>
              </div>
            </div>
          {isLoggedIn ? (
            <>
            <div className={`${styles.navLink} ${styles.dropdown}`}>
              <img src={UserIcon2} alt="UserLogged" className={styles.dropimg}></img>
                <div className={styles.dropdown_content}>
                  <Nav.Link as={Link} to="/user-edit">Settings</Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={onLogout}>Logout</Nav.Link>
                </div>
          </div>
            </>
          ) : (
            <>
            <div className={`${styles.navLink} ${styles.dropdown}`}>
              <img src={UserIcon} alt="Cinque Terre" className={styles.dropimg}></img>
                <div className={styles.dropdown_content}>
                  <Nav.Link as={Link} to="/user-edit">Settings</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </div>
          </div>
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

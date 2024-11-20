import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo.png";
import styles from "./NavBar.module.css";

const MobileNavBar = (props) => {
  const { isLoggedIn } = props;
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? styles.active : "");

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
              className={`fa-solid fa-user ${styles.profileIcon} ${isActive(
                "/login" || "/register" || "/user"
              )}`}
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

MobileNavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MobileNavBar;

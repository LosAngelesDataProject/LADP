import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const MobileFooter = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? styles.active : "");
  return (
    <footer className={`fixed-bottom ${styles.footerContainer}`}>
      <Container>
        <Row className="text-center">
          <Col>
            <Link to={"/"} className="nav-link">
              <i
                className={`fa-solid fa-house ${isActive("/")} ${
                  styles.footerIcon
                }`}
              />
              <span className={`${styles.footerText} ${isActive("/")}`}>
                Home
              </span>
            </Link>
          </Col>
          <Col>
            <Link to={"/calendar"} className="nav-link">
              <i
                className={`fa-solid fa-calendar-days ${isActive(
                  "/calendar"
                )} ${styles.footerIcon}`}
              />
              <span className={`${styles.footerText} ${isActive("/calendar")}`}>
                Calendar
              </span>
            </Link>
          </Col>
          <Col>
            <Link to={"/about-us"} className="nav-link">
              <i
                className={`fa-solid fa-user-group ${isActive("/about-us")} ${
                  styles.footerIcon
                }`}
              />
              <span className={`${styles.footerText} ${isActive("/about-us")}`}>
                About us
              </span>
            </Link>
          </Col>
          <Col>
            <Link to={"/contact-us"} className="nav-link">
              <i
                className={`fa-solid fa-envelope ${isActive("/contact-us")} ${
                  styles.footerIcon
                }`}
              />
              <span
                className={`${styles.footerText} ${isActive("/contact-us")}`}
              >
                Contact us
              </span>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MobileFooter;

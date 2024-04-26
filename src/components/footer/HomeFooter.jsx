import {  Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./Footer.module.css"
function Footer() {
  const NavLinks = () =>{
    return (
      <>
        <ul className={`navbar-nav me-auto mb-2 mb-md-0`}>
          <li className={`nav-item ${styles.footerLink}`}>
            <Link
              to="/about-us"
              className="nav-link px-2  link-button"
            >
              About Us
            </Link>
          </li>
          <li className={`nav-item ${styles.footerLink}`}>
            <Link
              to="/contact-us"
              className="nav-link px-2 link-button"
            >
              {" "}
              Contact Us
            </Link>
          </li>
          <li className={`nav-item ${styles.footerLink}`}>
            <Link
              to="/calendar"
              className="nav-link px-2 link-button"
            >
              {" "}
              Calendar
            </Link>
          </li>
        </ul>
      </>
    )
  }

  const SocialLinks = () => {
    return (
      <>
        <div className="">
          <Link
              to="#"
              className={`${styles.socialBtn}`}
          >
              <i className="fab fa-linkedin"></i>
          </Link>{" "}
          <Link
              to="#"
              className={`${styles.socialBtn}`}
          >
              <i className="fab fa-facebook"></i>
          </Link>{" "}
          <Link
              to="#"
              className={`${styles.socialBtn}`}
          >
              <i className="fab fa-instagram"></i>
          </Link>{" "}
          <Link
              to="#"
              className={`${styles.socialBtn}`}
          >
              <i className="fab fa-twitter"></i>
          </Link>{" "}
          <Link
              to="#"
              className={`${styles.socialBtn}`}
          >
              <i className="fab fa-github"></i>
          </Link>
        </div>
      </>
    )
  }

  const FooterBottom = () => {
    return (
      <>
        <hr className={`d-flex justify-content-start ${styles.footerBorder}`}/>
        <Col>
            <p className={`${styles.footerText}`}>
              © 2024 LA Data Project. All rights reserved.
            </p>
        </Col>
        <Col>
          <ul className={`navbar-nav d-flex justify-content-end`}>
            <li className={`nav-item ${styles.footerLink} ${styles.privacy}`}>
              <Link
                to="/privacy"
                className="nav-link px-2 link-button"
              >
                {" "}
                Privacy Policy
              </Link>
            </li>
            <li className={`nav-item ${styles.footerLink} ${styles.privacy}`}>
              <Link
                to="/terms"
                className="nav-link ps-2 link-button"
              >
                {" "}
                Terms & Service
              </Link>
            </li>
          </ul>
        </Col>
      </>
    )
  }

  return (
      <footer className={`${styles.background} footer navbar-expand-md`}>
        <Container>
          <Row className="py-4 ">
            <Col md={6}sm={12}>
              <Row>
                <h1 className={`${styles.header}`}>
                  Los Angeles Data Project
                </h1>
              </Row>
              <Row className={`${styles.footerContent}`}>
                <NavLinks/>
              </Row>
              <Row className={`${styles.footerContent}`}>
                <SocialLinks/>
              </Row>
            </Col>
            <Col md={6}sm={12} className="pt-4">
              <Link to="/" className={`${styles.logo}`}>
                <img
                  src={logo}
                  width="120"
                  height="120"
                  alt="logo"
                  className={`rounded-4`}
                />
              </Link>
            </Col>
          </Row>
          <Row>
            <FooterBottom/>     
          </Row>
        </Container>
      </footer>
  );
}

export default Footer;

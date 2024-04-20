import {  Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SocialLinks from "./SocialLinks";
import styles from "./Footer.module.css"
function Footer() {
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
              <Row>
                <ul className={`navbar-nav me-auto mb-2 mb-md-0`}>
                  <li className={`nav-item ${styles.footerLink}`}>
                    <Link
                      to="/aboutus"
                      className="nav-link px-2  link-button"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className={`nav-item ${styles.footerLink}`}>
                    <Link
                      to="/contactus"
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
              </Row>
              <Row>
                <SocialLinks/>
              </Row>
            </Col>
            <Col md={6}sm={12} className="d-flex justify-content-end">
              <Link to="/" className={`d-inline-block ${styles.logo}`}>
                <img
                  src={logo}
                  width="120"
                  height="120"
                  alt="logo"
                  className={` align-self-center rounded-4`}
                />
              </Link>
            </Col>
          </Row>
          <Row>
            <hr className={`d-flex justify-content-start ${styles.footerBorder}`}/>
            <Col>
                <p className={`${styles.footerText}`}>
                  © 2024 LA Data Project. All rights reserved.
                </p>
            </Col>
            <Col>
              <ul className={`navbar-nav d-flex justify-content-end`}>
                <li className={`nav-item ${styles.footerLink}`}>
                  <Link
                    to="/contactus"
                    className="nav-link px-2 link-button"
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                </li>
                <li className={`nav-item ${styles.footerLink}`}>
                  <Link
                    to="/calendar"
                    className="nav-link ps-2 link-button"
                  >
                    {" "}
                    Terms & Service
                  </Link>
                </li>
              </ul>
            </Col>     
          </Row>
        </Container>
      </footer>
  );
}

export default Footer;

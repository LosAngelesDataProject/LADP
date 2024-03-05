import React from "react";
import { Row, Col } from "react-bootstrap";
import Avatar1 from ".assets/headerimages/Avatar1.png";
import ladataWhiteClearLogo from ".assets/headerimages/ladataWhiteClearLogo.svg";

function HeaderOne() {
  return (
    <Fragment>
      <div>
        <Row>
          <Col
            lg={{ span: 12 }}
            md={12}
            sm={12}
            className="header mb-12 background-image"
          >
            <img
              src={Avatar1}
              className="header-image-carousel"
              alt="LAData-Home-Banner"
            />
            <div className="logo-img-overlay">
              <img
                src={ladataWhiteClearLogo}
                className="header-white-logo"
                alt="transparent-white-banner-logo"
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default HeaderOne;

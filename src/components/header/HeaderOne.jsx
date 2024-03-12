import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import LADPHeadImg from "../../assets/headerimages/LADPHeadImg.png";
import ladataWhiteClearLogo from "../../assets/headerimages/ladataWhiteClearLogo.svg";
import PropTypes from "prop-types";

const HeaderOne = () => {
  return (
    <Fragment>
      <div>
        <Row>
          <Col
            lg={{ span: 12 }}
            md={12}
            sm={12}
            className="headerOne mb-12 background-image"
          >
            <img
              src={LADPHeadImg}
              className="headerOne-image-flex"
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
};

HeaderOne.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default HeaderOne;

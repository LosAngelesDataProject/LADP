import { Fragment } from "react";
import { Col, Row, Table, Image } from "react-bootstrap";
import ContactForm from "./ContactForm";
import HeaderOne from "../header/HeaderOne";

function ContactUs() {
  return (
    <Fragment>
      <Row className="contact-header-image image-center mb-4">
        <HeaderOne></HeaderOne>
        <h1 className="contact-title" type="text-primary">
          Contact Us
        </h1>
      </Row>
      <hr></hr>
      <Table className="contact-table">
        <Col className="Contact-form-title 18-rem">
          <Row className="Contact-Us">
            <h1 className="Contact">Send Us A Message!</h1>
          </Row>
          <Row className="contact-card-form">
            <ContactForm />
          </Row>
        </Col>

        <Col>
          <tr className="company-email text-black" type="text-primary">
            <div className="co-contact-email">
              <h1>EMAIL</h1>
              <h3>LADataProj@gmail.com</h3>
            </div>
          </tr>
          <tr className="company-phone text-black" type="text-primary">
            <div className="co-contact-phone">
              <h1>PHONE</h1>
              <h3>212-555-2233</h3>
            </div>
          </tr>
          <tr className="company-follow text-black" type="text-primary">
            <div className="social-follow">
              <h1>FOLLOW US</h1>
              <Image
                className="facebook icon"
                scr="https://imgur.com/qb4v2Rw"
                alt="facebook-round-icon"
              />
              <Image
                className="insta icon"
                scr="https://imgur.com/95k4doz"
                alt="instagram-round-icon"
              />
              <Image
                className="twitter icon"
                scr="https://imgur.com/qaEjXaq"
                alt="twitter-round-icon"
              />
              <Image
                className="github icon"
                scr="https://imgur.com/kALlX0L"
                alt="github-round-icon"
              />
            </div>
          </tr>
          <tr
            className="volunteer-hotbutton"
            type="image"
            alt="volunteer-image-button"
          >
            <Image
              className="volunteer opps image"
              scr="https://imgur.com/Y8V9d4g"
              alt="volunteer-form-shortcut"
            />
          </tr>
        </Col>
      </Table>
    </Fragment>
  );
}

export default ContactUs;

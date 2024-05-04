import { Fragment } from "react";
import { Row, Table } from "react-bootstrap";
import ContactForm from "./ContactForm";
import HeaderOne from "../header/HeaderOne";
import styles from "./Contact.module.css";

function ContactUs() {
  return (
    <Fragment>
      <Row className="contact-header-image image-center mb-4">
        <HeaderOne></HeaderOne>
        <h1 className={styles.contactPageTitle} type="text-primary">
          Contact Us
        </h1>
      </Row>

      <Table className="contact-table">
        <th className={styles.contactColumn1}>
          <tr className="Contact-Us">
            <h1 className={styles.formHeader}>Send Us A Message !</h1>
          </tr>
          <tr className="contact-card-form">
            <ContactForm className={styles.contactform} />
          </tr>
        </th>

        <th className={styles.contactColumn2}>
          <tr className="company-email text-black" type="text-primary">
            <div className="co-contact-email">
              <h1 className={styles.email}>EMAIL</h1>
              <h3 className={styles.emailHQAddress}> LADataProj@gmail.com</h3>
            </div>
          </tr>
          <tr className="company-phone text-black" type="text-primary">
            <div className="co-contact-phone">
              <h1 className={styles.phone}>PHONE</h1>
              <h3 className={styles.phoneHQNumber}> 212-555-2233</h3>
            </div>
          </tr>

          <tr className="company-follow text-black" type="text-primary">
            <div className="social-follow">
              <h1 className={styles.follow}>FOLLOW US</h1>
              <div className={styles.social}>
                <button>
                  <img
                    className="social icon-fb"
                    src="https://i.imgur.com/5QQIbkU.jpg"
                    title="facebook social channel"
                    alt="facebook-icon-click-button"
                  />
                </button>

                <button>
                  <img
                    className="social icon-insta"
                    src="https://i.imgur.com/e6TCHZ9.jpg"
                    title="instagram social channel"
                    alt="instagram-icon-click-button"
                  />
                </button>

                <button>
                  <img
                    className="social icon-X"
                    src="https://i.imgur.com/rIg9FvT.jpg"
                    title="X social channel"
                    alt="twitter-X-icon-click-button"
                  />
                </button>

                <button>
                  <img
                    className="social icon-youtube"
                    src="https://i.imgur.com/0N7bqHt.jpg"
                    title="youtube social channel"
                    alt="youtube-icon-click-button"
                  />
                </button>
              </div>
            </div>
          </tr>

          <tr
            className="volunteer-hotbutton"
            type="image"
            alt="volunteer-image-button"
          >
            <div className={styles.volunteer}>
              <button>
                <img
                  className="volunteer opps image "
                  src="https://i.imgur.com/0Xye9Se.jpg"
                  title="volunteer click through graphic"
                  alt="volunteer-inquiry-click-through-graphic"
                />
              </button>
            </div>
          </tr>
        </th>
      </Table>
    </Fragment>
  );
}

export default ContactUs;

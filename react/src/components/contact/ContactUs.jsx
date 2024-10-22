import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import HeaderOne from "../header/HeaderOne";
import styles from "./Contact.module.css";

function ContactUs() {
  return (
    <>
      <HeaderOne />
      <p className={styles.headerRow}>Contact Us</p>
      <p className={styles.formHeader}>Send Us A Message !</p>
      <column className="d-flex">
        <ContactForm />
        <ContactInfo />
      </column>
    </>
  );
}

export default ContactUs;

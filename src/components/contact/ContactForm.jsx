import { Form, Card } from "react-bootstrap";
import styles from "./Contact.module.css";

function ContactForm() {
  return (
    <>
      <Card className={styles.formBody}>
        <Form className={styles.messageForm}>
          <Form.Group controlId="contactForm.NameInput">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={styles.infoField}
              type="text-input"
              placeholder="Full name"
            />
          </Form.Group>

          <Form.Group controlId="contactForm.PhoneInput">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className={styles.infoField}
              type="text-input"
              placeholder="555-867-5309"
            />
          </Form.Group>

          <Form.Group controlId="contactForm.EmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={styles.infoField}
              type="text-input"
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group controlId="ContactForm.Message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={8} />
          </Form.Group>

          <button
            className="fs-4"
            alt="message form submit button"
            type="submit"
          >
            SEND MESSAGE
          </button>
        </Form>
      </Card>
    </>
  );
}

export default ContactForm;

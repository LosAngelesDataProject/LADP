import { Fragment } from "react";
import { Button, Form, Card } from "react-bootstrap";
import styles from "./Contact.module.css";

function ContactForm() {
  return (
    <Fragment>
      <Card style={{ width: "55rem" }} className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Form className="mt-5 mb-5 mx-5">
            <Form.Group className="mt-5 mb-5" controlId="contactForm.NameInput">
              <Form.Label className={styles.formLabel}>Name</Form.Label>
              <Form.Control
                className={styles.cfInput}
                type="text-input"
                placeholder="your full name here"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="contactForm.PhoneInput">
              <Form.Label className={styles.formLabel}>Phone</Form.Label>
              <Form.Control
                className={styles.cfInput}
                type="text-input"
                placeholder="555-555-5555"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="contactForm.EmailInput">
              <Form.Label className={styles.formLabel}>Email</Form.Label>
              <Form.Control
                className={styles.cfInput}
                type="text-input"
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="ContactForm.Message">
              <Form.Label className={styles.formLabel}>Message</Form.Label>
              <Form.Control className={styles.cfInput} as="textarea" rows={5} />
            </Form.Group>

            <title>Custom Button</title>
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
              rel="contact.module.css"
            />
            <Button
              className={styles.btn}
              alt="email send button"
              type="button"
              variant={styles.customBtn}
            >
              SEND MESSAGE
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ContactForm;

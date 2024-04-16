import { Fragment } from "react";
import { Button, Form, Card } from "react-bootstrap";

function ContactForm() {
  return (
    <Fragment>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="contactForm.NameInput">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="your full name here" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactForm.PhoneInput">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="phone" placeholder="555-555-5555" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactForm.EmailInput">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ContactForm.Message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary">SEND MESSAGE</Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ContactForm;

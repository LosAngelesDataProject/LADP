import { Form } from "react-bootstrap";
import styles from "./Contact.module.css";

function ContactForm() {
  return (
    <>
      <card className="">
        <cardbody className="">
          <Form className="">
            <Form.Group className="" controlId="contactForm.NameInput">
              <Form.Label className="">Name</Form.Label>
              <Form.Control
                className=""
                type="text-input"
                placeholder="your full name here"
              />
            </Form.Group>

            <Form.Group className="" controlId="contactForm.PhoneInput">
              <Form.Label className="">Phone</Form.Label>
              <Form.Control
                className=""
                type="text-input"
                placeholder="555-867-5309"
              />
            </Form.Group>

            <Form.Group className="" controlId="contactForm.EmailInput">
              <Form.Label className="">Email</Form.Label>
              <Form.Control
                className=""
                type="text-input"
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Group className="" controlId="ContactForm.Message">
              <Form.Label className="">Message</Form.Label>
              <Form.Control className="" as="textarea" rows={5} />
            </Form.Group>

            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
              rel="contact.module.css"
            />
            <button className="" alt="email send button" type="button">
              SEND MESSAGE
            </button>
          </Form>
        </cardbody>
      </card>
    </>
  );
}

export default ContactForm;

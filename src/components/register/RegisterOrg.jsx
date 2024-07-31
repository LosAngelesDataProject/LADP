import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import registerOrgFormSchema from "./registerOrgFormSchema";

function RegisterOrg() {
  const initialOrgData = {
    ownerName: "",
    businessName: "",
    businessAddress: "",
    websiteUrl: "",
    description: "",
    businessHours: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    passwordConfirm: "",
  };

  const handleSubmit = (values) => {
    console.log("Registration values", values);
  };

  console.log("testing");

  return (
    <React.Fragment>
      <div className={`mx-0 px-0 ${styles.headerBackground}`} />
      <h1 className={styles.titleName}>Register Organization</h1>
      <Formik
        initialValues={initialOrgData}
        validationSchema={registerOrgFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className="mb-3">
            <label htmlFor="ownerName" className="form-label">
              Account Owner Name
            </label>
            <Field
              type="text"
              name="ownerName"
              className="form-control"
              placeholder="Account Owner Name"
            />
            <ErrorMessage
              name="ownerName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessName" className="form-label">
              Business Name
            </label>
            <Field
              type="text"
              name="businessName"
              className="form-control"
              placeholder="Enter Business Name"
            />
            <ErrorMessage
              name="businessName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessAddress" className="form-label">
              Business Address
            </label>
            <Field
              type="text"
              name="businessAddress"
              className="form-control"
              placeholder="Enter Business Address"
            />
            <ErrorMessage
              name="businessAddress"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="websiteUrl" className="form-label">
              Business Website URL (Optional)
            </label>
            <Field
              type="url"
              name="websiteUrl"
              className="form-control"
              placeholder="Enter Business Website URL"
            />
            <ErrorMessage
              name="websiteUrl"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              placeholder="Enter Description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessHours" className="form-label">
              Business Hours
            </label>
            <Field
              type="text"
              name="businessHours"
              className="form-control"
              placeholder="Enter Business Hours"
            />
            <ErrorMessage
              name="businessHours"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email Address"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <Field
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter Phone Number"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <Field
              type="text"
              name="userName"
              className="form-control"
              placeholder="Create a Username"
            />
            <ErrorMessage
              name="userName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <Field
              type="password"
              name="passwordConfirm"
              className="form-control"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="text-danger"
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              REGISTER
            </button>
            <p className={styles.ptext}>Already have an account?</p>
            <Link to="/login">Login Here</Link>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default RegisterOrg;

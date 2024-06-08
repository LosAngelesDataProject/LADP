import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Register.module.css";
import registerFormSchema from "./registerFormSchema";
import { PropTypes } from "prop-types";


function UserRegisterForm({onRegisterSubmit}) {
  const userInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: ""
  };
  const navigate = useNavigate();

  const handleComplete = () => {
    if (onRegisterSubmit) {
      onRegisterSubmit();
    }
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div>
      <Formik 
        enableReinitialize={true}
        initialValues={userInfo}
        onSubmit={handleComplete}
        validationSchema={registerFormSchema}
      >
        <Form className={styles.form}>
          <div className="mb-3">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <Field
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="firstName"
              id="inputFirstName"
              autoComplete="firstName"
              required
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <Field 
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="lastName"
              id="inputLastName"
              autoComplete="lastName"
              required
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email 
            </label>
            <Field 
              type="text"
              className="form-control"
              placeholder="Enter Email Address"
              name="email"
              id="inputEmail"
              autoComplete="email"
              required
            />
             <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPhone" className="form-label">
              Phone 
            </label>
            <Field 
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              name="phone"
              id="inputPhone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              Password
            </label>
            <Field 
              type="password"
              className="form-control"
              placeholder="Create a Password"
              name="password"
              id="inputPassword1"
              autoComplete="new-password"
              required
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword2" className="form-label">
              Confirm Password
            </label>
            <Field 
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="passwordConfirm"
              id="passwordConfirm"
              autoComplete="new-password"
              required
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.buttonContainer}>
            <p className={styles.ptext}>Have an account already?</p>
            <Link
              to="/login"
            >
              Login Here
            </Link>
          </div>
        </Form>
      </Formik>
      </div>
    </React.Fragment>
  );
}
UserRegisterForm.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string
  }),
  onRegisterSubmit: PropTypes.func.isRequired,
};
export default UserRegisterForm;
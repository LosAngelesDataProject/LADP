import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../../services/usersService";
import toastr from "toastr";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import registerFormSchema from "./registerFormSchema";

function Register() {
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    passwordConfirm: "",
    zipcode: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    registerUser(values)
      .then((response) => {
        console.log({ id: response }, "new user added");
        toastr["success"]("register success");
      })
      .catch((error) => {
        console.log({ error: error }, "registerUser error");
        toastr["error"]("error in registration");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <div className={`mx-0 px-0 ${styles.headerBackground}`} />
      <h1 className={styles.titleName}>Register</h1>
      <Formik
        initialValues={initialUserData}
        validationSchema={registerFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Enter Last Name"
              />
              <ErrorMessage
                name="lastName"
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
              <label htmlFor="zipcode" className="form-label">
                Zip Code
              </label>
              <Field
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Enter Your Zip Code"
              />
              <ErrorMessage
                name="zipcode"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <Field
                type="text"
                name="userName"
                className="form-control"
                placeholder="Create a User Name"
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
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                REGISTER
              </button>
              <p className={styles.ptext}>Have an account already?</p>
              <Link to="/login">Login Here</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Register;

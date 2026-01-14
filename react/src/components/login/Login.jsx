import { useState } from "react";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
//import loginUser from "../../services/loginService";
import PropTypes from "prop-types";
import { login } from "../../services/authService";
import loginFormSchema from "../schemas/loginFormSchema";
import styles from "./Login.module.css";
import HeaderOne from "../header/HeaderOne";

function Login({onLogin}) {
  const [loginData] = useState({
    email: "", 
    password: "" 
});

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log("Login Payload:", values);
    login(values)
      .then((response) => {
        console.log("Login Success:", response.data);
        toastr.success("Welcome back!");
        
        // This updates the App.js state so the header changes
        if (onLogin) { onLogin(); } 
        
        navigate("/");
      })
      .catch((error) => {
        console.error("Login Error:", error.response);
        toastr.error("Invalid credentials");
      });
  };
  // function onAddSuccess() {
  //   toastr.success("Login Successful");
  //   navigate("/", { state: { loginData } });
  // }
  // function onAddError() {
  //   toastr.error("Unsuccessful, please try again");
  // }

  return (
    <>
      <HeaderOne />
      <div className="card login-form">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <Formik
              enableReinitialize={true}
              initialValues={loginData}
              onSubmit={onSubmit}
              validationSchema={loginFormSchema}
            >
              <Form>
                <div>
                  <div className={styles.text}>Login</div>
                  <label htmlFor="email" className={styles.altText}>Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="form-control"
                  />
                  <div className="text-danger">
                    <ErrorMessage name="email" />
                  </div>

                  <label htmlFor="password" className={styles.altText}>Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <div className="text-danger">
                    <ErrorMessage name="password" />
                  </div>

                  <button className={styles.button} type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="d-flex justify-content-end">
              <Link to="/register" className={styles.linkText}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {onLogin: PropTypes.func.isRequired}

export default Login;

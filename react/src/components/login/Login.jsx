import { useState } from "react";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import loginUser from "../../services/loginService";
import loginFormSchema from "../schemas/loginFormSchema";
import styles from "./Login.module.css";
import HeaderOne from "../header/HeaderOne";

function Login() {
  const [loginData] = useState({
    username: "",
  });

  const navigate = useNavigate();

  function onSubmit(values) {
    if (values && values.type === "LoginData_Add") {
      loginUser.addLogin(values).then(onAddSuccess).catch(onAddError);
    }
  }
  function onAddSuccess() {
    toastr.success("Login Successful");
    navigate("/", { state: { loginData } });
  }
  function onAddError() {
    toastr.error("Unsuccessful, please try again");
  }

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
                  <label htmlFor="username" className={styles.altText}>
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="form-control"
                  />
                  <div>
                    <ErrorMessage name="username" />
                  </div>
                  <label htmlFor="password" className={styles.altText}>
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <div>
                    <ErrorMessage name="password" />
                  </div>

                  <button
                    className={styles.button}
                    type="submit"
                    onSubmit={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="d-flex justify-content-end">
              <Link to="/register" className={styles.linkText}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

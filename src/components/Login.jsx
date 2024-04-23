import React, { useState } from "react";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import loginUser from "../services/loginService";
import loginFormSchema from "./schemas/loginFormSchema";

function Login() {
  const [loginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  navigate("/home", { state: { loginData } });

  function handleSubmit(values) {
    if (values && values.type === "LoginData_Add") {
      loginUser.addLogin(loginData).then(onAddSuccess).catch(onAddError);
    }
  }
  function onAddSuccess() {
    toastr.success("Success on Loggin in");
  }
  function onAddError() {
    toastr.error("Could not Login, please try again", "Error on submission");
  }

  return (
    <React.Fragment>
      <div className="card login-form">
        <div className="row justify-content-center align-items-center">
          <div className="form-card-container col-md-5 center">
            <Formik
              enableReinitialize={true}
              initialValues={loginData}
              onSubmit={handleSubmit}
              validationSchema={loginFormSchema}
            >
              <Form>
                <p className="lead mb-8"></p>
                <div className="form-control me-2">
                  <p className="row justify-content-center align-items-center fw-bold fs-3">
                    Login Form
                  </p>
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    components="div"
                    className="has error"
                  />
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="Password"
                    components="div"
                    className="has-error"
                  />
                  <Link
                    to="/home"
                    type="submit"
                    className="mt-2 btn btn-primary submit-button"
                  >
                    Submit
                  </Link>
                  <Link
                    to="/home"
                    className="mt-2 btn btn-secondary Cancel-button"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="/register"
                    className="mt-2 btn btn-primary Register-button"
                  >
                    Register
                  </Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;

import { Fragment, useState } from "react";
import { registerUser } from "../../services/usersService";
import toastr from "toastr";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

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
  console.log("this is the initialUserData", initialUserData);

  const [userFormData, setUserFormData] = useState(initialUserData);

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    console.log({ nameOfField, newUserValue });

    setUserFormData((prevState) => {
      console.log("updater onChange");
      const newUserObject = {
        ...prevState,
      };
      newUserObject[nameOfField] = newUserValue;
      return newUserObject;
    });
  };

  function addUser(e) {
    e.preventDefault();
    registerUser(userFormData).then(successful).catch(error);
  }

  const successful = (response) => {
    console.log({ id: response }, "new user added");
    toastr["success"]("register success");
  };

  const error = (response) => {
    console.log({ error: response }, "registerUser error");
    toastr["error"]("error in registration");
  };

  return (
    <Fragment>
      <div className={`mx-0 px-0 ${styles.headerBackground}`} />
      <h1 className={styles.titleName}>Register</h1>
      <form className={styles.form}>
        <div className="mb-3">
          <label htmlFor="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            value={userFormData.firstName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="inputFirstName"
            name="firstName"
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            value={userFormData.lastName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="inputLastName"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            value={userFormData.email}
            onChange={onFormFieldChange}
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input
            value={userFormData.phone}
            onChange={onFormFieldChange}
            type="tel"
            className="form-control"
            id="inputPhone"
            name="phone"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputZipCode" className="form-label">
            Zip Code
          </label>
          <input
            value={userFormData.zipcode}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="inputZipCode"
            name="zipcode"
            placeholder="Enter Your Zip Code"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputUserName" className="form-label">
            User Name
          </label>
          <input
            value={userFormData.userName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="inputUserName"
            name="userName"
            placeholder="Create a User Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">
            Password
          </label>
          <input
            value={userFormData.password}
            onChange={onFormFieldChange}
            type="password"
            className="form-control"
            id="inputPassword1"
            name="password"
            placeholder="Create a Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            value={userFormData.passwordConfirm}
            onChange={onFormFieldChange}
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Confirm Password"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={addUser} type="submit" className={styles.button}>
            REGISTER
          </button>
          <p className={styles.ptext}>Have an account already?</p>
          <Link to="/login">Login Here</Link>
        </div>
      </form>
    </Fragment>
  );
}
export default Register;

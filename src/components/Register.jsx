import { Fragment, useState } from "react";
import { registerUser } from "../services/usersService"
import toastr from "toastr";

function Register() {

  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    passwordConfirm: "",
    zipcode: ""
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
    })
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

  const cancelRegistration = () => {
    setUserFormData(initialUserData);
  }

  return (
    <Fragment>
      <form className="container shadow mb-3">
        <p></p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email Address
          </label>
          <input
            value={userFormData.email}
            onChange={onFormFieldChange}
            type="email"
            className="form-control"
            id="exampleInputEmail"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            value={userFormData.firstName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="exampleInputFirstName"
            name="firstName"
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            value={userFormData.lastName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="exampleInputLastName"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            value={userFormData.phone}
            onChange={onFormFieldChange}
            type="tel"
            className="form-control"
            id="exampleInputPhone"
            name="phone"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            value={userFormData.userName}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="exampleInputUserName"
            name="userName"
            placeholder="Create a User Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={userFormData.password}
            onChange={onFormFieldChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Create a Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="zipcode" className="form-label">
            Zip Code
          </label>
          <input
            value={userFormData.zipcode}
            onChange={onFormFieldChange}
            type="text"
            className="form-control"
            id="ExampleInputZipCode"
            name="zipcode"
            placeholder="Enter Your Zip Code"
          />
        </div>
        <button onClick={addUser} type="submit" className="btn btn-primary">Register</button>
        <button onClick={cancelRegistration} type="button" className="btn btn-secondary">Cancel</button>
      </form>
    </Fragment>
  );
}

export default Register;

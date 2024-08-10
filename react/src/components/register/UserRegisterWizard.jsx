import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import UserRegisterForm from "./UserRegisterForm";
import UserAdditionalInfo from "./UserAdditionalInfo";
import toastr from "toastr";
import { registerUser } from "../../services/usersService";

function RegisterWizard() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();

  const onRegisterSubmit = (userInfo) => {
    registerUser(userInfo).then(onRegisterSuccess).catch(onRegisterError);
  };

  const onRegisterSuccess = (response) => {
    console.log("Registration success", response);
    toastr.success("Congratulations, You have successfully created an account");
    navigate("/login");
  };

  const onRegisterError = (error) => {
    console.log("Registration error", error);
    toastr.error("Error Registration was Unsuccessful");
  };

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };

  return (
    <React.Fragment>
      <FormWizard
        shape="circle"
        color="#E3AA4D"
        onComplete={onRegisterSubmit}
        onTabChange={tabChanged}
      >
        <FormWizard.TabContent title="Personal Details" icon="ti-user">
          <h3>Personal Details</h3>
          <UserRegisterForm
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onRegisterSubmit={onRegisterSubmit}
          />
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Additional Info" icon="ti-settings">
          <h3>Additional Info</h3>
          <UserAdditionalInfo />
        </FormWizard.TabContent>

        <FormWizard.TabContent
          title="Finished"
          icon="ti-check"
          onFinish={onRegisterSubmit}
        >
          <h4>Click Finish to Create Account.</h4>
        </FormWizard.TabContent>
      </FormWizard>
    </React.Fragment>
  );
}
export default RegisterWizard;

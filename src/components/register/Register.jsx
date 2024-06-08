import React, {useState} from "react";
import Header from "../header/HeaderOne";
import styles from "./Register.module.css";
import { Modal } from "react-bootstrap";
import UserRegisterWizard from "./UserRegisterWizard";
import OrganizationRegisterWizard from "./OrganizationRegisterWizard";


function Register() {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedAccount(value);
    setShowEdit(true);
  };

  const handleRadioClick = (event) => {
    const { value } = event.target;
    if (value === selectedAccount) {
      setShowEdit(true);
    }
  };

  const handleShowClose = () => {
    setShowEdit(false); 
  };

  return (
    <React.Fragment>
      <Header/>
      <h1 className={styles.h1}>Registration</h1>
      <div className={styles.radioContainer}>

        <div className={styles.radio}>
          <input type="radio"
                name="personalAccount"
                value="personal" 
                checked={selectedAccount === "personal"} 
                id="personalAccount"
                onChange={handleOptionChange} 
                onClick={handleRadioClick}
                className="form-check-input" 
          />
          <h4>
            <label className="form-check-label" htmlFor="personalAccount">
              Personal Account
            </label>
          </h4>
        </div>

        <div className={styles.radio}>
          <input type="radio" 
                name="organizationAccount"
                value="organization"
                checked={selectedAccount === "organization"} 
                id="organizationAccount" 
                onChange={handleOptionChange} 
                onClick={handleRadioClick}
                className="form-check-input" 
          />
          <h4>
            <label className="form-check-label" htmlFor="organizationAccount">
              Organization Account
            </label>
          </h4>
        </div>

      </div>

      <Modal show={showEdit} onHide={handleShowClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{selectedAccount === "personal" ? "Personal Account" : "Organization Account"}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccount === "personal" ? <UserRegisterWizard /> : <OrganizationRegisterWizard/>}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
export default Register;

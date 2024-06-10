import { Fragment, useState } from "react";
import styles from "./Register.module.css";
import { Formik, Form } from "formik";

function UserAdditionalInfo() {
  const [userFormData, setUserFormData] = useState({
    interests: [
      {
        label:"Ex1",
        value:"ex1"
      },
      {
        label:"Ex2",
        value:"ex2"
      },
      {
        label:"Ex3",
        value:"ex3"
      },
      {
        label:"Ex4",
        value:"ex4"
      },
      {
        label:"Ex5",
        value:"ex5"
      },
    ],
    newInterests:"",
    hearAboutUs: [
      {
        label:"Ex1",
        value:"ex1"
      },
      {
        label:"Ex2",
        value:"ex2"
      },
      {
        label:"Ex3",
        value:"ex3"
      },
      {
        label:"Ex4",
        value:"ex4"
      },
      {
        label:"Ex5",
        value:"ex5"
      },
    ],
    newHearAboutUs:"",
    subscribe: false,
  });

  const mapInt = (options) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <Fragment>
      <div>
      <Formik 
        enableReinitialize={true}
        initialValues={userFormData}
      >
        <Form className={styles.form}>
          <div className="mb-3">
            <p htmlFor="interest" className="form-label">What are interested in?</p>
              <select       
                name="newInterests"
                value={userFormData.newInterests}
                onChange={handleChange}
                className={styles.button}
              >
                <option>Select an option</option>
                {mapInt(userFormData.interests)}
              </select>
          </div>

          <div className="mb-3">
            <p htmlFor="interest" className="form-label">How did you hear about us?</p>
              <select       
                name="newHearAboutUs"
                value={userFormData.newHearAboutUs}
                onChange={handleChange}
                className={styles.button}
              >
                <option>Select an option</option>
                {mapInt(userFormData.hearAboutUs)}
              </select>
          </div>

          <div className="mb-3">
            <label htmlFor="subscribe" className="form-label">
              <input
                type="checkbox"
                name="subscribe"
                checked={userFormData.subscribe}
                onChange={handleChange}
              />
              Subsribe to newsletter
            </label>
          </div>
        </Form>
      </Formik>
      </div>
    </Fragment>
  );
}
export default UserAdditionalInfo;
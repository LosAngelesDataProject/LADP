import React, {useState, useEffect} from "react";
import toastr from "toastr";
import {Formik, Form, Field, ErrorMessage} from "formik";
import { getCurrentUser, updateUser } from "../../services/usersService";
import styles from "./UserEdit.module.css"
import userEditFormSchema from "./userEditFormSchema";
import config from "../../../config.js"

function UserEdit(){


  const [sampleUser, setSampleUser] = useState({
    id: 0,
    firstName: "John",
    mi: "",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    userName: "johndoe1",
  })

  useEffect(() => {
    // getCurrentUser().then().catch()
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("User fetched", data)
        await setSampleUser(data)
      } catch (error) {
        console.error("Error! Retrieving sample user", sampleUser)
      }
    };
    
    config.enableApiFlag ? fetchCurrentUser() : setUserData(sampleUser)
    
    console.log(sampleUser, userData)
  }, [])

  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    mi: "",
    lastName: "",
    email: "",
    userName: "",
  });

  const handleSubmit = (values) => {
    updateUser(values).then(onUpdateSuccess).catch(onUpdateErr)
  }

  const onUpdateSuccess = (response) => {
    toastr.success("Information Updated")
    console.log("user updated", response)
  }

  const onUpdateErr = (response) => {
    toastr.error("Failed to update information. Please try again")
    console.log("Update Error", response)
  }

    return(
        <React.Fragment>
           <div>
            <h1 className={styles.title}>Update Information</h1>
            <Formik
        initialValues={userData}
        validationSchema={userEditFormSchema}
        onSubmit={handleSubmit}
      >

            <Form className={styles.form}>
            <div>
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="form-control"
                placeholder={userData.firstName}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mi" className="form-label">
                Mi
              </label>
              <Field
                type="text"
                name="mi"
                className="form-control"
                placeholder={userData.mi}
              />
              <ErrorMessage
                name="mi"
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
                placeholder={userData.lastName}
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
                placeholder={userData.email}
              />
              <ErrorMessage
                name="email"
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
                placeholder={userData.userName}
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-danger"
              />
            </div>
            <div>
              <button>
                Update
              </button>
            </div>
            <div>
              <button>
                Email Test
              </button>
            </div>
            </Form>
      </Formik>
           </div>
        </React.Fragment>
    )
}

export default UserEdit
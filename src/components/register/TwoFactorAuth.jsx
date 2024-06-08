// import React, { useRef, useState } from 'react';
// import AuthCode from 'react-auth-code-input';
// import styles from "./Register.module.css";
// import toastr from "toastr";

// function TwoFactorAuth() {
//   const AuthInputRef = useRef(null);
//   const [result, setResult] = useState('');
//   console.log(result);
//   const expectedCode = '123456';

//   const handleOnChange = (res) => {
//     setResult(res);
//     if (res === expectedCode) {
//       handleVerificationSuccess();
//     }
//   };

//   const handleFocus = () => {
//     if (AuthInputRef.current) {
//       AuthInputRef.current?.focus();
//     }
//   }

//   const handleVerificationSuccess = () => {
//     // Add your logic for handling successful verification here
//     console.log('Verification successful!');
//     window.location.href = '/login';
//     toastr["success"]("register success");
//   }

//   return (
//     <React.Fragment>
//      {/* <p> A message with a verification code has been sent to
//        your devices. Enter the code to continue.
//      </p> */}
//      <AuthCode
//         autoFocus={false}
//         onChange={handleOnChange}
//         ref={AuthInputRef}
//         allowedCharacters='numeric'
//         containerClassName={styles.authCodeContainer}
//         inputClassName={styles.authCodeInput} 
//       />
//       <button onClick={handleFocus} className={styles.button}>Focus</button>
//     </React.Fragment>
//   );
// }
// export default TwoFactorAuth;

import React from 'react';
import { useFormikContext, Formik, Form, Field } from 'formik';
import toastr from "toastr";
import styles from "./Register.module.css";

const AutoSubmitToken = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext();
  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    if (values.token.length === 6) {
      submitForm();
  
    }
  }, [values, submitForm]);
  return null;
};

const TwoFactorVerificationForm = () => (
  <div>
    <p>Please enter the 6 digit code sent to your device</p>
    <Formik
      initialValues={{ token: '' }}
      validate={values => {
        const errors = {};
        if (values.token.length < 5) {
          errors.token = 'Invalid code. Too short.';
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        toastr["success"]("register success");
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
        
      }}
    >

      <Form>
        <Field name="token" type="tel" className={styles.authcCodeInput} />
        <AutoSubmitToken />
      </Form>
    

    </Formik>
  </div>
);
export default TwoFactorVerificationForm;
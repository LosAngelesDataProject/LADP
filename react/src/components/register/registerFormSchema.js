import * as Yup from "yup";

const registerFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email('Invalid email').required("Email is required"),
  phone: Yup.string().matches(/^(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number').required("Phone Number is required"),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Password Confirm is required"),
});

export default registerFormSchema;
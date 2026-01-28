import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format") // Ensures it looks like an email (e.g., name@domain.com)
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 1 characters") // Added for better security
    .required("Password is required"),
});

export default loginFormSchema;
import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Username is required"),
});

export default loginFormSchema;

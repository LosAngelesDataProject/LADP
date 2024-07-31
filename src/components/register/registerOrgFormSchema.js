import * as Yup from "yup";

const registerOrgFormSchema = Yup.object().shape({
    ownerName: Yup.string().required("POC/Account Owner Name is required"),
    businessName: Yup.string().required("Business Name is required"),
    businessAddress: Yup.string().required("Business Address is required"),
    websiteUrl: Yup.string().url("Invalid URL"),
    description: Yup.string().required("Description is required"),
    businessHours: Yup.string().required("Business Hours are required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  export default registerOrgFormSchema;


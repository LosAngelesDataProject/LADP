import * as Yup from "yup";

const userEditFormSchema = Yup.object().shape({
    firstName: Yup.string(),
    mi: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email'),
    userName: Yup.string(),
});

export default userEditFormSchema;
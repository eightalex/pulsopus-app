import { string } from "yup";

export const passwordValidationSchema = string()
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required');
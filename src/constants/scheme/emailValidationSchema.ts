import { string } from "yup";

export const emailValidationSchema = string()
    .email('Enter a valid email')
    .required('Email is required');
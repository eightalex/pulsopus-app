import { object } from 'yup';
import { emailValidationSchema } from "./emailValidationSchema.ts";
import { passwordValidationSchema } from "./passwordValidationSchema.ts";

export const loginValidationSchema = object({
	email: emailValidationSchema,
	password: passwordValidationSchema
});

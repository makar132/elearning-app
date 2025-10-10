import * as Yup from 'yup';
import { ERROR_MESSAGES as EM } from './constants';

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required(EM.fullNameRequired),
  email: Yup.string().email(EM.emailInvalid).required(EM.emailRequired),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/,
      EM.passwordInvalid
    )
    .required(EM.passwordRequired),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], EM.passwordsMismatch)
    .required(EM.confirmPasswordRequired),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email(EM.emailInvalid).required(EM.emailRequired),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/,
      EM.passwordInvalid
    )
    .required(EM.passwordRequired),
});


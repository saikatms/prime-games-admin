import * as yup from "yup";

const LoginValidation = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Required field"),
  password: yup.string().required("Required field"),
});

export default LoginValidation;

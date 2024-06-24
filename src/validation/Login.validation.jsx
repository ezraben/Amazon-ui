import Joi from "joi-browser";
const LoginValidation = {
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .min(9)
    .max(150)
    .required(),
};

export default LoginValidation;

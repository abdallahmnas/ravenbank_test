import Joi from "joi";

export const signupValidatorSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().min(6).required(),
  phone: Joi.string().min(11).required(),
  password: Joi.string().min(6).required(),
  pin: Joi.string().min(6).default("").allow(null, ""),
  state: Joi.string().default("").allow(null, ""),
  lga: Joi.string().default("").allow(null, ""),
  gender: Joi.string().required(),
});

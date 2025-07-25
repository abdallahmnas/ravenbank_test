import Joi from "joi";

export const loginValidatorSchema = Joi.object({
  contact: Joi.string().required(),
  password: Joi.string().min(6).default("").allow(null, ""),
});

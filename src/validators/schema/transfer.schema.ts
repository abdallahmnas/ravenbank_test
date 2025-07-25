import Joi from "joi";

export const transferValidatorSchema = Joi.object({
  bankCode: Joi.string().required(),
  accountNumber: Joi.string().required(),
  amount: Joi.number().required(),
  narration: Joi.string().min(6).default("").allow(null, ""),
});
export const accountInfoValidatorSchema = Joi.object({
  bankCode: Joi.string().required(),
  accountNumber: Joi.string().required(),
});

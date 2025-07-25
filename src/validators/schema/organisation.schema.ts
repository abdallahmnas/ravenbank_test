import Joi from "joi";

export const OrganisationValidatorSchema = {
  // Create new
  create: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().default("").allow(null, ""),
    phone: Joi.string().min(10).default("").allow(null, ""),
    logo: Joi.string().default("").allow(null, ""),
    banner: Joi.string().default("").allow(null, ""),
    address: Joi.string().default("").allow(null, ""),
    description: Joi.string().default("").allow(null, ""),
  }),
  // Update
};

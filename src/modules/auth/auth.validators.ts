import Joi from "joi";

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
});
export const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const otpValidator = Joi.object({
  id: Joi.string().required(),
  otp: Joi.string().required(),
});

export const updateProfileValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  profilePicture: Joi.string(),
  businessName: Joi.string(),
  taxId: Joi.string(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string(),
  }),
  brandColor: Joi.string(),
  logo: Joi.string(),
  primaryContact: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }),
});

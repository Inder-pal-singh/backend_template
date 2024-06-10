import Joi from "joi";

export const updateProfileValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),

  profilePicture: Joi.string(),
});

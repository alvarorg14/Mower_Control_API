import Joi from "joi";
import ValidationError from "../errors/validation.error";

//Part model
export type Part = {
  partId?: string;
  reference: string;
  name: string;
  description: string;
  defaultPrice: number;
};

//Validate a part
export const validatePart = (part: Part) => {
  const schema = Joi.object({
    reference: Joi.string().min(3).max(50).required(),
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    defaultPrice: Joi.number().required(),
  });
  let { error } = schema.validate(part);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

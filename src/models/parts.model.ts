import Joi from "joi";
import ValidationError from "../errors/validation.error";

//Part model
export type Part = {
  partId?: string;
  reference: string;
  name: string;
  description: string;
  stock: number;
  price: number;
};

//Validate a part
export const validatePart = (part: Part) => {
  const schema = Joi.object({
    reference: Joi.string().min(3).max(50).required(),
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
  });
  let { error } = schema.validate(part);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

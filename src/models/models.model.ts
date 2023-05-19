import Joi from "joi";
import ValidationError from "../errors/validation.error";

export type Model = {
  modelId?: string;
  name: string;
  surface: number;
  maxHours: number;
};

//Validate a model before creating or updating
export const validateModel = (model: Model) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    surface: Joi.number().min(1).max(10000).required(),
    maxHours: Joi.number().min(1).max(24).required(),
  });
  let { error } = schema.validate(model);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

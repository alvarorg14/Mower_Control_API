import Joi from "joi";
import ValidationError from "../errors/validation.error";

export type MowerError = {
  code: number;
  message: string;
};

export const validateMowerError = (mowerError: MowerError) => {
  const schema = Joi.object({
    code: Joi.number().min(0).required(),
    message: Joi.string().required(),
  });
  const { error } = schema.validate(mowerError);
  if (error) throw new ValidationError(error.message);
};

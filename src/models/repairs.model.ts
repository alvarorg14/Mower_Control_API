import Joi from "joi";
import ValidationError from "../errors/validation.error";

//Repair model
export type Repair = {
  repairId?: string;
  title: string;
  description: string;
  workingHours: number;
  date: Date;
  robotId: string;
};

//Validate a repair
export const validateRepair = (repair: Repair) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    workingHours: Joi.number().min(0).required(),
    date: Joi.date().iso().required(),
    robotId: Joi.string().uuid().required(),
  });

  let { error } = schema.validate(repair);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

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
  employeeId: string;
  repairParts?: RepairPart[];
};

export type RepairPart = {
  partId: string;
  quantity: number;
  price: number;
};

//Validate a repair
export const validateRepair = (repair: Repair) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    workingHours: Joi.number().min(0).required(),
    date: Joi.date().iso().required(),
    robotId: Joi.string().uuid().required(),
    employeeId: Joi.string().uuid().required(),
  });

  let { error } = schema.validate(repair);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

//Validate a repair part
export const validateRepairPart = (repairPart: RepairPart) => {
  const schema = Joi.object({
    partId: Joi.string().uuid().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
  });

  let { error } = schema.validate(repairPart);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

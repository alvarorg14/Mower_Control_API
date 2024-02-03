import Joi from "joi";
import ValidationError from "../errors/validation.error";

export type Employee = {
  employeeId?: string;
  name: string;
  surname1: string;
  surname2: string;
  username: string;
  password: string;
  role: Role;
  companyId: string;
};

export enum Role {
  ADMIN = "admin",
  STANDARD = "standard",
}

export const validateEmployee = (employee: Employee) => {
  const schema = employeeSchema;
  let { error } = schema.validate(employee);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
  return schema.validate(employee);
};

export const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  surname1: Joi.string().min(3).max(50).required(),
  surname2: Joi.string().min(3).max(50),
  username: Joi.string().min(3).max(50).required(),
  password: Joi.required(),
  role: Joi.string().valid(Role.ADMIN, Role.STANDARD).required(),
  companyId: Joi.string().required(),
});

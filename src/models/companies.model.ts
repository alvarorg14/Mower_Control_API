import Joi from "joi";
import ValidationError from "../errors/validation.error";

export type Company = {
  companyId?: string;
  name: string;
  CIF: string;
};

//Validate a company
export const validateCompany = (company: Company) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    CIF: Joi.string().min(9).max(9).required(),
  });

  let { error } = schema.validate(company);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

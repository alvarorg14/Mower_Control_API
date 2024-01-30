import Joi from "joi";
import ValidationError from "../errors/validation.error";

export type Client = {
  clientId?: string;
  name: string;
  address: string;
  phoneNumber: number;
  companyId: string;
};

//Validate a client
export const validateClient = (client: Client) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    address: Joi.string().min(3).max(50).required(),
    phoneNumber: Joi.number().required(),
    companyId: Joi.required(),
  });

  let { error } = schema.validate(client);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

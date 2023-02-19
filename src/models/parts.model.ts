import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const sql = require("../db/db.ts");

//Part model
export type Part = {
  partId?: string;
  reference: string;
  name: string;
  description: string;
  stock: number;
  price: number;
};

//Get all parts
export const getAllParts = (result: (err: any, data: Part[]) => any) => {
  sql.query("SELECT * FROM parts", (err: any, res: any) => {
    if (err) {
      result(err, []);
      return;
    }
    result(null, res);
  });
};

//Get a part by id
export const getPartById = (
  partId: string,
  result: (err: any, data: Part) => any
) => {
  sql.query(
    "SELECT * FROM parts WHERE partId = ?",
    partId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Get a part by reference
export const getPartByReference = (
  reference: string,
  result: (err: any, data: Part) => any
) => {
  sql.query(
    "SELECT * FROM parts WHERE reference = ?",
    reference,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Create a new part
export const createPart = (
  newPart: Part,
  result: (err: any, data: Part) => any
) => {
  newPart.partId = uuidv4();
  sql.query("INSERT INTO parts SET ?", newPart, (err: any, res: Part) => {
    if (err) {
      result(err, null as any);
      return;
    }
    result(null, newPart);
  });
};

//Update a part
export const updatePart = (
  partId: string,
  part: Part,
  result: (err: any, data: Part) => any
) => {
  sql.query(
    "UPDATE parts SET ? WHERE partId = ?",
    [part, partId],
    (err: any, res: Part) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, part);
    }
  );
};

//Delete a part
export const deletePart = (
  partId: string,
  result: (err: any, data: Part) => any
) => {
  sql.query(
    "DELETE FROM parts WHERE partId = ?",
    partId,
    (err: any, res: Part) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res);
    }
  );
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
  return schema.validate(part);
};

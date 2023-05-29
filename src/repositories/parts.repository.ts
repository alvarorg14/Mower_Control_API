import { v4 as uuidv4 } from "uuid";
import { Part } from "../models/parts.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get all parts
export const getAll = async (): Promise<Part[]> => {
  const query = "SELECT * FROM parts";
  return await execute<Part[]>(query, []);
};

//Get part by reference
export const getByReference = async (reference: string): Promise<Part> => {
  const query = "SELECT * FROM parts WHERE reference = ?";
  const results = await execute<Part[]>(query, [reference]);
  if (results.length === 0) throw new NotFoundError("Part not found");
  return results[0];
};

//Create a new part
export const create = async (newPart: Part): Promise<Part> => {
  newPart.partId = uuidv4();
  const query = "INSERT INTO parts SET ?";
  await execute(query, [newPart]);
  return newPart;
};

//Update a part
export const update = async (partId: string, part: Part): Promise<Part> => {
  const query = "UPDATE parts SET reference = ?, name = ?, description = ?, defaultPrice = ? WHERE partId = ?";
  await execute(query, [part.reference, part.name, part.description, part.defaultPrice, partId]);
  return part;
};

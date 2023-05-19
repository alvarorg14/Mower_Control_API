import { v4 as uuidv4 } from "uuid";
import { Part } from "../models/parts.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";

//Get all parts
export const getAll = async (): Promise<Part[]> => {
  const query = "SELECT * FROM parts";
  const results = await execute<Part[]>(query, []);
  return results;
};

//Get a part by id
export const getById = async (partId: string): Promise<Part> => {
  const query = "SELECT * FROM parts WHERE partId = ?";
  const results = await execute<Part[]>(query, [partId]);
  if (results.length === 0) throw new NotFoundError("Part not found");
  return results[0];
};

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
  try {
    await execute(query, [newPart]);
    return newPart;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Part with the same reference already exists");
    } else {
      throw new Error("An error occurred while creating a part");
    }
  }
};

//Update a part
export const update = async (partId: string, part: Part): Promise<Part> => {
  const query = "UPDATE parts SET reference = ?, name = ?, description = ?, price = ?, stock = ? WHERE partId = ?";
  try {
    await execute(query, [part.reference, part.name, part.description, part.price, part.stock, partId]);
    return part;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Part with the same reference already exists");
    } else {
      throw new Error("An error occurred while creating a part");
    }
  }
};

//Delete a part
export const remove = async (partId: string): Promise<void> => {
  const query = "DELETE FROM parts WHERE partId = ?";
  await execute(query, [partId]);
};

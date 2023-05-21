import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";
import { MowerError } from "../models/mowerErrors.model";

//Get all mowerErrors
export const getAll = async (): Promise<MowerError[]> => {
  const query = "SELECT * FROM mowerErrors";
  const results = await execute<MowerError[]>(query, []);
  return results;
};

//Get a mowerError by code
export const getByCode = async (code: number): Promise<MowerError> => {
  const query = "SELECT * FROM mowerErrors WHERE code = ?";
  const results = await execute<MowerError[]>(query, [code]);
  if (results.length === 0) throw new NotFoundError("MowerError not found");
  return results[0];
};

//Create a new mowerError
export const create = async (newMowerError: MowerError): Promise<MowerError> => {
  const query = "INSERT INTO mowerErrors SET ?";
  try {
    await execute(query, [newMowerError]);
    return newMowerError;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("MowerError with the same code already exists");
    } else {
      throw new Error("An error occurred while creating a mowerError");
    }
  }
};

//Update a mowerError
export const update = async (code: number, mowerError: MowerError): Promise<MowerError> => {
  const query = "UPDATE mowerErrors SET message = ? WHERE code = ?";
  try {
    await execute(query, [mowerError.message, code]);
    return mowerError;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("MowerError with the same code already exists");
    } else {
      throw new Error("An error occurred while updating a mowerError");
    }
  }
};

//Delete a mowerError
export const remove = async (code: number): Promise<void> => {
  const query = "DELETE FROM mowerErrors WHERE code = ?";
  try {
    await execute(query, [code]);
  } catch (err) {
    throw new Error("An error occurred while deleting a mowerError");
  }
};

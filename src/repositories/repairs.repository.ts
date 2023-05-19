import { v4 as uuidv4 } from "uuid";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import { Repair } from "../models/repairs.model";

//Get all repairs
export const getAll = async (): Promise<Repair[]> => {
  const query = "SELECT * FROM repairs";
  const results = await execute<Repair[]>(query, []);
  return results;
};

//Get a repair by id
export const getById = async (repairId: string): Promise<Repair> => {
  const query = "SELECT * FROM repairs WHERE repairId = ?";
  const results = await execute<Repair[]>(query, [repairId]);
  if (results.length === 0) throw new NotFoundError("Repair not found");
  return results[0];
};

//Get repairs by robotId
export const getByRobotId = async (robotId: string): Promise<Repair[]> => {
  const query = "SELECT * FROM repairs WHERE robotId = ?";
  const results = await execute<Repair[]>(query, [robotId]);
  return results;
};

//Create a repair
export const create = async (newRepair: Repair): Promise<Repair> => {
  newRepair.repairId = uuidv4();
  const query = "INSERT INTO repairs SET ?";
  try {
    await execute(query, [newRepair]);
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new NotFoundError("Robot not found");
    } else {
      throw new Error("Error while creating repair");
    }
  }

  return newRepair;
};

export const update = async (repairId: string, repair: Repair): Promise<Repair> => {
  const query = "UPDATE repairs SET title = ?, description = ?, workingHours = ?, date = ?, robotId = ? WHERE repairId = ?";
  try {
    await execute(query, [repair.title, repair.description, repair.workingHours, repair.date, repair.robotId, repairId]);
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new NotFoundError("Robot not found");
    } else {
      throw new Error("Error while updating repair");
    }
  }
  return repair;
};

export const remove = async (repairId: string): Promise<void> => {
  const query = "DELETE FROM repairs WHERE repairId = ?";
  await execute(query, [repairId]);
};

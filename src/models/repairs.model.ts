import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Repair model
export type Repair = {
  repairId?: string;
  title: string;
  description: string;
  workingHours: number;
  date: Date;
  robotId: string;
};

//Get all repairs
export const getAllRepairs = async (): Promise<Repair[]> => {
  const query = "SELECT * FROM repairs";
  const results = await execute<Repair[]>(query, []);
  return results;
};

//Get a repair by id
export const getRepairById = async (repairId: string): Promise<Repair> => {
  const query = "SELECT * FROM repairs WHERE repairId = ?";
  const results = await execute<Repair[]>(query, [repairId]);
  if (results.length === 0) throw new NotFoundError("Repair not found");
  return results[0];
};

//Get repairs by robotId
export const getRepairsByRobotId = async (robotId: string): Promise<Repair[]> => {
  const query = "SELECT * FROM repairs WHERE robotId = ?";
  const results = await execute<Repair[]>(query, [robotId]);
  return results;
};

//Create a repair
export const createRepair = async (newRepair: Repair): Promise<Repair> => {
  newRepair.repairId = uuidv4();
  const query = "INSERT INTO repairs SET ?";
  await execute(query, [newRepair]);
  return newRepair;
};

export const updateRepair = async (repairId: string, repair: Repair): Promise<Repair> => {
  const query = "UPDATE repairs SET title = ?, description = ?, workingHours = ?, date = ?, robotId = ? WHERE repairId = ?";
  await execute(query, [repair.title, repair.description, repair.workingHours, repair.date, repair.robotId, repairId]);
  return repair;
};

export const deleteRepair = async (repairId: string): Promise<void> => {
  const query = "DELETE FROM repairs WHERE repairId = ?";
  await execute(query, [repairId]);
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
  return schema.validate(repair);
};

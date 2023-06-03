import { execute } from "../db/db";
import { Repair } from "../models/repairs.model";

//Create a new repair
export const create = async (repair: Repair): Promise<Repair> => {
  const query = "INSERT INTO repairs SET ?";
  await execute(query, [repair]);
  return repair;
};

//Get repairs and repair parts for that repair by robot id
export const getByRobotId = async (robotId: string): Promise<Repair[]> => {
  const query = "SELECT * FROM repairs WHERE robotId = ?";
  const results = await execute<Repair[]>(query, [robotId]);
  return results;
};

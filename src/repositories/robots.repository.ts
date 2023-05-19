import { v4 as uuidv4 } from "uuid";
import { Robot } from "../models/robots.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get all robots
export const getAllRobots = async (): Promise<Robot[]> => {
  const query = "SELECT * FROM robots";
  const results = await execute<Robot[]>(query, []);
  return results;
};

//Get a robot by id
export const getRobotById = async (robotId: string): Promise<Robot> => {
  const query = "SELECT * FROM robots WHERE robotId = ?";
  const results = await execute<Robot[]>(query, [robotId]);
  if (results.length === 0) throw new NotFoundError("Robot not found");
  return results[0];
};

//Create a new robot
export const createRobot = async (newRobot: Robot): Promise<Robot> => {
  newRobot.robotId = uuidv4();
  const query = "INSERT INTO robots SET ?";
  await execute(query, [newRobot]);
  return newRobot;
};

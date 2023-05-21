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

//Get a robot by id or serialNumber
export const getByIdOrSerialNumber = async (robotId: string, serialNumber: number): Promise<Robot> => {
  const query = "SELECT * FROM robots WHERE robotId = ? OR serialNumber = ?";
  const results = await execute<Robot[]>(query, [robotId, serialNumber]);
  if (results.length === 0) throw new NotFoundError("Robot not found");
  if (results.length > 1) throw new Error("More than one robot found, serialNumber not equal to id");
  return results[0];
};

//Create a new robot
export const create = async (newRobot: Robot): Promise<Robot> => {
  const query = "INSERT INTO robots SET ?";
  await execute(query, [newRobot]);
  return newRobot;
};

//Update a robot
export const update = async (robot: Robot): Promise<Robot> => {
  const query =
    "UPDATE robots SET serialNumber = ?, name = ?, battery = ?, mode = ?, activity = ?," +
    " state = ?, errorCode = ?, errorCodeTimestamp = ?, clientId = ?, model = ?, assignedToClient = ? WHERE robotId = ?";
  await execute(query, [
    robot.serialNumber,
    robot.name,
    robot.battery,
    robot.mode,
    robot.activity,
    robot.state,
    robot.errorCode,
    robot.errorCodeTimestamp,
    robot.clientId,
    robot.model,
    robot.assignedToClient,
    robot.robotId,
  ]);
  return robot;
};

//Update the client id of a robot
export const updateClientId = async (robotId: string, clientId: string, assignedToClient: boolean): Promise<Robot> => {
  const query = "UPDATE robots SET clientId = ?, assignedToClient = ? WHERE robotId = ?";
  await execute(query, [clientId, assignedToClient, robotId]);
  return getRobotById(robotId);
};

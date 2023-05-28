import { Robot } from "../models/robots.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get a robot by id
export const getById = async (robotId: string): Promise<Robot> => {
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

//Get robots by company id
export const getByCompany = async (companyId: string): Promise<Robot[]> => {
  const query = "SELECT * FROM robots WHERE companyId = ?";
  const results = await execute<Robot[]>(query, [companyId]);
  return results;
};

//Get robots by employee id
export const getByEmployee = async (employeeId: string): Promise<Robot[]> => {
  const query = "SELECT * FROM robots WHERE employeeId = ?";
  const results = await execute<Robot[]>(query, [employeeId]);
  return results;
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
    " state = ?, errorCode = ?, errorCodeTimestamp = ?, clientId = ?, modelId = ?, assigned = ?, employeeId = ?, companyId = ? WHERE robotId = ?";
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
    robot.modelId,
    robot.assigned,
    robot.employeeId,
    robot.companyId,
    robot.robotId,
  ]);
  return robot;
};

//Assign a robot to a client and employee
export const assignRobot = async (robotId: string, clientId: string, employeeId: string, assigned: boolean): Promise<Robot> => {
  const query = "UPDATE robots SET clientId = ?, employeeId = ?, assigned = ? WHERE robotId = ?";
  await execute(query, [clientId, employeeId, assigned, robotId]);
  return getById(robotId);
};

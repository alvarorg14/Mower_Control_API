import { Robot, RobotComplete } from "../models/robots.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get a robot by id
export const getById = async (robotId: string): Promise<RobotComplete> => {
  const query = `
  SELECT 
    robots.*, 
    clients.clientId, 
    clients.name AS clientName, 
    clients.address AS clientAddress, 
    clients.phoneNumber AS clientPhoneNumber, 
    clients.companyId AS clientCompanyId,
    models.modelId AS modelId,
    models.name AS  modelName,
    employees.employeeId AS employeeId,
    employees.name AS employeeName,
    employees.surname1 AS employeeSurname1,
    employees.surname2 AS employeeSurname2,
    employees.username AS employeeUsername,
    employees.password AS employeePassword,
    employees.role AS employeeRole,
    employees.companyId AS employeeCompanyId
  FROM 
    robots 
  LEFT JOIN 
    clients ON robots.clientId = clients.clientId
  LEFT JOIN
    models ON robots.modelId = models.modelId
  LEFT JOIN
    employees ON robots.employeeId = employees.employeeId
  WHERE 
    robots.robotId = ?`;
  const results = await execute<any[]>(query, robotId);
  if (results.length === 0) throw new NotFoundError("Robot not found");
  return results.map((robot: any) => ({
    robotId: robot.robotId,
    serialNumber: robot.serialNumber,
    name: robot.name,
    battery: robot.battery,
    mode: robot.mode,
    activity: robot.activity,
    state: robot.state,
    errorCode: robot.errorCode,
    errorCodeTimestamp: robot.errorCodeTimestamp,
    assigned: robot.assigned,
    model: {
      modelId: robot.modelId,
      name: robot.modelName,
    },
    client: robot.clientId
      ? {
          clientId: robot.clientId,
          name: robot.clientName,
          address: robot.clientAddress,
          phoneNumber: robot.clientPhoneNumber,
          companyId: robot.clientCompanyId,
        }
      : null,
    employee: robot.employeeId
      ? {
          employeeId: robot.employeeId,
          name: robot.employeeName,
          surname1: robot.employeeSurname1,
          surname2: robot.employeeSurname2,
          username: robot.employeeUsername,
          password: robot.employeePassword,
          role: robot.employeeRole,
          companyId: robot.employeeCompanyId,
        }
      : null,
    companyId: robot.companyId,
  }))[0];
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
export const getByCompany = async (companyId: string, assigned?: string): Promise<RobotComplete[]> => {
  let query = `
    SELECT 
      robots.*, 
      clients.clientId, 
      clients.name AS clientName, 
      clients.address AS clientAddress, 
      clients.phoneNumber AS clientPhoneNumber, 
      clients.companyId AS clientCompanyId,
      models.modelId AS modelId,
      models.name AS  modelName,
      employees.employeeId AS employeeId,
      employees.name AS employeeName,
      employees.surname1 AS employeeSurname1,
      employees.surname2 AS employeeSurname2,
      employees.username AS employeeUsername,
      employees.password AS employeePassword,
      employees.role AS employeeRole,
      employees.companyId AS employeeCompanyId
    FROM 
      robots 
    LEFT JOIN 
      clients ON robots.clientId = clients.clientId
    LEFT JOIN
      models ON robots.modelId = models.modelId
    LEFT JOIN
      employees ON robots.employeeId = employees.employeeId
    WHERE 
      robots.companyId = ?`;

  const queryParams: (string | number)[] = [companyId];

  if (assigned !== undefined) {
    query += " AND robots.assigned = ?";
    queryParams.push(assigned === "true" ? 1 : 0);
  }

  const results = await execute<any[]>(query, queryParams);
  return results.map((robot) => ({
    robotId: robot.robotId,
    serialNumber: robot.serialNumber,
    name: robot.name,
    battery: robot.battery,
    mode: robot.mode,
    activity: robot.activity,
    state: robot.state,
    errorCode: robot.errorCode,
    errorCodeTimestamp: robot.errorCodeTimestamp,
    assigned: robot.assigned,
    model: {
      modelId: robot.modelId,
      name: robot.modelName,
    },
    client: robot.clientId
      ? {
          clientId: robot.clientId,
          name: robot.clientName,
          address: robot.clientAddress,
          phoneNumber: robot.clientPhoneNumber,
          companyId: robot.clientCompanyId,
        }
      : null,
    employee: robot.employeeId
      ? {
          employeeId: robot.employeeId,
          name: robot.employeeName,
          surname1: robot.employeeSurname1,
          surname2: robot.employeeSurname2,
          username: robot.employeeUsername,
          password: robot.employeePassword,
          role: robot.employeeRole,
          companyId: robot.employeeCompanyId,
        }
      : null,
    companyId: robot.companyId,
  }));
};

//Get robots by employee id
export const getByEmployee = async (employeeId: string): Promise<RobotComplete[]> => {
  const query = `
  SELECT 
    robots.*, 
    clients.clientId, 
    clients.name AS clientName, 
    clients.address AS clientAddress, 
    clients.phoneNumber AS clientPhoneNumber, 
    clients.companyId AS clientCompanyId,
    models.modelId AS modelId,
    models.name AS  modelName,
    employees.employeeId AS employeeId,
    employees.name AS employeeName,
    employees.surname1 AS employeeSurname1,
    employees.surname2 AS employeeSurname2,
    employees.username AS employeeUsername,
    employees.password AS employeePassword,
    employees.role AS employeeRole,
    employees.companyId AS employeeCompanyId
  FROM 
    robots 
  LEFT JOIN 
    clients ON robots.clientId = clients.clientId
  LEFT JOIN
    models ON robots.modelId = models.modelId
  LEFT JOIN
    employees ON robots.employeeId = employees.employeeId
  WHERE 
    robots.employeeId = ?`;

  const results = await execute<any[]>(query, employeeId);
  return results.map((robot) => ({
    robotId: robot.robotId,
    serialNumber: robot.serialNumber,
    name: robot.name,
    battery: robot.battery,
    mode: robot.mode,
    activity: robot.activity,
    state: robot.state,
    errorCode: robot.errorCode,
    errorCodeTimestamp: robot.errorCodeTimestamp,
    assigned: robot.assigned,
    model: {
      modelId: robot.modelId,
      name: robot.modelName,
    },
    client: robot.clientId
      ? {
          clientId: robot.clientId,
          name: robot.clientName,
          address: robot.clientAddress,
          phoneNumber: robot.clientPhoneNumber,
          companyId: robot.clientCompanyId,
        }
      : null,
    employee: robot.employeeId
      ? {
          employeeId: robot.employeeId,
          name: robot.employeeName,
          surname1: robot.employeeSurname1,
          surname2: robot.employeeSurname2,
          username: robot.employeeUsername,
          password: robot.employeePassword,
          role: robot.employeeRole,
          companyId: robot.employeeCompanyId,
        }
      : null,
    companyId: robot.companyId,
  }));
};

//Get robots by client id
export const getByClient = async (clientId: string): Promise<RobotComplete[]> => {
  const query = `
  SELECT 
    robots.*, 
    clients.clientId, 
    clients.name AS clientName, 
    clients.address AS clientAddress, 
    clients.phoneNumber AS clientPhoneNumber, 
    clients.companyId AS clientCompanyId,
    models.modelId AS modelId,
    models.name AS  modelName,
    employees.employeeId AS employeeId,
    employees.name AS employeeName,
    employees.surname1 AS employeeSurname1,
    employees.surname2 AS employeeSurname2,
    employees.username AS employeeUsername,
    employees.password AS employeePassword,
    employees.role AS employeeRole,
    employees.companyId AS employeeCompanyId
  FROM 
    robots 
  LEFT JOIN 
    clients ON robots.clientId = clients.clientId
  LEFT JOIN
    models ON robots.modelId = models.modelId
  LEFT JOIN
    employees ON robots.employeeId = employees.employeeId
  WHERE 
    robots.clientId = ?`;

  const results = await execute<any[]>(query, clientId);
  return results.map((robot) => ({
    robotId: robot.robotId,
    serialNumber: robot.serialNumber,
    name: robot.name,
    battery: robot.battery,
    mode: robot.mode,
    activity: robot.activity,
    state: robot.state,
    errorCode: robot.errorCode,
    errorCodeTimestamp: robot.errorCodeTimestamp,
    assigned: robot.assigned,
    model: {
      modelId: robot.modelId,
      name: robot.modelName,
    },
    client: robot.clientId
      ? {
          clientId: robot.clientId,
          name: robot.clientName,
          address: robot.clientAddress,
          phoneNumber: robot.clientPhoneNumber,
          companyId: robot.clientCompanyId,
        }
      : null,
    employee: robot.employeeId
      ? {
          employeeId: robot.employeeId,
          name: robot.employeeName,
          surname1: robot.employeeSurname1,
          surname2: robot.employeeSurname2,
          username: robot.employeeUsername,
          password: robot.employeePassword,
          role: robot.employeeRole,
          companyId: robot.employeeCompanyId,
        }
      : null,
    companyId: robot.companyId,
  }));
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
export const assignRobot = async (robotId: string, clientId: string, employeeId: string, assigned: boolean): Promise<RobotComplete> => {
  const query = "UPDATE robots SET clientId = ?, employeeId = ?, assigned = ? WHERE robotId = ?";
  await execute(query, [clientId, employeeId, assigned, robotId]);
  return getById(robotId);
};

//Unassign a robot from a client
export const unassignRobotForClient = async (clientId: string): Promise<void> => {
  const query = "UPDATE robots SET clientId = NULL, assigned = 0 WHERE clientId = ?";
  await execute(query, clientId);
};

//Unassing a robot from an employee
export const unassignRobotForEmployee = async (employeeId: string): Promise<void> => {
  const query = "UPDATE robots SET employeeId = NULL, assigned = 0 WHERE employeeId = ?";
  await execute(query, employeeId);
};

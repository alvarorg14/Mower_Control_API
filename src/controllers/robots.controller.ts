import { RequestHandler } from "express";
import * as robotsRepository from "../repositories/robots.repository";
import * as robotsService from "../services/robots.service";
import { Robot, RobotComplete } from "../models/robots.model";
import { checkRobotIsFromCompanyOrEmployee, checkCompany, checkEmployee } from "../helpers/security.helper";

export const getRobotById: RequestHandler = async (req, res, next) => {
  const robotId = req.params.robotId;
  try {
    await checkRobotIsFromCompanyOrEmployee(robotId, req.companyId, req.userId, req.role);
    const robot: RobotComplete = await robotsRepository.getById(robotId);
    res.status(200).send(robot);
  } catch (err) {
    next(err);
  }
};

export const getRobotsByCompany: RequestHandler = async (req, res, next) => {
  const companyId = req.params.companyId;
  let assigned: string | undefined;

  if (typeof req.query.assigned === "string") {
    assigned = req.query.assigned;
  }

  try {
    await checkCompany(companyId, req.companyId);
    const robots: RobotComplete[] = await robotsRepository.getByCompany(companyId, assigned);
    res.status(200).json(robots);
  } catch (err) {
    next(err);
  }
};

export const getRobotsByEmployee: RequestHandler = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  try {
    const robots: RobotComplete[] = await robotsRepository.getByEmployee(employeeId);
    res.status(200).json(robots);
  } catch (err) {
    next(err);
  }
};

export const getRobotsByClient: RequestHandler = async (req, res, next) => {
  const clientId = req.params.clientId;
  try {
    const robots: RobotComplete[] = await robotsRepository.getByClient(clientId);
    res.status(200).json(robots);
  } catch (err) {
    next(err);
  }
};

export const updateAllRobots: RequestHandler = async (req, res, next) => {
  try {
    await robotsService.updateRobots();
    res.set("Content-Type", "text/plain");
    res.status(200).send("Robots updated successfully");
  } catch (err) {
    next(err);
  }
};

export const updateRobotsByCompany: RequestHandler = async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    await robotsService.updateRobotsByCompany(companyId);
    res.set("Content-Type", "text/plain");
    res.status(200).send(`Robots updated successfully for company ${companyId}`);
  } catch (err) {
    next(err);
  }
};

export const assignRobotToClient: RequestHandler = async (req, res, next) => {
  const robotId = req.params.robotId;
  const clientId = req.body.clientId;
  const employeeId = req.body.employeeId;

  try {
    await checkRobotIsFromCompanyOrEmployee(robotId, req.companyId, req.userId, req.role);
    const robot: RobotComplete = await robotsRepository.assignRobot(robotId, clientId, employeeId, true);
    console.log(`Robot ${robotId} assigned to client ${clientId}`);
    res.status(200).json(robot);
  } catch (err) {
    next(err);
  }
};

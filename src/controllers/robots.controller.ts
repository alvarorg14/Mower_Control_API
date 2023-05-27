import { RequestHandler } from "express";
import * as robotsRepository from "../repositories/robots.repository";
import * as robotsService from "../services/robots.service";
import { Robot } from "../models/robots.model";
import { checkRobotIsFromCompanyOrEmployee, checkCompany, checkEmployee } from "../helpers/security.helper";

export const getRobotById: RequestHandler = async (req, res, next) => {
  const robotId = req.params.robotId;
  try {
    await checkRobotIsFromCompanyOrEmployee(robotId, req.companyId, req.userId, req.role);
    const robot: Robot = await robotsRepository.getById(robotId);
    res.status(200).send(robot);
  } catch (err) {
    next(err);
  }
};

export const getRobotsByCompany: RequestHandler = async (req, res, next) => {
  const companyId = req.params.companyId;
  try {
    await checkCompany(companyId, req.companyId);
    const robots: Robot[] = await robotsRepository.getByCompany(companyId);
    res.status(200).send(robots);
  } catch (err) {
    next(err);
  }
};

export const getRobotsByEmployee: RequestHandler = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  try {
    await checkEmployee(employeeId, req.userId);
    const robots: Robot[] = await robotsRepository.getByEmployee(employeeId);
    res.status(200).send(robots);
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
    await checkCompany(companyId, req.companyId);
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
    await robotsRepository.assignRobot(robotId, clientId, employeeId, true);
    res.set("Content-Type", "text/plain");
    res.status(200).send(`Robot ${robotId} assigned to client ${clientId}`);
  } catch (err) {
    next(err);
  }
};

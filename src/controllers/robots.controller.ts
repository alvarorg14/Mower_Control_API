import { RequestHandler } from "express";
import * as robotsRepository from "../repositories/robots.repository";
import * as robotsService from "../services/robots.service";

export const getRobots: RequestHandler = async (req, res, next) => {
  try {
    const robots = await robotsRepository.getAllRobots();
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
    await robotsRepository.assignRobot(robotId, clientId, employeeId, true);
    res.set("Content-Type", "text/plain");
    res.status(200).send(`Robot ${robotId} assigned to client ${clientId}`);
  } catch (err) {
    next(err);
  }
};

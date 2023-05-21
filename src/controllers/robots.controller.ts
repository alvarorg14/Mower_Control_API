import { RequestHandler } from "express";
import { Robot } from "../models/robots.model";
import * as robotsRepository from "../repositories/robots.repository";
import * as robotsService from "../services/robots.service";

export const getRobots: RequestHandler = async (req, res) => {
  try {
    const robots = await robotsRepository.getAllRobots();
    res.status(200).json(robots);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createRobot: RequestHandler = async (req, res) => {
  const newRobot: Robot = {
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    battery: req.body.battery,
    mode: req.body.mode,
    activity: req.body.activity,
    state: req.body.state,
    errorCode: req.body.errorCode,
    errorCodeTimestamp: req.body.errorCodeTimestamp,
    clientId: req.body.clientId,
    model: req.body.model,
    assignedToClient: req.body.assignedToClient,
  };

  try {
    const robot = await robotsRepository.create(newRobot);
    res.status(201).json(robot);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateAllRobots: RequestHandler = async (req, res) => {
  try {
    await robotsService.updateRobots();
    res.set("Content-Type", "text/plain");
    res.status(200).send("Robots updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateRobotsByCompany: RequestHandler = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    await robotsService.updateRobotsByCompany(companyId);
    res.set("Content-Type", "text/plain");
    res.status(200).send(`Robots updated successfully for company ${companyId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const assignRobotToClient: RequestHandler = async (req, res) => {
  const robotId = req.params.robotId;
  const clientId = req.body.clientId;

  try {
    await robotsRepository.updateClientId(robotId, clientId, true);
    res.set("Content-Type", "text/plain");
    res.status(200).send(`Robot ${robotId} assigned to client ${clientId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

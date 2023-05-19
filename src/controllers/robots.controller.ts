import { RequestHandler } from "express";
import { Robot } from "../models/robots.model";
import * as robotsRepository from "../repositories/robots.repository";

export const getRobots: RequestHandler = async (req, res) => {
  try {
    const robots = await robotsRepository.getAllRobots();
    res.status(200).send(robots);
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
    clientId: req.body.clientId,
    modelId: req.body.modelId,
  };

  try {
    const robot = await robotsRepository.createRobot(newRobot);
    res.status(201).send(robot);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

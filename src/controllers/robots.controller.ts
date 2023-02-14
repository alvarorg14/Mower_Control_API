import { RequestHandler } from "express";
import { Robot } from "../models/robots.model";
import * as sql from "../models/robots.model";

export const getRobots: RequestHandler = async (req, res) => {
  sql.getAllRobots((err: any, data: Robot[]) => {
    if (err) {
      res.status(500).send("Some error occurred while retrieving robots.");
    } else {
      res.send(data);
    }
  });
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

  sql.createRobot(newRobot, (err: any, data: Robot) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while creating the Robot.");
    } else {
      res.send(data);
    }
  });
};

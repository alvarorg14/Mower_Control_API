import { RequestHandler } from "express";
import * as repairsService from "../services/repairs.service";

//Creata a new repair
export const createRepair: RequestHandler = async (req, res, next) => {
  try {
    const employeeId = req.userId as string;
    const robotId = req.params.robotId;
    await repairsService.createRepair(req.body, employeeId, robotId);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

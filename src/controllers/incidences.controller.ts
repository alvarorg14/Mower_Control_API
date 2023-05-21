import { RequestHandler } from "express";
import * as incidencesRepository from "../repositories/incidences.repository";
import { Incidence } from "../models/incidences.model";

//Get incidences by robotId
export const getIncidencesByRobotId: RequestHandler = async (req, res, next) => {
  try {
    const incidences: Incidence[] = await incidencesRepository.getByRobotId(req.params.robotId);
    res.status(200).json(incidences);
  } catch (err) {
    next(err);
  }
};

//Get not read incidences
export const getIncidencesByReadStatus: RequestHandler = async (req, res, next) => {
  let status = req.query.readed;
  if (status !== "true" && status !== "false") {
    res.status(400).send("Invalid readed status");
    return;
  }
  try {
    const incidences: Incidence[] = await incidencesRepository.getByReadedStatus(status === "true");
    res.status(200).json(incidences);
  } catch (err) {
    next(err);
  }
};

//Mark an incidence as read or not read
export const markIncidence: RequestHandler = async (req, res, next) => {
  try {
    const incidenceId = req.params.incidenceId;
    const readed = req.params.readed;
    await incidencesRepository.getById(incidenceId);
    await incidencesRepository.update(incidenceId, readed === "true");
    res.status(200).send("Incidence status updated to " + readed);
  } catch (err) {
    next(err);
  }
};

//Delete an incidence
export const deleteIncidence: RequestHandler = async (req, res, next) => {
  try {
    await incidencesRepository.getById(req.params.incidenceId);
    await incidencesRepository.remove(req.params.incidenceId);
    res.status(200).send("Incidence deleted");
  } catch (err) {
    next(err);
  }
};

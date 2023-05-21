import { RequestHandler } from "express";
import * as incidencesRepository from "../repositories/incidences.repository";
import { Incidence } from "../models/incidences.model";
import NotFoundError from "../errors/notFound.error";

//Get incidences by robotId
export const getIncidencesByRobotId: RequestHandler = async (req, res) => {
  try {
    const incidences = await incidencesRepository.getByRobotId(req.params.robotId);
    res.status(200).json(incidences);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get not read incidences
export const getIncidencesByReadStatus: RequestHandler = async (req, res) => {
  let status = req.query.readed;
  if (status !== "true" && status !== "false") {
    res.status(400).send("Invalid readed status");
    return;
  }
  try {
    const incidences = await incidencesRepository.getByReadedStatus(status === "true");
    res.status(200).json(incidences);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Mark an incidence as read or not read
export const markIncidence: RequestHandler = async (req, res) => {
  try {
    const incidenceId = req.params.incidenceId;
    const readed = req.params.readed;
    await incidencesRepository.getById(incidenceId);
    await incidencesRepository.update(incidenceId, readed === "true");
    res.status(200).send("Incidence status updated to " + readed);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Delete an incidence
export const deleteIncidence: RequestHandler = async (req, res) => {
  try {
    await incidencesRepository.getById(req.params.incidenceId);
    await incidencesRepository.remove(req.params.incidenceId);
    res.status(200).send("Incidence deleted");
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

import { RequestHandler } from "express";
import { Repair, validateRepair } from "../models/repairs.model";
import * as repairsRepository from "../repositories/repairs.repository";
import NotFoundError from "../errors/notFound.error";
import ValidationError from "../errors/validation.error";

//Get all repairs
export const getAllRepairs: RequestHandler = async (req, res) => {
  try {
    const repairs = await repairsRepository.getAll();
    res.status(200).send(repairs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a repair by id
export const getRepairById: RequestHandler = async (req, res) => {
  try {
    const repairs = await repairsRepository.getById(req.params.id);
    res.status(200).send(repairs);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Get repairs by robotId
export const getRepairsByRobotId: RequestHandler = async (req, res) => {
  try {
    const repairs = await repairsRepository.getByRobotId(req.params.robotId);
    res.status(200).send(repairs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createRepair: RequestHandler = async (req, res) => {
  let newRepair: Repair = {
    title: req.body.title,
    description: req.body.description,
    workingHours: req.body.workingHours,
    date: new Date(req.body.date),
    robotId: req.body.robotId,
  };

  try {
    validateRepair(newRepair);
    const repair = await repairsRepository.create(newRepair);
    res.status(201).send(repair);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Update a repair
export const updateRepair: RequestHandler = async (req, res) => {
  let newRepair: Repair = {
    title: req.body.title,
    description: req.body.description,
    workingHours: req.body.workingHours,
    date: new Date(req.body.date),
    robotId: req.body.robotId,
  };

  try {
    await repairsRepository.getById(req.params.id);
    validateRepair(newRepair);
    newRepair.repairId = req.params.id;
    const repair = await repairsRepository.update(req.params.id, newRepair);
    res.status(200).send(repair);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Delete a repair
export const deleteRepair: RequestHandler = async (req, res) => {
  try {
    await repairsRepository.getById(req.params.id);
    await repairsRepository.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

import { RequestHandler } from "express";
import { Repair, validateRepair } from "../models/repairs.model";
import * as repairsRepository from "../repositories/repairs.repository";

//Get all repairs
export const getAllRepairs: RequestHandler = async (req, res, next) => {
  try {
    const repairs = await repairsRepository.getAll();
    res.status(200).json(repairs);
  } catch (err) {
    next(err);
  }
};

//Get a repair by id
export const getRepairById: RequestHandler = async (req, res, next) => {
  try {
    const repairs = await repairsRepository.getById(req.params.id);
    res.status(200).json(repairs);
  } catch (err) {
    next(err);
  }
};

//Get repairs by robotId
export const getRepairsByRobotId: RequestHandler = async (req, res, next) => {
  try {
    const repairs = await repairsRepository.getByRobotId(req.params.robotId);
    res.status(200).json(repairs);
  } catch (err) {
    next(err);
  }
};

export const createRepair: RequestHandler = async (req, res, next) => {
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
    res.status(201).json(repair);
  } catch (err) {
    next(err);
  }
};

//Update a repair
export const updateRepair: RequestHandler = async (req, res, next) => {
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
    res.status(200).json(repair);
  } catch (err) {
    next(err);
  }
};

//Delete a repair
export const deleteRepair: RequestHandler = async (req, res, next) => {
  try {
    await repairsRepository.getById(req.params.id);
    await repairsRepository.remove(req.params.id);
    res.set("Content-Type", "text/plain");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

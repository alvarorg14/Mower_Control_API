import { RequestHandler } from "express";
import { Repair } from "../models/repairs.model";
import * as sql from "../models/repairs.model";
import NotFoundError from "../errors/notFound.error";

//Get all repairs
export const getAllRepairs: RequestHandler = async (req, res) => {
  try {
    console.log("controller");
    const repairs = await sql.getAllRepairs();
    res.status(200).send(repairs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a repair by id
export const getRepairById: RequestHandler = async (req, res) => {
  try {
    const repairs = await sql.getRepairById(req.params.repairId);
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
    const repairs = await sql.getRepairsByRobotId(req.params.robotId);
    res.status(200).send(repairs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createRepair: RequestHandler = async (req, res) => {
  try {
    let newRepair: Repair = validateBody(req);
    if (newRepair === null) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    let { error } = sql.validateRepair(newRepair);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const repair = await sql.createRepair(newRepair);
    res.status(201).send(repair);

  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      res.status(400).send({ message: "Robot does not exist" });
    } else {
      res.status(500).send({ message: "Error creating repair" });
    }
  }
};

//Update a repair
export const updateRepair: RequestHandler = async (req, res) => {
  //Validate request
  try {
    let newRepair: Repair = validateBody(req);
    if (newRepair === null) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    let { error } = sql.validateRepair(newRepair);
  
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
    const repair = await sql.updateRepair(req.params.id, newRepair);
    res.status(200).send(repair);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).send(error.message);
    } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
      res.status(400).send({ message: "Robot does not exist" });
    } else {
      res.status(500).send({ message: "Error updating repair" });
    }
  }
};

export const validateBody: any = (req: any) => {
  if (!req.body) {
    return null;
  }

  let repairToValidate: Repair = {
    title: req.body.title,
    description: req.body.description,
    workingHours: req.body.workingHours,
    date: new Date(req.body.date),
    robotId: req.body.robotId,
  };

  return repairToValidate;
};

export const deleteRepair: RequestHandler = async (req, res) => {
  try {
    await sql.getRepairById(req.params.id);
    await sql.deleteRepair(req.params.id);
    res.status(204);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};
import { RequestHandler } from "express";
import { Repair } from "../models/repairs.model";
import * as sql from "../models/repairs.model";

//Get all repairs
export const getAllRepairs: RequestHandler = (req, res) => {
  sql.getAllRepairs((err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving repairs",
      });
    } else {
      res.send(data);
    }
  });
};

//Get a repair by id
export const getRepairById: RequestHandler = (req, res) => {
  sql.getRepairById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving repair",
      });
    } else {
      if (data === undefined) {
        res.status(404).send({ message: "Repair not found" });
      } else {
        res.send(data);
      }
    }
  });
};

//Get repairs by robotId
export const getRepairsByRobotId: RequestHandler = (req, res) => {
  sql.getRepairsByRobotId(req.params.robotId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving repair",
      });
    } else {
      res.send(data);
    }
  });
};

//Create a repair
export const createRepair: RequestHandler = (req, res) => {
  //Validate request
  let newRepair = validateBody(req);
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

  //Save repair in the database
  sql.createRepair(newRepair, (err, data) => {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        res.status(400).send({ message: "Robot does not exist" });
      } else {
        res.status(500).send({ message: "Error creating repair" });
      }
    } else {
      res.send(data);
    }
  });
};

//Update a repair
export const updateRepair: RequestHandler = (req, res) => {
  //Validate request
  let newRepair = validateBody(req);
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

  sql.updateRepair(req.params.id, newRepair, (err, data) => {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        res.status(400).send({ message: "Robot does not exist" });
      } else {
        res.status(500).send({ message: "Error updating repair" });
      }
    } else {
      res.send(data);
    }
  });
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

//Delete a repair
export const deleteRepair: RequestHandler = (req, res) => {
  //Check id exist
  sql.getRepairById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving repair",
      });
    } else {
      if (data === undefined) {
        res.status(404).send({ message: "Repair not found" });
      } else {
        sql.deleteRepair(req.params.id, (err, data) => {
          if (err) {
            res.status(500).send({
              message: "Error deleting repair",
            });
          } else {
            res.send({ message: `Repair was deleted successfully!` });
          }
        });
      }
    }
  });
};

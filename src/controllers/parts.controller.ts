import { RequestHandler } from "express";
import { Part } from "../models/parts.model";
import * as sql from "../models/parts.model";

//Get all parts
export const getParts: RequestHandler = async (req, res) => {
  sql.getAllParts((err: any, data: Part[]) => {
    if (err) {
      res.status(500).send("Some error occurred while retrieving parts.");
    } else {
      res.send(data);
    }
  });
};

//Get a part by id
export const getPartById: RequestHandler = async (req, res) => {
  sql.getPartById(req.params.id, (err: any, data: Part) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving the part.");
    } else {
      if (data === undefined) {
        res.status(404).send("Part not found.");
      } else {
        res.send(data);
      }
    }
  });
};

//Get parts by reference
export const getPartByReference: RequestHandler = async (req, res) => {
  sql.getPartByReference(req.params.reference, (err: any, data: Part) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving the part.");
    } else {
      if (data === undefined) {
        res.status(404).send("Part not found.");
      } else {
        res.send(data);
      }
    }
  });
};

//Create a new part
export const createPart: RequestHandler = async (req, res) => {
  //Validate part
  const partToValidate: Part = {
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
  };

  let { error } = sql.validatePart(partToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  sql.createPart(partToValidate, (err: any, data: Part) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res
          .status(409)
          .send(
            "Part with reference " +
              partToValidate.reference +
              " already exists."
          );
      } else {
        res.status(500).send("Some error occurred while creating the Model.");
      }
    } else {
      res.send(data);
    }
  });
};

//Update a part
export const updatePart: RequestHandler = async (req, res) => {
  //Validate part
  const partToValidate: Part = {
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
  };

  let { error } = sql.validatePart(partToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const part = partToValidate;
  part.partId = req.params.id;

  sql.updatePart(req.params.id, part, (err: any, data: any) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res
          .status(409)
          .send(
            "Part with reference " +
              partToValidate.reference +
              " already exists."
          );
      } else {
        res.status(500).send("Some error occurred while creating the Model.");
      }
    } else {
      res.send(data);
    }
  });
};

//Delete a part
export const deletePart: RequestHandler = async (req, res) => {
  sql.deletePart(req.params.id, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while deleting the part.");
    } else {
      res.send(data);
    }
  });
};

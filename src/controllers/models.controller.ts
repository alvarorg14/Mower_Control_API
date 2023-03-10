import { RequestHandler } from "express";
import { Model } from "../models/models.model";
import * as sql from "../models/models.model";

//Get all models
export const getModels: RequestHandler = async (req, res) => {
  sql.getAllModels((err: any, data: Model[]) => {
    if (err) {
      res.status(500).send("Some error occurred while retrieving models.");
    } else {
      res.send(data);
    }
  });
};

//Get a model by id
export const getModelById: RequestHandler = async (req, res) => {
  sql.getModelById(req.params.id, (err: any, data: Model) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving the model.");
    } else {
      if (data === undefined) {
        res.status(404).send("Model not found.");
      } else {
        res.send(data);
      }
    }
  });
};

//Get models by name
export const getModelByName: RequestHandler = async (req, res) => {
  sql.getModelByName(req.params.name, (err: any, data: Model) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving the model.");
    } else {
      if (data === undefined) {
        res.status(404).send("Model not found.");
      } else {
        res.send(data);
      }
    }
  });
};

//Create a new model
export const createModel: RequestHandler = async (req, res) => {
  //Validate model
  const modelToValidate: Model = {
    name: req.body.name,
    surface: req.body.surface,
    maxHours: req.body.maxHours,
  };

  let { error } = sql.validateModel(modelToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newModel = modelToValidate;

  sql.createModel(newModel, (err: any, data: Model) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res
          .status(409)
          .send("Model with name " + newModel.name + " already exists.");
      } else {
        res.status(500).send("Some error occurred while creating the Model.");
      }
    } else {
      res.send(data);
    }
  });
};

//Update a model
export const updateModel: RequestHandler = async (req, res) => {
  //Validate model
  const modelToValidate: Model = {
    name: req.body.name,
    surface: req.body.surface,
    maxHours: req.body.maxHours,
  };

  let { error } = sql.validateModel(modelToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const model = modelToValidate;
  model.modelId = req.params.id;

  sql.updateModel(req.params.id, model, (err: any, data: Model) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res
          .status(409)
          .send("Model with name " + model.name + " already exists.");
      } else {
        res.status(500).send("Some error occurred while creating the Model.");
      }
    } else {
      res.send(data);
    }
  });
};

//Delete a model
export const deleteModel: RequestHandler = async (req, res) => {
  sql.deleteModel(req.params.id, (err: any, data: Model) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while deleting the Model.");
    } else {
      res.send(data);
    }
  });
};

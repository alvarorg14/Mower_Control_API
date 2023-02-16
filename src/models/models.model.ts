import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const sql = require("../db/db.ts");

export type Model = {
  modelId?: string;
  name: string;
  surface: number;
  maxHours: number;
};

//Get all models from the database
export const getAllModels = (result: (err: any, data: Model[]) => any) => {
  sql.query("SELECT * FROM models", (err: any, res: any) => {
    if (err) {
      result(err, []);
      return;
    }
    result(null, res);
  });
};

//Get a model by id
export const getModelById = (
  modelId: string,
  result: (err: any, data: Model) => any
) => {
  sql.query(
    "SELECT * FROM models WHERE modelId = ?",
    modelId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Get a model by name
export const getModelByName = (
  name: string,
  result: (err: any, data: Model) => any
) => {
  sql.query(
    "SELECT * FROM models WHERE name = ?",
    name,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Create a new model
export const createModel = (
  newModel: Model,
  result: (err: any, data: Model) => any
) => {
  newModel.modelId = uuidv4();
  sql.query("INSERT INTO models SET ?", newModel, (err: any, res: Model) => {
    if (err) {
      result(err, null as any);
      return;
    }
    result(null, newModel);
  });
};

//Update a model
export const updateModel = (
  modelId: string,
  model: Model,
  result: (err: any, data: Model) => any
) => {
  sql.query(
    "UPDATE models SET name = ?, surface = ?, maxHours = ? WHERE modelId = ?",
    [model.name, model.surface, model.maxHours, modelId],
    (err: any, res: Model) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, model);
    }
  );
};

//Delete a model
export const deleteModel = (
  modelId: string,
  result: (err: any, data: any) => any
) => {
  sql.query(
    "DELETE FROM models WHERE modelId = ?",
    modelId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res);
    }
  );
};

//Validate a model before creating or updating
export const validateModel = (model: Model) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    surface: Joi.number().min(1).max(10000).required(),
    maxHours: Joi.number().min(1).max(24).required(),
  });
  return schema.validate(model);
};

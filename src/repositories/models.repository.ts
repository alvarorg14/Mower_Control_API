import { v4 as uuidv4 } from "uuid";
import { Model } from "../models/models.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";

//Get all models
export const getAll = async (): Promise<Model[]> => {
  const query = "SELECT * FROM models";
  const results = await execute<Model[]>(query, []);
  return results;
};

//Get a model by id
export const getById = async (modelId: string): Promise<Model> => {
  const query = "SELECT * FROM models WHERE modelId = ?";
  const results = await execute<Model[]>(query, [modelId]);
  if (results.length === 0) throw new NotFoundError("Model not found");
  return results[0];
};

//Get a model by name
export const getByName = async (name: string): Promise<Model> => {
  const query = "SELECT * FROM models WHERE name = ?";
  const results = await execute<Model[]>(query, [name]);
  if (results.length === 0) throw new NotFoundError("Model not found");
  if (results.length > 1) throw new Error("More than one model found");
  return results[0];
};

//Create new model
export const create = async (model: Model): Promise<Model> => {
  model.modelId = uuidv4();
  const query = "INSERT INTO models SET ?";
  try {
    await execute(query, [model]);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Model with the same name already exists");
    } else {
      throw new Error("An error occurred while creating a model");
    }
  }
  return model;
};

//Update a model
export const update = async (modelId: string, model: Model): Promise<Model> => {
  const query = "UPDATE models SET name = ?, surface = ?, maxHours = ? WHERE modelId = ?";
  try {
    await execute(query, [model.name, model.surface, model.maxHours, modelId]);
    return model;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Model with the same name already exists");
    } else {
      throw new Error("An error occurred while creating a model");
    }
  }
};

//Delete a model
export const remove = async (modelId: string): Promise<void> => {
  const query = "DELETE FROM models WHERE modelId = ?";
  await execute(query, [modelId]);
};

import { v4 as uuid } from "uuid";
import { Model } from "../models/models.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get model by id
export const getById = async (id: string): Promise<Model> => {
  const query = "SELECT * FROM models WHERE modelId = ?";
  const results = await execute<Model[]>(query, [id]);
  if (results.length === 0) throw new NotFoundError("Model not found");
  return results[0];
};

//Get model by name
export const getByName = async (name: string): Promise<Model> => {
  const query = "SELECT * FROM models WHERE name = ?";
  const results = await execute<Model[]>(query, [name]);
  if (results.length === 0) throw new NotFoundError("Model not found: " + name);
  return results[0];
};

//Create a model
export const create = async (newModel: Model): Promise<Model> => {
  newModel.modelId = uuid();
  const query = "INSERT INTO models SET ?";
  await execute(query, [newModel]);
  return newModel;
};

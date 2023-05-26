import { RequestHandler } from "express";
import { Model } from "../models/models.model";
import * as modelsRepository from "../repositories/models.repository";

//Create a new model
export const createModel: RequestHandler = async (req, res, next) => {
  const newModel: Model = {
    name: req.body.name,
  };

  try {
    const model = await modelsRepository.create(newModel);
    res.status(201).json(model);
  } catch (err) {
    next(err);
  }
};

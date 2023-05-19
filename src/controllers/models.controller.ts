import { RequestHandler } from "express";
import { Model, validateModel } from "../models/models.model";
import * as modelsRepository from "../repositories/models.repository";
import NotFoundError from "../errors/notFound.error";
import ValidationError from "../errors/validation.error";
import DuplicationError from "../errors/duplication.error";

//Get all models
export const getModels: RequestHandler = async (req, res) => {
  try {
    const models = await modelsRepository.getAll();
    res.status(200).send(models);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a model by id
export const getModelById: RequestHandler = async (req, res) => {
  try {
    const model = await modelsRepository.getById(req.params.id);
    res.status(200).send(model);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Get model by name
export const getModelByName: RequestHandler = async (req, res) => {
  try {
    const model = await modelsRepository.getByName(req.params.name);
    res.status(200).send(model);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Create a new model
export const createModel: RequestHandler = async (req, res) => {
  const newModel: Model = {
    name: req.body.name,
    surface: req.body.surface,
    maxHours: req.body.maxHours,
  };

  try {
    validateModel(newModel);
    const model = await modelsRepository.create(newModel);
    res.status(201).send(model);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//TODO: COMPROBAR 409 CONFLICTO POR NOMBRE

//Update a model
export const updateModel: RequestHandler = async (req, res) => {
  const newModel: Model = {
    name: req.body.name,
    surface: req.body.surface,
    maxHours: req.body.maxHours,
  };

  try {
    await modelsRepository.getById(req.params.id);
    validateModel(newModel);
    newModel.modelId = req.params.id;
    const model = await modelsRepository.update(req.params.id, newModel);
    res.status(200).send(model);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Delete a model
export const deleteModel: RequestHandler = async (req, res) => {
  try {
    await modelsRepository.getById(req.params.id);
    await modelsRepository.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

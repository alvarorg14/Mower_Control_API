import { RequestHandler } from "express";
import { Part, validatePart } from "../models/parts.model";
import * as partsRepository from "../repositories/parts.repository";

//Get all parts
export const getParts: RequestHandler = async (req, res, next) => {
  try {
    const parts = await partsRepository.getAll();
    res.status(200).json(parts);
  } catch (err) {
    next(err);
  }
};

//Get a part by id
export const getPartById: RequestHandler = async (req, res, next) => {
  try {
    const part = await partsRepository.getById(req.params.id);
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
};

//Get part by reference
export const getPartByReference: RequestHandler = async (req, res, next) => {
  try {
    const part = await partsRepository.getByReference(req.params.reference);
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
};

//Create a new part
export const createPart: RequestHandler = async (req, res, next) => {
  const newPart: Part = {
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
  };

  try {
    validatePart(newPart);
    const part = await partsRepository.create(newPart);
    res.status(201).json(part);
  } catch (err) {
    next(err);
  }
};

//Update a part
export const updatePart: RequestHandler = async (req, res, next) => {
  const partToUpdate: Part = {
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
  };

  try {
    await partsRepository.getById(req.params.id);
    validatePart(partToUpdate);
    partToUpdate.partId = req.params.id;
    const part = await partsRepository.update(req.params.id, partToUpdate);
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
};

//Delete a part
export const deletePart: RequestHandler = async (req, res, next) => {
  try {
    await partsRepository.getById(req.params.id);
    await partsRepository.remove(req.params.id);
    res.set("Content-Type", "text/plain");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

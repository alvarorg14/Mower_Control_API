import { RequestHandler } from "express";
import { Part, validatePart } from "../models/parts.model";
import * as partsRepository from "../repositories/parts.repository";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";
import ValidationError from "../errors/validation.error";

//Get all parts
export const getParts: RequestHandler = async (req, res) => {
  try {
    const parts = await partsRepository.getAll();
    res.status(200).json(parts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a part by id
export const getPartById: RequestHandler = async (req, res) => {
  try {
    const part = await partsRepository.getById(req.params.id);
    res.status(200).json(part);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Get part by reference
export const getPartByReference: RequestHandler = async (req, res) => {
  try {
    const part = await partsRepository.getByReference(req.params.reference);
    res.status(200).json(part);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Create a new part
export const createPart: RequestHandler = async (req, res) => {
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
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Update a part
export const updatePart: RequestHandler = async (req, res) => {
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
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Delete a part
export const deletePart: RequestHandler = async (req, res) => {
  try {
    await partsRepository.getById(req.params.id);
    await partsRepository.remove(req.params.id);
    res.set("Content-Type", "text/plain");
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

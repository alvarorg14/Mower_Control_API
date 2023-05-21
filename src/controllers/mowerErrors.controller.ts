import { RequestHandler } from "express";
import * as mowerErrorsRepository from "../repositories/mowerErrors.repository";
import { MowerError, validateMowerError } from "../models/mowerErrors.model";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";
import ValidationError from "../errors/validation.error";

//Get all mowerErrors
export const getMowerErrors: RequestHandler = async (req, res) => {
  try {
    const mowerErrors = await mowerErrorsRepository.getAll();
    res.status(200).json(mowerErrors);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a mowerError by code
export const getMowerErrorByCode: RequestHandler = async (req, res) => {
  try {
    const mowerError = await mowerErrorsRepository.getByCode(parseInt(req.params.code));
    res.status(200).json(mowerError);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Create a new mowerError
export const createMowerError: RequestHandler = async (req, res) => {
  const newMowerError: MowerError = {
    code: req.body.code,
    message: req.body.message,
  };

  try {
    validateMowerError(newMowerError);
    const mowerError = await mowerErrorsRepository.create(newMowerError);
    res.status(201).json(mowerError);
  } catch (err) {
    if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send(err.message);
    }
  }
};

//Update a mowerError
export const updateMowerError: RequestHandler = async (req, res) => {
  const mowerError: MowerError = {
    code: parseInt(req.params.code),
    message: req.body.message,
  };

  try {
    await mowerErrorsRepository.getByCode(parseInt(req.params.code));
    validateMowerError(mowerError);
    const updatedMowerError = await mowerErrorsRepository.update(mowerError.code, mowerError);
    res.status(200).json(updatedMowerError);
  } catch (err) {
    if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send(err.message);
    }
  }
};

//Delete a mowerError
export const deleteMowerError: RequestHandler = async (req, res) => {
  try {
    await mowerErrorsRepository.getByCode(parseInt(req.params.code));
    await mowerErrorsRepository.remove(parseInt(req.params.code));
    res.status(204).end();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

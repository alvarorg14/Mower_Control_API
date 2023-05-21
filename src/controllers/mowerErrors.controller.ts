import { RequestHandler } from "express";
import * as mowerErrorsRepository from "../repositories/mowerErrors.repository";
import { MowerError, validateMowerError } from "../models/mowerErrors.model";

//Get all mowerErrors
export const getMowerErrors: RequestHandler = async (req, res, next) => {
  try {
    const mowerErrors = await mowerErrorsRepository.getAll();
    res.status(200).json(mowerErrors);
  } catch (err) {
    next(err);
  }
};

//Get a mowerError by code
export const getMowerErrorByCode: RequestHandler = async (req, res, next) => {
  try {
    const mowerError = await mowerErrorsRepository.getByCode(parseInt(req.params.code));
    res.status(200).json(mowerError);
  } catch (err) {
    next(err);
  }
};

//Create a new mowerError
export const createMowerError: RequestHandler = async (req, res, next) => {
  const newMowerError: MowerError = {
    code: req.body.code,
    message: req.body.message,
  };

  try {
    validateMowerError(newMowerError);
    const mowerError = await mowerErrorsRepository.create(newMowerError);
    res.status(201).json(mowerError);
  } catch (err) {
    next(err);
  }
};

//Update a mowerError
export const updateMowerError: RequestHandler = async (req, res, next) => {
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
    next(err);
  }
};

//Delete a mowerError
export const deleteMowerError: RequestHandler = async (req, res, next) => {
  try {
    await mowerErrorsRepository.getByCode(parseInt(req.params.code));
    await mowerErrorsRepository.remove(parseInt(req.params.code));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

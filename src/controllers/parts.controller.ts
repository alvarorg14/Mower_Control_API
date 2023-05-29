import { RequestHandler } from "express";
import { Part, validatePart } from "../models/parts.model";
import { InitialPart } from "../models/initialParts.model";
import ValidationError from "../errors/validation.error";
import * as partsService from "../services/parts.service";

export const initializeParts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.parts) {
      throw new ValidationError("Parts are required");
    }
    const parts: InitialPart[] = req.body.parts;
    await partsService.initializeParts(parts);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

import { RequestHandler } from "express";
import { InitialPart } from "../models/initialParts.model";
import { Part } from "../models/parts.model";
import ValidationError from "../errors/validation.error";
import * as partsService from "../services/parts.service";
import * as companyPartsRepository from "../repositories/companyParts.repository";
import * as partsRepository from "../repositories/parts.repository";

//Initialize all the parts in the database
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

//Update the stock of a part
export const updateStock: RequestHandler = async (req, res, next) => {
  try {
    const partId: string = req.params.partId;
    const quantity: number = req.body.quantity;
    await companyPartsRepository.updateStock(partId, req.companyId as string, quantity);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

//Update the location of a part
export const updateLocation: RequestHandler = async (req, res, next) => {
  try {
    const partId: string = req.params.partId;
    const location: string = req.body.location;
    await companyPartsRepository.updateLocation(partId, req.companyId as string, location);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

//Update the price of a part
export const updatePrice: RequestHandler = async (req, res, next) => {
  try {
    const partId: string = req.params.partId;
    const price: number = req.body.price;
    await companyPartsRepository.updatePrice(partId, false, req.companyId as string, price);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

//Set the default price of a part
export const setDefaultPrice: RequestHandler = async (req, res, next) => {
  try {
    const partId: string = req.params.partId;
    const part: Part = await partsRepository.getById(partId);
    await companyPartsRepository.updatePrice(partId, true, req.companyId as string, part.defaultPrice);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

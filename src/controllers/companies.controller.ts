import { RequestHandler } from "express";
import { Company } from "../models/companies.model";
import * as companiesRepository from "../repositories/companies.repository";

//Get all companies
export const getCompanies: RequestHandler = async (req, res, next) => {
  try {
    const companies: Company[] = await companiesRepository.getAll();
    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
};

//Get a company by id
export const getCompanyById: RequestHandler = async (req, res, next) => {
  try {
    const company: Company = await companiesRepository.getById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

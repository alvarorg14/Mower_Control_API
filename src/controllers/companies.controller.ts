import { RequestHandler } from "express";
import { Company, validateCompany } from "../models/companies.model";
import * as companiesRepository from "../repositories/companies.repository";

//Get all companies
export const getCompanies: RequestHandler = async (req, res, next) => {
  try {
    const companies = await companiesRepository.getAll();
    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
};

//Get a company by id
export const getCompanyById: RequestHandler = async (req, res, next) => {
  try {
    const company = await companiesRepository.getById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

//Update a company
export const updateCompany: RequestHandler = async (req, res, next) => {
  const newCompany: Company = {
    name: req.body.name,
    CIF: req.body.cif,
  };

  try {
    await companiesRepository.getById(req.params.id);
    validateCompany(newCompany);
    newCompany.companyId = req.params.id;
    const company = await companiesRepository.update(req.params.id, newCompany);
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

//Delete a company
export const deleteCompany: RequestHandler = async (req, res, next) => {
  try {
    await companiesRepository.getById(req.params.id);
    await companiesRepository.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

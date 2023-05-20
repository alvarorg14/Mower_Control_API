import { RequestHandler } from "express";
import { Company, validateCompany } from "../models/companies.model";
import * as companiesRepository from "../repositories/companies.repository";
import NotFoundError from "../errors/notFound.error";
import ValidationError from "../errors/validation.error";
import DuplicationError from "../errors/duplication.error";

//Get all companies
export const getCompanies: RequestHandler = async (req, res) => {
  try {
    const companies = await companiesRepository.getAll();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get a company by id
export const getCompanyById: RequestHandler = async (req, res) => {
  try {
    const company = await companiesRepository.getById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Get a companu by CIF
export const getCompanyByCIF: RequestHandler = async (req, res) => {
  try {
    const company = await companiesRepository.getByCIF(req.params.cif);
    res.status(200).json(company);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Create a new company
export const createCompany: RequestHandler = async (req, res) => {
  const newCompany: Company = {
    name: req.body.name,
    CIF: req.body.cif,
  };

  try {
    validateCompany(newCompany);
    const company = await companiesRepository.create(newCompany);
    res.status(201).json(company);
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

//Update a company
export const updateCompany: RequestHandler = async (req, res) => {
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

//Delete a company
export const deleteCompany: RequestHandler = async (req, res) => {
  try {
    await companiesRepository.getById(req.params.id);
    await companiesRepository.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

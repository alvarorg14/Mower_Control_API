import express, { Router } from "express";
import * as companiesController from "../controllers/companies.controller";

const api: Router = express.Router();

api.get("/companies", companiesController.getCompanies);
api.get("/companies/:id", companiesController.getCompanyById);

export default api;

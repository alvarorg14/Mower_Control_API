import express, { Router } from "express";
import * as companiesController from "../controllers/companies.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.get("/companies", verifyAdminRole, companiesController.getCompanies);
api.get("/companies/:id", companiesController.getCompanyById);
api.get("/companies/cif/:cif", companiesController.getCompanyByCIF);
api.post("/companies", companiesController.createCompany);
api.put("/companies/:id", companiesController.updateCompany);
api.delete("/companies/:id", companiesController.deleteCompany);

export default api;

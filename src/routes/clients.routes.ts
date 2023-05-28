import express, { Router } from "express";
import * as ClientsController from "../controllers/clients.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.get("/clients/:id", ClientsController.getClientById);
api.get("/clients/company/:companyId", ClientsController.getClientsByCompanyId);
api.post("/clients", verifyAdminRole, ClientsController.createClient);
api.put("/clients/:id", verifyAdminRole, ClientsController.updateClient);
api.delete("/clients/:id", verifyAdminRole, ClientsController.deleteClient);

export default api;

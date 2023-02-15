import express, { Router } from "express";
import * as ClientsController from "../controllers/clients.controller";

const api: Router = express.Router();

api.get("/clients", ClientsController.getClients);
api.get("/clients/:id", ClientsController.getClientById);
api.post("/clients", ClientsController.createClient);
api.put("/clients/:id", ClientsController.updateClient);
api.delete("/clients/:id", ClientsController.deleteClient);

export default api;

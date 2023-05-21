import express, { Router } from "express";
import * as mowerErrorsController from "../controllers/mowerErrors.controller";

const api: Router = express.Router();

api.get("/mowerErrors", mowerErrorsController.getMowerErrors);
api.get("/mowerErrors/:code", mowerErrorsController.getMowerErrorByCode);
api.post("/mowerErrors", mowerErrorsController.createMowerError);
api.put("/mowerErrors/:code", mowerErrorsController.updateMowerError);
api.delete("/mowerErrors/:code", mowerErrorsController.deleteMowerError);

export default api;

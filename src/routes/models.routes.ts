import express, { Router } from "express";
import * as ModelsController from "../controllers/models.controller";

const api: Router = express.Router();

api.get("/models", ModelsController.getModels);
api.get("/models/:id", ModelsController.getModelById);
api.get("/models/name/:name", ModelsController.getModelByName);
api.post("/models", ModelsController.createModel);
api.put("/models/:id", ModelsController.updateModel);
api.delete("/models/:id", ModelsController.deleteModel);

export default api;

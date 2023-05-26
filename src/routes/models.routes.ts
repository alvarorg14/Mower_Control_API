import express, { Router } from "express";
import * as modelsController from "../controllers/models.controller";

const api: Router = express.Router();

api.post("/models", modelsController.createModel);

export default api;

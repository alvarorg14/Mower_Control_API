import express, { Router } from "express";
import * as PartsController from "../controllers/parts.controller";

const api: Router = express.Router();

api.post("/parts", PartsController.initializeParts);

export default api;

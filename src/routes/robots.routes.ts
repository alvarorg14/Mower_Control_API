import express, { Router } from "express";
import * as RobotsController from "../controllers/robots.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.get("/robots", RobotsController.getRobots);
api.post("/robots/company/:companyId/refresh", verifyAdminRole, RobotsController.updateRobotsByCompany);
api.post("/robots/:robotId/assign", RobotsController.assignRobotToClient);

export default api;

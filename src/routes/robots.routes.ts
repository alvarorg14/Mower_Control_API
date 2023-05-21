import express, { Router } from "express";
import * as RobotsController from "../controllers/robots.controller";

const api: Router = express.Router();

api.get("/robots", RobotsController.getRobots);
api.post("/robots", RobotsController.createRobot);
api.post("/robots/company/:companyId/refresh", RobotsController.updateRobotsByCompany);
api.post("/robots/:robotId/assign", RobotsController.assignRobotToClient);

export default api;

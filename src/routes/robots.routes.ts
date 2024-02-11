import express, { Router } from "express";
import * as RobotsController from "../controllers/robots.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.get("/robots/:robotId", RobotsController.getRobotById);
api.get("/robots/company/:companyId", verifyAdminRole, RobotsController.getRobotsByCompany);
api.get("/robots/employee/:employeeId", RobotsController.getRobotsByEmployee);
api.get("/robots/client/:clientId", RobotsController.getRobotsByClient);
api.post("/robots/company/:companyId/refresh", verifyAdminRole, RobotsController.updateRobotsByCompany);
api.post("/robots/:robotId/assign", verifyAdminRole, RobotsController.assignRobotToClient);

export default api;

import express, { Router } from "express";
import * as RepairsController from "../controllers/repairs.controller";

const api: Router = express.Router();

api.get("/repairs", RepairsController.getAllRepairs);
api.get("/repairs/:id", RepairsController.getRepairById);
api.get("/repairs/robot/:robotId", RepairsController.getRepairsByRobotId);
api.post("/repairs", RepairsController.createRepair);
api.put("/repairs/:id", RepairsController.updateRepair);
api.delete("/repairs/:id", RepairsController.deleteRepair);

export default api;

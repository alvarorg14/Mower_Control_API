import express, { Router } from "express";
import * as incidencesController from "../controllers/incidences.controller";

const api: Router = express.Router();

api.get("/incidences/robot/:robotId", incidencesController.getIncidencesByRobotId);
api.get("/incidences", incidencesController.getIncidencesByReadStatus);
api.put("/incidences/:incidenceId/:readed", incidencesController.markIncidence);
api.delete("/incidences/:incidenceId", incidencesController.deleteIncidence);

export default api;

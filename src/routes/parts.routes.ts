import express, { Router } from "express";
import * as PartsController from "../controllers/parts.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.post("/parts", PartsController.initializeParts);
api.put("/parts/:partId/stock", verifyAdminRole, PartsController.updateStock);
api.put("/parts/:partId/location", verifyAdminRole, PartsController.updateLocation);
api.put("/parts/:partId/price", verifyAdminRole, PartsController.updatePrice);
api.put("/parts/:partId/defaultPrice", verifyAdminRole, PartsController.setDefaultPrice);

export default api;

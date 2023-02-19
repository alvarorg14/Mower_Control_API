import express, { Router } from "express";
import * as PartsController from "../controllers/parts.controller";

const api: Router = express.Router();

api.get("/parts", PartsController.getParts);
api.get("/parts/:id", PartsController.getPartById);
api.get("/parts/reference/:reference", PartsController.getPartByReference);
api.post("/parts", PartsController.createPart);
api.put("/parts/:id", PartsController.updatePart);
api.delete("/parts/:id", PartsController.deletePart);

export default api;

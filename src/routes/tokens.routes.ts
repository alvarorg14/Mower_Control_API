import express, { Router } from "express";
import * as tokensController from "../controllers/tokens.controller";

const api: Router = express.Router();

api.post("/tokens/refresh", tokensController.refreshAllAccessTokens);

export default api;

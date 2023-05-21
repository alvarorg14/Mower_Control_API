import express, { Router } from "express";

import * as loginController from "../controllers/login.controller";

const router: Router = express.Router();

router.post("/signup", loginController.signUpCompany);
router.post("/login", loginController.login);

export default router;

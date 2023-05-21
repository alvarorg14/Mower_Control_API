import express from "express";

import * as auth from "./src/middleware/auth";

import robotsRoutes from "./src/routes/robots.routes";
import clientsRoutes from "./src/routes/clients.routes";
import partsRoutes from "./src/routes/parts.routes";
import reapirsRoutes from "./src/routes/repairs.routes";
import companiesRoutes from "./src/routes/companies.routes";
import employeesRoutes from "./src/routes/employees.routes";
import tokensRoutes from "./src/routes/tokens.routes";
import mowerErrorsRoutes from "./src/routes/mowerErrors.routes";
import incidencesRoutes from "./src/routes/incidences.routes";
import loginRoutes from "./src/routes/login.routes";

import * as db from "./src/db/db";
import NotFoundError from "./src/errors/notFound.error";
import ValidationError from "./src/errors/validation.error";
import DuplicationError from "./src/errors/duplication.error";

declare global {
    namespace Express {
      interface Request {
        userId?: string;
        companyId?: string;
      }
    }
  }


const bodyParser = require("body-parser");

const app = express();

//app.use(express.json());
app.use(bodyParser.json());

app.use(auth.verifyToken);

app.use(robotsRoutes);
app.use(clientsRoutes);
app.use(partsRoutes);
app.use(reapirsRoutes);
app.use(companiesRoutes);
app.use(employeesRoutes);
app.use(tokensRoutes);
app.use(mowerErrorsRoutes);
app.use(incidencesRoutes);
app.use(loginRoutes);

//Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else if (err instanceof ValidationError) {
    res.status(400).send(err.message);
  } else if (err instanceof DuplicationError){
    res.status(409).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
});

db.init();

export default app;

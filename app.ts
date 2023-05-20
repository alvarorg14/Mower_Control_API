import express from "express";

import robotsRoutes from "./src/routes/robots.routes";
import clientsRoutes from "./src/routes/clients.routes";
import partsRoutes from "./src/routes/parts.routes";
import reapirsRoutes from "./src/routes/repairs.routes";
import companiesRoutes from "./src/routes/companies.routes";
import * as db from "./src/db/db";

const bodyParser = require("body-parser");

const app = express();

//app.use(express.json());
app.use(bodyParser.json());

app.use(robotsRoutes);
app.use(clientsRoutes);
app.use(partsRoutes);
app.use(reapirsRoutes);
app.use(companiesRoutes);

db.init();

export default app;

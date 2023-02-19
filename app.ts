import express from "express";

import robotsRoutes from "./src/routes/robots.routes";
import clientsRoutes from "./src/routes/clients.routes";
import modelsRoutes from "./src/routes/models.routes";
import partsRoutes from "./src/routes/parts.routes";
import reapirsRoutes from "./src/routes/repairs.routes";

const bodyParser = require("body-parser");

const app = express();

//app.use(express.json());
app.use(bodyParser.json());

app.use(robotsRoutes);
app.use(clientsRoutes);
app.use(modelsRoutes);
app.use(partsRoutes);
app.use(reapirsRoutes);

export default app;

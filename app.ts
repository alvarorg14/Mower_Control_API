import express from "express";

import robotsRoutes from "./src/routes/robots.routes";

const bodyParser = require("body-parser");

const app = express();

//app.use(express.json());
app.use(bodyParser.json());

app.use(robotsRoutes);

export default app;

import express, { Application } from "express";
import { Server } from "http";
import request, { Response } from "supertest";
import partsRoutes from "../../routes/parts.routes";
import { MySqlContainer } from "testcontainers"

const mysql = require("mysql");
const app: Application = express();
let server: Server;

beforeAll(async () => {
    app.use(partsRoutes);

    const container = await new MySqlContainer().start();
    await mysql.createConnection({
        host: container.getHost(),
        port: container.getPort(),
        user: container.getUsername(),
        password: container.getUserPassword(),
        database: container.getDatabase(),
    });
    server = app.listen(8080);
});

afterAll(() => {
    server.close();
});


describe("Get Parts", () => {
    it ("Returns 200 and empty array with no parts in database", async () => {
        const response : Response = await request(app).get("/parts")
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});



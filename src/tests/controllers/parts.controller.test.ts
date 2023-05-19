import express, { Application } from "express";
import { Server } from "http";
import request, { Response } from "supertest";
import partsRoutes from "../../routes/repairs.routes";
import { close } from "../../db/db";
import { MySqlContainer } from "testcontainers";
import { mockPool } from "../utils/db";

const app: Application = express();
let server: Server;

beforeAll(async () => {
  app.use(partsRoutes);
  const container = await new MySqlContainer().withReuse().start();
  mockPool(container);

  server = app.listen(8080);
});

afterAll(() => {
  close();
  server.close();
});

describe("Get Parts", () => {
  it("Returns 200 and empty array with no parts in database", async () => {
    const response: Response = await request(app).get("/repairs");
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

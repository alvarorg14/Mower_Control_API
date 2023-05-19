import express, { Application } from "express";
import { Server } from "http";
import request, { Response } from "supertest";
import partsRoutes from "../routes/parts.routes";
import * as db from "../db/db";
import { MySqlContainer } from "testcontainers";
import { mockPool } from "./utils/db";
import { Part } from "../models/parts.model";

const app: Application = express();
const bodyParser = require("body-parser");
let server: Server;

beforeAll(async () => {
  app.use(bodyParser.json());
  app.use(partsRoutes);
  const container = await new MySqlContainer().withReuse().start();
  mockPool(container);

  server = app.listen(8080);
});

afterAll(() => {
  db.close();
  server.close();
});

const testPart: Part = {
  reference: "test reference",
  name: "test name",
  description: "test reference",
  stock: 1,
  price: 100,
};

const testPartUpdate: Part = {
  reference: "test updated",
  name: "test updated",
  description: "test updated",
  stock: 10,
  price: 12,
};

const testPartNotValid: Part = {
  reference: "t",
  name: "test name",
  description: "test reference",
  stock: 1,
  price: 100,
};

describe("Get All Parts", () => {
  let partId: string;

  it("Returns 200 and empty array with no parts in database", async () => {
    const response: Response = await request(app).get("/parts");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Returns 200 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");

    partId = response.body.partId;
  });

  it("Returns 200 and array with one part", async () => {
    const response: Response = await request(app).get("/parts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("partId", partId);
    expect(response.body[0]).toHaveProperty("reference", testPart.reference);
    expect(response.body[0]).toHaveProperty("name", testPart.name);
    expect(response.body[0]).toHaveProperty("description", testPart.description);
    expect(response.body[0]).toHaveProperty("stock", testPart.stock);
  });

  it("Returns 500 and message when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response: Response = await request(app).get("/parts");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Test error");
  });

  it("Returns 204 and empty body when deleting part", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});

describe("Get Part By Id", () => {
  let partId: string;

  it("Returns 404 and empty body when getting part by id", async () => {
    const response: Response = await request(app).get(`/parts/${partId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("Returns 201 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");
    partId = response.body.partId;
  });

  it("Returns 200 and part when getting part by id", async () => {
    const response: Response = await request(app).get(`/parts/${partId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId", partId);
    expect(response.body).toHaveProperty("reference", testPart.reference);
    expect(response.body).toHaveProperty("name", testPart.name);
    expect(response.body).toHaveProperty("description", testPart.description);
    expect(response.body).toHaveProperty("stock", testPart.stock);
  });

  it("Returns 500 and message when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response: Response = await request(app).get(`/parts/${partId}`);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Test error");
  });

  it("Returns 204 and empty body when deleting part", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});

describe("Get Part By Reference", () => {
  let partId: string;

  it("Returns 404 and empty body when getting part by reference", async () => {
    const response: Response = await request(app).get(`/parts/reference/${testPart.reference}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("Returns 201 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");
    partId = response.body.partId;
  });

  it("Returns 200 and part when getting part by reference", async () => {
    const response: Response = await request(app).get(`/parts/reference/${testPart.reference}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId", partId);
    expect(response.body).toHaveProperty("reference", testPart.reference);
    expect(response.body).toHaveProperty("name", testPart.name);
    expect(response.body).toHaveProperty("description", testPart.description);
    expect(response.body).toHaveProperty("stock", testPart.stock);
  });

  it("Returns 500 and message when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response: Response = await request(app).get(`/parts/reference/${testPart.reference}`);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Test error");
  });

  it("Returns 204 and empty body when deleting part", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});

describe("Create Part", () => {
  let partId: string;

  it("Returns 201 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");
    expect(response.body).toHaveProperty("reference", testPart.reference);
    expect(response.body).toHaveProperty("name", testPart.name);
    expect(response.body).toHaveProperty("description", testPart.description);
    expect(response.body).toHaveProperty("stock", testPart.stock);
    partId = response.body.partId;
  });

  it("Returns 200 and part when getting part by id", async () => {
    const response: Response = await request(app).get(`/parts/${partId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId", partId);
    expect(response.body).toHaveProperty("reference", testPart.reference);
  });

  it("Returns 409 and message when creating part with the same reference", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(409);
    expect(response.text).toBe("Part with the same reference already exists");
  });

  it("Returns 400 and message when creating part with not valid body", async () => {
    const response: Response = await request(app).post("/parts").send(testPartNotValid);
    expect(response.status).toBe(400);
    expect(response.text).toBe('"reference" length must be at least 3 characters long');
  });

  it("Returns 500 and message when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response: Response = await request(app).post(`/parts`).send(testPart);

    expect(response.status).toBe(500);
    expect(response.text).toBe("An error occurred while creating a part");
  });

  it("Returns 204 and empty body when deleting part", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});

describe("Update Part", () => {
  let partId: string;
  let partId2: string;

  it("Returns 404 and empty body when updating part that not exists", async () => {
    const response: Response = await request(app).put(`/parts/${partId}`).send(testPart);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("Returns 201 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");
    partId = response.body.partId;
  });

  it("Returns 200 and part when updating part", async () => {
    const response: Response = await request(app).put(`/parts/${partId}`).send(testPartUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId", partId);
    expect(response.body).toHaveProperty("reference", testPartUpdate.reference);
    expect(response.body).toHaveProperty("name", testPartUpdate.name);
    expect(response.body).toHaveProperty("description", testPartUpdate.description);
    expect(response.body).toHaveProperty("stock", testPartUpdate.stock);
  });

  it("Returns 200 and part when getting part by id", async () => {
    const response: Response = await request(app).get(`/parts/${partId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId", partId);
    expect(response.body).toHaveProperty("reference", testPartUpdate.reference);
    expect(response.body).toHaveProperty("name", testPartUpdate.name);
    expect(response.body).toHaveProperty("description", testPartUpdate.description);
    expect(response.body).toHaveProperty("stock", testPartUpdate.stock);
  });

  it("Returns 400 and message when updating part with not valid body", async () => {
    const response: Response = await request(app).put(`/parts/${partId}`).send(testPartNotValid);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"reference" length must be at least 3 characters long');
  });

  it("Return 409 and message when updating part with the same reference", async () => {
    const responsePOST: Response = await request(app).post("/parts").send(testPart);
    partId2 = responsePOST.body.partId;

    const response: Response = await request(app).put(`/parts/${partId}`).send(testPart);
    expect(response.status).toBe(409);
    expect(response.text).toBe("Part with the same reference already exists");
  });

  it("Returns 500 and message when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response: Response = await request(app).put(`/parts/${partId}`).send(testPartUpdate);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Test error");
  });

  it("Returns 204 and empty body when deleting both parts", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const response2: Response = await request(app).delete(`/parts/${partId2}`);

    expect(response2.status).toBe(204);
    expect(response2.body).toEqual({});
  });
});

describe("Delete Part", () => {
  let partId: string;

  it("Returns 404 and empty body when deleting part that not exists", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("Returns 201 and part when creating part", async () => {
    const response: Response = await request(app).post("/parts").send(testPart);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("partId");
    partId = response.body.partId;
  });

  it("Returns 204 and empty body when deleting part", async () => {
    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Returns 500 and empty body when error occurs", async () => {
    jest.spyOn(db, "execute").mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    const response: Response = await request(app).delete(`/parts/${partId}`);

    expect(response.status).toBe(500);
    expect(response.text).toEqual("Test error");
  });
});

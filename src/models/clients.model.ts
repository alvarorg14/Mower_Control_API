import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const sql = require("../db/db.ts");

export type Client = {
  clientId?: string;
  name: string;
  address: string;
  phoneNumber: number;
};

//Get all clients from the database
export const getAllClients = (result: (err: any, data: Client[]) => any) => {
  sql.query("SELECT * FROM clients", (err: any, res: any) => {
    if (err) {
      result(err, []);
      return;
    }
    result(null, res);
  });
};

//Get a client by id
export const getClientById = (
  clientId: string,
  result: (err: any, data: Client) => any
) => {
  sql.query(
    "SELECT * FROM clients WHERE clientId = ?",
    clientId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Create a new client
export const createClient = (
  newClient: Client,
  result: (err: any, data: Client) => any
) => {
  newClient.clientId = uuidv4();
  sql.query("INSERT INTO clients SET ?", newClient, (err: any, res: Client) => {
    if (err) {
      result(err, null as any);
      return;
    }
    result(null, newClient);
  });
};

//Update a client
export const updateClient = (
  clientId: string,
  client: Client,
  result: (err: any, data: Client) => any
) => {
  sql.query(
    "UPDATE clients SET name = ?, address = ?, phoneNumber = ? WHERE clientId = ?",
    [client.name, client.address, client.phoneNumber, clientId],
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, client);
    }
  );
};

//Delete a client
export const deleteClient = (
  clientId: string,
  result: (err: any, data: Client) => any
) => {
  sql.query(
    "DELETE FROM clients WHERE clientId = ?",
    clientId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res);
    }
  );
};

//Validate a client
export const validateClient = (client: Client) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(50).required(),
    phoneNumber: Joi.number().min(9).max(9).required(),
  });
  return schema.validate(client);
};

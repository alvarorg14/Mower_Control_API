import { v4 as uuidv4 } from "uuid";
import { Client } from "../models/clients.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get a client by id
export const getById = async (clientId: string): Promise<Client> => {
  const query = "SELECT * FROM clients WHERE clientId = ?";
  const results = await execute<Client[]>(query, [clientId]);
  if (results.length === 0) throw new NotFoundError("Client not found");
  return results[0];
};

//Get clients by company id
export const getByCompanyId = async (companyId: string): Promise<Client[]> => {
  const query = "SELECT * FROM clients WHERE companyId = ?";
  const results = await execute<Client[]>(query, [companyId]);
  return results;
};

//Create a new client
export const create = async (newClient: Client): Promise<Client> => {
  newClient.clientId = uuidv4();
  const query = "INSERT INTO clients SET ?";
  await execute(query, [newClient]);
  return newClient;
};

//Update a client
export const update = async (clientId: string, client: Client): Promise<Client> => {
  const query = "UPDATE clients SET name = ?, address = ?, phoneNumber = ?, companyId = ? WHERE clientId = ?";
  await execute(query, [client.name, client.address, client.phoneNumber, client.companyId, clientId]);
  return client;
};

//Delete a client
export const remove = async (clientId: string): Promise<void> => {
  const query = "DELETE FROM clients WHERE clientId = ?";
  await execute(query, [clientId]);
};

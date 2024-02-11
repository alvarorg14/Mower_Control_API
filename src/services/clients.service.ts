import { Client } from "../models/clients.model";
import * as clientsRepository from "../repositories/clients.repository";
import * as robotsRepository from "../repositories/robots.repository";

export const deleteClient = async (clientId: string): Promise<Client> => {
  //Unassigned mowers from client if they have any
  await robotsRepository.unassignRobotForClient(clientId);
  //Delete the client
  const client = await clientsRepository.getById(clientId);
  await clientsRepository.remove(clientId);
  return client;
};

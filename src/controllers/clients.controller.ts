import { RequestHandler } from "express";
import { Client, validateClient } from "../models/clients.model";
import * as clientsRepository from "../repositories/clients.repository";

//Get all clients
export const getClients: RequestHandler = async (req, res, next) => {
  try {
    const clients = await clientsRepository.getAll();
    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};

//Get a client by id
export const getClientById: RequestHandler = async (req, res, next) => {
  try {
    const client = await clientsRepository.getById(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

//Create a new client
export const createClient: RequestHandler = async (req, res, next) => {
  const newClient: Client = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    validateClient(newClient);
    const client = await clientsRepository.create(newClient);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

//Update a client
export const updateClient: RequestHandler = async (req, res, next) => {
  const newClient: Client = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    await clientsRepository.getById(req.params.id);
    validateClient(newClient);
    newClient.clientId = req.params.id;
    const updatedClient = await clientsRepository.update(req.params.id, newClient);
    res.status(200).json(updatedClient);
  } catch (err) {
    next(err);
  }
};

//Delete a client
export const deleteClient: RequestHandler = async (req, res, next) => {
  try {
    await clientsRepository.getById(req.params.id);
    await clientsRepository.remove(req.params.id);
    res.set("Content-Type", "text/plain");
    res.status(200).send("Client with id " + req.params.id + " deleted successfully.");
  } catch (err) {
    next(err);
  }
};

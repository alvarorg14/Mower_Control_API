import { RequestHandler } from "express";
import { Client } from "../models/clients.model";
import * as sql from "../models/clients.model";

//Get all clients
export const getClients: RequestHandler = async (req, res) => {
  sql.getAllClients((err: any, data: Client[]) => {
    if (err) {
      res.status(500).send("Some error occurred while retrieving clients.");
    } else {
      res.send(data);
    }
  });
};

//Get a client by id
export const getClientById: RequestHandler = async (req, res) => {
  sql.getClientById(req.params.id, (err: any, data: Client) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving the client.");
    } else {
      if (data === undefined) {
        res.status(404).send("Client not found.");
      } else {
        res.send(data);
      }
    }
  });
};

//Create a new client
export const createClient: RequestHandler = async (req, res) => {
  //Validate client
  const clientToValidate: Client = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  let { error } = sql.validateClient(clientToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newClient = clientToValidate;

  sql.createClient(newClient, (err: any, data: Client) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while creating the Client.");
    } else {
      res.send(data);
    }
  });
};

//Update a client
export const updateClient: RequestHandler = async (req, res) => {
  //Validate client
  const clientToValidate: Client = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  let { error } = sql.validateClient(clientToValidate);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const client = clientToValidate;
  client.clientId = req.params.id;

  sql.updateClient(req.params.id, client, (err: any, data: Client) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while updating the Client.");
    } else {
      res.send(data);
    }
  });
};

//Delete a client
export const deleteClient: RequestHandler = async (req, res) => {
  sql.deleteClient(req.params.id, (err: any, data: Client) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while deleting the Client.");
    } else {
      res
        .status(200)
        .send("Client with id " + req.params.id + " deleted successfully.");
    }
  });
};

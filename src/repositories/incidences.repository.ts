import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import { Incidence } from "../models/incidences.model";
import { v4 as uuidv4 } from "uuid";

//Get incidence by id
export const getById = async (incidenceId: string): Promise<Incidence> => {
  const query = "SELECT * FROM incidences WHERE incidenceId = ?";
  const results = await execute<Incidence[]>(query, [incidenceId]);
  if (results.length === 0) throw new NotFoundError("Incidence not found");
  results.forEach((incidence) => {
    if (incidence.readed) incidence.readed = true;
    else incidence.readed = false;
  });
  return results[0];
};

//Get incidences by robotId
export const getByRobotId = async (robotId: string): Promise<Incidence[]> => {
  const query = "SELECT * FROM incidences WHERE robotId = ?";
  const results = await execute<Incidence[]>(query, [robotId]);
  results.forEach((incidence) => {
    if (incidence.readed) incidence.readed = true;
    else incidence.readed = false;
  });
  return results;
};

//Get indicences by readed status
export const getByReadedStatus = async (readed: boolean): Promise<Incidence[]> => {
  const query = "SELECT * FROM incidences WHERE readed = ?";
  const results = await execute<Incidence[]>(query, [readed]);
  results.forEach((incidence) => {
    if (incidence.readed) incidence.readed = true;
    else incidence.readed = false;
  });
  return results;
};

//Create a new incidence
export const create = async (newIncidence: Incidence): Promise<Incidence> => {
  const query = "INSERT INTO incidences SET ?";
  await execute(query, [newIncidence]);
  return newIncidence;
};

//Update read status
export const update = async (incidenceId: string, readed: boolean): Promise<void> => {
  const query = "UPDATE incidences SET readed = ? WHERE incidenceId = ?";
  try {
    await execute(query, [readed, incidenceId]);
  } catch (err) {
    throw new Error("An error occurred while updating read status of an incidence");
  }
};

//Delete an incidence
export const remove = async (incidenceId: string): Promise<void> => {
  const query = "DELETE FROM incidences WHERE incidenceId = ?";
  try {
    await execute(query, [incidenceId]);
  } catch (err) {
    throw new Error("An error occurred while deleting an incidence");
  }
};

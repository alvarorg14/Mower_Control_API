import { Robot } from "../models/robots.model";
import { Mower } from "../models/mowers.model";
import { v4 as uuidv4 } from "uuid";
import { Incidence } from "../models/incidences.model";
import * as mowerErrorsRepository from "../repositories/mowerErrors.repository";
import { MowerError } from "../models/mowerErrors.model";
import NotFoundError from "../errors/notFound.error";
import * as incidencesRepository from "../repositories/incidences.repository";

export const checkIncidence = async (robot: Robot, mower: Mower): Promise<void> => {
  if (mower.errorCode != 0 && robot.errorCode != mower.errorCode && robot.assigned) {
    await createIncidence(robot, mower);
  }
};

const createIncidence = async (robot: Robot, mower: Mower): Promise<void> => {
  const date = mower.errorCodeTimestamp == 0 ? new Date() : new Date(mower.errorCodeTimestamp);
  const message = await getMessage(mower.errorCode);
  const incidence: Incidence = {
    incidenceId: uuidv4(),
    robotId: robot.robotId as string,
    code: mower.errorCode,
    message: message,
    date: date,
    readed: false,
  };

  await incidencesRepository.create(incidence);
};

const getMessage = async (errorCode: number): Promise<string> => {
  let error: MowerError;

  try {
    error = await mowerErrorsRepository.getByCode(errorCode);
  } catch (err) {
    if (err instanceof NotFoundError) {
      error = await mowerErrorsRepository.getByCode(0);
    } else {
      throw err;
    }
  }
  return error.message;
};

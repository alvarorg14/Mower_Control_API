require("dotenv").config();
import * as tokensRepository from "../repositories/tokens.repository";
import * as robotsRepository from "../repositories/robots.repository";
import * as companiesRepository from "../repositories/companies.repository";
import * as incidencesService from "./incidences.service";
import * as modelsRepository from "../repositories/models.repository";
import { Mower } from "../models/mowers.model";
import { Token } from "../models/tokens.model";
import { Robot } from "../models/robots.model";
import { Company } from "../models/companies.model";
import NotFoundError from "../errors/notFound.error";
import { Model } from "../models/models.model";
const fetch = require("node-fetch");

export const updateRobots = async () => {
  const companies: Company[] = await companiesRepository.getAll();
  for (const company of companies) {
    await updateRobotsByCompany(company.companyId as string);
  }
};

export const updateRobotsByCompany = async (companyId: string) => {
  const token: Token = await tokensRepository.getByCompanyId(companyId);
  //const mowers: Mower[] = await getMowers(token.accessToken);
  const mowers: Mower[] = getFakeMowers();
  await updateMowers(mowers, companyId);
};

const updateMowers = async (mowers: Mower[], companyId: string) => {
  for (const mower of mowers) {
    try {
      const robot: Robot = await robotsRepository.getByIdOrSerialNumber(mower.id, mower.serialNumber);
      await updateRobot(robot, mower);
    } catch (err) {
      if (err instanceof NotFoundError) {
        await createRobot(mower, companyId);
      } else {
        throw err;
      }
    }
  }
};

const createRobot = async (mower: Mower, companyId: string) => {
  const modelId = await getMowerId(mower.model);

  const robot: Robot = {
    robotId: mower.id,
    serialNumber: mower.serialNumber,
    name: mower.name,
    battery: mower.battery,
    mode: mower.mode,
    activity: mower.activity,
    state: mower.state,
    errorCode: mower.errorCode,
    errorCodeTimestamp: mower.errorCodeTimestamp,
    assigned: false,
    modelId: modelId,
    clientId: null,
    employeeId: null,
    companyId: companyId,
  };
  await robotsRepository.create(robot);
};

const updateRobot = async (robot: Robot, mower: Mower) => {
  await incidencesService.checkIncidence(robot, mower);

  robot.name = mower.name;
  robot.battery = mower.battery;
  robot.mode = mower.mode;
  robot.activity = mower.activity;
  robot.state = mower.state;
  robot.errorCode = mower.errorCode;
  robot.errorCodeTimestamp = mower.errorCodeTimestamp;
  await robotsRepository.update(robot);
};

const getMowers = async (access_token: string): Promise<Mower[]> => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "X-Api-Key": process.env.HUSQVARNA_CLIENT_ID,
      "Authorization-Provider": "husqvarna",
    },
  };

  const mowerResponse = await fetch(process.env.HUSQVARNA_API_URL, requestOptions).then((response: any) => response.json());

  const mowers: Mower[] = mapResponseToMowers(mowerResponse);

  return mowers;
};

const getFakeMowers = (): Mower[] => {
  const fakeData = require("../../data/Response_Data.json");
  const mowers: Mower[] = mapResponseToMowers(fakeData);
  return mowers;
};

const mapResponseToMowers = (mowerResponse: any): Mower[] => {
  const data = mowerResponse.data;
  const mowers: Mower[] = data.map((mower: any) => {
    return {
      id: mower.id,
      name: mower.attributes.system.name,
      model: mapModelName(mower.attributes.system.model),
      serialNumber: mower.attributes.system.serialNumber,
      battery: mower.attributes.battery.batteryPercent || 0,
      mode: mower.attributes.mower.mode || "UNKNOWN",
      activity: mower.attributes.mower.activity || "UNKNOWN",
      state: mower.attributes.mower.state || "UNKNOWN",
      errorCode: mower.attributes.mower.errorCode || 0,
      errorCodeTimestamp: mower.attributes.mower.errorCodeTimestamp || 0,
    };
  });

  return mowers;
};

const mapModelName = (model: string): string => {
  const nameParts: string[] = model.split(" ");
  if (nameParts.length == 4) {
    return nameParts[2] + " " + nameParts[3];
  } else if (nameParts.length == 3) {
    return nameParts[2];
  } else {
    return "UNKNOWN";
  }
};

const getMowerId = async (modelName: string): Promise<string> => {
  const model: Model = await modelsRepository.getByName(modelName);
  return model.modelId as string;
};

import { Repair, RepairPart, validateRepair, validateRepairPart } from "../models/repairs.model";
import { v4 as uuidv4 } from "uuid";
import * as repairsRepository from "../repositories/repairs.repository";
import * as repairPartsRepository from "../repositories/repairParts.repository";

//Create a new repair
export const createRepair = async (body: any, employeeId: string, robotId: string): Promise<Repair> => {
  let repairParts: RepairPart[] = [];
  if (body.repairParts) {
    repairParts = body.repairParts;
    repairParts.forEach((repairPart) => validateRepairPart(repairPart));
  }

  const repair: Repair = {
    repairId: uuidv4(),
    title: body.title,
    description: body.description,
    workingHours: body.workingHours,
    date: new Date(Date.now()),
    robotId: robotId,
    employeeId: employeeId,
    repairParts: repairParts,
  };

  validateRepair(repair);

  await repairsRepository.create(repair);

  repairParts.forEach(async (repairPart) => {
    await repairPartsRepository.create(repair.repairId as string, repairPart);
  });
  return repair;
};

export const getRepairsByRobotId = async (robotId: string): Promise<Repair[]> => {
    const repairs: Repair[] = await repairsRepository.getByRobotId(robotId);

    //Get repair parts for each repair
    repairs.forEach(async (repair) => {
        repair.repairParts = await repairPartsRepository.getByRepairId(repair.repairId as string);
        }

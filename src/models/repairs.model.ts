import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const sql = require("../db/db.ts");

//Repair model
export type Repair = {
  repairId?: string;
  title: string;
  description: string;
  workingHours: number;
  date: Date;
  robotId: string;
};

//Get all repairs
export const getAllRepairs = (result: (err: any, data: Repair[]) => any) => {
  sql.query("SELECT * FROM repairs", (err: any, res: any) => {
    if (err) {
      result(err, []);
      return;
    }
    result(null, res);
  });
};

//Get a repair by id
export const getRepairById = (
  repairId: string,
  result: (err: any, data: Repair) => any
) => {
  sql.query(
    "SELECT * FROM repairs WHERE repairId = ?",
    repairId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res[0]);
    }
  );
};

//Get repairs by robotId
export const getRepairsByRobotId = (
  robotId: string,
  result: (err: any, data: Repair[]) => any
) => {
  sql.query(
    "SELECT * FROM repairs WHERE robotId = ?",
    robotId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res);
    }
  );
};

//Create a repair
export const createRepair = (
  newRepair: Repair,
  result: (err: any, data: Repair) => any
) => {
  newRepair.repairId = uuidv4();
  sql.query("INSERT INTO repairs SET ?", newRepair, (err: any, res: any) => {
    if (err) {
      result(err, null as any);
      return;
    }
    result(null, newRepair);
  });
};

//Update a repair
export const updateRepair = (
  repairId: string,
  repair: Repair,
  result: (err: any, data: Repair) => any
) => {
  sql.query(
    "UPDATE repairs SET title = ?, description = ?, workingHours = ?, date = ?, robotId = ? WHERE repairId = ?",
    [
      repair.title,
      repair.description,
      repair.workingHours,
      repair.date,
      repair.robotId,
      repairId,
    ],
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, repair);
    }
  );
};

//Delete a repair
export const deleteRepair = (
  repairId: string,
  result: (err: any, data: Repair) => any
) => {
  sql.query(
    "DELETE FROM repairs WHERE repairId = ?",
    repairId,
    (err: any, res: any) => {
      if (err) {
        result(err, null as any);
        return;
      }
      result(null, res);
    }
  );
};

//Validate a repair
export const validateRepair = (repair: Repair) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    workingHours: Joi.number().min(0).required(),
    date: Joi.date().iso().required(),
    robotId: Joi.string().uuid().required(),
  });
  return schema.validate(repair);
};

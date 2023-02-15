import { v4 as uuidv4 } from "uuid";

const sql = require("../db/db.ts");

export type Robot = {
  robotId?: string;
  serialNumber: number;
  name: string;
  battery: number;
  mode: string;
  activity: string;
  state: string;
  errorCode: number;
  clientId: string;
  modelId: string;
};

//Get all robots from the database
export const getAllRobots = (result: (err: any, data: Robot[]) => any) => {
  sql.query("SELECT * FROM robots", (err: any, res: any) => {
    if (err) {
      result(err, []);
      return;
    }
    console.log("robots: ", res);
    result(null, res);
  });
};

export const getRobotById = (
  robotId: string,
  result: (err: any, data: Robot[]) => any
) => {
  sql.query(
    "SELECT * FROM robots WHERE robotId = ?",
    robotId,
    (err: any, res: any) => {
      if (err) {
        result(err, []);
        return;
      }
      console.log("robots: ", res);
      result(null, res);
    }
  );
};

//Create a new robot
export const createRobot = (
  newRobot: Robot,
  result: (err: any, data: Robot) => any
) => {
  newRobot.robotId = uuidv4();
  sql.query("INSERT INTO robots SET ?", newRobot, (err: any, res: any) => {
    if (err) {
      result(err, null as any);
      return;
    }
    result(null, newRobot);
  });
};

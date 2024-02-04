import { Client } from "./clients.model";
import { Employee } from "./employees.model";
import { Model } from "./models.model";

export type Robot = {
  robotId?: string;
  serialNumber: number;
  name: string;
  battery: number;
  mode: string;
  activity: string;
  state: string;
  errorCode: number;
  errorCodeTimestamp: number;
  assigned: boolean;
  modelId: string;
  clientId: string | null;
  employeeId: string | null;
  companyId: string;
};

export type RobotComplete = {
  robotId?: string;
  serialNumber: number;
  name: string;
  battery: number;
  mode: string;
  activity: string;
  state: string;
  errorCode: number;
  errorCodeTimestamp: number;
  assigned: boolean;
  model: Model;
  client: Client | null;
  employee: Employee | null;
  companyId: string;
};

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

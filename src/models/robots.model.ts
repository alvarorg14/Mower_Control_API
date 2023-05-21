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
  clientId: string | null;
  model: string;
  assignedToClient: boolean;
};

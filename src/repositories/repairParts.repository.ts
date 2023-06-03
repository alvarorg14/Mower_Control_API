import { execute } from "../db/db";
import { RepairPart } from "../models/repairs.model";

//Create a new repair part
export const create = async (repairId: string, repairPart: RepairPart): Promise<RepairPart> => {
  const query = "INSERT INTO repairParts SET ?";
  await execute(query, [{ repairId: repairId, partId: repairPart.partId, quantity: repairPart.quantity, price: repairPart.price }]);
  return repairPart;
};

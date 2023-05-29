import { execute } from "../db/db";

//Create a new company part
export const create = async (companyPart: any): Promise<void> => {
  const query = "INSERT INTO companyParts SET ?";
  await execute(query, [companyPart]);
};

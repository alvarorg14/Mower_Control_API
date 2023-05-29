import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get by model id and part id
export const getByModelIdAndPartId = async (modelId: string, partId: string): Promise<any> => {
  const query = "SELECT * FROM modelParts WHERE modelId = ? AND partId = ?";
  const results = await execute<any[]>(query, [modelId, partId]);
  if (results.length === 0) throw new NotFoundError("Model part not found");
  return results[0];
};

export const create = async (modelId: string, partId: string): Promise<void> => {
  const query = "INSERT INTO modelParts SET ?";
  await execute(query, [{ modelId, partId }]);
};

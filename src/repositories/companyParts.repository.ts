import { execute } from "../db/db";

//Create a new company part
export const create = async (companyPart: any): Promise<void> => {
  const query = "INSERT INTO companyParts SET ?";
  await execute(query, [companyPart]);
};

//Modify the stock of a company part
export const updateStock = async (partId: string, companyId: string, quantity: number): Promise<void> => {
  const query = "UPDATE companyParts SET stock = stock + ? WHERE partId = ? AND companyId = ?";
  await execute(query, [quantity, partId, companyId]);
};

//Modify the location of a company part
export const updateLocation = async (partId: string, companyId: string, location: string): Promise<void> => {
  const query = "UPDATE companyParts SET location = ? WHERE partId = ? AND companyId = ?";
  await execute(query, [location, partId, companyId]);
};

//Modify the price of a company part
export const updatePrice = async (partId: string, defaultPrice: boolean, companyId: string, price: number): Promise<void> => {
  const query = "UPDATE companyParts SET price = ?, defaultPrice = ? WHERE partId = ? AND companyId = ?";
  await execute(query, [price, defaultPrice, partId, companyId]);
};

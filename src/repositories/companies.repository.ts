import { v4 as uuidv4 } from "uuid";
import { Company } from "../models/companies.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";

//Get all companies
export const getAll = async (): Promise<Company[]> => {
  const query = "SELECT * FROM companies";
  const results = await execute<Company[]>(query, []);
  return results;
};

//Get a company by id
export const getById = async (companyId: string): Promise<Company> => {
  const query = "SELECT * FROM companies WHERE companyId = ?";
  const results = await execute<Company[]>(query, [companyId]);
  if (results.length === 0) throw new NotFoundError("Company not found");
  return results[0];
};

//Create a new company
export const create = async (newCompany: Company): Promise<Company> => {
  newCompany.companyId = uuidv4();
  const query = "INSERT INTO companies SET ?";
  try {
    await execute(query, [newCompany]);
    return newCompany;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Company with the same CIF already exists");
    } else {
      throw new Error("An error occurred while creating a company");
    }
  }
};

//Delete a company
export const remove = async (companyId: string): Promise<void> => {
  const query = "DELETE FROM companies WHERE companyId = ?";
  await execute(query, [companyId]);
};

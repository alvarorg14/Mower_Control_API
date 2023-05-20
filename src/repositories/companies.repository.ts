import { v4 as uuidv4 } from "uuid";
import { Company } from "../models/companies.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";

//Get all companies from the database
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

//Get a company by CIF
export const getByCIF = async (CIF: string): Promise<Company> => {
  const query = "SELECT * FROM companies WHERE CIF = ?";
  const results = await execute<Company[]>(query, [CIF]);
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

//Update a company
export const update = async (companyId: string, company: Company): Promise<Company> => {
  const query = "UPDATE companies SET name = ?, CIF = ? WHERE companyId = ?";
  try {
    await execute(query, [company.name, company.CIF, companyId]);
    return company;
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

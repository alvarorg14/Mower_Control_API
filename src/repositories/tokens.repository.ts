import { Token } from "../models/tokens.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";

//Get all tokens from the database
export const getAll = async (): Promise<Token[]> => {
  const query = "SELECT * FROM tokens";
  const results = await execute<Token[]>(query, []);
  return results;
};

//Get a token by employeeId
export const getById = async (employeeId: string): Promise<Token> => {
  const query = "SELECT * FROM tokens WHERE employeeId = ?";
  const results = await execute<Token[]>(query, [employeeId]);
  if (results.length === 0) throw new NotFoundError("Employee token not found");
  return results[0];
};

//Get a token by companyId, the token is from the employee with role admin from that company
export const getByCompanyId = async (companyId: string): Promise<Token> => {
  const query =
    "SELECT accessToken FROM tokens JOIN employees ON tokens.employeeId = employees.employeeId" +
    " WHERE employees.role = 'admin' AND employees.companyId = ?";
  const results = await execute<Token[]>(query, [companyId]);
  if (results.length === 0) throw new NotFoundError("Company token not found");
  if (results.length > 1) throw new Error("More than one token found for the company with id " + companyId);
  return results[0];
};

//Create a new token
export const create = async (newToken: Token): Promise<Token> => {
  const query = "INSERT INTO tokens SET ?";
  await execute(query, [newToken]);
  return newToken;
};

//Update a token
export const update = async (employeeId: string, token: Token): Promise<Token> => {
  const query = "UPDATE tokens SET accessToken = ?, refreshToken = ? WHERE employeeId = ?";
  await execute(query, [token.accessToken, token.refreshToken, employeeId]);
  return token;
};

//Delete a token
export const remove = async (employeeId: string): Promise<void> => {
  const query = "DELETE FROM tokens WHERE employeeId = ?";
  await execute(query, [employeeId]);
};

import { v4 as uuidv4 } from "uuid";
import { Employee } from "../models/employees.model";
import { execute } from "../db/db";
import NotFoundError from "../errors/notFound.error";
import DuplicationError from "../errors/duplication.error";

//Get all employees from the database
export const getAll = async (): Promise<Employee[]> => {
  const query = "SELECT * FROM employees";
  const results = await execute<Employee[]>(query, []);
  return results;
};

//Get an employee by id
export const getById = async (employeeId: string): Promise<Employee> => {
  const query = "SELECT * FROM employees WHERE employeeId = ?";
  const results = await execute<Employee[]>(query, [employeeId]);
  if (results.length === 0) throw new NotFoundError("Employee not found");
  return results[0];
};

//Get an employee by username
export const getByUsername = async (username: string): Promise<Employee> => {
  const query = "SELECT * FROM employees WHERE username = ?";
  const results = await execute<Employee[]>(query, [username]);
  if (results.length === 0) throw new NotFoundError("Employee not found");
  return results[0];
};

//Get employees by companyId
export const getByCompanyId = async (companyId: string): Promise<Employee[]> => {
  const query = "SELECT * FROM employees WHERE companyId = ?";
  const results = await execute<Employee[]>(query, [companyId]);
  return results;
};

//Get admin employee of a company
export const getAdminByCompanyId = async (companyId: string): Promise<Employee> => {
  const query = "SELECT * FROM employees WHERE companyId = ? AND role = 'admin'";
  const results = await execute<Employee[]>(query, [companyId]);
  if (results.length === 0) throw new NotFoundError("Admin employee not found");
  return results[0];
};

//Create a new employee
export const create = async (newEmployee: Employee): Promise<Employee> => {
  newEmployee.employeeId = uuidv4();
  const query = "INSERT INTO employees SET ?";
  try {
    await execute(query, [newEmployee]);
    return newEmployee;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Employee with the same username already exists");
    } else {
      throw new Error("An error occurred while creating an employee");
    }
  }
};

//Update an employee
export const update = async (employeeId: string, employee: Employee): Promise<Employee> => {
  const query = "UPDATE employees SET name = ?, username = ?, password = ?, role = ?, companyId = ? WHERE employeeId = ?";
  try {
    await execute(query, [employee.name, employee.username, employee.password, employee.role, employee.companyId, employeeId]);
    return employee;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new DuplicationError("Employee with the same username already exists");
    } else {
      throw new Error("An error occurred while creating an employee");
    }
  }
};

//Delete an employee
export const remove = async (employeeId: string): Promise<void> => {
  const query = "DELETE FROM employees WHERE employeeId = ?";
  await execute(query, [employeeId]);
};

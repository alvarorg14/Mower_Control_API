import { generateUsername, reformatName } from "../helpers/username.helper";
import { generatePassword } from "../helpers/password.helper";
import { Employee, validateEmployee, Role } from "../models/employees.model";
import * as employeesRepository from "../repositories/employees.repository";
import * as robotRepository from "../repositories/robots.repository";
import ValidationError from "../errors/validation.error";
const bcrypt = require("bcryptjs");

export const createEmployeeForCompany = async (name: string, surname1: string, surname2: string, companyId: string): Promise<Employee> => {
  if (name === null || name === undefined || name.trim() === "" || surname1 === null || surname1 === undefined || surname1.trim() === "") {
    throw new ValidationError("Name and surname are required");
  }

  const username = await generateUsername(name, surname1, surname2);
  const password = generatePassword();
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newEmployee: Employee = {
    name: name,
    surname1: surname1,
    surname2: surname2,
    username: username,
    password: encryptedPassword,
    role: Role.STANDARD,
    companyId: companyId,
  };

  validateEmployee(newEmployee);
  const employee = await employeesRepository.create(newEmployee);
  employee.password = password;

  return employee;
};

export const deleteEmployee = async (employeeId: string): Promise<Employee> => {
  await robotRepository.unassignRobotForEmployee(employeeId);
  const employee = await employeesRepository.getById(employeeId);
  await employeesRepository.remove(employeeId);
  return employee;
};

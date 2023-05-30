import { RequestHandler } from "express";
import * as companiesRepository from "../repositories/companies.repository";
import * as employeesRepository from "../repositories/employees.repository";
import * as partsService from "../services/parts.service";
import { Company, validateCompany } from "../models/companies.model";
import { Employee, validateEmployee, Role } from "../models/employees.model";
import { generateAccessToken } from "../helpers/jwt.helper";
const bcrypt = require("bcryptjs");

export const signUpCompany: RequestHandler = async (req, res, next) => {
  const { companyName, cif, username, password, name } = req.body;
  //TODO: validate password

  let company: Company;
  try {
    const newCompany: Company = {
      name: companyName,
      CIF: cif,
    };

    validateCompany(newCompany);
    company = await companiesRepository.create(newCompany);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newEmployee: Employee = {
      name: name,
      username: username,
      password: encryptedPassword,
      role: Role.ADMIN,
      companyId: company.companyId as string,
    };

    validateEmployee(newEmployee);
    const employee = await employeesRepository.create(newEmployee);
    const token = generateAccessToken(employee);
    await partsService.initializePartsForCompany(company.companyId as string);
    await res.status(201).json({ id: employee.employeeId, token: token });
  } catch (err) {
    await removeCompanyIfEmployeeCreationFails(company!);
    next(err);
  }
};

const removeCompanyIfEmployeeCreationFails = async (company: Company) => {
  if (company != null) {
    await companiesRepository.remove(company.companyId as string);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const employee = await employeesRepository.getByUsername(username);

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) {
      res.status(400).send("Invalid username or password");
      return;
    }

    const token = generateAccessToken(employee);
    res.status(200).json({ id: employee.employeeId, token: token });
  } catch (err) {
    next(err);
  }
};

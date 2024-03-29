import { RequestHandler } from "express";
import { Employee, validateEmployee, Role } from "../models/employees.model";
import * as employeesRepository from "../repositories/employees.repository";
import * as companiesRepository from "../repositories/companies.repository";
import ValidationError from "../errors/validation.error";
import { checkCompany, checkEmployeeIsFromCompany } from "../helpers/security.helper";
import * as employeesService from "../services/employees.service";
const bcrypt = require("bcryptjs");

//Get an employee by id
export const getEmployeeById: RequestHandler = async (req, res, next) => {
  try {
    await checkEmployeeIsFromCompany(req.params.id, req.companyId as string);
    const employee = await employeesRepository.getById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

//Get employees by companyId
export const getEmployeesByCompanyId: RequestHandler = async (req, res, next) => {
  try {
    await checkCompany(req.params.companyId, req.companyId as string);
    const employees = await employeesRepository.getByCompanyId(req.params.companyId);
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

//Create a new employee
export const createEmployeeForCompany: RequestHandler = async (req, res, next) => {
  try {
    await checkCompany(req.params.id, req.companyId as string);
    const employee = await employeesService.createEmployeeForCompany(req.body.name, req.body.surname1, req.body.surname2, req.params.id);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const employee = await employeesRepository.getById(req.userId as string);
    const validPassword = await bcrypt.compare(req.body.oldPassword, employee.password);
    if (!validPassword) {
      throw new ValidationError("Invalid password");
    }

    const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
    employee.password = encryptedPassword;
    await employeesRepository.update(req.userId as string, employee);
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

//Update an employee
export const updateEmployee: RequestHandler = async (req, res, next) => {
  const updatedEmployee: Employee = {
    name: req.body.name,
    surname1: req.body.surname1,
    surname2: req.body.surname2,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    companyId: req.companyId as string,
  };

  try {
    await checkEmployeeIsFromCompany(req.params.id, req.companyId as string);
    await companiesRepository.getById(updatedEmployee.companyId);
    await employeesRepository.getById(req.params.id);
    validateEmployee(updatedEmployee);
    updatedEmployee.employeeId = req.params.id;
    const employee = await employeesRepository.update(req.params.id, updatedEmployee);
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

//Delete an employee
export const deleteEmployee: RequestHandler = async (req, res, next) => {
  try {
    await checkEmployeeIsFromCompany(req.params.id, req.companyId as string);
    await employeesRepository.getById(req.params.id);
    await employeesService.deleteEmployee(req.params.id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

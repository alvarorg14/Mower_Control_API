import { RequestHandler } from "express";
import { Employee, validateEmployee } from "../models/employees.model";
import * as employeesRepository from "../repositories/employees.repository";
import * as companiesRepository from "../repositories/companies.repository";
import NotFoundError from "../errors/notFound.error";
import ValidationError from "../errors/validation.error";
import DuplicationError from "../errors/duplication.error";

//Get all employees
export const getEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeesRepository.getAll();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get an employee by id
export const getEmployeeById: RequestHandler = async (req, res, next) => {
  try {
    const employee = await employeesRepository.getById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }  
};

//Get employees by companyId
export const getEmployeesByCompanyId: RequestHandler = async (req, res) => {
  try {
    const employees = await employeesRepository.getByCompanyId(req.params.companyId);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Create a new employee
export const createEmployee: RequestHandler = async (req, res) => {
  const newEmployee: Employee = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    companyId: req.body.companyId,
  };

  try {
    await companiesRepository.getById(newEmployee.companyId);
    validateEmployee(newEmployee);
    const employee = await employeesRepository.create(newEmployee);
    res.status(201).json(employee);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof DuplicationError) {
      res.status(409).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Update an employee
export const updateEmployee: RequestHandler = async (req, res) => {
  const updatedEmployee: Employee = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    companyId: req.body.companyId,
  };

  try {
    await companiesRepository.getById(updatedEmployee.companyId);
    await employeesRepository.getById(req.params.id);
    validateEmployee(updatedEmployee);
    updatedEmployee.employeeId = req.params.id;
    const employee = await employeesRepository.update(req.params.id, updatedEmployee);
    res.status(200).json(employee);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.message);
    } else if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

//Delete an employee
export const deleteEmployee: RequestHandler = async (req, res) => {
  try {
    await employeesRepository.getById(req.params.id);
    await employeesRepository.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

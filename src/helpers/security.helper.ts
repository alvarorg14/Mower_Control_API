import ForbiddenError from "../errors/forbidden.error";
import { Robot } from "../models/robots.model";
import { Role } from "../models/employees.model";
import * as robotsRepository from "../repositories/robots.repository";
import * as employeesRepository from "../repositories/employees.repository";

export const checkRobotIsFromCompanyOrEmployee = async (robotId: string, companyId: any, userId: any, role: any) => {
  try {
    const robot: Robot = await robotsRepository.getById(robotId);
    if (role === Role.STANDARD && robot.employeeId !== userId) {
      throw new ForbiddenError("Unauthorized");
    } else if (role === Role.ADMIN && robot.companyId !== companyId) {
      throw new ForbiddenError("Forbidden");
    }
  } catch (err) {
    throw new ForbiddenError("Forbidden");
  }
};

export const checkCompany = async (companyId: string, requestCompanyId: any) => {
  if (companyId !== requestCompanyId) {
    throw new ForbiddenError("Forbidden");
  }
};

export const checkEmployee = async (employeeId: string, requestCompanyId: any) => {
  if (employeeId !== requestCompanyId) {
    throw new ForbiddenError("Forbidden");
  }
};

export const checkEmployeeIsFromCompany = async (employeeId: string, companyId: any) => {
  try {
    const employee = await employeesRepository.getById(employeeId);
    if (employee.companyId !== companyId) {
      throw new ForbiddenError("Forbidden");
    }
  } catch (err) {
    throw new ForbiddenError("Forbidden");
  }
};

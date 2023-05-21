require("dotenv").config();
import * as jwt from "jsonwebtoken";
import { Employee } from "../models/employees.model";

export const generateAccessToken = (employee: Employee) => {
  const payload = {
    id: employee.employeeId,
    role: employee.role,
  };

  const options = {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, options);
};

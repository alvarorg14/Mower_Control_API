import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../models/employees.model";

const excludedPaths = ["/login", "/signup"];

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
  if (excludedPaths.includes(request.path)) {
    next();
    return;
  }

  const token = request.headers["authorization"] as string;
  if (!token) {
    return response.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    request.userId = decoded.id;
    request.companyId = decoded.companyId;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyAdminRole = async (request: Request, response: Response, next: NextFunction) => {
  if (excludedPaths.includes(request.path)) {
    next();
    return;
  }

  const token = request.headers["authorization"] as string;
  if (!token) {
    return response.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (decoded.role !== Role.ADMIN) {
      return response.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: "Unauthorized" });
  }
};

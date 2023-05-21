import express, { Router } from "express";
import * as employeesController from "../controllers/employees.controller";
import { verifyAdminRole } from "../middleware/auth";

const api: Router = express.Router();

api.get("/employees", employeesController.getEmployees);
api.get("/employees/:id", employeesController.getEmployeeById);
api.get("/employees/company/:companyId", employeesController.getEmployeesByCompanyId);
api.post("/employees", verifyAdminRole, employeesController.createEmployee);
api.put("/employees/password", employeesController.updatePassword);
api.put("/employees/:id", employeesController.updateEmployee);
api.delete("/employees/:id", employeesController.deleteEmployee);

export default api;

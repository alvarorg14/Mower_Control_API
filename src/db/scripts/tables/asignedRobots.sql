CREATE TABLE asignedRobots (
	robotId varchar(100) NOT NULL,
	employeeId varchar(100) NOT NULL,
	CONSTRAINT asignedRobots_pk PRIMARY KEY (robotId,employeeId),
	CONSTRAINT asignedRobots_robots_FK FOREIGN KEY (robotId) REFERENCES mowercontrol.robots(robotId),
	CONSTRAINT asignedRobots_employees_FK FOREIGN KEY (employeeId) REFERENCES mowercontrol.employees(employeeId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

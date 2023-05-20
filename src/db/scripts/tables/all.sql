CREATE TABLE clients (
	clientId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	address varchar(100) NOT NULL,
	phoneNumber INT NOT NULL,
	CONSTRAINT clients_pk PRIMARY KEY (clientId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE robots (
	robotId varchar(100) NOT NULL,
	serialNumber INT NOT NULL,
	name varchar(100) NOT NULL,
	battery INT NULL,
	mode varchar(100) NOT NULL,
	activity varchar(100) NOT NULL,
	state varchar(100) NOT NULL,
	errorCode INT NOT NULL,
	model varchar(100) NOT NULL,
	clientId varchar(100) NOT NULL,
	CONSTRAINT robots_pk PRIMARY KEY (robotId),
	CONSTRAINT robots_un UNIQUE KEY (serialNumber),
    CONSTRAINT robots_clients_FK FOREIGN KEY (clientId) REFERENCES clients(clientId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE companies (
	companyId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	CIF varchar(100) NOT NULL,
	CONSTRAINT companies_pk PRIMARY KEY (companyId)
	CONSTRAINT companies_un UNIQUE (CIF)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE employees (
	employeeId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	companyId varchar(100) NOT NULL,
	CONSTRAINT employees_pk PRIMARY KEY (employeeId),
	CONSTRAINT employees_FK FOREIGN KEY (companyId) REFERENCES companies(companyId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE parts (
	partId varchar(100) NOT NULL,
	reference varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	description varchar(100) NOT NULL,
	stock INT NOT NULL,
	price DOUBLE NOT NULL,
	CONSTRAINT parts_pk PRIMARY KEY (partId),
	CONSTRAINT parts_un UNIQUE KEY (reference)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE repairs (
	repairId varchar(100) NOT NULL,
	title varchar(100) NOT NULL,
	description varchar(500) NOT NULL,
	workingHours INT NOT NULL,
	`date` DATETIME NOT NULL,
	robotId varchar(100) NOT NULL,
	CONSTRAINT repairs_pk PRIMARY KEY (repairId),
	CONSTRAINT repairs_FK FOREIGN KEY (robotId) REFERENCES robots(robotId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE repairParts (
	partId varchar(100) NOT NULL,
	repairId varchar(100) NOT NULL,
	quantity INT NOT NULL,
	price DOUBLE NOT NULL,
	CONSTRAINT repairParts_pk PRIMARY KEY (partId,repairId),
	CONSTRAINT repairParts_repairs_FK FOREIGN KEY (repairId) REFERENCES repairs(repairId),
	CONSTRAINT repairParts_parts_FK FOREIGN KEY (partId) REFERENCES parts(partId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE asignedRobots (
	robotId varchar(100) NOT NULL,
	employeeId varchar(100) NOT NULL,
	CONSTRAINT asignedRobots_pk PRIMARY KEY (robotId,employeeId),
	CONSTRAINT asignedRobots_robots_FK FOREIGN KEY (robotId) REFERENCES robots(robotId),
	CONSTRAINT asignedRobots_employees_FK FOREIGN KEY (employeeId) REFERENCES employees(employeeId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

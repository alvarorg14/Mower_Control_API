CREATE TABLE mowercontrol.clients (
	clientId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	address varchar(100) NOT NULL,
	phoneNumber INT NOT NULL,
	CONSTRAINT clients_pk PRIMARY KEY (clientId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.models (
	modelId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	surface INT NOT NULL,
	maxHours INT NOT NULL,
	CONSTRAINT models_pk PRIMARY KEY (modelId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.robots (
	robotId varchar(100) NOT NULL,
	serialNumber INT NOT NULL,
	name varchar(100) NOT NULL,
	battery INT NULL,
	mode varchar(100) NOT NULL,
	activity varchar(100) NOT NULL,
	state varchar(100) NOT NULL,
	errorCode INT NOT NULL,
	modelId varchar(100) NOT NULL,
	clientId varchar(100) NOT NULL,
	CONSTRAINT robots_pk PRIMARY KEY (robotId),
	CONSTRAINT robots_un UNIQUE KEY (serialNumber),
    CONSTRAINT robots_models_FK FOREIGN KEY (modelId) REFERENCES mowercontrol.models(modelId),
    CONSTRAINT robots_clients_FK FOREIGN KEY (clientId) REFERENCES mowercontrol.clients(clientId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.companies (
	companyId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT companies_pk PRIMARY KEY (companyId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE mowercontrol.employees (
	employeeId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	companyId varchar(100) NOT NULL,
	CONSTRAINT employees_pk PRIMARY KEY (employeeId),
	CONSTRAINT employees_FK FOREIGN KEY (companyId) REFERENCES mowercontrol.companies(companyId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.parts (
	partId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	description varchar(100) NOT NULL,
	stock INT NOT NULL,
	price DOUBLE NOT NULL,
	CONSTRAINT parts_pk PRIMARY KEY (partId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.repairs (
	repairId varchar(100) NOT NULL,
	title varchar(100) NOT NULL,
	description varchar(500) NOT NULL,
	workingHours INT NOT NULL,
	`date` DATE NOT NULL,
	robotId varchar(100) NOT NULL,
	CONSTRAINT repairs_pk PRIMARY KEY (repairId),
	CONSTRAINT repairs_FK FOREIGN KEY (robotId) REFERENCES mowercontrol.robots(robotId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE mowercontrol.repairParts (
	partId varchar(100) NOT NULL,
	repairId varchar(100) NOT NULL,
	quantity INT NOT NULL,
	price DOUBLE NOT NULL,
	CONSTRAINT repairParts_pk PRIMARY KEY (partId,repairId),
	CONSTRAINT repairParts_repairs_FK FOREIGN KEY (repairId) REFERENCES mowercontrol.repairs(repairId),
	CONSTRAINT repairParts_parts_FK FOREIGN KEY (partId) REFERENCES mowercontrol.parts(partId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE mowercontrol.asignedRobots (
	robotId varchar(100) NOT NULL,
	employeeId varchar(100) NOT NULL,
	CONSTRAINT asignedRobots_pk PRIMARY KEY (robotId,employeeId),
	CONSTRAINT asignedRobots_robots_FK FOREIGN KEY (robotId) REFERENCES mowercontrol.robots(robotId),
	CONSTRAINT asignedRobots_employees_FK FOREIGN KEY (employeeId) REFERENCES mowercontrol.employees(employeeId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

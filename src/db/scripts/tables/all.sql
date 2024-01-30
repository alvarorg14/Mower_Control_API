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
	password varchar(100) NOT NULL
	role varchar(100) NOT NULL,
	companyId varchar(100) NOT NULL,
	CONSTRAINT employees_pk PRIMARY KEY (employeeId),
	CONSTRAINT employees_FK FOREIGN KEY (companyId) REFERENCES companies(companyId),
	CONSTRAINT employees_un UNIQUE (username)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

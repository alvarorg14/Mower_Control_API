CREATE TABLE robots (
	robotId varchar(100) NOT NULL,
	serialNumber INT NOT NULL,
	name varchar(100) NOT NULL,
	battery INT NULL,
	mode varchar(100) NOT NULL,
	activity varchar(100) NOT NULL,
	state varchar(100) NOT NULL,
	errorCode INT NOT NULL,
	errorCodeTimestamp BIGINT NOT NULL,
	assigned boolean NOT NULL,
	modelId varchar(100) NOT NULL,
	clientId varchar(100),
	employeeId varchar(100),
	companyId varchar(100) NOT NULL,
	CONSTRAINT robots_pk PRIMARY KEY (robotId),
	CONSTRAINT robots_un UNIQUE KEY (serialNumber),
    CONSTRAINT robots_clients_FK FOREIGN KEY (clientId) REFERENCES clients(clientId)
	CONSTRAINT robots_employees_FK FOREIGN KEY (employeeId) REFERENCES employees(employeeId)
	CONSTRAINT robots_companies_FK FOREIGN KEY (companyId) REFERENCES companies(companyId)
	CONSTRAINT robots_models_FK FOREIGN KEY (modelId) REFERENCES models(modelId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
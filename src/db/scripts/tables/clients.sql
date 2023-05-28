CREATE TABLE clients (
	clientId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	address varchar(100) NOT NULL,
	phoneNumber INT NOT NULL,
	companyId varchar(100) NOT NULL,
	CONSTRAINT clients_pk PRIMARY KEY (clientId),
	CONSTRAINT clients_fk FOREIGN KEY (companyId) REFERENCES companies (companyId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE employees (
	employeeId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	role varchar(100) NOT NULL,
	companyId varchar(100) NOT NULL,
	CONSTRAINT employees_pk PRIMARY KEY (employeeId),
	CONSTRAINT employees_FK FOREIGN KEY (companyId) REFERENCES companies(companyId),
	CONSTRAINT employees_un UNIQUE (username)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
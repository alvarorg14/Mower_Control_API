CREATE TABLE companies (
	companyId varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	CIF varchar(100) NOT NULL,
	CONSTRAINT companies_pk PRIMARY KEY (companyId),
	CONSTRAINT companies_un UNIQUE (CIF)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

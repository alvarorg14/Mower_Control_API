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
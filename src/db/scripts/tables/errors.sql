CREATE TABLE mowerErrors(
    code INT NOT NULL,
    message varchar(255) NOT NULL,
    CONSTRAINT errors_pk PRIMARY KEY (code)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

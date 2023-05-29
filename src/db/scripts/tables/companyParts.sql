CREATE TABLE companyParts (
    companyId varchar(100) NOT NULL,
    partId varchar(100) NOT NULL,
    price DOUBLE NOT NULL,
    stock INT NOT NULL,
    location varchar(100) NOT NULL,
    CONSTRAINT companyParts_pk PRIMARY KEY (companyId, partId),
    CONSTRAINT companyParts_companies_FK FOREIGN KEY (companyId) REFERENCES companies(companyId),
    CONSTRAINT companyParts_parts_FK FOREIGN KEY (partId) REFERENCES parts(partId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
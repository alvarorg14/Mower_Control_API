CREATE TABLE tokens(
    employeeId varchar(100) NOT NULL,
    accessToken varchar(1000) NOT NULL,
    refreshToken varchar(100) NOT NULL,
    CONSTRAINT tokens_pk PRIMARY KEY (employeeId),
    CONSTRAINT tokens_employees_FK FOREIGN KEY (employeeId) REFERENCES employees(employeeId)
)
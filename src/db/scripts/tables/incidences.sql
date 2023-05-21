CREATE TABLE incidences(
    incidenceId varchar(100) NOT NULL,
    code number NOT NULL,
    message varchar(500) NOT NULL,
    `date` DATETIME NOT NULL,
    robotId varchar(100) NOT NULL,
    readed boolean NOT NULL,
    CONSTRAINT incidences_pk PRIMARY KEY (incidenceId),
    CONSTRAINT incidences_FK FOREIGN KEY (robotId) REFERENCES robots(robotId)
)
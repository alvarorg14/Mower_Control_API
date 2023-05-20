CREATE TABLE repairs (
	repairId varchar(100) NOT NULL,
	title varchar(100) NOT NULL,
	description varchar(500) NOT NULL,
	workingHours INT NOT NULL,
	`date` DATETIME NOT NULL,
	robotId varchar(100) NOT NULL,
	CONSTRAINT repairs_pk PRIMARY KEY (repairId),
	CONSTRAINT repairs_FK FOREIGN KEY (robotId) REFERENCES robots(robotId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
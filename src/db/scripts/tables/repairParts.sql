CREATE TABLE repairParts (
	partId varchar(100) NOT NULL,
	repairId varchar(100) NOT NULL,
	quantity INT NOT NULL,
	price DOUBLE NOT NULL,
	CONSTRAINT repairParts_pk PRIMARY KEY (partId,repairId),
	CONSTRAINT repairParts_repairs_FK FOREIGN KEY (repairId) REFERENCES mowercontrol.repairs(repairId),
	CONSTRAINT repairParts_parts_FK FOREIGN KEY (partId) REFERENCES mowercontrol.parts(partId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
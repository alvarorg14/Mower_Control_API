CREATE TABLE modelParts (
    modelId varchar(100) NOT NULL,
    partId varchar(100) NOT NULL,
    CONSTRAINT modelParts_pk PRIMARY KEY (modelId, partId),
    CONSTRAINT modelParts_models_FK FOREIGN KEY (modelId) REFERENCES models(modelId),
    CONSTRAINT modelParts_parts_FK FOREIGN KEY (partId) REFERENCES parts(partId)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
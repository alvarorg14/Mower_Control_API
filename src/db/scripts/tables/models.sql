CREATE TABLE models (
    modelId varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    CONSTRAINT models_pk PRIMARY KEY (modelId),
    CONSTRAINT models_uq UNIQUE (name)
)

INSERT INTO models
(modelId, name)
VALUES('83feb2a0-ea29-4b9d-b7dd-29ce6132686d', '315X');
INSERT INTO models
(modelId, name)
VALUES('bf5693af-7a45-468a-971d-c45bba69ae7c', '320 NERA');
INSERT INTO models
(modelId, name)
VALUES('bb220e4d-103c-481f-9c36-726d6f839ce6', '330X');
INSERT INTO models
(modelId, name)
VALUES('75646f6a-1038-4e61-81db-34779e6cd63a', '405X');
INSERT INTO models
(modelId, name)
VALUES('a79c5c44-c955-4408-bf57-188b962442d5', '415X');
INSERT INTO models
(modelId, name)
VALUES('9cf0ef14-d51f-4357-9ef1-f281f9869984', '430X');
INSERT INTO models
(modelId, name)
VALUES('11ab9f69-a44d-462f-9c1a-b005b9139210', '430X NERA');
INSERT INTO models
(modelId, name)
VALUES('88073c4a-95ce-4221-9d06-c7bea0bcc286', '435X AWD');
INSERT INTO models
(modelId, name)
VALUES('72d49dde-2b99-4f7a-bd15-611177ded8da', '450X');
INSERT INTO models
(modelId, name)
VALUES('f614b0f3-0c62-4ee1-9b3b-2c02fddf2806', '450X NERA');
INSERT INTO models
(modelId, name)
VALUES('b26f62ea-7d00-4827-bc0a-b8655b93119d', '535 AWD');
INSERT INTO models
(modelId, name)
VALUES('c2728d9b-803b-4316-b2b9-58f608710a64', 'UNKNOWN');

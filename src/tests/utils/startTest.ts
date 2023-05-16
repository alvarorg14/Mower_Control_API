import {MySqlContainer, StartedMySqlContainer} from 'testcontainers';
import { mockPool } from './db';
import {execute } from '../../db/db';

module.exports = async () => {
    const oldContainer: StartedMySqlContainer = await new MySqlContainer()
		.withReuse()
		.start();
	await oldContainer.stop();

	const container: StartedMySqlContainer = await new MySqlContainer()
		.withReuse()
		.start();

    mockPool(container);

    await createRepairs();
};

const createRepairs = async () => {
    execute("CREATE TABLE clients ( 	clientId varchar(100) NOT NULL, 	name varchar(100) NOT NULL, 	address varchar(100) NOT NULL, 	phoneNumber INT NOT NULL, 	CONSTRAINT clients_pk PRIMARY KEY (clientId) ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", []);
    execute("CREATE TABLE models ( 	modelId varchar(100) NOT NULL, 	name varchar(100) NOT NULL, 	surface INT NOT NULL, 	maxHours INT NOT NULL, 	CONSTRAINT models_pk PRIMARY KEY (modelId), 	CONSTRAINT models_un UNIQUE KEY (name) ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", []);
    execute("CREATE TABLE robots ( 	robotId varchar(100) NOT NULL, 	serialNumber INT NOT NULL, 	name varchar(100) NOT NULL, 	battery INT NULL, 	mode varchar(100) NOT NULL, 	activity varchar(100) NOT NULL, 	state varchar(100) NOT NULL, 	errorCode INT NOT NULL, 	modelId varchar(100) NOT NULL, 	clientId varchar(100) NOT NULL, 	CONSTRAINT robots_pk PRIMARY KEY (robotId), 	CONSTRAINT robots_un UNIQUE KEY (serialNumber),     CONSTRAINT robots_models_FK FOREIGN KEY (modelId) REFERENCES models(modelId),     CONSTRAINT robots_clients_FK FOREIGN KEY (clientId) REFERENCES clients(clientId) ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", []);
    execute("CREATE TABLE repairs (repairId varchar(100) NOT NULL,title varchar(100) NOT NULL,description varchar(500) NOT NULL,workingHours INT NOT NULL,`date` DATETIME NOT NULL,robotId varchar(100) NOT NULL,CONSTRAINT repairs_pk PRIMARY KEY (repairId),CONSTRAINT repairs_FK FOREIGN KEY (robotId) REFERENCES robots(robotId)) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", []);
}

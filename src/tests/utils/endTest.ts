import {MySqlContainer, StartedMySqlContainer} from 'testcontainers';
import { mockPool } from './db';

module.exports = async () => {
	const container: StartedMySqlContainer = await new MySqlContainer()
		.withReuse()
		.start();

    await container.stop();
};

import { MySqlContainer, StartedMySqlContainer } from "testcontainers";

module.exports = async () => {
  const container: StartedMySqlContainer = await new MySqlContainer().withReuse().start();

  await container.stop();
};

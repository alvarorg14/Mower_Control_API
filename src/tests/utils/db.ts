import { StartedMySqlContainer } from "testcontainers";
import { setPool } from "../../db/db";
import {createPool, Pool } from "mysql2";

export const mockPool = (container: StartedMySqlContainer) => {
    let pool: Pool = createPool({
        connectionLimit: 10,
        host: container.getHost(),
        user: 'root',
        password: container.getRootPassword(),
        database: container.getDatabase(),
        port: container.getPort(),
    });

    setPool(pool);
};
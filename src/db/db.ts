const dbConfig = require("./db.config.ts");

import {createPool, Pool } from "mysql2";

let pool: Pool;

export const init = () => {
  console.log('Creating pool');
  pool = createPool({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  });
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) {
      console.log('Pool was not created. Ensure pool is created when running the app.');
      throw new Error('Pool was not created. Ensure pool is created when running the app.');
    }
    console.log('Executing query: ' + query);
    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        else resolve(results as T);
      });
    });

  } catch (error) {
    console.log(error);
    throw new Error('failed to execute MySQL query');
  }
};

export const close = () => {
  pool.end();
};

export const setPool = (mockPool: Pool) => {
  console.log('Setting mock pool');
  pool = mockPool;
};

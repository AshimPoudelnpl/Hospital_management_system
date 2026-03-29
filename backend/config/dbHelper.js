import db from './db.js';

let connection = null;

export const getConnection = async () => {
  if (!connection) {
    connection = await db;
  }
  return connection;
};

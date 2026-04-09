const { Pool, Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'recipesdb',
  password: 'root',
  port: 5432,
};

let pool;

const ready = (async () => {
  const adminClient = new Client({ ...dbConfig, database: 'postgres' });
  await adminClient.connect();
  const exists = await adminClient.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [dbConfig.database]
  );
  if (exists.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE ${dbConfig.database}`);
    console.log(`Created database ${dbConfig.database}`);
  }
  await adminClient.end();

  pool = new Pool(dbConfig);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      ingredients TEXT,
      steps TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  console.log('Database ready');
})();

module.exports = {
  query: async (...args) => {
    await ready;
    return pool.query(...args);
  },
  getPool: () => pool,
  ready,
};

const Pool = require('pg').Pool;

const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function poolDemo() {
    const now = await pool.query('SELECT NOW()');

    return now;
}

module.exports = {
    pool,
    poolDemo
};

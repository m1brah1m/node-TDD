const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "note_taking",
  host: "note-taking-db",
  port: 5432,
});

module.exports = pool;

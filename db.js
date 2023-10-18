const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('patients.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY,
      name TEXT,
      national_id TEXT,
      temperature REAL,
      heartbeat INTEGER
    )
  `);
});

module.exports = db;

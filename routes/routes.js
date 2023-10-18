const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Create a database connection
const db = new sqlite3.Database('patients.db');

// Define a route to get patient data
router.get('/patients', (req, res) => {
  const sql = 'SELECT * FROM patients';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json(rows);
    }
  });
});

module.exports = router;

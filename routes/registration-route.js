const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register-patient', (req, res) => {
  const { name, nationalId, temperature, heartbeat } = req.body;
  console.log('Received data:', name, nationalId, temperature, heartbeat);

  const sql = 'INSERT INTO patients (name, national_id, temperature, heartbeat) VALUES (?, ?, ?, ?)';
  const values = [name, nationalId, temperature, heartbeat];

  db.run(sql, values, (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).json({ error: 'Internal server error', details: err.message });
    } else {
      console.log('Data inserted successfully.');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});


module.exports = router;

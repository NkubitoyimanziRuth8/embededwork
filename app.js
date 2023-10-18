const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// Serve static files (HTML, JavaScript, CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
// Create a database connection
const db = new sqlite3.Database('patients.db');

// Include your routes
const registrationRoutes = require('./routes/registration-route');
app.use('/api/patients', registrationRoutes);


app.delete('/api/patients/delete', (req, res) => {
  const sql = "DELETE FROM patients";

  db.all(sql, [], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message })
  })

  return res.status(404).json({ "message": "No records available" })
})


// Define an API route for retrieving patient data
app.get('/api/patients', (req, res) => {
  const sql = 'SELECT * FROM patients';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows); // Send the retrieved data as a JSON response
  });
});

// Define a route for serving the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
});

// Close the database connection when done
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit();
  });
});

const express = require('express');
const request = require('request');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set headers to allow cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Geocode endpoint
app.get('/geocode', (req, res) => {
  const { street, city, zip } = req.query;
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${street}&city=${city}&state=NY&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json`;

  request(url, (error, response, body) => {
    console.log(url);
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

// SQLite database setup
const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    borough TEXT NOT NULL
  )`);
});

// Endpoint to insert a user
app.post('/addUser', (req, res) => {
  const { email, borough } = req.body;
  console.log('Received data:', req.body);
  db.run(`INSERT INTO users (email, borough) VALUES (?, ?)`, [email, borough], function(err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`A row has been inserted with rowid ${this.lastID}`);
    }
  });
});

// Endpoint to query all users
app.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

// Close the database connection when the server stops
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
    process.exit(0);
  });
});
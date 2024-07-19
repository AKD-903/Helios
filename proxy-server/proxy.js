const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/geocode', (req, res) => {
  const { street, city, state, zip } = req.query;
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${street}&city=${city}&state=${state}&zip=${zip}`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.listen(4000, () => {
  console.log('Proxy server running on port 4000');
});

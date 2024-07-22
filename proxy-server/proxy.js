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
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${street}&city=${city}&state=${state}&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json`;

  request(url, (error, response, body) => {
    console.log(url);
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.listen(3500, () => {
  console.log('Proxy server running on port 3500');
});
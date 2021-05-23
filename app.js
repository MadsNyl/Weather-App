const axios = require('axios');
const express = require('express');
require('dotenv').config();

// init express
const app = express(); 

// api key
const API_KEY = process.env.API_KEY;

// middleware
app.use(express.static('public'));
app.use(express.json()); // allow json

// routes
app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${API_KEY}&units=metric`;
    // fetch from client with axios - prebuilt fetch
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data));
});

app.listen(3000);

'use strict';

const express = require('express');
const config = require('../config.js');
const Twit = require('twit');
const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

app.get('/', (req, res) => {
    
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
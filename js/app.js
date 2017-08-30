'use strict';

const express = require('express');
const config = require('../config.js');
const path = require('path');
const Twit = require('twit');
const app = express();

app.use('/static', express.static(path.join(__dirname, '..', 'public')));
app.set('view engine', 'pug');
app.set('views', '../views/');

let T = new Twit(config);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
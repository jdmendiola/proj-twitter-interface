'use strict';

const express = require('express');
const config = require('../config.js');
const path = require('path');
const Twit = require('twit');
const app = express();
let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

T.get('account/verify_credentials', (err, data, response) => {
    Data.screenName = data.screen_name;
    console.log(Data);
});

app.get('/', (req, res) => {
    res.render('index', {Data});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
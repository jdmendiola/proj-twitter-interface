'use strict';

const express = require('express');
const config = require('../config.js');
const Twit = require('twit');
const app = express();
let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

T.get('account/verify_credentials', (err, data, response) => {
    Data.screenName = data.screen_name;
    Data.profileImage = originalImageSize(data.profile_image_url_https);
    Data.profileBgImage = data.profile_background_image_url_https;
    console.log(Data);
});

app.get('/', (req, res) => {
    res.render('index', {Data});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function originalImageSize(profileImage){
    profileImage = profileImage.replace('_normal', '');
    return profileImage;
}
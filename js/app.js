'use strict';

const express = require('express');
const config = require('../config.js');
const Twit = require('twit');
const app = express();
let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

T.get('account/verify_credentials')
    .catch(function (err){
        console.log('caught error', err.stack);
    })
    .then(function (result){
        
        Data.screenName = result.data.screen_name;
        Data.profileImage = originalImageSize(result.data.profile_image_url_https, '_normal');

        T.get('users/profile_banner', {screen_name: Data.screenName})
        .catch(function (err){
            console.log('caught error', err.stack);
        })
        .then(function (result){
            Data.headerImage = result.data.sizes.web_retina.url
            console.log(Data);
        });
        
    });

app.get('/', (req, res) => {
    res.render('index', {Data});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function originalImageSize(profileImage, strippedText){
    profileImage = profileImage.replace(strippedText, '');
    return profileImage;
}
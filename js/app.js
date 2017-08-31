'use strict';

const express = require('express');
const config = require('../config.js');
const Twit = require('twit');
const app = express();
let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

app.get('/', (req, res) => {
    
    T.get('account/verify_credentials')
    .catch(err => {
        console.log('caught error', err.stack);
    })
    .then(result => {
        Data.screenName = result.data.screen_name;
        Data.profileImage = originalImageSize(result.data.profile_image_url_https, '_normal');
    })
    .then(result => {
        T.get('users/profile_banner', {screen_name: Data.screenName}, (err, data, response) => {
            Data.headerImage = data.sizes.web_retina.url
        })
        .then(result => {
            console.log(Data);
            res.render('index', {Data});
        })
    })

})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function originalImageSize(profileImage, strippedText){
    profileImage = profileImage.replace(strippedText, '');
    return profileImage;
}
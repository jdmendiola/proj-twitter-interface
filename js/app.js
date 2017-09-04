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
    
    Promise.all([getAccountInfo()])
    .then(values => {

        Data.screenName = values[0].data.screen_name;
        Data.profileImage = originalImageSize(values[0].data.profile_image_url_https, '_normal'); 

        Promise.all([
            getAccountBanner(Data.screenName),
            getRecentTweets(Data.screenName, 5)
        ])
        .then(values => {

            Data.headerImage = values[0].data.sizes.web_retina.url;
            var extractedTweets = values[1].data;
            
            var tweets = extractedTweets.map(value => {
                
                var tweetProps = {};
                
                tweetProps.tweet = value.text;
                tweetProps.likes = value.favorite_count;

                if (value.retweeted_status != null || undefined){
                    tweetProps.retweetLikes = value.retweeted_status.favorite_count;
                }

                tweetProps.retweets = value.retweet_count;
                
                return tweetProps;

            });
            
            console.log(tweets);
            res.render('index', {Data});

        });

    });
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function originalImageSize(profileImage, strippedText){
    profileImage = profileImage.replace(strippedText, '');
    return profileImage;
}

function getAccountInfo(){
    return T.get('account/verify_credentials')
}

function getAccountBanner(twitterId){
    return T.get('users/profile_banner', {screen_name: twitterId})
}

function getRecentTweets(twitterId, count){
    return T.get('statuses/user_timeline', {user_id: twitterId, count: count})
}
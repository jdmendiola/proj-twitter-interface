'use strict';

const express = require('express');
const config = require('../config.js');
const moment = require('moment');
const Twit = require('twit');
const app = express();
let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

let T = new Twit(config);

app.get('/', (req, res) => {

    Promise.all([
        getAccountInfo()
    ])
    .then(values => {

        Data.accountInfo = values[0];

        Promise.all([
            getAccountBanner(Data.accountInfo.screenName),
            getRecentTweets(Data.accountInfo.screenName, 5)
        ])
        .then(values => {

            Data.headerImage = values[0];
            Data.tweet = values[1];
            console.log(Data.tweet);
            res.render('index', {Data});

        });

    });
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function getAccountInfo(){
    return T.get('account/verify_credentials')
        .catch(error => {
            console.log(error);
        })
        .then(values => {
            return ({
                screenName: values.data.screen_name,
                profileImage: values.data.profile_image_url_https.replace('_normal', ''),
                name: values.data.name,
                friends: values.data.friends_count
            })
        })
}

function getAccountBanner(twitterId){
    return T.get('users/profile_banner', {screen_name: twitterId})
        .catch(error => {
            console.log(error);
        })
        .then(values => {
            return values.data.sizes.web_retina.url
        });
}

function getRecentTweets(twitterId, count){
    return T.get('statuses/user_timeline', {user_id: twitterId, count: count})
        .catch(error => {
            console.log(error);
        })
        .then(values => {

            let tweets = values.data.map(value => {
                
                var tweetProps = {};
                
                tweetProps.tweet = value.text;
                tweetProps.likes = value.favorite_count;
                tweetProps.retweets = value.retweet_count;
                tweetProps.time = moment(value.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('hh:mm a, DD/MM/YY');
                
                if (value.retweeted_status != null || undefined){
                    tweetProps.retweetLikes = value.retweeted_status.favorite_count;
                }

                return tweetProps;

            });

            return tweets

        });
}
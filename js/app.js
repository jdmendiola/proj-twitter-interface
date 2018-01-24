'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.js');
const moment = require('moment');
const Twit = require('twit');
const app = express();

let Data = {};

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}))

let T = new Twit(config);

app.get('/', (req, res) => {
    Data.post = "Shawn Carter";
    res.render('test', {Data});

    // Promise.all([
    //     getAccountInfo()
    // ])
    // .then(values => {

    //     Data.accountInfo = values[0];
        
    //     Promise.all([
    //             getAccountBanner(Data.accountInfo.screenName),
    //             getRecentTweets(Data.accountInfo.screenName, 5),
    //             getRecentFriends(Data.accountInfo.screenName, 5),
    //             getRecentSentMessage(5)
    //         ])
    //         .then(values => {

    //             Data.headerImage = values[0];
    //             Data.tweet = values[1];
    //             Data.friendsList = values[2]
    //             Data.sentMessages = values[3]
    //             res.render('index', {
    //                 Data
    //             });

    //         });

    // });
});

app.post('/post', (req, res) => {
    Data.post = req.body.name;
    app.render('inc/test-body', {Data}, function(err, html){
        console.dir(html);
        res.send(html);
    });
});

app.use((req, res, next) => {
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.url = req.url;
    res.status(404);
    res.render("error");
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

function getAccountInfo() {
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

function getAccountBanner(twitterId) {
    return T.get('users/profile_banner', {
            screen_name: twitterId
        })
        .catch(error => {
            console.log(error);
        })
        .then(values => {
            return values.data.sizes.web_retina.url
        });
}

function getRecentTweets(twitterId, count) {
    return T.get('statuses/user_timeline', {
            user_id: twitterId,
            count: count
        })
        .catch(error => {
            console.log(error);
        })
        .then(values => {

            let tweets = values.data.map(value => {

                let tweetProps = {};

                tweetProps.tweet = value.text;
                tweetProps.likes = value.favorite_count;
                tweetProps.retweets = value.retweet_count;
                tweetProps.time = moment(value.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('h:mma, DD/MM/YY');

                if (value.retweeted_status != null || undefined) {
                    tweetProps.retweetLikes = value.retweeted_status.favorite_count;
                }

                return tweetProps;

            });

            return tweets

        });
}

function getRecentFriends(twitterId, count) {
    return T.get('friends/list', {
            screen_name: twitterId,
            count: count
        })
        .catch(error => {
            console.log(error);
        })
        .then(values => {

            let friends = values.data.users.map(value => {

                let friend = {};

                friend.name = value.name;
                friend.screenName = value.screen_name;
                friend.profileImage = value.profile_image_url_https.replace('_normal', '');

                return friend

            });

            return friends

        });
}

function getRecentSentMessage(count) {
    return T.get('direct_messages/sent', {
            count: count
        })
        .catch(error => {
            console.log(error.stack);
        })
        .then(values => {

            let message = values.data.map(value => {

                let sentMessage = {};

                sentMessage.body = value.text;
                sentMessage.time = moment(value.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('h:mma');
                sentMessage.date = moment(value.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('DD/MM/YY');
                sentMessage.receipient = value.recipient_screen_name;

                return sentMessage;

            });

            return message

        });

}
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConfig = require('./app/config/mongodb.config');
const cron = require('cron').CronJob;
const logger = require('morgan');
const MainController = require('./app/main-controller');
const path = require('path');

app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use('/favicon.ico', express.static('./app/images/favicon032x32.png'));

app.get('/', (req,res) => {
    try {
        res.sendFile(path.resolve('app/public/403.html'));
    } catch (error) {
        console.log(error);
    }
})

app.get('*', function(req, res){
    res.sendFile(path.resolve('app/public/403.html'));
});

// Configuring the database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = dbConfig.url;
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Connected to MongoDB.");
        /* test_data.initial_testData(); */
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
// Connecting to the database
connectDB();

const daily_db_workers = new cron("0 7 * * *", async() => {
    console.log('Checking for new releases . . .');
    MainController.checkRecentlyAddedForNewReleases()
    console.log('Done checking') 
});
daily_db_workers.start();

module.exports = app;
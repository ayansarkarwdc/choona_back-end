// core modules
const {
    join,
    resolve
} = require('path');
const http = require('http');
const {
    promisify
} = require('util');
const {
    stat,
    readdir
} = require('fs');
// 3rd party modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const engine = require('ejs-locals');
const flash = require('connect-flash');
const qt = require('quickthumb');
const routeLabel = require('route-label');
var nodemailer = require('nodemailer');
// Import module in global scope
require('app-module-path').addPath(__dirname + '/app/modules');
_ = require("underscore");
require('mongoose-pagination');
require('dotenv').config();



// custom modules will goes here

config = require(resolve(join(__dirname, 'app', 'config')));
auth = require(resolve(join(__dirname, 'app', 'auth')))();
utils = require(resolve(join(__dirname, 'app', 'utils')));
spotifyApi = require(resolve(join(__dirname, 'app', 'spotify')));

const app = express();
const namedRouter = routeLabel(app);

// express locals instance
app.locals.moment = require('moment');
// Inclide main view path for (admin) //
app.locals.layout_directory = '../../../views/layouts';
app.locals.partial_directory = '../../../views/partials';

// Inclide main view path for (front) //
app.locals.front_layout_directory = '../../../../views/layouts';
app.locals.front_partial_directory = '../../../../views/partials';

/*****************************************************/
/********* Functions + variable declaration *********/
/***************************************************/

const isProd = config.isProd;
global.generateUrl = generateUrl = (route_name, route_param = {}) => namedRouter.urlFor(route_name, route_param);
const getPort = config.getPort;
const getAdminFolderName = config.getAdminFolderName;
const getApiFolderName = config.getApiFolderName;
const getFrontFolderName = config.getFrontFolderName;
global.BASE_URL = `http://${process.env.HOST}:${getPort}`;
global.UPLOAD_URL = `${global.BASE_URL}/uploads`;

async function isDirectory(f) {
    return (await promisify(stat)(f)).isDirectory();
}
async function _readdir(filePath) {
    const files = await Promise.all((await promisify(readdir)(filePath)).map(async f => {
        const fullPath = join(filePath, f);
        return (await isDirectory(fullPath)) ? _readdir(fullPath) : fullPath;
    }))

    return _.flatten(files);
}

async function readDirectory(path) {

    readdir(path, function (err, items) {

    });
}


/***************  Schedule Cron Job Starts Here ***************/
//Import Cron Jobs
var CronJob = require('node-cron');

CronJob.schedule("01 0 * * *", () => {
    var datetime = new Date();
    //Change job status to expire
    require('./app/modules/webservice/job.controller').jobStatusChangeToExpite();
});


/***************  Mail Configuration ***************/
//transporter = config.transporter;


transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});

/***************  AWS Configuration ***************/
s3 = config.s3;

/********************** Firebase Initialize*********************
firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

firebase_app = firebase.initializeApp({
    apiKey: config.FIREBASE_APIKEY,
    authDomain: config.FIREBASE_AUTHDOMAIN,
    databaseURL: config.FIREBASE_DATABASE_URL,
    projectId: config.FIREBASE_PROJECTID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSEGING_SENDERID
});

/******************** Firebase Initialize End *******************/

/******************** Middleware registrations *******************/
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
})); // get information from html forms
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(flash());
app.use(session({
    secret: 'delivery@&beverage@#',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('./public'));

app.set('views', [join(__dirname, './app/views'), join(__dirname, './app/modules')]);
app.engine('ejs', engine);
app.set('view engine', 'ejs'); // set up ejs for templating

app.use((req, res, next) => {
    // backbutton prevent
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    // Inclide main view path
    res.locals.messages = req.flash();
    auth = require(resolve(join(__dirname, 'app', "auth")))(req, res, next);
    app.use(auth.initialize());
    // This is for admin end
    if (req.session.token && req.session.token != null) {
        req.headers['token'] = req.session.token;
    }
    // This is for webservice end
    if (req.headers['x-access-token'] != null) {
        req.headers['token'] = req.headers['x-access-token'];
    }
    next();
});

// For image resize on fly
app.use('/uploads/resize', qt.static(join(__dirname, '/public/uploads'), {
    type: 'resize',
}));

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    const port = getPort;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
            throw error;
    }
}

(async () => {
    try {
        await require(resolve(join(__dirname, 'app', 'database')))();
        /******************* Routes (Api + Admin) ************/
        const apiFiles = await _readdir(`./app/routes/${getApiFolderName}`);
        apiFiles.forEach(file => {

            if (!file && file[0] == '.') return;
            namedRouter.use('', `/${getApiFolderName}`, require(join(__dirname, file)));
        });

        const adminFiles = await _readdir(`./app/routes/${getAdminFolderName}`);
        adminFiles.forEach(file => {
            if (!file && file[0] == '.') return;
            namedRouter.use('', `/${getAdminFolderName}`, require(join(__dirname, file)));
        });

        /******************* Routes (Frontend) ************
        const apiFiles = await _readdir(`./app/routes/${getFrontFolderName}`);
        apiFiles.forEach(file => {

            if (!file && file[0] == '.') return;
            namedRouter.use('', `/${getFrontFolderName}`, require(join(__dirname, file)));
        });
        /*********************************************/

        namedRouter.buildRouteTable();
        if (!isProd && process.env.SHOW_NAMED_ROUTES === 'true') {
            routeList = namedRouter.getRouteTable();
        }
        /******************* Service Launch *****************/
        const server = http.createServer(app);
        server.listen(getPort);
        server.on('error', onError);
        console.log(`Choona is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);
    } catch (error) {
        console.error(error);
    }
})();

module.exports = app;
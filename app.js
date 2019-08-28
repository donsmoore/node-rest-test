
// Set some initial vars
let express      = require('express')
let config       = require('config');
let app          = express();
let nodeEnv      = config.util.getEnv('NODE_ENV');
let fileName     = config.get('fileName');
let dbConnType   = config.get('dbConnType');
let dbUser       = config.get('dbUser');
let dbPass       = config.get('dbPass');
let dbHost       = config.get('dbHost');
let dbCollection = config.get('dbCollection');
let dbUriOpt     = config.get('dbUriOpt');
let dbOptions    = config.get('dbOptions');

// Setup the connection urURI
let dbURI = dbConnType + '://' + dbHost + '/' + dbCollection + dbUriOpt;
if (dbConnType === 'mongodb+srv') {
    dbURI = dbConnType + '://' + dbUser + ':' + dbPass + '@' + dbHost + '/' + dbCollection + dbUriOpt;
}

// display initial vars
console.log("VAR: env.NODE_ENV = " + nodeEnv);
console.log("VAR: config.fileName = " + fileName);
console.log("VAR: config.dbConnType = " + dbConnType);
console.log("VAR: config.dbUser = " + dbUser);
console.log("VAR: config.dbPass = " + dbPass.replace(/./g, '*'));
console.log("VAR: config.dbHost = " + dbHost);
console.log("VAR: config.dbCollection = " + dbCollection);
console.log("VAR: config.dbUriOpt = " + dbUriOpt);
console.log("VAR: config.dbOptions = " + JSON.stringify(dbOptions));

// Connect database
let mongoose = require('mongoose');
mongoose.connect(dbURI, dbOptions)
    .then(dbClient => {
        let db = mongoose.connection;
        app.locals.dbClient = dbClient;  // attach db to app.locals
        db.on('error', console.error.bind(console, 'connection error:'));
        process.on('SIGINT', () => {
            db.close();
            console.log('MongoDB closed.');
            process.exit();
        });
        console.log('SUCCESS: MongoDB connect');
    })
    .catch(
        error => console.error('ERROR: ' + error)
    );

// Allows use of request.body in attached router/controllers
let bodyparser = require('body-parser');
app.use(bodyparser.json({ type: 'application/json'}));

// Routes
let routes = require('./route/route');
app.use('/', routes);

// Listen
let nodePort = 8080;
app.listen(nodePort, () => {
        console.log('SUCCESS: Listening on port: ' + nodePort)
    })
    .on('error', function (e) {
        console.log('ERROR: Listening on port: ' + nodePort)
    });

// export for unit tests
module.exports = app;



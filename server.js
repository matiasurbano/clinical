"use strict";    
    var 
        Conf = require('./conf'),
        express = require('express'),
        app = express(),
        swig = require('swig'),
        MongoClient = require('mongodb').MongoClient,
        routes = require('./routes');

var config = new Conf().load("local",{ PORT : 3003 });
console.log(config);


MongoClient.connect(config.MONGODB_URL, function(err, db) {
    if(err) throw err;

    // Register our templating engine
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.set('view cache', true);

    swig.setDefaults({ cache: false });

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(__dirname +'/public'));
    

    // Exprssenpm  middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    // app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());

    // Application routes
    routes(app, db);


    // verify if database exists, if not create sample data.
    var InitData = require('./docs/initialData'),
        initData = new InitData(db);

    initData.verifyData();

    //start listening
    var port = process.env.PORT || config.PORT;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });
});
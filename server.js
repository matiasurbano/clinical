"use strict";    
    var 
        express = require('express'),
        app = express(),
        swig = require('swig'),
        cons = require('consolidate'),
        MongoClient = require('mongodb').MongoClient,
        routes = require('./routes');

var MONGOHQ_URL="mongodb://bitmind:bitmindpass@troup.mongohq.com:10011/clinical";
var MONGODBLOCAL_URL="mongodb://localhost:27017/clinical";

MongoClient.connect(MONGOHQ_URL, function(err, db) {
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(__dirname +'/public'));
    

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);


    // verify if database exists, if not create sample data.
    var InitData = require('./docs/initialData'),
        initData = new InitData(db);

    initData.verifyData();

    //start listening
    var port = process.env.PORT || 3003;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });
});
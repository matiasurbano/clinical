"use strict";


var sanitize = require('validator').sanitize; // Helper to sanitize form input


module.exports = function(db){

    this.displayMainPage = function(req, res, next) {

        // verify if database exists, if not create sample data.
        var InitData = require('../docs/initialData'),
            initData = new InitData(db);
        initData.verifyData();

        return res.render('welcome', {
            username: req.username
        });
  
    };

    this.displayPostNotFound = function(req, res, next) {
        
        return res.send('Sorry, post not found', 404);
    };


    return this;
};
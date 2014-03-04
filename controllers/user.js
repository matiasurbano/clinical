"use strict";

var UserService = require('../services/users');

module.exports = function(db){
    
    var users = new UserService(db);

    this.getOtherUsers = function(req, res, next) {

    	var username = req.username,
            currentUser = [],
            queryFilter = {};

        if (!username) {
            return res.redirect("/login");
        }

        currentUser.push(username);
        queryFilter = {
            username :{ $nin: currentUser }
        }

        users.getUsers(queryFilter,function(err,users){
            res.json(users);
        });

    };

    return this;
};
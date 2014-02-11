"use strict";

var UserService = require('../services/users');
var MessagesService = require('../services/messages');
var ActivityService = require('../services/activities');
    

module.exports = function(db){
    
    var users = new UserService(db),
        messages =  new MessagesService(db),
        activities = new ActivityService(db);

    this.displayHome = function(req, res, next) {

    	var username = req.username;

        if (!username) {
            return res.redirect("/login");
        }

        users.getUser(username,function(err,pacient){

            var today = new Date();
            var nextweek = new Date();
            nextweek.setDate(today.getDate()+1);

            activities.getVirtualActivities(pacient.username,today,nextweek, function(err,acts){
                return res.render("pacient_home", {
                    title : 'Home',
                    pacient: pacient,
                    activities : acts
                });
            });
        });
    };


    this.displayTimelineFull = function(req, res, next) {

        var username = req.username;

        if (!username) {
            return res.redirect("/login");
        }

        users.getUser(username,function(err,pacient){

            var today = new Date();
            var nextweek = new Date();
            nextweek.setDate(today.getDate()+60);

            activities.getVirtualActivities(pacient.username,today,nextweek, function(err,acts){
                return res.render("pacient_timeline", {
                    title : 'Timeline',
                    pacient: pacient,
                    activities : acts
                });
            });
        });
    };



    this.displayMessages = function(req, res, next) {

        var username = req.username,
            currentUser = [],
            queryFilter = {},
            queryFields = {};


        if (!username) {    
            return res.redirect("/login");
        }

        users.getUser(username,function(err,pacient){

            currentUser.push(username);
            queryFilter = {  username :{ $nin: currentUser } }
            queryFields = { 'username': 1 , 'firstname' : 1 , 'lastname' : 1};

            users.getUsersFields(queryFilter,queryFields,function(err,otherusers){


                var msgCond = {
                    "to": pacient.username
                };

                messages.getMessages(msgCond,function(err,msgs){

                return res.render("pacient_messages", {
                    title : 'Messages',
                    pacient: pacient,
                    messages: msgs,
                    otherusers : otherusers
                });

            });      
            });

        });

    };

    return this;
};
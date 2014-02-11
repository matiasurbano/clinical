"use strict";


var UserService = require('../services/users');
var MessagesService = require('../services/messages');
var ActivityService = require('../services/activities');
    
    

module.exports = function(db){
    
    var users = new UserService(db),
        messages =  new MessagesService(db),
        activities = new ActivityService(db);


    this.displayDoctorHome = function(req, res, next) {

    	var username = req.username;

        if (!username) {
            return res.redirect("/login");
        }

        // get Doctor by username
        users.getUser(username,function(err,doctor){
            // get all pacients related to the doctor.
            users.getUsers({'doctor':doctor.username},function(err,pacients){

            	return res.render("doctor_home", {
            		title : 'Doctor Home',
        			doctor: doctor,
                    pacients: pacients
        		});
            });
        });
    };


    this.addActivity = function(req, res, next) {

        var username = req.username,
            activityData = req.body,
            pageRes = res;        

        if (!username) {
            return res.redirect("/login");
        }

        // get Doctor by username
        users.getUser(username,function(err,doctor){
            
            // adding activities
            activities.addActivity(activityData,function(err,res){

                if (!err) return pageRes.redirect("/doctor");
                else{
                    alert('Error: ' + err );
                }
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

        users.getUser(username,function(err,user){

            currentUser.push(username);
            queryFilter = {  username :{ $nin: currentUser } }
            queryFields = { 'username': 1 , 'firstname' : 1 , 'lastname' : 1};

            users.getUsersFields(queryFilter,queryFields,function(err,otherusers){


                var msgCond = {
                    "to": user.username
                };

                messages.getMessages(msgCond,function(err,msgs){

                return res.render("doctor_messages", {
                    title : 'Messages',
                    doctor: user,
                    messages: msgs,
                    otherusers : otherusers
                });

            });      
            });

        });

    };


    return this;
};

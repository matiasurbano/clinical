"use strict";

var _ = require('underscore'),
    bcrypt = require('bcrypt-nodejs'),
    gravatar = require('gravatar'),
    http = require('http');


module.exports = function(db){

    this.validFields = ['firstname', 'lastname','username', 'password', 'email','profile_img', 'doctor'];
    this.initData = [
            {
                "firstname" : "Richard",
                "lastname" : "Walker",
                "email" : "rwalker@clinicaltrials.com",
                "username" : "rwalker",
                "password" : "$2a$10$fE7mkAPWwyEveM6bBGOWPeg9HX2PI8e0.lfCv4ihBC3cBlynhL9bW",
                "bornDate": new Date('Sep 04, 1982'),
                "isDoctor": true,
                "status": 'At Office',
                "profile_img" : "/img/doctor-avatar.jpg",
                "messages": [
                    {
                        date:  new Date('Fri Jan 24 2014'),
                        message: 'Hi Doctor, I would like to know how to ...',
                        from: 'mhart'
                    },
                    {
                        date:  new Date('Fri Jan 22 2014'),
                        message: 'Richar, Please call back when you see this message.',
                        from: 'mwalsh'
                    },
                    {   
                        date:  new Date('Fri Jan 22 2014'),
                        message: 'Could you please assign my pills for this month?',
                        from: 'smorgan'
                    }
                ]
            },
            { 
                    "firstname": "Michael", 
                    "lastname": "Hart", 
                    "email": "mhart@email.com", 
                    "username": "mhart", 
                    "password": "$2a$10$jFrf5FPRUPE49t6fB0RNuebc7QMJ3A6n2q.HQuylTuqXIUSW7vI/q", 
                    "doctor": "rwalker", 
                    "isDoctor": false, 
                    "profile_img" : "/img/patient-avatar.png",
            },
            {
                    "firstname" : "Marcos",
                    "lastname" : "Levia",
                    "email" : "mleiva@gmail.com",
                    "username" : "mleiva",
                    "password" : "$2a$10$DaKhUb2lSWdN8c6lsiShnO20nrIgaxUwaxhWGffjv1lgpXPIYpfMi",
                    "doctor" : "rwalker",
                    "profile_img" : "/img/default-avatar.png",
                    "isDoctor" : false
            },
            {
                    "firstname" : "Sara",
                    "lastname" : "Morgan",
                    "email" : "smorgan@mail.com",
                    "username" : "smorgan",
                    "password" : "$2a$10$Y.Amd85JlG0WysCZcg/6AOSNxz/76qE8ATd3yYsKnZ8PypQ1oBj.W",
                    "doctor" : "rwalker",
                    "profile_img" : "/img/default-avatar.png",
                    "isDoctor" : false
            }
    ];

    var users = db.collection("users");

    this.initUsers = function(callback) {
        users.insert(this.initData,function(err, res){
            callback(err,res);
        });
    };

    this.getUser = function(username, callback) {
        users.findOne({'username': username}, function(err, user){
            callback(err,user);
        });
    };

    this.getUsers = function(condition,callback) {
        users.find(condition).toArray(function(err, users){
            callback(err,users);
        });
    };

    this.getUsersFields = function(condition,fields,callback) {
        users.find(condition,fields).toArray(function(err, users){
            callback(err,users);
        });
    };


    this.getPacientsByDoctor = function(username,callback) {
        users.find({'username': username}).toArray(function(err, users){
            callback(err,pacients);
        });
    };


    function setProfileAvatar(email,options,callback){

        var profile_url = gravatar.url(email, options);
        if (profile_url){

         http.get(profile_url, function(res){

                res.on('data', function (chunk){
                    var strdata = chunk.toString();

                    if (strdata.indexOf("404") == 0)
                       callback('/img/default-avatar.png');
                    else
                        callback(profile_url);
                });

          });
        }
    };


    this.addUser = function(user, callback) {

        // Generate password hash
        var salt = bcrypt.genSaltSync();

        // Create user document
        _.each(this.validFields,function(field){

            if (field === 'password'){
                var password_hash = bcrypt.hashSync(user[field], salt);
                user[field] = password_hash;
            }
            else
                user[field] = user[field];
        });
        user.profile_img = "/img/default-avatar.png"; //default img


        users.insert(user, function (err, result) {

            if (!err) {
                console.log("Inserted new user");
                return callback(null, result[0]);
            }

            return callback(err, null);
        });

        //// Avatar Disabled
        // setProfileAvatar(user.email,{s: '100', r: 'pg', d: '404'},function(url){
        //     if (url){
        //         user.profile_img = url;
                
        //         users.insert(user, function (err, result) {

        //             if (!err) {
        //                 console.log("Inserted new user");
        //                 return callback(null, result[0]);
        //             }

        //             return callback(err, null);
        //         });
        //     }
        // });


    };

    this.verifyUser = function(username, callback) {
        users.findOne({'username': username}, function(err, user){
            callback(err,user);
        });
    };


    this.validateLogin = function(username, password, callback) {
        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {
            "use strict";

            if (err) return callback(err, null);

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                }
                else {
                    var invalid_password_error = new Error("Invalid password");
                    // Set an extra field so we can distinguish this from a db error
                    invalid_password_error.invalid_password = true;
                    callback(invalid_password_error, null);
                }
            }
            else {
                var no_such_user_error = new Error("User: " + user + " does not exist");
                // Set an extra field so we can distinguish this from a db error
                no_such_user_error.no_such_user = true;
                callback(no_such_user_error, null);
            }
        }

        users.findOne({ 'username' : username }, validateUserDoc);
    };

    return this;
};

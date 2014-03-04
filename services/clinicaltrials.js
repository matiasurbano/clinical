"use strict";

var bcrypt = require('bcrypt-nodejs'),
    _ = require('lodash');


module.exports = function(db){

    this.validFields = ['firstname', 'lastname','username', 'password', 'email', 'doctor'];
    this.initData = [
        {
                "firstname" : "Michael",
                "lastname" : "Hart",
                "email" : "mhart@gmail.com",
                "username" : "mhart",
                "password" : "$2a$10$MPy1tIos0A1Ab2x.uqf8DuEx/xXd8YMpAS/joyrlAfvhpgQMf9/0a",
                "doctor" : "rwalker",
        },
        {
                "firstname" : "Marcos",
                "lastname" : "Levia",
                "email" : "mleiva@gmail.com",
                "username" : "mleiva",
                "password" : "$2a$10$DaKhUb2lSWdN8c6lsiShnO20nrIgaxUwaxhWGffjv1lgpXPIYpfMi",
                "doctor" : "rwalker",
                "isDoctor" : false
        },
        {
                "firstname" : "Sara",
                "lastname" : "Morgan",
                "email" : "smorgan@mail.com",
                "username" : "smorgan",
                "password" : "$2a$10$Y.Amd85JlG0WysCZcg/6AOSNxz/76qE8ATd3yYsKnZ8PypQ1oBj.W",
                "doctor" : "rwalker",
                "isDoctor" : false
        }
    ];

    var users = db.collection("users");

    this.initUsers = function(callback) {
        users.insert(this.initData,function(err, res){
            callback(err,res);
        });
    };


    return this;
};

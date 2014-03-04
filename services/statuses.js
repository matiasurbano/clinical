"use strict";

var _ = require('lodash');


module.exports = function(db){

    var today = new Date();
    var nextweek = new Date();
    nextweek.setDate(today.getDate()+1);

    this.validFields = ['status', 'symptom','date', 'description','username'];
    this.initData = [
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },     
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "happy",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },     
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "happy",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date(nextweek),
            "description": 'This is a commet for my status..'
        }
    ];

    var statuses = db.collection("statuses");

    this.verifyStatuses = function(option, callback) {
        statuses.findOne(option, function(err, res){
            callback(err,res);
        });
    };

    this.initStatuses = function(callback) {
        statuses.insert(this.initData,function(err, res){
            callback(err,res);
        });
    };

    this.getStatuses = function(condition,callback) {
        statuses.find(condition).sort({"date":1}).toArray(function(err, statuses){
            callback(err,statuses);
        });
    };


    this.addStatus = function(msgData, callback) {

        var status = {};

        // Create status document
        _.each(this.validFields,function(field){
            if (field == "date")
                status[field] = new Date();
            else
                status[field] = msgData[field];
        });


        statuses.insert(status, function (err, result) {

            if (!err) {
                console.log("Inserted new status");
                return callback(null, result[0]);
            }

            return callback(err, null);
        });

    };

    return this;
};

"use strict";

var _ = require('underscore');


module.exports = function(db){


    this.validFields = ['status', 'symptom','date', 'description','username'];
    this.initData = [
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 02 2014 08:35 AM'),
            "description": 'This is a commet for my status..'
        },     
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 03 2014 10:15 AM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 06 2014 4:25 PM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 08 2014 6:05 PM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "happy",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 20 2014 10:05 AM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Feb 25 2014 11:00 AM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 03 2014 09:35 AM'),
            "description": 'This is a commet for my status..'
        },     
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 05 2014 10:35 AM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 06 2014 2:25 PM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "sad",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 09 2014 8:05 PM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "happy",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 22 2014 11:05 PM'),
            "description": 'This is a commet for my status..'
        },
        {
            "username" : "mhart",
            "status": "tired",
            "symptom" : "Numbness or tingling in hands",
            "date":  new Date('Mar 28 2014 12:35 AM'),
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

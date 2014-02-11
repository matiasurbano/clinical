"use strict";

var _ = require('underscore');


module.exports = function(db){

    this.validFields = ['from', 'to','message', 'date'];
    this.initData = [
        {
            "from": "rwalker",
            "to" : "mhart",
            "date":  new Date('Jan 24 2014'),
            "message": 'Hi Hart, I would like to know how to ...'
        },
        {
            "from": "mhart",
            "to" : "rwalker",
            "date":  new Date('Jan 25 2014'),
            "message": 'Hi Doctor, Thanks for your message, I will do that.'
        },
        {
            "from": "rwalker",
            "to" : "mhart",
            "date":  new Date('Jan 27 2014'),
            "message": 'Message 2 from Richard Walker.'
        }
    ];

    var messages = db.collection("messages");

    this.initMessages = function(callback) {
        messages.insert(this.initData,function(err, res){
            callback(err,res);
        });
    };

    this.getMessages = function(condition,callback) {
        messages.find(condition).sort({"date":1}).toArray(function(err, messages){
            callback(err,messages);
        });
    };

    this.addMessage = function(msgData, callback) {

        var message = {};

        // Create message document
        _.each(this.validFields,function(field){
            if (field == "date")
                message[field] = new Date(msgData[field]);
            else
                message[field] = msgData[field];
        });


        messages.insert(message, function (err, result) {

            if (!err) {
                console.log("Inserted new message");
                return callback(null, result[0]);
            }

            return callback(err, null);
        });

    };

    return this;
};

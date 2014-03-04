"use strict";

var _ = require('lodash');


module.exports = function(db){

    var today = new Date();
    var nextweek = new Date();
    nextweek.setDate(today.getDate()+1);

    this.validFields = ['from', 'to','message', 'date'];
    this.initData = [
        {
            "from": "rwalker",
            "to" : "mhart",
            "date":  new Date(nextweek),
            "message": 'Hi Hart, I would like to know how to ...'
        },
        {
            "from": "mhart",
            "to" : "rwalker",
            "date":  new Date(nextweek),
            "message": 'Hi Doctor, Thanks for your message, I will do that.'
        },
        {
            "from": "rwalker",
            "to" : "mhart",
            "date":  new Date(nextweek),
            "message": 'Tell me how are you today?'
        },
        {
            "from": "mhart",
            "to" : "rwalker",
            "date":  new Date(nextweek),
            "message": 'Message from Patient to Richard.'
        },
        {
            "from": "rwalker",
            "to" : "mhart",
            "date":  new Date(nextweek),
            "message": 'Message from Richard to Patient.'
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

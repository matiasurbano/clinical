"use strict";

var _ = require('lodash');

module.exports = function(db){

    var today = new Date();
    var nextweek = new Date();
    nextweek.setDate(today.getDate()+1);

    this.validFields = ['pacient','activity_type','date', 'time','title', 'description', 
                        'location', 'requisites','pickupfrom',
                        'weeklyrepeat', 'duedate',
                        'week_sunday','week_monday','week_tuesday',
                        'week_wednesday','week_thursday', 'week_friday','week_saturday'];
    this.initData = [
        {
                "pacient" : "mhart",
                "activity_type" : "medicine",
                "date" : new Date(nextweek),
                "time" : "8:30 AM",
                "title" : "Take Black Pills",
                "description" : "Doctor description",
                "location" : "",
                "requisites" : "After breakfast",
                "pickupfrom" : "",
                "weeklyrepeat" : null,
                "duedate" : "",
                "week_sunday" : null,
                "week_monday" : null,
                "week_tuesday" : null,
                "week_wednesday" : null,
                "week_thursday" : null,
                "week_friday" : null,
                "week_saturday" : null
        },
        {
                "pacient" : "mhart",
                "activity_type" : "medicine",
                "date" : new Date(nextweek),
                "time" : "8:30 AM",
                "title" : "Blood Pressure Test",
                "description" : "A little description of how to do the test.",
                "location" : "",
                "requisites" : "Nurse is required",
                "pickupfrom" : "",
                "weeklyrepeat" : null,
                "duedate" : "",
                "week_sunday" : null,
                "week_monday" : null,
                "week_tuesday" : null,
                "week_wednesday" : null,
                "week_thursday" : null,
                "week_friday" : null,
                "week_saturday" : null
        },
        {
                "pacient" : "mhart",
                "activity_type" : "transport",
                "date" : new Date(nextweek),
                "time" : "12:00 PM",
                "title" : "Taxi to Doctor",
                "description" : "Taxi to Doctor",
                "location" : "",
                "requisites" : "",
                "pickupfrom" : "1457 Mark Av",
                "weeklyrepeat" : null,
                "duedate" : "",
                "week_sunday" : null,
                "week_monday" : null,
                "week_tuesday" : null,
                "week_wednesday" : null,
                "week_thursday" : null,
                "week_friday" : null,
                "week_saturday" : null
        },
        {
                "pacient" : "mhart",
                "activity_type" : "transport",
                "date" : new Date(nextweek),
                "time" : "9:15 AM",
                "title" : "Taxi to Hospital Arch",
                "description" : "A description about the transport.",
                "location" : "",
                "requisites" : "",
                "pickupfrom" : "1205 Madison Av",
                "weeklyrepeat" : null,
                "duedate" : "",
                "week_sunday" : null,
                "week_monday" : null,
                "week_tuesday" : null,
                "week_wednesday" : null,
                "week_thursday" : null,
                "week_friday" : null,
                "week_saturday" : null
        },
        {
                "pacient" : "mhart",
                "activity_type" : "transport",
                "date" : new Date(nextweek),
                "time" : "16:15 AM",
                "title" : "Taxi to Hospital Arch",
                "description" : "A description about the transport.",
                "location" : "",
                "requisites" : "",
                "pickupfrom" : "2355 Blecker St",
                "weeklyrepeat" : null,
                "duedate" : "",
                "week_sunday" : null,
                "week_monday" : null,
                "week_tuesday" : null,
                "week_wednesday" : null,
                "week_thursday" : null,
                "week_friday" : null,
                "week_saturday" : null
        }
    ];

    var activities = db.collection("activities");


    this.verifyActivities = function(option, callback) {
        activities.findOne(option, function(err, res){
            callback(err,res);
        });
    };


    this.initActivities  = function(callback) {
        activities.insert(this.initData,function(err, res){
            callback(err,res);
        });
    };

    this.getActivitiesByUser = function(username, callback) {
        activities.find({'username': username}).toArray(function(err, users){
            callback(err,pacients);
        });
    };

    this.addActivity = function(activitydata, callback) {
        var activity={};

        // valicating form data, I will insert only valid fields
        _.each(this.validFields,function(field){
            if (field == "date")
                activity[field] = new Date(activitydata[field]);
            else
                activity[field] = activitydata[field];
        });

        activities.insert(activity,function(err, res){
            callback(err,res);
        });
    };

    this.getVirtualActivities = function(pacient,dateFrom,dateTo,callback){
        var virtual = [],
            actualDay = new Date();


        this.getActivities(pacient,dateFrom,dateTo,function(err,acts){



            if (acts.length > 0){

                if (new Date(acts[0].date).getDate() === actualDay.getDate()){
                    acts[0]["new_day"] = true;
                    actualDay = new Date(acts[0].date);
                }

                _.each(acts,function(act){
                    if (act.weeklyrepeat){
                        /*
                            Week Scheme

                            1 monday
                            2 tuesday
                            3 wednesday
                            4 thursday
                            5 friday
                            6 saturday
                            7 sunday
                        */
                        // if ( new Date(act.date).getDay() )

                    }
                    else{
                        if (new Date(act.date).getDate() !== actualDay.getDate()){
                            act["new_day"] = true;
                            actualDay = new Date(act.date);
                        }


                        virtual.push(act);
                    }


                });
                callback(err,acts);
            }else{
                callback(err,acts);
            }

        });
    };

    this.getActivities = function(pacient,dateFrom,dateTo,callback){
        var queryFilter = {},
            querySort = {};

        queryFilter = {
            "pacient" : pacient,
             $and : [
                { "date": { $gte: dateFrom } }, 
                { "date": { $lte: dateTo } }
            ]
        };
        
        querySort = {
            "date" : 1,
            "time" : 1
        };


        activities.find(queryFilter).sort(querySort).toArray(function(err, acts){
            callback(err,acts);
        });
    };


    return this;
};


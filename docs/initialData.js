"use strict";

module.exports = function(db){

 	var users = db.collection("users"),
 		activities = db.collection("activities"),
 		statuses = db.collection("statuses"),
 		clinicaltrials = db.collection("clinicaltrials");

    this.verifyData = function(callback){

	    var UserService = require('../services/users'),
	    	userService = new UserService(db);
	    	
	   	var ActivityService = require('../services/activities'),
	    	activityService = new ActivityService(db);


	   	var StatusService = require('../services/statuses'),
	    	statusService = new StatusService(db);


	    userService.verifyUser('rwalker',function(err,user){
	        if (err) console.log('ERROR: ' + err);
	        
	        if (!user){
	            userService.initUsers(function(err,res){
            		if (!err){
						console.log('Initial data - USERS Inserting..');
            		}
	            });
	        }else{
	        	console.log('Initial data - USERS OK');
	        }
	    });

	    activityService.verifyActivities({"pacient":"mhart"},function(err,actv){
	        if (err) console.log('ERROR: ' + err);
	        
	        if (!actv){
	            activityService.initActivities(function(err,res){
            		if (!err){
						console.log('Initial data - Activities Inserting..');
            		}
	            });
	        }else{
	        	console.log('Initial data - ACTIVITIES OK');
	        }
	    });

	    statusService.verifyStatuses({"username":"mhart"},function(err,sts){
	        if (err) console.log('ERROR: ' + err);
	        
	        if (!sts){
	            statusService.initStatuses(function(err,res){
            		if (!err){
						console.log('Initial data - Statuses Inserting..');
            		}
	            });
	        }else{
	        	console.log('Initial data - STATUSES OK');
	        }
	    });


    };

    return this;
};




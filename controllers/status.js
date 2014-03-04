"use strict";

var UserService = require('../services/users'),
    StatusesService = require('../services/statuses');
    

module.exports = function(db){
    
    var users = new UserService(db),
        statuses = new StatusesService(db);


    this.addStatus = function(req, res, next) {

        var username = req.username,
            reqData = req.body,
            pageRes = res;        

        if (!username) {
            return res.redirect("/login");
        }

        // get User by username
        users.getUser(username,function(err,user){
            
            // asigned username
            reqData.username = user.username;

            // adding satuses
            statuses.addStatus(reqData,function(err,res){

                if (!err){
                    if (user.isDoctor) return pageRes.redirect("/doctor");
                    else return pageRes.redirect("/pacient");
                }
                else{
                    alert('Error: ' + err );
                }
            });
        });

    };


    return this;
};

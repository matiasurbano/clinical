"use strict";

var UserService = require('../services/users'),
    MessagesService = require('../services/messages');
    

module.exports = function(db){
    
    var users = new UserService(db),
        messages = new MessagesService(db);


    this.addMessage = function(req, res, next) {

        var username = req.username,
            reqData = req.body,
            pageRes = res;        

        if (!username) {
            return res.redirect("/login");
        }

        // get User by username
        users.getUser(username,function(err,user){
            
            // adding activities
            messages.addMessage(reqData,function(err,res){

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

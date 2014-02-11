"use strict";

var UserService = require('../services/users'),
    SessionService = require('../services/sessions');
    

module.exports = function(db){
    
    var users = new UserService(db);
    var sessions = new SessionService(db);

    this.isLoggedInMiddleware = function(req, res, next) {
        var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username) {

            if (!err && username) {
                req.username = username;
            }
            return next();
        });
    };

    this.displayLoginPage = function(req, res, next) {
        return res.render("login", {username:"", password:"", login_error:""});
    };    

    this.displayPrelogin = function(req, res, next) {
        return res.render("pre_login", {});
    };

    this.handleLoginRequest = function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        users.validateLogin(username, password, function(err, user) {

            if (err) {
                if (err.no_such_user) {
                    return res.render("login", {username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.render("login", {username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            sessions.startSession(user['username'], function(err, session_id) {

                if (err) return next(err);

                res.cookie('session', session_id);
                
                if (user.isDoctor) return res.redirect('/doctor');
                else if (!user.isDoctor) return res.redirect('/pacient');
                else return res.redirect('/welcome');
            });
        });
    };    

    this.handlePrelogin = function(req, res, next) {

        var username = req.params.user;
        var password = "";    

        if(username==="rwalker"){
            password="rwalkerpass";
        }else if (username==="mhart"){
            password="mhartpass";
        }
        else
            res.redirect('/welcome');

        users.validateLogin(username, password, function(err, user) {

            if (err) {
                if (err.no_such_user) {
                    return res.render("login", {username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.render("login", {username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            sessions.startSession(user['username'], function(err, session_id) {

                if (err) return next(err);

                res.cookie('session', session_id);

                console.log("DEMO LOGIN - " + username);
                
                if (user.isDoctor) return res.redirect('/doctor');
                else if (!user.isDoctor) return res.redirect('/pacient');
                else return res.redirect('/welcome');
            });
        });
    };

    this.displayLogoutPage = function(req, res, next) {

        var session_id = req.cookies.session;
        sessions.endSession(session_id, function (err) {

            // Even if the user wasn't logged in, redirect to home
            res.cookie('session', '');
            return res.redirect('/');
        });
    };

    this.displaySignupPage =  function(req, res, next) {
        users.getUsers({'isDoctor': true},function(err,users){


            res.render("signup", {doctors : users, username:"", password:"",
                                        password_error:"",
                                        email:"", username_error:"", email_error:"",
                                        verify_error :""});
        });

    };

    function validateSignup(username, password, verify, email, doctor, errors) {
        var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";
        errors['doctor_error'] = "";

        if (!USER_RE.test(username)) {
            errors['username_error'] = "invalid username. try just letters and numbers";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors['password_error'] = "invalid password.";
            return false;
        }
        if (password != verify) {
            errors['verify_error'] = "password must match";
            return false;
        }
        if (email != "") {
            if (!EMAIL_RE.test(email)) {
                errors['email_error'] = "invalid email address";
                return false;
            }
        }
        if (doctor === null && doctor === undefined) {
            errors['doctor_error'] = "must select a doctor";
            return false;
        }        
        return true;
    };

    this.handleSignup = function(req, res, next) {

        var user = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            doctor : req.body.doctor,
            isDoctor : false
        };


        // set these up in case we have an error case
        var errors = {'username': user.username, 'email': user.email}
        if (validateSignup(user.username, user.password, req.body.verify, user.email, user.doctor, errors)) {
            users.addUser(user,  function(err, user) {

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }

                sessions.startSession(user['username'], function(err, session_id) {

                    if (err) return next(err);

                    res.cookie('session', session_id);
                    if (user.isDoctor) return res.redirect('/doctor');
                    else if (!user.isDoctor) return res.redirect('/pacient');
                    else return res.redirect('/welcome');
                });
            });
        }
        else {
            console.log("user did not validate");
            return res.render("signup", errors);
        }
    };

    this.displayWelcomePage = function(req, res, next) {

        if (!req.username) {
            console.log("welcome: can't identify user...redirecting to signup");
            return res.redirect("/signup");
        }
        return res.render("welcome", {'username':req.username})
    };

    return this;
};
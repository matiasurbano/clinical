"use strict";

var SessionController = require('../controllers/session'),
    ContentController = require('../controllers/content'),
    PacientController = require('../controllers/pacient'),
    DoctorController = require('../controllers/doctor'),
    UserController = require('../controllers/user'),
    MessageController = require('../controllers/message'),
    StatusController = require('../controllers/status'),
    ErrorController   = require('../controllers/error');


module.exports = function(app, db){

    var sessionController = new SessionController(db);
    var contentController = new ContentController(db);
    var pacientController = new PacientController(db);
    var userController = new UserController(db);
    var messageController = new MessageController(db);
    var statusController = new StatusController(db);
    var doctorController = new DoctorController(db);

    // Middleware to see if a user is logged in
    app.use(sessionController.isLoggedInMiddleware);

    // The main page of the blog
    app.get('/', contentController.displayMainPage);

    // Login form
    app.get('/login', sessionController.displayLoginPage);
    app.post('/login', sessionController.handleLoginRequest);

    // Logout page
    app.get('/logout', sessionController.displayLogoutPage);

    // Pacient
    app.get("/pacient", pacientController.displayHome);
    app.get("/pacient/messages", pacientController.displayMessages);
    app.get("/pacient/timeline", pacientController.displayTimelineFull);

    // Doctor
    app.get("/doctor", doctorController.displayDoctorHome);
    app.get("/doctor/messages", doctorController.displayMessages);
    app.post("/doctor/addactivity", doctorController.addActivity);

    // Welcome page
    app.get("/welcome", sessionController.displayWelcomePage);
    app.get("/prelogin", sessionController.displayPrelogin);
    app.get("/prelogin/:user", sessionController.handlePrelogin);

    // Signup form
    app.get('/signup', sessionController.displaySignupPage);
    app.post('/signup', sessionController.handleSignup);

    // Messanges
    app.post('/message/add', messageController.addMessage);

    // Statuses
    app.post("/status/:username", statusController.addStatus);

    // API Routes
    app.get('/api/otherUsers', userController.getOtherUsers);

    app.get('/api/ping', function(req, res, next){
        var data = [
            { name: 'Hello' , value: 12},
            { name: 'There!!' , value: 16}
        ];

        res.json(data);
    });



    // Error handling Pacientare
    // Error handling middleware
    app.use(ErrorController);

    return this;
};

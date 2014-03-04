"use strict";

module.exports = function(){


	this.errorHandler = function(err, req, res, next) {
	    console.error(err.message);
	    console.error(err.stack);
	    res.status(500);
	    res.render('error_template', { error: err });
	};

    return this;
};
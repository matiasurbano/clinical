
$(function(){

	$('form')
	  .form({
	    username: {
	      identifier : 'username',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter a username'
	        }
	      ]
	    },
	    password: {
	      identifier : 'password',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter a password'
	        },
	        {
	          type   : 'length[5]',
	          prompt : 'Your password must be at least 6 characters'
	        }
	      ]
	    }
	  });

});

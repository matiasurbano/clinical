
$(function(){

 $('form')
  .form({
    firstName: {
      identifier  : 'firstname',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter your first name'
        }
      ]
    },
    lastName: {
      identifier  : 'lastname',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter your last name'
        }
      ]
    },
    email: {
      identifier : 'email',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter a email'
        }
      ]
    },    
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
          prompt : 'Your password must be at least 5 characters'
        }
      ]
    },    
    verify: {
      identifier : 'verify',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please verify password'
        }
      ]
    },   
    doctor: {
      identifier : 'doctor',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please select a doctor'
        }
      ]
    }

  })
;
});


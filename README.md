# ReminderAPI
Backend Authentication and Database storage API using Node.js/Express.js and more !

## SignUp, SignIn, SignOut.

### SignUp

	POST method on /users/signup
		data to send :
		{
			"username": "nicknameOfUser",
			"email": "mailOfUser", // (example@domain.com)
			"password": "passwordUser" // (min = 8, max = 30)
		}

		response :
		{
			"token" : "tokenEncoded"
		}

		OR
		{
			error : "error"
		}

### SignIn

	POST method on /users/signin
		data to send:
		{
			"email": "mailorUsernameOfUser",
			"password": "passwordOfUser"
		}

		response :
		{
			"token": "tokenEncoded"
		}
		OR
		{
			"error": "error"
		}

### SignOut

	GET method on /users/signout
	data Send
	{
		"token": "tokenEncoded"
	}

	response:
	{
		
	}

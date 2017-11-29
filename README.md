# ReminderAPI
Backend Authentication and Database storage API using Node.js/Express.js and more !

## Users Methods

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
			"token" : "tokenEncoded",
			"userId": "idOfUser"
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
			"token": "tokenEncoded",
			"userId": "idOfUser"
		}
		OR
		{
			"error": "error"
		}

### SignOut ( W.I.P)...

	GET method on /users/signout
		data Send in Header : authorization => token

	response:
	{

	}

### Delete User

	DELETE method on /users/delete/
	data Send in Header : authorization => token

	response:
	{
		msg : `User successfully deleted, ${numberOfDeletedStickys} Stickys deleted.`
	}
	OR
	{
		msg: `User\'s not found in the database, ${numberOfDeletedStickys} Stickys deleted.`
	}

## Stickys Methods

### getStickys

	GET method on /stickys/
		data Send in Header : authorization => token

		response:
		[{
			"id": "idOfTheSticky",
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		},
		{
			"id": "idOfTheSticky",
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		},
		{
			"id": "idOfTheSticky",
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		}]

### addStickys

	POST method on /stickys/add
		data Send in Header : authorization => token
		data Send in body (json):
		{
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky"
		}

		response:
		{
			"id": "idOfTheSticky",
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		}

### editStickys

	POST method on /stickys/edit
		data Send in Header : authorization => token
		data Send in Body (json):
		{
			"id": "idOfTheSticky",
			"title":"new_titleOfTheSticky",
			"content":"new_contentOfTheSticky",
			"priority":"new_priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		}

		response:
		{
			"id": "idOfTheSticky",
			"title":"new_titleOfTheSticky",
			"content":"new_contentOfTheSticky",
			"priority":"new_priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		}
		OR
		{
			msg: 'Sticky\'s not found in the database'
		}

### deleteStickys

	DELETE method on /stickys/delete
		data Send in Header : authorization => token
		data Send in Body (json):
		{
			"id": "idOfTheSticky",
			"title":"titleOfTheSticky",
			"content":"contentOfTheSticky",
			"priority":"priorityOfTheSticky",
			"userId": "IdOfTheOwnerUser",
			"date": "DateOfCreation"
		}

		response:
		{
			"msg":"Sticky successfully deleted."
		}
		OR
		{
			msg: 'Sticky\'s not found in the database'
		}

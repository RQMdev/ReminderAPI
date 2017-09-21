const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
	return JWT.sign({
		iss: 'ReminderAPI',
		sub: user.id,
		iat: new Date().getTime(),
		exp: new Date().setDate( new Date().getDate() + 1)
	}, JWT_SECRET );
}

module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersControllers.signUp() called!');

    const { username, email, password } = req.value.body;
    // Check if there is User with the same Email
    const foundUser = await User.findOne({$or: [{email}, {username}]});

    if (foundUser){
      return res.status(403).json({ error: 'Email and/or Username already used.'});
    }
    // Create a new User
    const newUser = new User({ username, email, password });
    await newUser.save();

		// Generate Token
		const token = signToken(newUser);

    // Respond with a Token
    res.status(200).json({token});
  },

  signIn: async (req, res, next) => {
    // Generate Token
    console.log('UsersControllers.signIn() called!');
  },

  secret: async (req, res, next) => {
    console.log('UsersControllers.secret() called!');
		res.json({ secret : 'ressource' });
  }
}

const expressJwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Sticky = require('../models/sticky');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
	return JWT.sign({
		iss: 'ReminderAPI',
		sub: user.id,
		iat: new Date().getTime(),
		exp: new Date().setHours(new Date().getHours() + 5)
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

		// Generate Token && user_id const
		const token = signToken(newUser);
		const userId = newUser.id;

    // Respond with a Token
    res.status(200).json({token, userId});
  },

  signIn: async (req, res, next) => {
		console.log('UsersControllers.signIn() called!');
    // Generate Token
		const token = signToken(req.user);
		const userId = req.user.id;
		res.status(200).json({token, userId});
  },

	signOut: async (req, res, next) => {
		console.log('UsersControllers.signOut() called!');
		blacklist.revoke(req.user);
		res.status(200).json({msg: 'You successfully signed out.'})
	},

  deleteUser: async (req, res, next) => {
    console.log('UsersControllers.deleteUser() called!');
		const _id = req.user.id;
		console.log(req.user.id);
		const deletedUser = await User.findOneAndRemove({_id});
		var numberOfDeletedStickys = await Sticky.count({userId: _id});
		const deletedStickys = await Sticky.remove({userId: _id});
		console.log('deletedUser', deletedUser);
		console.log('deletedStickys', deletedStickys);
		console.log('numberOfDeletedStickys', numberOfDeletedStickys);

		if(numberOfDeletedStickys == 'undefined'){
			numberOfDeletedStickys = 0;
		}
		if (!deletedUser){
			return res.status(404).json({msg: `User\'s not found in the database, ${numberOfDeletedStickys} Stickys deleted.`});
		}
		return res.status(200).json({ msg: `User successfully deleted, ${numberOfDeletedStickys} Stickys deleted.` });
  }
}

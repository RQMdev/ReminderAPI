const JWT = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  signUp: function(req, res, next) {
    console.log('UsersControllers.signUp() called!');

    const { username, email, password } = req.value.body;
    // Check if there is User with the same Email
    const foundUser = User.findOne({$or: [{email}, {username}]}, function(err, userObj){
      if (err){
        return handleError(err)
      }
    });

    console.log(foundUser);

    if (foundUser){
      return res.status(403).json({ error: 'Email is already used.'});
    }
    // Create a new User
    const newUser = new User({ username, email, password });
    newUser.save();

    // Respond with a Token
    // res.json({ user: 'created' });
    const token = JWT.sign({
      iss: 'ReminderAPI',
      sub: newUser.id,
      iat: new Date().getTime(),
      exp: new Date().setDate( new Date().getDate() + 1)
    }, 'reminderSecretCode');

    res.status(200).json({token});
  },

  signIn: function(req, res, next) {
    // Generate Token
    console.log('UsersControllers.signIn() called!');
  },

  secret: function(req, res, next) {
    console.log('UsersControllers.secret() called!');
  }
}

const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersControllers = require('../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersControllers.signUp);

router.route('/signin')
  .post(validateBody(schemas.loginSchema), passport.authenticate('local', { session: false }), UsersControllers.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersControllers.secret);

module.exports = router;

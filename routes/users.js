const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersControllers = require('../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersControllers.signUp);

router.route('/signin')
  .post(UsersControllers.signIn);

router.route('/secret')
  .get(UsersControllers.secret);

module.exports = router;

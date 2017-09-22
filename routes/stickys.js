const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const StickysControllers = require('../controllers/stickys');

router.route('/')
	.get(passport.authenticate('jwt', { session: false }), StickysControllers.getStickys);

router.route('/add')
	.post(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.addSticky);

router.route('/edit')
	.post(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.editSticky);

router.route('/delete')
	.delete(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.deleteSticky);

module.exports = router;

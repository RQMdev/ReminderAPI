const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const multer = require('multer');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const StickysControllers = require('../controllers/stickys');

let upload = multer({dest: "public/image/"});

router.route('/')
	.get(passport.authenticate('jwt', { session: false }), StickysControllers.getStickys);

router.route('/search')
	.post(passport.authenticate('jwt', { session: false }), StickysControllers.searchStickys);

router.route('/add')
	.post(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.addSticky);

router.route('/edit')
	.post(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.editSticky);

router.route('/delete')
	.delete(validateBody(schemas.stickySchema), passport.authenticate('jwt', { session: false }), StickysControllers.deleteSticky);

router.route('/image')
	.post(
		//passport.authenticate('jwt', { session: false }), 
		upload.single('image'), 
		StickysControllers.uploadImage);


module.exports = router;

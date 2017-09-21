const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const StickysControllers = require('../controllers/stickys');

router.route('/')
	.get(StickysControllers.getStickys);

router.route('/add')
	.post(validateBody(schemas.stickySchema), StickysControllers.addSticky);

router.route('/edit')
	.post(validateBody(schemas.stickySchema), StickysControllers.editSticky);

router.route('/delete')
	.post(StickysControllers.deleteSticky);

module.exports = router;

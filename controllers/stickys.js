const Sticky = require('../models/sticky');

module.exports = {
	getStickys: async (req, res, next) => {
		console.log('StickysController.getStickys called !');
	},
	addSticky: async (req, res, next) => {
		console.log('StickysController.addSticky called !');
	},
	editSticky: async (req, res, next) => {
		console.log('StickysController.editSticky called !');
	},
	deleteSticky: async (req, res, next) => {
		console.log('StickysController.deleteSticky called !');
	}
}

const Sticky = require('../models/sticky');

module.exports = {
	getStickys: async (req, res, next) => {
		console.log('StickysController.getStickys called !');
		// Get all stickys mothafucka !
		const userId = req.user.id;

		Sticky.find({userId}).lean().exec(function (err, stickys) {
    	return res.end(JSON.stringify(stickys));
		});
	},

	addSticky: async (req, res, next) => {
		console.log('StickysController.addSticky called !');

		const { title, content, priority } = req.value.body;
		const userId = req.user.id;

		const newSticky = new Sticky({title, content, priority, userId });
		await newSticky.save();

		const foundSticky = await Sticky.findOne({title, content, priority, userId });

		res.status(200).json(foundSticky);

	},
	editSticky: async (req, res, next) => {
		console.log('StickysController.editSticky called !');
		const { id, title, content, priority, userId, date } = req.value.body;

		const editedSticky = await Sticky.findOneAndUpdate({id}, {title, content, priority}, {new: true});
		if (!editedSticky){
			res.status(404).json({msg:'Sticky\'s not found in the database.'});
		}
		res.status(200).json(editedSticky);
	},
	deleteSticky: async (req, res, next) => {
		console.log('StickysController.deleteSticky called !');
		const { id, title, content, priority, userId, date } = req.value.body;
		console.log(id);
		const deletedSticky = await Sticky.findOneAndRemove({id});
		if (!deletedSticky){
			res.status(404).json({msg:'Sticky\'s not found in the database.'});
		}
		res.status(200).json({msg:'Sticky successfully deleted.'});

	}
}

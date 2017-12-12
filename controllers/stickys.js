const Sticky = require('../models/sticky');
//  const multer = require('multer');

module.exports = {
	getStickys: async (req, res, next) => {
		console.log('StickysController.getStickys called !');
		// Get all stickys mothafucka !
		const userId = req.user.id;

		Sticky.find({userId}).lean().exec(function (err, stickys) {
    	return res.end(JSON.stringify(stickys));
		});
	},

	searchStickys: async (req, res, next) => {
		console.log('StickysController.searchStickys called !');
		// const userId = req.user.id;
		// const search = req.body.search;
		//
		// Sticky.find({userId, title: })
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

	uploadImage: async (req, res, next) =>{
		console.log(req.file);
		req.file.path = req.file.path.replace('public/', '');
		console.log(req.file);
		res.json(req.file)
	},

	editSticky: async (req, res, next) => {
		console.log('StickysController.editSticky called !');
		const { _id, title, content, priority, userId, date, image } = req.value.body;

		const editedSticky = await Sticky.findOneAndUpdate({_id}, {title, content, priority, image}, {new: true});
		if (!editedSticky){
			res.status(404).json({msg:'Sticky\'s not found in the database.'});
		}
		res.status(200).json(editedSticky);
	},

	deleteSticky: async (req, res, next) => {
		console.log('StickysController.deleteSticky called !');
		const { _id, title, content, priority, userId, date } = req.value.body;
		console.log(_id);
		const deletedSticky = await Sticky.findOneAndRemove({_id});
		if (!deletedSticky){
			res.status(404).json({msg:'Sticky\'s not found in the database.'});
		}
		res.status(200).json({msg:'Sticky successfully deleted.'});

	}
}

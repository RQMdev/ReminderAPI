const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stickySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	priority: {
		type: Number,
	},
	userId: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	image: {
		type: String
	}
});

const Sticky = mongoose.model('sticky', stickySchema);

module.exports = Sticky;

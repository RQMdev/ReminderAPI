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
	date: {
		type: Date,
		default: Date.now
	}
});

const Sticky = mongoose.model('sticky', stickySchema);

module.exports = Sticky;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the schema
const blogSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	snippet: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// Create a model
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for external use
module.exports = Blog;
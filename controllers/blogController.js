/*

	Here I define functions to be used in my routes

*/
const Blog = require('../models/blog');

const index = (req, res) => {
	Blog.find()
		.sort({createdAt: -1})
		.then((result) => {
			res.render('blogs', {title: 'Blogs', blogs: result})
		})
		.catch((err) => console.log(err))
};

const create = (req, res) => {
	res.render('create', { title: 'Create'});
};

const store = (req, res) => {
	const blog = new Blog(req.body);
	blog.save()
		.then((result) => {
			res.redirect('/blogs');
		})
		.catch((err) => console.log(err));
};

const show = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render('blog-single', { blog: result, title: 'Blog Details' })
		})
		.catch((err) => console.log(err))
};

const delete = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then(result => {
			res.json({
				redirect: '/blogs'
			})
		})
		.catch((err) => console.log(err))
};

module.exports = {
	index,
	create,
	store,
	show,
	delete
};
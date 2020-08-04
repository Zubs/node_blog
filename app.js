// Import packages
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Initiate the app
const app = express();

// Link to mongoDB atlas
const dbURI = '';
mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then((result) => {
	console.log('Connected to DB and listening for requests on PORT 3000');
	app.listen(3000);
})
.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Set Up static files
app.use(express.static('public'));

// Using morgan to log instead
app.use(morgan('dev'));

// Built a logger middleware
app.use((req, res, next) => {
	console.log(`${req.method} request: http://${req.hostname}${req.path}\t${res.statusCode}`);
	next();
});

// Respond to /
app.get('/', (req, res) => {
	const blogs = [
		{title: 'First Blog', snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{title: 'Second Blog', snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
		{title: 'Third Blog', snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
	];
	res.render('index', { title: 'Home', blogs});
});

// Respond to /about
app.get('/about', (req, res) => {
	res.render('about', { title: 'About'});
});

// Respond to /blogs
app.get('/blogs', (req, res) => {
	Blog.find()
		.sort({createdAt: -1})
		.then((result) => {
			res.render('blogs', {title: 'Blogs', blogs: result})
		})
		.catch((err) => console.log(err))
});

// Respond to /blogs/create
app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create'});
});

app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});
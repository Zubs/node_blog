// Import express
const express = require('express');

// Import morgan
const morgan = require('morgan');

// Initiate the app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Listen to requests
app.listen(3000);

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

// Respond to /
app.get('/about', (req, res) => {
	res.render('about', { title: 'About'});
});

// Respond to /blogs/create
app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create'});
});

app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});
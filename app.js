// Import express
const express = require('express')

// Initiate the app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Listen to requests
app.listen(3000);

// Respond to /
app.get('/', (req, res) => {
	res.render('index');
});

// Respond to /
app.get('/about', (req, res) => {
	res.render('about');
});

// Respond to /blogs/create
app.get('/blogs/create', (req, res) => {
	res.render('create');
});

app.use((req, res) => {
	res.status(404).render('404');
});
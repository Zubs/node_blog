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
	res.sendFile('./views/index.html', { root: __dirname });
});

// Respond to /
app.get('/about', (req, res) => {
	res.sendFile('./views/about.html', { root: __dirname });
});

app.use((req, res) => {
	res.status(404).sendFile('./views/404.html', { root: __dirname });
});
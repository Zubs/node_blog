const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	//Using the res to format response to the browser
	// To Output Plain text
	// res.setHeader('Content-Type', 'text/plain');

	// To output html
	res.setHeader('Content-Type', 'text/html');

	// Outputting simple or single line responses to the browser
	// // This writes that to the screen
	// res.write('<h1>Hello World</h1>');
	// // This ends the response and them outputs
	// res.end();

	//This lets me try out routing to an extent
	let path = './views/';
	switch(req.url) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err)
			res.end()
		} else {
			res.end(data)
		}
	})

	// This returns an HTML page for all routes
	// // Returning an HTML file
	// fs.readFile('./views/index.html', (err, data) => {
	// 	if (err) {
	// 		console.log(err)
	// 		res.end()
	// 	} else {
	// 		res.write(data)
	// 		res.end()

	// 		// Alternatively,
	// 		// res.end(data) still sends the data to the browser and ends it
	// 	}
	// })
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
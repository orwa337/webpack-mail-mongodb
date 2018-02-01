const express = require('express');
const bodyParser = require('body-parser');
const mailnotifier = require('./mailnotifier');
var Mail = require('./mailmodel');
const mongoose = require('mongoose');
const server = express();
const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
		compiler,
		config.devServer
	);

server.use(bodyParser());
server.use(webpackDevMiddleware);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', function() {
	console.log('connection to mongodb failed');
	process.exit(0);
});

server.post('/sendmail', function(req, res) {
	if(!req.body.email || !req.body.subject || !req.body.text) {
		return res.send({ err: 'email, subject and text required' });
	}

	mailnotifier.sendMail(req.body.email,
					      req.body.subject, 
					      req.body.text,
					      function(err) {
					      	if(err)
					      		return res.send({err:err});
					      

							var newMail = new Mail(req.body);
							newMail.save(function(err) {
								if(err) {
									console.log('mail could not be saved ' + err);
								}
								
								console.log('mail was successfully saved: ' + req.body);
							});

							return res.send({err:0});							
					      });

});

server.listen(3000, () => {
	console.log('server is listening on port 3000');
});

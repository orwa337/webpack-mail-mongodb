var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = new Schema({
	email: String,
	subject: String,
	text: String
});

var Mail = mongoose.model('mails', mailSchema);
module.exports = Mail;
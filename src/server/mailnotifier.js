var nodemailer = require('nodemailer');

function sendMail(recipientAddress, subject, body, cb) {
	var smtpConfig = {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'devugees.shop@gmail.com',
			pass: 'shop.devugees'
		}
	};
						
	var transporter = nodemailer.createTransport(smtpConfig);
	var mailOptions = {
		from: '"Devugees Shop" <devugeesshop1234@gmail.com>',
		to: recipientAddress,
		subject: subject,
		text: body,
		html: body
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log('mail was not delivered');
			return cb(err);
		}

		return cb(null);
	});	
}

module.exports.sendMail = sendMail;
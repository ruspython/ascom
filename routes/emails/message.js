var keystone = require('keystone');
var Company = keystone.list('Company');

// Values are taken from the .env file
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_NO_REPLY,
        pass: process.env.MAIL_NO_REPLY_PASSWORD
    }
});

var supportTransporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASSWORD
    }
});

/**
 * Server-side form validation
 * @param {Object} body
 */
function validateForm(body) {
  var name = body.name,
      email = body.email,
      message = body.message,
      REG_EXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      NAME_REGEX = /.{2,}/,
      MESSAGE_REGEX = /(.|\n){9,}/;

  var isEmailValid = email && REG_EXP_EMAIL.test(email),
      isNameValid = name && NAME_REGEX.test(name),
      isMessageValid = message.split('\n').join('').length >= 8;

  return (isNameValid && isEmailValid && isMessageValid);
}

exports = module.exports = function (req, res) {
  var sent = true;
  var body = req.body;

  // Load recievers emails from 'Company' model
  return Company.model.findOne().exec().then(function (company) {
    var recieversList = company.emails;
        recieversList = recieversList.split(' ');

    var recieversEmails = recieversList.join(', ');

    if (!validateForm(body)) {
      return res.status(400).json({
        sent: false
      });
    }

    var time = (new Date()).toString();

    // Options for nodemailer
    // Sender address is taken from .env file
    // Recievers list are taken from model 'Company'
    var mailOptions = {
      from: process.env.MAIL_NO_REPLY,                 // Sender address
      to: recieversEmails,                             // Receivers addresses
      subject: 'ascom-it.ru message from ' + body.name, // Subject line
      html: '<p>Name: ' + body.name + '</p>' + '<p>' + 'Email: ' + body.email + '</p>' + '<p>' +'Was sent at ' + time + '</p>' + 'Message: ' + '<p>' + body.message + '</p>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        sent = false;
      } else {
        console.log('Message sent:' + info.response);
      }

      res.json({
        sent: sent
      });
    });

      // Answering with autoreply email
      var autoreplyMailOptions = {
          from: process.env.SUPPORT_EMAIL,
          to: body.email,
          subject: 'Ascom support',
          template: 'support-autoreply',
          context: {
              name: body.name
          }
      };

      supportTransporter.use('compile', hbs({
          viewEngine: 'express-handlebars',
          viewPath: 'templates/emails/',
          extName: '.hbs'
      }));

      supportTransporter.sendMail(autoreplyMailOptions, function(error, mail) {
          if (error) {
              console.error(error);
          } else {
              console.log('Support message sent:' + mail.response);
          }
      });


  }, function (error) {
    console.error(error);

    res.status(500).json({
      error: error
    });
  });
};

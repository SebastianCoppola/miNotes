const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

const sendEmail = (mail,newPass) => {
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: process.env.mailerUser, 
            pass: process.env.mailerPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            layoutsDir: './server/public/',
            defaultLayout: 'forgotenPass',
            partialsDir: './server/public/'
        },
        viewPath: './server/public/',
        extName: '.handlebars'
    }));

    transporter.sendMail({
        from: '"miNotes ✔" <seba.coppola02@gmail.com>',
        to: mail,
        subject: "Forgoten Password?",
        template: 'forgotenPass',
        context: {
            newPass: newPass
        }
    });
};

module.exports = { sendEmail };
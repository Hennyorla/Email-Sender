const express = require('express');
const app = express();
const cors = require('cors');
const transport = require('./helpers/smtpServer');
const dotenv = require('dotenv');
const sanitizer = require("perfect-express-sanitizer");
const { checkEmailIsValid } = require("./middlewares/dataValidator");

dotenv.config();


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

//global middleware configuration for cors
app.use(cors());

// global middleware configuration for json data
app.use(express.json());

//perfect express sanitizer configuration for json data
app.use(
    sanitizer.clean({
        xss: true,
        noSql: true,
        sql: true,
    })
);
//get request to base url of our server
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// post request to the send-email endpoint to send emails to  a specific email address
app.post("/send-email", checkEmailIsValid, async (req, res) => {
    const {email} = req.body;
//mail option
    const mailOptions = {
        to: email,
        from: process.env.USER_EMAIL,
        subject:"Testing Email Service",
        html:`<h1>Sorry for bothering you,we are actually testing our email server</h1>`

    };

    //use the smtp transport we created to send emails to provided user emails
    transport.sendMail(mailOptions, (error) => {
        if (error) {
          return console.log(error);
        } else {
           res.status(200).json({ message: "Email sent successfully" });

        }
    });
});

module.exports =app;
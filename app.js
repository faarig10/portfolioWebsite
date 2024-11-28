require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
const hbs = create({
    extname: ".hbs",
    defaultLayout: false,
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.get('/', function(req,res){
    res.render("home");
});

app.get("/contact", function(req,res){
    res.render("contact", {submitted: "no"});
});

app.get("/about", function(req,res){
    res.render("about")
});

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post("/contact", function(req,res,next){
    console.log("I am called properly");
    console.log(req.body);
    let name = req.body.fullname;
    let email = req.body.email;
    let note = req.body.note;
    let subject = req.body.subject;

    let mailOptions = {
        from: email,
        to: "learntech1097@gmail.com",
        subject: subject,
        text: note,
        html: "<b>Full Name </b>" + name + "<br><b>Email </b>" + email + "<br><b>Message </b>" + note
    }

    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.error("Error sending email:", err);
            return res.status(500).json({ message: "Error sending email", error: err });
        } else {
            res.render("contact", {submitted:"yes"})
        }
    });
});

const port = 8080;
app.listen(port);
console.log(`App is listening at ${port}`);
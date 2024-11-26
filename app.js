const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
const hbs = create({
    extname: ".hbs",
    defaultLayout: false,
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.get('/', function(req,res){
    res.render("home.hbs");
})

const port = 8080;
app.listen(port);
console.log(`App is listening at ${port}`);
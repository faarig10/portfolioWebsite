const express = require('express');

const app = express();

app.get('/', function(req,res){
    res.send('Hello World');
})

const port = 8080;
app.listen(port);
console.log(`App is listening at ${port}`);
const express = require('express');
const app = express();
const port = 8080;
const config = require('../datasets/company-data.json');

app.get('/',(req,res) => {
    res.send("Hello from get");
});

app.listen(port,()=> {
    console.log('Listening on port:',port);
})

app.post('/',(req,res) => {
    res.send("Hello from post")
});
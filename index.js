const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send({hi: 'there'});
});

app.get('/user1',(req, res) => {
    res.send({hi: "hello budy"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log("HTTP server running on port",PORT);
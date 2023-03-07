
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello node!');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

const port = 9001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/bundle.js'));
});

app.listen(port);
console.log('We are listening on port', port);
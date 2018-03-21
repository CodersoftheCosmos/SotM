const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const router = express.Router();
const router = require('./routes/api')
const server = require('http').createServer(app)
const path = require('path');

const port = 9001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use('/api', router);

app.get('/*', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, function() {
    console.log('We are listening on port', port);
});



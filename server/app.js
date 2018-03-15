const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const http = require('http').Server(app)
const path = require('path');
const io = require('socket.io')(http)


const port = 9001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.join(__dirname + '/../client/dist'));
});


//Routes handlers
// const authRoutes = require('./routes').auth;
// const apiRoutes = require('./routes').api;
// const addPageRoutes = require('./routes').pages;

io.on('connection', function(socket) {
    console.log('player connected');

    socket.on('message', function (socket) {
        console.log('Got the message form client: ' )
    });
});

let server = app.listen(port, function() {
    console.log('We are listening on port', port);
});

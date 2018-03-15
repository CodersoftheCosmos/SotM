const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const server = require('http').createServer(app)
const path = require('path');
const io = require('socket.io')(server)


const port = 9001;
server.listen(port, function() {
    console.log('We are listening on port', port);
});

io.on('connection', function(socket) {
    console.log('player connected');

    socket.on('disconnect', function (socket) {
        console.log('player disconnected' )
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.join(__dirname + '/../client/dist'));
});




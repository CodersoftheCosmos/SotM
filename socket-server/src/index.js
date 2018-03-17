const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 9001

const socket = io.listen(9001);

let init = () => {
  players = [];
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log level", 2);
    });
}

init();

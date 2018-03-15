const io = require('socket.io');

let players;
const socket = io.listen(9001);

let init = () => {
  players = [];
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log level", 2);
    });
}

init();

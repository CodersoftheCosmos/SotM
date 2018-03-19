const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server)

const port = 9002;

const games = []
const players = [];
const game = {};
const playedCount = 0;

io.on('connection', function(socket) {
    console.log('player connected');
    players.push(socket);

    // socket.emit('ac')
       socket.on('createGame', function(data) {
         console.log(data)
       })
//     if (players.length === 0){
//         players.push(socket);
//         socket.emit('handlePlayer', {msg:"playerOne"});
//         socket.emit('status', {msg: 'waiting for another player..'})
//     } else if (players.length === 1) {
//         players.push(socket);
//         socket.emit('handlePlayer', {msg: 'playerTwo'});
//         players.forEach(player => {player.emit('status', {msg: 'Lets play'})})
//     } else {
//         socket.emit('handleWelcome', {msg: 'the server is full'})
//     }

//     socket.on('played', function(packet) {
//         if(scoket === players[0]) {
//             game.player1 = packet.playerOneChoice;
//             playedCount++
//         } else if (socket === players[1]) {
//             game.player2 = packet.playerTwoChoice;
//             playedCount++
//         } else {
//             console.error('something happened')
//         }
//         if (playedCount === 3) {
// 			playedCount = 0;
// 			var champ = winner(game.player1, game.player2);
// 			players.forEach(player => {
// 				player.emit('gameOver', {winner:champ, player1:game.player1, player2:game.player2});
// 			});
// 		}
//     });

    socket.once('disconnect', () => {
		// players.splice(players.indexOf(socket), 1);
		// players.forEach(player => {
		// 	player.emit('playerLeft', {msg: "The other player left"});
		// });
		socket.disconnect();
		console.log('a user disconnected.');
    });
    
})

server.listen(port, function() {
    console.log('We are listening on port', port);
});



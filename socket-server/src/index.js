const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server)
const _ = require('lodash');
const port = 9002;

const games = [{username: 'truelav', numberPlayers: 1, maxPlayers: 2, comments: 'no place for nuubs', player1: 'truelav', player2: ''}]
const activePlayers = [];
const playedCount = 0;
const rooms = [];
let currentGame = {};

io.on('connection', function(socket) {
    console.log('player connected');
    socket.emit('displayGameList', {activeGames: games});
    
    activePlayers.push(socket);
    socket.on('createGame', function(data) {
       if(!_.find(games,{username: data.username})) {
            games.push(data); 
            let room = `room${data.username}`;      
            socket.join(room);
            activePlayers.forEach(function(player){ player.emit('displayGameList', {activeGames: games}) })
       } else {
            socket.emit('message', {msg: 'You have already created a game'})
       }
    })
    
    socket.on('joinGame', function(data) {
        let gameCreator = data.gameJoined;
        let room = `room${data.gameJoined}`;
        socket.join(room);
        let myGame = _.find(games, {username: gameCreator})
            myGame.numberPlayers++; myGame.player2 = data.personalData;
            game = myGame;
            activePlayers.forEach(function(player){ player.emit('displayGameList', {activeGames: games}) })
            io.in(room).emit('message', {msg: 'the game will start soon'});
            // socket.emit('startTimer', {msg: 'let the fun beggin'})
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
//         if (playedCount === 2) {
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



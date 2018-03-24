const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const _ = require('lodash');
const port = 9002;
//const rooms = require('./rooms')

const games = []
const activePlayers = [];
let currentGame = {};

io.on('connection', function(socket) {
    console.log('player connected');
    // socket.emit('displayGameList', {activeGames: games});
    console.log(socket.handshake.query)
    activePlayers.push(socket);
    // socket.on('createGame', function(data) {
    //    if(!_.find(games,{username: data.username})) {
    //         games.push(data); 
    //         let room = `room${data.username}`;      
    //         socket.join(room);
    //         activePlayers.forEach(function(player){ player.emit('displayGameList', {activeGames: games}) })
    //    } else {
    //         socket.emit('message', {msg: 'You have already created a game'})
    //    }
    // })
    
    // socket.on('joinGame', function(data) {
    //     let gameCreator = data.gameJoined;
    //     let room = `room${data.gameJoined}`;
    //     socket.join(room);
    //     let myGame = _.find(games, {username: gameCreator})
    //         myGame.numberPlayers++; myGame.player2 = data.personalData;
    //         game = myGame;
    //         activePlayers.forEach(function(player){ player.emit('displayGameList', {activeGames: games}) })
    //         io.in(room).emit('message', {msg: 'the game will start soon'});
    //         // socket.emit('startTimer', {msg: 'let the fun beggin'})
    // })

    if( activePlayers.length === 1) {
        console.log('one player there')
        socket.emit('message', {msg: 'waiting for the second player'});
        currentGame.player1 = socket.id
        console.log(activePlayers.length)
    } else if ( activePlayers.length === 2) {
        console.log('2players')
        currentGame.player2 = socket.id
        activePlayers.forEach(function(player){ player.emit('gameReady', {game: currentGame})})
    } 
    

    socket.on('villainPlayedCard', function(data) {
        //check the card and assign value
        //check to what player the card will apply, so the question is if we have to send the entire objects to the back end.
        let currentCard = data.turn;
        console.log(activePlayers)
        //if cardName === thisName then use function and send it to the front end
        activePlayers.forEach(function(player){ player.emit('updatePlayers', {data: data.turn})})
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
		activePlayers.splice(activePlayers.indexOf(socket), 1);
		// socket.forEach(player => {
		// 	socket.emit('playerLeft', {msg: "The other player left"});
		// });
		socket.disconnect();
		console.log('a user disconnected.');
    });
    
})

server.listen(port, function() {
    console.log('We are listening on port', port);
});



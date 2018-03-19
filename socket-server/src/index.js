const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port =  9001

const socket = io.listen(9001);


let playedCount = 0;
let game = {};
let numPlayers = 0;
let players = [];


io.on('connection', function(socket) { 
    console.log('player connected');
    // numPlayers++
    // console.log(numPlayers)
    // players.push(socket)  
    // //check how many players are connected , we need to wait until 2
    // //push the player id into the array
    // if (numPlayers === 1) {
    //     socket.emit('handlePlayer', {player: 'playerOne'})
    //     socket.emit('handleStatus', {msg:'waiting for another player'})
    // } else if (numPlayers === 2) {
    //     socket.emit('handlePlayer', {player: 'playerTwo'})
    //     players.forEach(function(player) { player.emit('handleStatus', {msg:'get ready for the game'}) })
    // } else {
    //     socket.emit('handleFull', {msg:'lobby full, please wait..'})
    // }

    // socket.on('played', function(packet) {
    //     if(socket === players[0]) {
    //         game.player1 = packet.playerOneChoice;
    //         playedCount++
    //     } else if (socket === players[1]) {
    //         game.player2 = packet.playerTwoChoice;
    //         playedCount++
    //     } else {
    //         console.error('something happened')
    //     }
    //     if (playedCount === 2) {
	// 		playedCount = 0;
	// 		var champ = winner(game.player1, game.player2);
	// 		players.forEach(player => {
	// 			player.emit('gameOver', {winner:champ, player1:game.player1, player2:game.player2});
	// 		});
	// 	}
    // });

    socket.once('disconnect', () => {
        // players.splice(players.indexOf(socket), 1);
        // numPlayers --;
        // console.log(numPlayers)
		socket.disconnect();
		console.log('a user disconnected.');
    });
    
})

server.listen(port, function() {
    console.log('We are listening on port', port);
});


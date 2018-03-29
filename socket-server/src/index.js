const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const _ = require('lodash');
const port = 9002;
const init = require('../lib/constant');
const serverEvents = require('./serverEvents');
const baronBlade = require('../../../GameData/villains/baronBlade.json');
const legacy = require('../../../GameData/heroes/legacy.json');
const nelson = require('../../../GameData/heroes/nelson.json');

const games = [];
const activePlayers = [];
const roomGame = {
    position: '',
    gameStatus: '',
    player1: {},
    player2: {},
    villain: {},
    cardPlayed: {},
    p1UsedCards: [],
    p2UsedCards: [],
    p3UsedCards: [],
    round: 0,
};
var turns = 0;
var turn = 1;

io.on('connection', function(socket) {
    console.log('player connected');
    //console.log(socket.handshake.query)
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
        socket.emit('message', {msg: 'waiting for the second player'});
        roomGame.player1 = new init.createPlayer(socket.id, legacy);
        init.shuffleCardDeck(roomGame.player1.hero.cardDeck);
        roomGame.player1.hand = roomGame.player1.hero.cardDeck.splice(0, 2);
        console.log(activePlayers.length)
    } else if ( activePlayers.length === 2) {
        console.log('2players')
        roomGame.player2  = new init.createPlayer(socket.id, nelson);
        roomGame.villain  = new init.createVillain(baronBlade);
        init.shuffleCardDeck(roomGame.player2.hero.cardDeck);
        init.shuffleCardDeck(roomGame.villain.villain.cardDeck);
        roomGame.player2.hand = roomGame.player2.hero.cardDeck.splice(0, 2);
        
        activePlayers.forEach( function(player){ 
            player.emit('gameReady', {game: roomGame}
        )});
    } 
    
    socket.on('villainPlayedCard', function() {
        if(socket == activePlayers[0]){
            turns++
        } else if (socket == activePlayers[1]){
            turns++
        }
        if(turns === activePlayers.length){
            let currentCard = roomGame.villain.villain.cardDeck.pop();
            roomGame.cardPlayed = currentCard;
            
            eval(currentCard.func);  //this will invoke the card function 

            //init.restoreHp(10, roomGame.villain.villain);

            roomGame.gameStatus = 'The Villain played ' + currentCard.name + ' ' + currentCard.desc;
            activePlayers.forEach( function(player) {
                player.emit('updatePlayersStats', {game: roomGame})
             })
            turns = 0;
        }
    })

    socket.on('playersUpdated', function(data){
        if (socket == activePlayers[0]){
            turns++
            console.log(turns)
        } else if (socket == activePlayers[1]){
            turns++
            console.log(turns)
        }
        if (turns === activePlayers.length && turn === 1){
                activePlayers[0].emit('playerTurn', {msg: 'your turn'});
                activePlayers[1].emit('updateStatus', {msg: 'wait until player 1 is making a move'});
            turns = 0;
            turn = 2;
        } else if (turns === activePlayers.length && turn === 2){
                activePlayers[0].emit('updateStatus', {msg: 'wait until player 2 is making a move'});
                activePlayers[1].emit('playerTurn', {msg: 'your turn'});
            turns = 0;
            turn = 1;
        }
    })

    socket.on('playerFinishTurn', function(data) {
        //data is the card played
        let damage = 0;
        if ( socket == activePlayers[0] ) {
            console.log('player1')
            roomGame.gameStatus = 'player1 played: ' + data.card.name + ' ' + data.card.desc;
            damage += parseInt(roomGame.player1.hero.power);
            roomGame.player1.hand.push(roomGame.player1.hero.cardDeck.pop()) //draw one card from the top to the hand
            damage += 2;
            roomGame.villain.villain.hp -= damage
            roomGame.round = 0;
            activePlayers.forEach( function(player) {
                player.emit('updateVillainStats', {game: roomGame})
            })
        } else if ( socket == activePlayers[1] ) {
            console.log('player2')
            //then is the villains turn
            roomGame.gameStatus = 'player2 played: ' + data.card.name + ' ' + data.card.desc;
            damage += parseInt(roomGame.player2.hero.power);
            roomGame.player2.hand.push(roomGame.player2.hero.cardDeck.pop()) //draw one card from the top to the hand
            damage += 2;
            roomGame.villain.villain.hp -= damage
            roomGame.round = 1;
            activePlayers.forEach( function(player) {
                player.emit('updateVillainStats', {game: roomGame})
            })
        } 
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



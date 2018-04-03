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

const games = [{username: 'truelav', numberPlayers: 1, maxPlayers: 2, comments: 'no noobs pls', player1: '', player2: ''}];
const activePlayers = [];
const globalMessages = [
    {username: 'truelav', content: 'hello'},
    {username: 'madan', content: 'dont call me hello'}
];

const localMessages = [
    {username: 'admin', content: 'please get ready for the game'}
];

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
    activePlayers: 0,
};  
var turns = 0;
var turn = 1;

io.on('connection', function(socket) {
    console.log('player connected');
    socket.join(socket.handshake.query.roomId);
    socket.emit('fetchAllMessages', {messages: globalMessages});
    // let userName = socket.handshake.query.username
    activePlayers.push(socket);

    
    socket.on('createMessage', function(data) {
        globalMessages.push(data)
        activePlayers.forEach( function (player) { player.to('home').emit('fetchAllMessages', {messages: globalMessages}) })
    })
    
    socket.on('createGame', function(data) {
        socket.join(data.query.roomId);
        games.push(data.query.game); 
    })
    
    activePlayers.forEach ( function (player){ player.emit('updateGamesList', {gameList: games}) });
    
    socket.on('joinGame', function(data) {
        
        socket.join(data.query.roomId);
        activePlayers.forEach ( function (player){ player.emit('startTheGame', {gameList: games}) });
        activePlayers.splice(0, activePlayers.length);
    })

    if( activePlayers.length === 1) {
        console.log('1 player')
        socket.emit('message', {msg: 'waiting for the second player'});
        roomGame.player1 = new init.createPlayer(socket.id, legacy);
        init.shuffleCardDeck(roomGame.player1.hero.cardDeck);
        roomGame.player1.hand = roomGame.player1.hero.cardDeck.splice(0, 2);
        console.log(activePlayers.length)
    } else if ( activePlayers.length === 2) {
        console.log('2 players')
        roomGame.player2  = new init.createPlayer(socket.id, nelson);
        roomGame.villain  = new init.createVillain(baronBlade);
        init.shuffleCardDeck(roomGame.player2.hero.cardDeck);
        init.shuffleCardDeck(roomGame.villain.villain.cardDeck);
        roomGame.player2.hand = roomGame.player2.hero.cardDeck.splice(0, 2);
        
        activePlayers.forEach( function(player){ 
            player.emit('gameReady', {game: roomGame}
        )});
    } 
    
    // if (roomGame.activePlayers === 2) {
    //     activePlayers.forEach( function(player){ 
    //         player.emit('gameReady', {game: roomGame}
    //     )});
    // }

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
        } else if (socket == activePlayers[1]){
            turns++
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
        if ( socket == activePlayers[0] ) {
            roomGame.gameStatus = 'player1 played: ' + data.card.name + ' ' + data.card.desc;
            
            eval(data.card.func)                      // invoke card function 
            roomGame.round = 0;                  //set the player turn so that the game knows that player2 is next
            roomGame.player1.hand.push(roomGame.player1.hero.cardDeck.pop()) //draw one card from the top to the hand
            activePlayers.forEach( function(player) {
                player.emit('updateVillainStats', {game: roomGame})
            })
        } else if ( socket == activePlayers[1] ) {
            roomGame.gameStatus = 'player2 played: ' + data.card.name + ' ' + data.card.desc;
            
            eval(data.card.func)                       //invoke card function
            roomGame.round = 1;                   //set the player turn so that the game knows that villain is next
            roomGame.player2.hand.push(roomGame.player2.hero.cardDeck.pop()) //draw one card from the top to the hand
            activePlayers.forEach( function(player) {
                player.emit('updateVillainStats', {game: roomGame})
            })
        } 
    })

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



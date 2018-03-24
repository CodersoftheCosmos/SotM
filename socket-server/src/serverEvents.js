//import game from './game';
//import cardsAction from './cardsAction';


export const initiateGame = () => {
   
}

export const createGame = (socket) => {
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
}

export const villainStartGame = () => {

}

export const villainPlayedCard = (card, socket) => {
    socket.on('villainPlayedCard', function(data) {
        //check the card and assign value
        //check to what player the card will apply, so the question is if we have to send the entire objects to the back end.
        let currentCard = data.turn;
        console.log(activePlayers)
        //if cardName === thisName then use function and send it to the front end
        activePlayers.forEach(function(player){ player.emit('updatePlayers', {data: data.turn})})
    })
}

export const playerPlayedCard = () => {

}

export const checkGameOver = () => {

}

export const disconnectPlayer = (scoket) => {
    scoket.once('disconnect', () => {
		activePlayers.splice(activePlayers.indexOf(socket), 1);
		// socket.forEach(player => {
		// 	socket.emit('playerLeft', {msg: "The other player left"});
		// });
		socket.disconnect();
		console.log('a user disconnected.');
    });
}
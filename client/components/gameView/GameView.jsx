import React, {Component} from 'react';
import io from 'socket.io-client';
import { baronBlade, legacy, nelson } from '../../../socket-server/src/initialStats';
import VillainView from './VillainView';
import Player1View from './Player1View';
import Player2View from './Player2View';

const socket = io.connect('http://localhost:9002')

class GameView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: '',
            gameStatus: '',
            player1: {},
            player2: {},
            villain: {},
            cardPlayed: {},
            p1UsedCards: [],
            p2UsedCards: [],
            p3UsedCards: [],
         }
        this.handleInitiliazeGame = this.handleInitiliazeGame.bind(this);
        this.handleVillainPlayCard = this.handleVillainPlayCard.bind(this);
        this.handlePlayerPlayCard = this.handlePlayerPlayCard.bind(this);
        this.updatePlayersStats = this.updatePlayersStats.bind(this);
        this.updateVillainStats = this.updateVillainStats.bind(this);
        this.player1Turn = this.player1Turn.bind(this);
    }

    componentDidMount() {
        socket.on('gameReady', this.handleInitiliazeGame);
        socket.on('updatePlayersStats', this.updatePlayersStats);
        socket.on('player1Turn', this.player1Turn);
    }

    handleInitiliazeGame(data) {
        
        this.setState({
            villain: data.game.villain,
            player1: data.game.player1,
            player2: data.game.player2,
            gameStatus: 'every player draw 2 cards from deck',
        });
        console.log(this.state)
        setTimeout(this.handleVillainPlayCard, 6000)
    }

    handleVillainPlayCard() {
        let currentCard = this.state.villain.villain.cardDeck.pop()
        this.setState({
            cardPlayed: currentCard,
            gameStatus: 'villain played: ' + currentCard.name 
        })
        socket.emit('villainPlayedCard', {turn: currentCard})
        //do all the logic in back end about that card and then emit to all players 
        // all the players should listen to villain's turn event and update their hp
    }

    updatePlayersStats(data) {
        //check what player are you playing by checking the username
        this.setState({
            player1: data.game.player1,
            player2: data.game.player2,
            gameStatus: data.game.gameStatus
        })
        socket.emit('playersUpdated', {msg: 'now player1s move'})
    }

    player1Turn(data) {
        if(data.msg === 'your turn') {
            this.setState({
                gameStatus: data.msg
            })
            this.handlePlayerPlayCard('player1')
        } else {
            this.setState({gameStatus: data.msg})
        }
    }

    handlePlayerPlayCard(data) {
        if (data === 'player1'){
            console.log('this is player 1')
        } else if (data === 'player2'){
            console.log('this is player 2')
        }
        // //listen to villan move event in order to get the damage
        // villain.turn = false;
        // //play one card from the hand
        // socket.emit('playedCard', {turn: this.state.player1})
        // player1.hand.push(player1.cardDeck.pop())
    
        // //repeat the same way but now the logic in the back end should be handle towards villain
        // villain.turn = false;
        // //play one card from the hand
        // socket.emit('playedCard', {turn: this.state.player2})
        // player2.hand.push(player2.cardDeck.pop())
    }

    updateVillainStats() {

    }


    handleTurns() {
        //by default the villain always play first so we have to trigger first villain

    }


    render() {
        if(this.state.player1.username && this.state.player1.username){
            return (
                <div>
                    <h2>Game Status: {this.state.gameStatus}</h2>
                    <VillainView currentState={this.state.villain} />
                    <Player1View currentState={this.state.player1} /> 
                    <Player2View currentState={this.state.player2} />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Waiting for the second player</h1>
                </div>
            )
        }
    }
}

export default GameView;






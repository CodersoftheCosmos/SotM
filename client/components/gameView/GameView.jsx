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
            villain : {
                villain: '',
                hp: 30,
                imageURL: '',
                cardDeck: [],
                turn: true,
                cardPlayed: {},
            },
            
            player1 : {
                username: '',
                hero: 'Legacy',
                hp: 30,
                imageURL: '',
                cardDeck: [],
                turn: false,
                hand: [],
                cardPlayed: {},
            },
            
            player2 : {
                username: '',
                hero: 'Nelson',
                hp: 25,
                imageURL: '',
                cardDeck: [],
                turn: false,
                hand: [],
                cardPlayed: {},
            },
            currentTurn: 'villain',
        }
        this.handleInitiliazeGame = this.handleInitiliazeGame.bind(this);
        this.handleShuffleArray = this.handleShuffleArray.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleVillainPlayCard = this.handleVillainPlayCard.bind(this);
        this.handlePlayerPlayCard = this.handlePlayerPlayCard.bind(this);
        this.updatePlayersStats = this.updatePlayersStats.bind(this);
        this.updateVillainStats = this.updateVillainStats.bind(this);
    }

    componentDidMount() {
        socket.on('gameReady', this.handleInitiliazeGame);
        socket.on('updatePlayers', this.updatePlayersStats);
    }

    handleInitiliazeGame(data) {
        console.log(data.game.player1)
        let villainInit = Object.assign({}, this.state.villain);
        villainInit.villain = baronBlade.name;
        // shuffledDeck = this.handleShuffleArray(baronBlade.cardDeck);
        villainInit.cardDeck = baronBlade.cardDeck; //needs to shuffle first
        villainInit.imageURL = baronBlade.imageUrl;
        
        let player1Init = Object.assign({}, this.state.player1);
        player1Init.username = data.game.player1;
       // shuffledDeck = this.handleShuffleArray(legacy.cardDeck);
        player1Init.cardDeck = legacy.cardDeck;
        player1Init.imageURL = legacy.imageUrl;
        player1Init.hand.push(legacy.cardDeck[6], legacy.cardDeck[4])
        
        let player2Init = Object.assign({}, this.state.player2);
        player2Init.username = data.game.player2;
        //shuffledDeck = this.handleShuffleArray(nelson.cardDeck);
        player2Init.cardDeck = nelson.cardDeck;
        player2Init.imageURL = nelson.imageUrl;
        player2Init.hand.push(nelson.cardDeck[3], nelson.cardDeck[6])
        
        this.setState({
            villain: villainInit,
            player1: player1Init,
            player2: player2Init
        })
    }

    handleStartGame() {
        socket.emit('gameStart', {msg: 'the game begin now'})
    }

    handleVillainPlayCard() {
        villain.cardPlayed = villain.cardDeck.pop()
        socket.emit('villainPlayedCard', {turn: this.state.villain})
        //do all the logic in back end about that card and then emit to all players 
        // all the players should listen to villain's turn event and update their hp
    }

    handlePlayerPlayCard() {
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

    updatePlayersStats(data) {
        //update the villains cardDeck since we used one
    }

    handleTurns() {
        //by default the villain always play first so we have to trigger first villain

    }

    handleShuffleArray (deck) {
        let i = 0
            , j = 0
            , temp = null
        
        for (i = deck.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
        }
    }

    render() {
        return (
            <div>
                <VillainView currentState={this.state.villain}/>
                <Player1View currentState={this.state.player1}/>
                <Player2View currentState={this.state.player2}/>
            </div>
        )
    }
}

export default GameView;






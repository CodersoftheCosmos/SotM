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
            position: 0,
            gameStatus: '',
            player1: {},
            player2: {},
            villain: {},
            cardPlayed: {},
            p1UsedCards: [],
            p2UsedCards: [],
            p3UsedCards: []
         }
        this.handleInitiliazeGame = this.handleInitiliazeGame.bind(this);
        this.handleVillainPlayCard = this.handleVillainPlayCard.bind(this);
        this.updatePlayersStats = this.updatePlayersStats.bind(this);
        this.updateVillainStats = this.updateVillainStats.bind(this);
        this.playerTurn = this.playerTurn.bind(this);
        this.handlePlayCard = this.handlePlayCard.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.handleFinishTurn = this.handleFinishTurn.bind(this);
        this.setPlayersTurn = this.setPlayersTurn.bind(this);
    }

    componentDidMount() {
        socket.on('gameReady', this.handleInitiliazeGame);
        socket.on('updatePlayersStats', this.updatePlayersStats);
        socket.on('playerTurn', this.playerTurn);
        socket.on('updateStatus', this.updateStatus);
        socket.on('updateVillainStats', this.updateVillainStats);
    }

    handleInitiliazeGame(data) {
        
        this.setState({
            villain: data.game.villain,
            player1: data.game.player1,
            player2: data.game.player2,
            gameStatus: 'every player draw 2 cards from deck',
        });
        setTimeout(this.handleVillainPlayCard, 2000)
    }

    handleVillainPlayCard() {
        this.setState({
            gameStatus: 'villain is playing...',
        });
        setTimeout(() => { this.setPlayersTurn('villain') }, 2000);
    }

    setPlayersTurn(data){
        if ( data === 'villain' ) {                           //check from where is coming invocation
            socket.emit('villainPlayedCard',{msg: 'villain'}); 
        } else if ( data === 'updatePlayers') {
            socket.emit('playersUpdated', {msg: 'now players move'});
        }
    }

    updatePlayersStats(data) {
        //check what player are you playing by checking the username
        this.setState({
            player1: data.game.player1,
            player2: data.game.player2,
            villain: data.game.villain,
            cardPlayed: data.game.cardPlayed,
            gameStatus: data.game.gameStatus
        })
        console.log(this.state.villain)
        setTimeout( () => { this.setPlayersTurn('updatePlayers') } , 7000)
    }

    updateStatus(data) {
        this.setState({
            gameStatus: data.msg,
            position: 0
        })
    }

    playerTurn(data) {
        this.setState({
            gameStatus: data.msg,
            position: 1
        }) 
    }

    handlePlayCard(data) {
            this.setState({
                cardPlayed: data,
            })
        }

    handleFinishTurn() {
        if ( this.state.position === 1){
            socket.emit('playerFinishTurn', {card: this.state.cardPlayed})
        } else if (this.state.position === 0){
            this.setState({
                gameStatus: 'please wait for your turn'
            })
        }
    }
   
    updateVillainStats(data) {
        this.setState({
            cardPlayed: data.game.cardPlayed,
            gameStatus: data.game.gameStatus,
            villain: data.game.villain,
            player1: data.game.player1,
            player2: data.game.player2,
        });
        if ( data.game.round === 0 ) {
            setTimeout( () => { this.setPlayersTurn('updatePlayers') } , 7000)
        } else if ( data.game.round === 1 ) {
            setTimeout( () => { this.handleVillainPlayCard() } , 7000)
        }
    };


    render() {
        if(this.state.player1.username && this.state.player1.username){
            return (
                <div>
                    <h2>Game Status: {this.state.gameStatus}</h2>
                    <VillainView currentState={this.state.villain} />
                    <Player1View currentState={this.state.player1} handleCard={this.handlePlayCard} handleFinishTurn={this.handleFinishTurn}/> 
                    <Player2View currentState={this.state.player2} handleCard={this.handlePlayCard} handleFinishTurn={this.handleFinishTurn}/>
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






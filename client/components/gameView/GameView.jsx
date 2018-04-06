import React, {Component} from 'react';
import io from 'socket.io-client';
import { baronBlade, legacy, nelson } from '../../../socket-server/src/initialStats';
import VillainView from './VillainView';
import Player1View from './Player1View';
import Player2View from './Player2View';
import RoomChat from '../chat/RoomChat';

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
            p1InplayCards: [],
            p2InplayCards: [],
            round: 0,
            username: '',
            winner: '',
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
        this.handleFinisheTheGame = this.handleFinisheTheGame.bind(this);
    }

    componentDidMount() {
        this.socket.on('gameReady', this.handleInitiliazeGame);
        this.socket.on('updatePlayersStats', this.updatePlayersStats);
        this.socket.on('playerTurn', this.playerTurn);
        this.socket.on('updateStatus', this.updateStatus);
        this.socket.on('updateVillainStats', this.updateVillainStats);
        this.socket.on('finishTheGame', this.handleFinisheTheGame)
    }

    componentWillMount() {
        this.socket = io('http://localhost:9002', {
			query: {
			roomId: "gameRoom"
			}
		});
        
    }

    handleInitiliazeGame(data) {
        
        this.setState({
            villain: data.game.villain,
            player1: data.game.player1,
            player2: data.game.player2,
            p1InplayCards: data.game.p1InplayCards,
            p2InplayCards: data.game.p2InplayCards,
            username: data.user,
            gameStatus: 'every player draw 2 cards from deck',
        });
        setTimeout(this.handleVillainPlayCard, 5000)
    }

    handleVillainPlayCard() {
        this.setState({
            gameStatus: 'villain is playing...',
        });
        setTimeout(() => { this.setPlayersTurn('villain') }, 5000);
    }

    setPlayersTurn(data){
        if ( data === 'villain' ) {                           //check from where is coming invocation
            this.socket.emit('villainPlayedCard',{msg: 'villain'}); 
        } else if ( data === 'updatePlayers') {
            this.socket.emit('playersUpdated', {msg: 'now players move'});
        }
    }

    updatePlayersStats(data) {
        console.log(data)
        //check what player are you playing by checking the username
        this.setState({
            player1: data.game.player1,
            player2: data.game.player2,
            villain: data.game.villain,
            cardPlayed: data.game.cardPlayed,
            gameStatus: data.game.gameStatus
        })
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
            this.socket.emit('playerFinishTurn', {card: this.state.cardPlayed})
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
            p1InplayCards: data.game.p1InplayCards,
            p2InplayCards: data.game.p2InplayCards,
        });
        if ( data.game.round === 0 ) {
            setTimeout( () => { this.setPlayersTurn('updatePlayers') } , 7000)
        } else if ( data.game.round === 1 ) {
            setTimeout( () => { this.handleVillainPlayCard() } , 7000)
        }
    };

    handleFinisheTheGame(data) {
        if( data.winner === 'villain') {
            this.setState({ winner: 'villain' })
        } else {
            this.setState({ winner: 'players' })
        }
    }


    render() {
        if( this.state.player1.username && this.state.player2.username ){
            if ( this.state.winner === 'players') {
                return (
                    <div>
                        Congrats You have Won
                    </div>
                )
            } else  {
                return (
                    <div >
                        <div className="gridRows3" >
                            <h2 className="gameStatus" >Game Status: {this.state.gameStatus}</h2>
                            <VillainView currentState={this.state.villain} />
                            <div className="gridColumns8020" >
                                <div className="players gridColumns2">
                                    <Player1View currentState={this.state.player1} inplay={this.state.p1InplayCards} handleCard={this.handlePlayCard} handleFinishTurn={this.handleFinishTurn}/> 
                                    <Player2View currentState={this.state.player2} inplay={this.state.p2InplayCards} handleCard={this.handlePlayCard} handleFinishTurn={this.handleFinishTurn}/>
                                </div>
                                <div className="chat">
                                    <RoomChat socket={this.socket} user={this.state.username}/>
                                </div>
                            </div>
                        </div>
    
                        <style>
                            {`
                                .players {
                                    width: 70%;
                                    float: left;
                                    display: inline-flex;
                                }
                                .chat {
                                    width: auto;
                                    float: right;
                                    display: inline-flex;
                                }
                                .gridRows2 {
                                    display: grid;
                                    grid-template-rows: auto auto;
                                }
                                .gridRows3 {
                                    display: grid;
                                    grid-template-rows: auto auto auto;
                                }
                                .gridColumns2 {
                                    display: grid;
                                    grid-template-columns: auto auto;
                                }
                                .gridColumns8020 {
                                    display: grid;
                                    grid-template-columns: 40% 60%;
                                }
                                .gridColumns3 {
                                    display: grid;
                                    grid-template-columns: auto auto auto;
                                }

                                .gameStatus {
                                    font-family: "Bangers";
                                    letter-spacing: 1.5px;
                                    color: white;
                                    background-color: black;
                                }
    
                            `}
                        </style>
    
                    </div>
                )
            }
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







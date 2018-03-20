import React, { Component } from 'react';
import CreateGame from './CreateGame';
import Games from './Games';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:9002')

class GameJoin extends Component {
	constructor(){
		super()
		this.state = { 
	  username: 'andreica666',
	  status: "",
      playerPosition: "",
	  activePlayers: [],
	  activeGames: [],
	  gameComment: '',
	  gameStatus: '',
		}
	this.handlePlayer = this.handlePlayer.bind(this);
	this.displayGameList = this.displayGameList.bind(this);
	this.handleJoinGame = this.handleJoinGame.bind(this);
	this.handleCreateGame = this.handleCreateGame.bind(this);
	this.handleOnChange = this.handleOnChange.bind(this);
	this.handleGameStatus = this.handleGameStatus.bind(this);
	this.handleMessage = this.handleMessage.bind(this);

	}
  
  componentDidMount() {
		socket.on('handleGameStatus', this.handleGameStatus);
		socket.on('handlePlayer', this.handlePlayer);
		socket.on('displayGameList', this.displayGameList);
		socket.on('message', this.handleMessage);
		// socket.on('handleWelcome', this.handleWelcome);
		// socket.on('status', this.handleStatus);
		// socket.on('gameOver', this.gameOver);
		// socket.on('playerLeft', this.handlePlayerLeft);

	}

	componentWillMount() {
		socket.on('handleGameStatus', this.handleGameStatus);
		socket.on('handlePlayer', this.handlePlayer);
		socket.on('displayGameList', this.displayGameList);
		socket.on('message', this.handleMessage);
	}

	// this will update the status, like if you cant create multiple games, cant join multiple games etc.
	handleGameStatus(data) {
		console.log(data.msg)
        this.setState({gameStatus: data.msg})
	}

	handleMessage(data) {
		console.log(data)
		this.setState({message: data.msg})
	}
	
	displayGameList(data) {
		this.setState({ activeGames: data.activeGames })
	}

	handlePlayer(data) {
		this.setState({ playerPosition: data.msg });
	}

	handleCreateGame() {
		this.setState({ gameStatus: 'waiting for another player'})
      	socket.emit('createGame', {username: this.state.username, players: 1, maxPlayers: 2, comments: this.state.gameComment, player1: this.state.username, player2: '', gameCreated: false})
	}

	handleJoinGame(data) {
      	socket.emit('joinGame', {gameJoined: data, personalData: this.state.username});
	}
		
	handleOnChange(e) {
		this.setState({gameComment: e.target.value})
	}

  render() {
	
		return (
			<div>
				{/* <Login click={this.loginSubmitHandler} change={this.loginChangeHandler}/> */}
				<h1>Welcome to lobby:</h1>
				<h3>Status: {this.state.message}</h3>
				<h3>Active Games</h3>			
				<div>
                    <Games games={this.state.activeGames} handleJoinGame={this.handleJoinGame}/>
					{/* <p>Active Players</p> */}
				</div>
				<CreateGame handleCreateGame={this.handleCreateGame} handleOnChange={this.handleOnChange}/>
				{/* {newGameButton} */}
			</div>
		)
	}
}

export default GameJoin;



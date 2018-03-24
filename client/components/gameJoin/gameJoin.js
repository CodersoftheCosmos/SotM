// import React, { Component } from 'react';
// import CreateGame from './CreateGame';
// import Games from './Games';
// import io from 'socket.io-client';
// import { setInterval } from 'timers';

// const socket = io.connect('http://localhost:9002')

// class GameJoin extends Component {
// 	constructor(){
// 		super()
// 		this.state = { 
// 	  username: 'andreica666',
// 	  status: "",
//       playerPosition: "",
// 	  activePlayers: [],
// 	  activeGames: [],
// 	  gameComment: '',
// 	  gameStatus: '',
// 	  timer: '',
// 		}
// 	this.handlePlayer = this.handlePlayer.bind(this);
// 	this.displayGameList = this.displayGameList.bind(this);
// 	this.handleJoinGame = this.handleJoinGame.bind(this);
// 	this.handleCreateGame = this.handleCreateGame.bind(this);
// 	this.handleOnChange = this.handleOnChange.bind(this);
// 	this.handleGameStatus = this.handleGameStatus.bind(this);
// 	this.handleMessage = this.handleMessage.bind(this);
//     this.startTimer = this.startTimer.bind(this);

// 	}
  
//   componentDidMount() {
// 		socket.on('handleGameStatus', this.handleGameStatus);
// 		socket.on('handlePlayer', this.handlePlayer);
// 		socket.on('displayGameList', this.displayGameList);
// 		socket.on('message', this.handleMessage);
// 		socket.on('startTimer', this.startTimer);
// 	}

// 	// this will update the status, like if you cant create multiple games, cant join multiple games etc.
// 	handleGameStatus(data) {
//         this.setState({gameStatus: data.msg})
// 	}

// 	handleMessage(data) {
// 		console.log(data)
// 		this.setState({message: data.msg})
// 	}
	
// 	displayGameList(data) {
// 		this.setState({ activeGames: data.activeGames })
// 	}

// 	handlePlayer(data) {
// 		this.setState({ playerPosition: data.msg });
// 	}

// 	handleCreateGame() {
// 		this.setState({ gameStatus: 'waiting for another player'})
//       	socket.emit('createGame', {username: this.state.username, numberPlayers: 1, maxPlayers: 2, comments: this.state.gameComment, player1: this.state.username, player2: ''})
// 	}

// 	handleJoinGame(data) {
//       	socket.emit('joinGame', {gameJoined: data, personalData: this.state.username});
// 	}

// 	startTimer() {
// 		// var timeLeft = 30;
// 		// var timerId = setInterval(countdown, 1000);

// 		// function countdown() {
// 		// 	if (timeLeft === -1) {
// 		// 		return
// 		// 		clearTimeout(timerId);
// 		// 	} else {
// 		// 		console.log(GameJoin)
// 		// 		//GameJoin.setState({timer: timeLeft})
// 		// 		//console.log(timeLeft+ ' seconds remaining')
// 		// 		timeLeft--;
// 		// 	}
// 		// }
// 	}
		
// 	handleOnChange(e) {
// 		this.setState({gameComment: e.target.value})
// 	}

//   render() {
	
// 		return (
// 			<div>
// 				<h1>Welcome to lobby:</h1>
// 				<h3>Status: {this.state.message}</h3>
// 				<h3>Active Games</h3>			
// 				<div>
//                     <Games games={this.state.activeGames} handleJoinGame={this.handleJoinGame}/>
// 				</div>
// 				<h3 className="countDown"></h3>
// 				<CreateGame handleCreateGame={this.handleCreateGame} handleOnChange={this.handleOnChange}/>
// 			</div>
// 		)
// 	}
// }

// export default GameJoin;



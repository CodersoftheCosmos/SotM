import React, { Component } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:9002')

class GameJoin extends Component {
	constructor(){
		super()
		this.state = { 
      playerPosition: "",
      result: "",
      playerOneChoice: "",
	  playerTwoChoice: "",
	  activePlayers: [],
    //   status: "",
    //   wins: 0,
    //   losses: 0,
		}
    this.handlePlayer = this.handlePlayer.bind(this);
	// this.handleWelcome = this.handleWelcome.bind(this);
	// this.handleStatus = this.handleStatus.bind(this);

	}
  
  componentDidMount() {
		
			socket.on('handlePlayer', this.handlePlayer);
			// socket.on('handleWelcome', this.handleWelcome);
			// socket.on('status', this.handleStatus);
			// socket.on('gameOver', this.gameOver);
			// socket.on('playerLeft', this.handlePlayerLeft);

	}


	handlePlayer(data) {
		this.setState({playerPosition: data.msg});
		console.log(data.msg)
	}

	handleCreateGame() {

	}

	handleJoinGame() {

	}

	// handleWelcome(data) {
	// 	this.setState({message: data.msg});
	// 	console.log(data.msg)
	// }

	// handleStatus(data) {
	// 	this.setState({message: data.msg});
	// 	console.log(data.msg)
	// }

	// handlePlayerLeft(data) {
	// 	this.setState({message: data.msg, playerPosition: "playerOne"});
	// }
	
	

  render() {
		
		//var newGameButton = (this.state.result) ? <button onClick={this.newGameGen}>New Game</button> : "";
	
		return (
			<div>
				{/* <Login click={this.loginSubmitHandler} change={this.loginChangeHandler}/> */}
				<h1>Welcome to lobby:</h1>
				<h2>message: {this.state.status}</h2>
				<div>
					<button>Create Game</button>
					<button>Join Game</button>
				</div>
				<div>
					<p>Active Players</p>
				</div>
				{/* {newGameButton} */}
			</div>
		)
	}
}

export default GameJoin;



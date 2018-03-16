import React, { Component } from 'react';
import Chat from '../components/Chat'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import UserList from '../components/UserList'


class App extends Component {
	constructor(props){
		super(props)
		this.state = {

			playerPosition: "",
			result: "",
			playerOneChoice: "",
			playerTwoChoice: "",
			message: "",
			wins: 0,
			losses: 0

		}
   
	this.handlePlayer = this.handlePlayer.bind(this);
	this.handleWelcome = this.handleWelcome.bind(this);
	this.handleStatus = this.handleStatus.bind(this);
	// this.handlePlayerLeft = this.handlePlayerLeft.bind(this);
	// this.handleStatus = this.handleStatus.bind(this);
	// this.gameOver = this.gameOver.bind(this);
	// this.handlePlay = this.handlePlay.bind(this);
  		
	}
	

	componentDidMount() {
		const socket = io.connect('http://localhost:9001')
			socket.on('handlePlayer', this.handlePlayer);
			socket.on('handleWelcome', this.handleWelcome);
			socket.on('status', this.handleStatus);
			// socket.on('gameOver', this.gameOver);
			// socket.on('playerLeft', this.handlePlayerLeft);

	}

	handlePlayer(data) {
		this.setState({playerPosition: data.msg});
		console.log(data.msg)
	}

	handleWelcome(data) {
		this.setState({message: data.msg});
		console.log(data.msg)
	}

	handleStatus(data) {
		this.setState({message: data.msg});
		console.log(data.msg)
	}
	// handlePlayerLeft(data) {
	// 	this.setState({message: data.msg, playerPosition: "playerOne"});
	// }



	// gameOver(data) {
	// 	if (this.state.playerOneChoice === "") {
	// 		this.setState({playerOneChoice:data.player1});
	// 		if (this.state.playerTwoChoice === data.winner) {
	// 			this.setState({result: "You are the winner!", wins: this.state.wins + 1});
	// 		} else {
	// 			this.setState({result: "You are the loser!", losses: this.state.losses + 1});
	// 		}
	// 	} else {
	// 		this.setState({playerTwoChoice:data.player2});
	// 		if (this.state.playerOneChoice === data.winner) {
	// 			this.setState({result: "You are the winner!", wins: this.state.wins + 1});
	// 		} else {
	// 			this.setState({result: "Your are the loser!", losses: this.state.losses + 1});
	// 		}
	// 	}
	// 	this.setState({message: "Game over, click New Game!"});
	// }

	// handleChange(e, value) {
	// 	if (this.state.playerPosition == "playerOne") {
	// 		this.setState({playerOneChoice: e.target.value});
	// 	} else {
	// 		this.setState({playerTwoChoice: e.target.value})
	// 	}
	// }

	// handlePlay(e) {
	// 	this.setState({message: "Waiting on the other player..."});
	// 	socket.emit(
	// 		'played',
	// 		{
	// 			player: this.state.playerPosition,
	// 			playerOneChoice: this.state.playerOneChoice,
	// 			playerTwoChoice: this.state.playerTwoChoice
	// 		}
	// 	);
	// }

	// newGameGen() {
	// 	this.setState(
	// 		{
	// 			result: "",
	// 			playerOneChoice: "",
	// 			playerTwoChoice: "",
	// 			message: "New game has started."}
	// 	);
	// 	$('input[name="uplay"]').prop('checked', false);
	// }


	render() {
		
		//var newGameButton = (this.state.result) ? <button onClick={this.newGameGen}>New Game</button> : "";
	
		return (
			<div>
				Hello from React! hell
				<h2>message: {this.state.message}</h2>
				{/* {newGameButton} */}
			</div>
		)
	}
}

// just to see if passes store data to props
// function mapStateToProps(state) {
// 	return {
// 			users: state.users
// 	};
// }

// export default connect(mapStateToProps)(App);
export default App;
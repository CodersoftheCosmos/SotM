import React, { Component } from 'react';
import Chat from '../components/Chat'
import io from 'socket.io-client'
import Login from '../components/Login';
import API from '../../config.js';
import firebase from 'firebase';


class App extends Component {
	constructor(){
		super()
		this.state = {
            playerPosition: "",
			result: "",
			playerOneChoice: "",
			playerTwoChoice: "",
			message: "",
			wins: 0,
			losses: 0,


			email: '',
			password: ''
		}
        this.handlePlayer = this.handlePlayer.bind(this);
		this.handleWelcome = this.handleWelcome.bind(this);
		this.handleStatus = this.handleStatus.bind(this);

		// this.createUserHandler = this.createUserHandler.bind(this);
		// this.userLoginHandler = this.userLoginHandler.bind(this);
		// this.loginChangeHandler = this.loginChangeHandler.bind(this);
		// this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
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

	handlePlayerLeft(data) {
		this.setState({message: data.msg, playerPosition: "playerOne"});
	}



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


	
    //**********************************AUTH************************************	

	 //LOGIN PAGE COMPONENTS
	// createUserHandler(e) {
	// 	const errHandler = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
	// 		errHandler.catch((e) => console.log(e.message));
	// }
	// userLoginHandler(e) {
	// 	const errHandler = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    //   errHandler.catch((e) => console.log(e.message));
	// }
	// loginChangeHandler(e) {
	// 	this.setState({
	// 		[e.target.name]: e.target.value
	// 	})
	// }
	// loginSubmitHandler(e) {
	// 	if (e.target.name === 'signin') {
	// 		this.userLoginHandler(e);
	// 	} else {
	// 		this.createUserHandler(e);
	// 	}
	// }
	// //END OF LOGIN PAGE COMPONENTS

	// componentWillMount() {
	// 	//FIREBASE SET UP
	// 	var config = {
	// 		apiKey: API.fireBaseApiKey,
	// 		authDomain: "sotm-66f9b.firebaseapp.com",
	// 		databaseURL: "https://sotm-66f9b.firebaseio.com",
	// 		projectId: "sotm-66f9b",
	// 		storageBucket: "sotm-66f9b.appspot.com",
	// 		messagingSenderId: "1016933819692"
	// 	};
	// 	firebase.initializeApp(config);
	// 	//END FIREBASE SET UP
	// 	//FIREBASE AUTH
	// 	firebase.auth().onAuthStateChanged((User) => {
    //   if (User) {
    //     console.log(User.email, 'logged in!');
    //   } else {
    //     console.log('Logged out!');
    //   }
	// 	});
	// 	//END FIREBASE AUTH
	// 	//SOCKETIO SET UP
	// 	const socket = io.connect('http://localhost:9001')
	// 		// socket.on('this', (data) => {
	// 		// 	console.log(data)
	// 	// })
	// 	socket.emit('connection')
	// 	//END SOCKETIO SET UP
	// }

	    //**********************************AUTH************************************	


	render() {
		
		//var newGameButton = (this.state.result) ? <button onClick={this.newGameGen}>New Game</button> : "";
	
		return (
			<div>
				{/* <Login click={this.loginSubmitHandler} change={this.loginChangeHandler}/> */}
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
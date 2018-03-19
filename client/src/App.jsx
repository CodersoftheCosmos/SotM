import React, { Component } from 'react';
import Login from '../components/Auth/Login';
import API from '../../config.js';
import firebase from 'firebase';
import Home from '../components/Home/Home'
import GameJoin from '../components/gameJoin/gameJoin'
import MainView from '../components/gameView/mainView'
import io from 'socket.io-client'
import Rules from '../components/Rule/Rules.jsx';

// const socket = io.connect('http://localhost:9002')


class App extends Component {
	constructor(){
		super()
		this.state = { 
			email: '',
			password: '',
			render: ''
		}
		this.createUserHandler = this.createUserHandler.bind(this);
		this.userAuthHandler = this.userAuthHandler.bind(this);
		this.loginChangeHandler = this.loginChangeHandler.bind(this);
		this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
	}

    // componentDidMount() {
      
	// }

	
    //**********************************AUTH************************************	

	 //LOGIN PAGE COMPONENTS
	createUserHandler(e) {
		console.log(this.state.email)
		console.log(this.state.password)
		const errHandler = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
			errHandler.catch((e) => console.log(e.message));
	}
	userAuthHandler(e) {
		if (e.target.name === 'signin') {
			const errHandler = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
				errHandler.catch((e) => console.log(e.message));
		} else {
			const errHandler = firebase.auth().signOut();
				errHandler.catch((e) => console.log('e.message'));
		}
	}
	loginChangeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	loginSubmitHandler(e) {
		if (e.target.name === 'signin' || e.target.name === 'logout') {
			this.userAuthHandler(e);
		} else {
			this.createUserHandler(e);
		}
	}
	// //END OF LOGIN PAGE COMPONENTS

	componentWillMount() {
		//FIREBASE SET UP
		var config = {
			apiKey: API.fireBaseApiKey,
			authDomain: "sotm-66f9b.firebaseapp.com",
			databaseURL: "https://sotm-66f9b.firebaseio.com",
			projectId: "sotm-66f9b",
			storageBucket: "sotm-66f9b.appspot.com",
			messagingSenderId: "1016933819692"
		};
		firebase.initializeApp(config);
	// 	//END FIREBASE SET UP
	// 	//FIREBASE AUTH
		firebase.auth().onAuthStateChanged((User) => {
      if (User) {
        console.log(User.email, 'logged in!');
      } else {
        console.log('Logged out!');
      }
		});
	}
	// 	//END FIREBASE AUTH
	//**********************************AUTH************************************	


	render() {
		
		//var newGameButton = (this.state.result) ? <button onClick={this.newGameGen}>New Game</button> : "";
	
		return (
			<div>
				{/* <Login click={this.loginSubmitHandler} change={this.loginChangeHandler}/> */}
				<GameJoin />
				{/* <MainView /> */}
				{/* <Home click={this.loginSubmitHandler}/> */}
				{/* <Rules /> */}
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
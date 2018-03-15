import React, { Component } from 'react';
import Chat from '../components/Chat'
import { Socket } from 'socket.io-client'
import Login from '../components/Login';
import API from '../../config.js';
import firebase from 'firebase';


class App extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: ''
		}
		this.createUserHandler = this.createUserHandler.bind(this);
		this.userLoginHandler = this.userLoginHandler.bind(this);
		this.loginChangeHandler = this.loginChangeHandler.bind(this);
		this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
	}
	//LOGIN PAGE COMPONENTS
	createUserHandler(e) {
		const errHandler = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
			errHandler.catch((e) => console.log(e.message));
	}
	userLoginHandler(e) {
		const errHandler = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      errHandler.catch((e) => console.log(e.message));
	}
	loginChangeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	loginSubmitHandler(e) {
		if (e.target.name === 'signin') {
			this.userLoginHandler(e);
		} else {
			this.createUserHandler(e);
		}
	}
	//END OF LOGIN PAGE COMPONENTS

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
		//END FIREBASE SET UP
		//FIREBASE AUTH
		firebase.auth().onAuthStateChanged((User) => {
      if (User) {
        console.log(User.email, 'logged in!');
      } else {
        console.log('Logged out!');
      }
		});
		//END FIREBASE AUTH
		//SOCKETIO SET UP
		const socket = io.connect('http://localhost:9001')
			// socket.on('this', (data) => {
			// 	console.log(data)
		// })
		socket.emit('connection')
		//END SOCKETIO SET UP
	}
	render() {
	return (
			<div>
				<Login click={this.loginSubmitHandler} change={this.loginChangeHandler}/>
				{/* <Chat /> */}
			</div>
		)
	}
}

// just to see if passes store data to props
function mapStateToProps(state) {
	return {
			users: state.users
	};
}

export default connect(mapStateToProps)(App);
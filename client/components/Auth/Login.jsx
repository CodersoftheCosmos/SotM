import React, { Component } from 'react';
import API from '../../../config';
import firebase from 'firebase';

class Login extends Component {
	constructor(){
		super()

	this.state = { 
		email: '',
		password: ''
	}
	this.createUserHandler = this.createUserHandler.bind(this);
	this.userAuthHandler = this.userAuthHandler.bind(this);
	this.loginChangeHandler = this.loginChangeHandler.bind(this);
	this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
}


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
	//app.jsx will need to load this upon loadup
	//store needs email 
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
	
	render() {
		return (
				<div align="center">
					<input type="email" name="email" placeholder="Email" onChange={this.loginChangeHandler} />
					<br />
					<input type="password" name="password" placeholder="Password" onChange={this.loginChangeHandler} />
					<br />
					<button name="signin" onClick={this.loginSubmitHandler}>Sign In</button><button name="create" onClick={this.loginSubmitHandler}>Create Account</button>
				</div>
			)
	}
}

export default Login;
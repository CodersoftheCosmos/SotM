import React, { Component } from 'react';
import API from '../../../config';
import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { User } from '../../actions/loggedInPerson';
import { Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import axios from 'axios';
import { selectRules } from '../../actions/rules'
import Rules from '../Rule/Rules'
import "./Login.css"
import Leaderboard from '../Home/LeaderBoard'


class Login extends Component {
	constructor(props){
		super(props)

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
		[e.target.name]: e.target.value + '@sotm.com'
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
				let username = User.email.slice(0, User.email.indexOf('@'));
				//USERNAME RIGHT HERE ABOVE ME
				let userObj = {};
				const context = this

				const userExists = axios.get(`/api/username?username=${username}`)
				.then( (response) => {
					console.log('this is the response.data for username get: ', response.data)
					console.log(`${username} exists in database`)
					if(!response.data[0]) {
						userObj = {
							username: username,
							stats: {
								wins: 0,
								losses: 0,
								favChar: 'Nelson',
								totDmgDone: 0
							}
						};
						axios.post('/api/username', {
							username: username,
							stats: {
								wins: 0,
								losses: 0,
								favChar: 'Nelson',
								totDmgDone: 0
							}
						})
						.then( (response) => {
							console.log(`sucessfully added ${username} to database`)
							this.props.User(userObj)
						})
						.catch( (err) => {
							console.log(`something went wrong when saving ${username}: `, err)
						});
					} else {
						console.log('username: ', response.data[0].username)
						console.log('stats: ', response.data[0].stats)
						userObj.username = response.data[0].username;
						userObj.stats = response.data[0].stats;
						context.props.User(userObj)
					}
				})
				.catch( (err) => {
					console.log('something went wrong')
				});

				console.log('this is the get request: ', userExists)

			
				console.log(username, 'logged in!');
				console.log(userObj)

				// this.props.User(test);
			} else {
				console.log('Logged out!');
				this.props.User(null)
			}
		});
	}
	
	render() {
		if (this.props.activeRules === true) {
			return (
				<div>
						<Rules />
				</div>
				)
			}

		else if(this.props.activeLeader === true) {
				return ( 
						<div>
								<Leaderboard />
						</div>
				)

		} 

		else if(this.props.user[0] !== null){
			return (
				<div>
					{/* <Redirect to="/home"/> */}
					<Home click={this.loginSubmitHandler} />
				</div>
			)

		}

		
		return (
			<div className="body" align="center">
				<h1 id="title"> Coders of the Cosmos </h1>
				<input type="email" name="email" placeholder="Email" onChange={this.loginChangeHandler} />
				<br />
				<input id="bottom" type="password" name="password" placeholder="Password" onChange={this.loginChangeHandler} />
				<br />
				<button className="btn" name="signin" onClick={this.loginSubmitHandler}>Sign In</button>
				<button className="btn" id="create" name="create" onClick={this.loginSubmitHandler}>Create Account</button>
				<br/>
				<br/>
				<input className="btn btn-primary" type="button" value="Rules Page" onClick={()=>this.props.selectRules(true)}/> 
				
			</div>
		)
}
}


function mapStateToProps(state) {
	return {
			user: state.activeUser,
			activeRules : state.rules,
			activeLeader: state.leaderboard
	};
}
function matchDispatchToProps(dispatch){
	//when selected card is called, passed to all reducers
	return bindActionCreators( { User: User, selectRules: selectRules }, dispatch)
}

// conversion from "dumb" component to "container"
export default connect(mapStateToProps, matchDispatchToProps)(Login);

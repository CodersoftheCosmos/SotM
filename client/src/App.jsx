import React, { Component } from 'react';
import Chat from '../components/Chat'
import { Socket } from 'socket.io-client'
import Login from '../components/Login';


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
		//do some stuff
	}
	userLoginHandler(e) {
		//do some different stuff
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
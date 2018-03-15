import React, { Component } from 'react';
import Chat from '../components/Chat'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import UserList from '../components/UserList'


class App extends Component {
	constructor(props){
		super(props)
	}
	
	componentDidMount() {
		const socket = io.connect('http://localhost:9001')
			// socket.on('this', (data) => {
			// 	console.log(data)
		// })
		socket.emit('connection')
	}

	handleStartGame() {

	}


	render() {
	return (
			<div>
				Hello from React! hell
				<Chat />
				<UserList />
				<button className="startGame" onClick={this.handleStartGame}>Start Game</button>
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
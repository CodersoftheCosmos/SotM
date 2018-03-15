import React, { Component } from 'react';
import Chat from '../components/Chat'
import { Socket } from 'socket.io-client'
import {connect} from 'react-redux'
import UserList from '../components/UserList'


class App extends Component {
	constructor(props){
		super(props)
	}
	
	// componentDidMount() {
	// 	const { socket } = this.props
	// 	socket.on('connect', () => {
	// 		console.log('player connected')
	// 	})
	// }

	render() {
	return (
			<div>
				Hello from React! hell
				<Chat />
				<UserList />
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
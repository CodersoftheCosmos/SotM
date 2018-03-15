import React, { Component } from 'react';
import Chat from '../components/Chat'
import { Socket } from 'socket.io-client'


class App extends Component {
	constructor(){
		super()
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
			</div>
		)
	}
}

export default App;
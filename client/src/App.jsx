import React, { Component } from 'react';
import Chat from '../components/Chat'
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home'
import GameJoin from '../components/gameJoin'
import MainView from '../components/gameView/mainView'
import io from 'socket.io-client'
import Rules from '../components/Rule/Rules.jsx';

const socket = io.connect('http://localhost:9002')


class App extends Component {
	constructor(){
		super()
		this.state = { 
		}
	}

	render() {
		return (
			<BrowserRouter>
				<div>
				<Switch>
					<Route exact={true} path="/" component={Login} />
					<Route path="/join" component={GameJoin} />
					<Route path="/game" component={MainView} />
					<Route path="/home" component={Home} />
					<Route path="/rules" component={Rules} />
	
				</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
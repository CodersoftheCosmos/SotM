import React, { Component } from 'react';
import Chat from '../components/Chat'
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home'
import GameJoin from '../components/gameJoin/gameJoin'
import MainView from '../components/gameView/mainView';
import GameView from '../components/gameView/GameView'
import Rules from '../components/Rule/Rules.jsx';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import io from 'socket.io-client';


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
					<Route path="/game" component={GameView} />
					<Route path="/home" component={Home} />
					<Route path="/rules" component={Rules} />
	
				</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
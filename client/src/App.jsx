import React, { Component } from 'react';
import Chat from '../components/Chat'
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home'
import GameJoin from '../components/gameJoin'
import MainView from '../components/gameView/mainView';
import Rules from '../components/Rule/Rules.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom'


class App extends Component {
	constructor(){
		super()
		this.state = { 
		}
	}

	render() {
		
		//var newGameButton = (this.state.result) ? <button onClick={this.newGameGen}>New Game</button> : "";
	
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
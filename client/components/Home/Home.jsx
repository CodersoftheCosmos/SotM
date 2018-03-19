import React, { Component } from 'react';
import Stats from './Stats.jsx';

class Home extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div>
				<div align="right">
					<button name="logout" onClick={console.log('logout')}>Logout</button>
				</div>
				<div align="center">
					<button name="join" onClick={console.log('join')}>Join A Game</button>
					<br />
					<button name="create" onClick={console.log('create')}>Create A Game</button>
					<hr />
					<Stats />
				</div>
			</div>
		)
	}
}

export default Home;
import React, { Component } from 'react';
import Stats from './Stats.jsx';
class Home extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div align="center">
				<button name="join" onClick={console.log()}>Join A Game</button>
				<br />
				<button name="create" onClick={console.log()}>Create A Game</button>
				<hr />
				<Stats />
			</div>
		)
	}
}

export default Home;
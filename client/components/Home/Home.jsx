import React, { Component } from 'react';
import Stats from './Stats.jsx';
class Home extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div align="center">
<<<<<<< HEAD
				<button name="join" onClick={console.log('join')}>Join A Game</button>
				<br />
				<button name="create" onClick={console.log('create')}>Create A Game</button>
=======
				<button name="join" onClick={console.log()}>Join A Game</button>
				<br />
				<button name="create" onClick={console.log()}>Create A Game</button>
>>>>>>> b7b28afe9a9eb44f1f5bcddf3b118c28d770aeb6
				<hr />
				<Stats />
			</div>
		)
	}
}

export default Home;
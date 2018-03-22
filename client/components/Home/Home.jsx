import React, { Component } from 'react';
import Stats from './Stats.jsx';
import { connect } from 'react-redux';

class Home extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div>
				<div align="right">
					<button name="logout" onClick={this.props.click}>Logout</button>
				</div>
				<div align="center">
					<button name="join" onClick={()=>console.log('join')}>Join A Game</button>
					<br />
					<button name="create" onClick={()=>console.log('create')}>Create A Game</button>
					<hr />
					{this.props.user.username}
					<Stats />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
			user: state.activeUser
	};
}

export default connect(mapStateToProps)(Home);

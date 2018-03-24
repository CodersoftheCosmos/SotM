import React, { Component } from 'react';
import Stats from './Stats.jsx';
import { connect } from 'react-redux';
import { selectRules } from '../../actions/rules'
import { bindActionCreators } from 'redux';
import Rules from '../Rule/Rules'
import { Redirect } from 'react-router-dom';

class Home extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
		if(this.props.user[0] === null) {
			return (
				<div>
						<Redirect to="/"/>
				</div>
				)
		}
		else if (this.props.activeRules === true) {
			return (
				<div>
						<Rules />
				</div>
				)
		} else {
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
							<input type="button" value="Rules" onClick={()=> this.props.selectRules(true)}/>
						</div>
					</div>
				)
			}
	}
}

function mapStateToProps(state) {
	return {
			user: state.activeUser,
			activeRules : state.rules
	};
}

function matchDispatchToProps(dispatch){
	//when selected card is called, passed to all reducers
	return bindActionCreators( { selectRules: selectRules }, dispatch)
}

// conversion from "dumb" component to "container"

export default connect(mapStateToProps, matchDispatchToProps)(Home);

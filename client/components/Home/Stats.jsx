import React, { Component } from 'react';
import {connect} from 'react-redux';

class Stats extends Component {
	constructor(){
		super()
	}

	render() {
		return (
			<div align="center">
				<h1> Welcome {this.props.user[0].username[0].toUpperCase() + this.props.user[0].username.substring(1)}! </h1> <br />
				<h3> Stats </h3>
				<h4>Wins: {this.props.user[0].stats.wins}</h4>
				<h4>Losses: {this.props.user[0].stats.losses}</h4>
				<h4>Favorite Hero: {this.props.user[0].stats.favChar}</h4>
				<h4>Total Damage Done: {this.props.user[0].stats.totDmgDone}</h4>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
				user: state.activeUser
    };
}

export default connect(mapStateToProps)(Stats);
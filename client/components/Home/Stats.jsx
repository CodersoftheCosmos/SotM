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
				<h4> Stats </h4>
				<h6>Wins: {this.props.user[0].stats.wins}</h6>
				<h6>Losses: {this.props.user[0].stats.losses}</h6>
				<h6>Favorite Hero: {this.props.user[0].stats.favChar}</h6>
				<h6>Total Damage Done: {this.props.user[0].stats.totDmgDone}</h6>
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
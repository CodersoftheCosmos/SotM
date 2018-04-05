import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./Stats.css"

class Stats extends Component {
	constructor(){
		super()
	}

	render() {
		return (
			<div id="stat">
				<h1> Stats </h1>
				<h2>Wins: {this.props.user[0].stats.wins}</h2>
				<h2>Losses: {this.props.user[0].stats.losses}</h2>
				<h2>Favorite Hero: {this.props.user[0].stats.favChar}</h2>
				<h2>Total Damage Done: {this.props.user[0].stats.totDmgDone}</h2>
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
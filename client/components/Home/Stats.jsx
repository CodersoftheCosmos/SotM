import React, { Component } from 'react';

class Stats extends Component {
	constructor(){
		super()
	}
	
	render() {
	return (
			<div align="center">
				<h2>{/*Player Name from Redux*/}</h2> Stats<br />
				Wins: {/*from DB*/}
				Losses: {/*from DB*/}
				Favorite Hero: {/*from DB*/}
				Total Damage Done: {/*from DB*/}
			</div>
		)
	}
}

export default Stats;
import React, { Component } from 'react';
import RuleDetails from './RuleDetails.jsx';
class Rules extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div align="center">
				<iframe width="560" height="315" src="https://www.youtube.com/embed/H_S79Y-_8F0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <hr />
        <RuleDetails />
      </div>
		)
	}
}

export default Rules;
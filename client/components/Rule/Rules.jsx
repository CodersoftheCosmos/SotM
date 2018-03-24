import React, { Component } from 'react';
import RuleDetails from './RuleDetails.jsx';
import { connect } from 'react-redux';
import { selectRules } from '../../actions/rules'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';


class Rules extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
		if(this.props.activeRules === null) {
			return (
			<Redirect to="/Home"/>
			)
		}
	return (
			<div align="center">
				<iframe width="560" height="315" src="https://www.youtube.com/embed/H_S79Y-_8F0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <hr />
        <RuleDetails />
				<input type="button" value="Back to Home" onClick={()=> this.props.selectRules(null)} />
      </div>
		)
	}
}
function mapStateToProps(state) {
	return {
			activeRules : state.rules
	};
}

function matchDispatchToProps(dispatch){
	//when selected card is called, passed to all reducers
	return bindActionCreators( { selectRules: selectRules }, dispatch)
}

// conversion from "dumb" component to "container"

export default connect(mapStateToProps, matchDispatchToProps)(Rules);

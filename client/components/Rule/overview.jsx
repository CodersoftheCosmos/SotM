import React, { Component } from 'react';
import "./overview.css"

class Overview extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div id="overview" >
				<span id="start">Welcome</span> to the fictional comic book world of Coders of the Cosmos, where powerful heroes fight dastardly villains to protect the tech world!
        <br/>
        <br/>
        Coders of the Cosmos is a cooperative game in which players control heroes with powers and abilities in the form of cards. Two players control heroes who must work together to survive the battle and defeat the villain in order to win.
        <br/>
        <br/>
        Ultimately, either the heroes will successfully defeat the villain and foil their plans, or the villain will triumph, and the heroes will be forced to regroup to fight another day.
      </div>
		)
	}
}

export default Overview;
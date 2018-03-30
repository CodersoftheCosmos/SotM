import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'

class LeaderBoard extends Component {
	constructor(){
    super()
    this.state = {
      leaderB: []	
    }
    this.getLeaderBoard = this.getLeaderBoard.bind(this)
  }
  
  componentDidMount () {
    this.getLeaderBoard()
  }

  getLeaderBoard() {
    const context = this

    axios.get('/api/leaderboard')
    .then(function (response) {
      let storage = []
      for(let i = 0; i<response.data.length; i+=2) {
        storage.push(response.data[i] + " : " + response.data[i+1])
      }
      context.setState({leaderB: storage})
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderLeaderBoard () {
    
    return this.state.leaderB.map( (element, index)=> 
      <div key={index}>
        <div> {index + 1} - {element} Wins </div> <br/>
      </div>
    )
  }



	render() {
    if(this.state.leaderB.length === 0) {
      <div>
        Loading
      </div>
    }
		return (
			<div align="center">
				<h1> LeaderBoard! </h1> <br />
        <h2> {this.renderLeaderBoard()}</h2>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
				user: state.activeUser
    };
}

export default connect(mapStateToProps)(LeaderBoard);